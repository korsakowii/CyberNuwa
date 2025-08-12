赛博女娲｜许愿池数据&表单统一方案（交付给 Cursor）
0) 目标
表单与后端结构一致；支持「标题 + 摘要」卡片展示；保留匿名、标签、作者显示名；支持后续筛选与检索。

1) 数据结构（推荐方案 B：扩展后端字段）
json
Copy
Edit
{
  "id": 22,
  "title": "提前偷看未来",
  "description": "提前偷看未来的市场，把钱放在最会长大的地方。",
  "tags": ["投资", "市场预测", "财富增长"],
  "anonymous": false,
  "author_name": "Xiaoyu",          // 匿名时可以为空或忽略
  "user_id": "investor_022",       // 系统内部标识
  "status": "processing",          // pending | processing | done
  "created_at": "2025-01-28T13:15:30.000000",
  "updated_at": "2025-08-07T02:56:20.250615"
}
兼容旧字段：content（已废弃）。写入时由 title + description 拼接生成，仅用于向后兼容与全文检索。

2) 表单 → 数据映射
Wish Title → title

Wish Description → description

Tags (comma-separated) → tags: string[]

Publish Anonymously → anonymous: boolean

Author Name → author_name（当 anonymous=true 时忽略）

系统侧注入：user_id、status 默认 pending

3) API 契约
POST /api/wishes
Request

json
Copy
Edit
{
  "title": "string(2-60)",
  "description": "string(> 10)",
  "tags": ["string", "..."],
  "anonymous": true,
  "author_name": "optional",
  "user_id": "required"
}
Response 201

json
Copy
Edit
{ "id": 123, "status": "pending", "created_at": "...", "updated_at": "...", ...payload }
GET /api/wishes
Query: ?status=pending|processing|done&tag=xxx&search=keyword&sort=latest|hot
Response

json
Copy
Edit
{
  "items": [/* wish objects */],
  "meta": { "total": 26 }
}
PATCH /api/wishes/:id
允许修改：status | title | description | tags | anonymous | author_name

4) 校验规则
title：2–60 字；不得只含标点/空白

description：≥ 10 字

tags：每个 ≤ 20 字；最多 5 个；去重、去空格

anonymous=true ⇒ author_name 不返回到前端展示（保留在服务端）

status：枚举 pending | processing | done

5) 展示层（卡片列表）规范
主行：title

次行摘要：excerpt = description.slice(0, 28~36) + "…"（按中文宽度截断）

元信息：status 徽标 + 相对时间（e.g. “2 天前”）+ 作者展示名

anonymous=true ⇒ 作者显示为「匿名许愿者」

否则显示 author_name；若为空，降级为 user_id

悬停/点击：

悬停：展开显示完整 description 与互动区（Like/Comment/View）

点击：进入详情页，view_count++

6) 迁移（PostgreSQL 示例）
sql
Copy
Edit
ALTER TABLE wishes
  ADD COLUMN title TEXT,
  ADD COLUMN description TEXT,
  ADD COLUMN tags TEXT[],                 -- 若用 JSONB 也可
  ADD COLUMN anonymous BOOLEAN DEFAULT false,
  ADD COLUMN author_name TEXT;

-- 兼容旧 content：尝试拆分第一句为 title，其余为 description
UPDATE wishes
SET
  title = COALESCE(title, split_part(content, '。', 1)),
  description = COALESCE(description,
                 CASE
                   WHEN content IS NULL THEN NULL
                   WHEN position('。' in content) > 0
                     THEN substr(content, position('。' in content)+1)
                   ELSE content
                 END);
7) UI 文案/交互微调
表单占位符：

Title: 给愿望起个名字（2-60 字）

Description: 说说你真正想要的事（≥10 字）

Tags: 逗号分隔，如：AI, 创意, 协作（最多5个）

匿名勾选：以匿名方式发布（提示：作者名将不对外展示）

提交按钮文案：✨ 放入许愿池

成功 toast：已放入许愿池，可在列表中查看进度

8) 列表筛选/排序（前端）
筛选：状态 多选、标签 多选、搜索（模糊匹配 title/description/content）

排序：最新（created_at desc）/ 热度（likes + comments + views 权重）

空态：还没有愿望，做第一个许愿的人吧 ✨

9) 统计与埋点（可选）
view：进入详情页触发；去抖 30s；同用户一天只计一次

like：去重；允许取消

comment：长度限制 1–300；支持 @ 提出者（内部通知）

10) 兼容性约定
旧前端仍 POST content 时：后端将其作为 description 写入，并自动生成 title = 前 12~18 字。

新前端优先使用 title/description/tags/anonymous/author_name。