'use client'

import { useState, useEffect } from 'react'
import { healthApi, wishesApi, tasksApi, modulesApi, agentsApi } from '../../utils/api'
import { DevOnly } from '../../components/DevOnly'

function IntegrationTestContent() {
  const [testResults, setTestResults] = useState<any>({})
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const results: any = {}

    try {
      // 测试1: 健康检查
      console.log('🧪 测试1: 健康检查')
      try {
        const healthResponse = await healthApi.check()
        results.health = {
          success: true,
          data: healthResponse.data,
          message: '健康检查通过'
        }
      } catch (error) {
        results.health = {
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
          message: '健康检查失败'
        }
      }

      // 测试2: 提交愿望
      console.log('🧪 测试2: 提交愿望')
      try {
        const wishResponse = await wishesApi.submitWish('测试愿望：希望有一个智能助手帮我管理时间', 'test_user_001')
        results.submitWish = {
          success: true,
          data: wishResponse.data,
          message: '愿望提交成功'
        }
        
        // 测试3: 合成任务
        console.log('🧪 测试3: 合成任务')
        try {
          const taskResponse = await tasksApi.synthesizeTask(wishResponse.data.wish.id)
          results.synthesizeTask = {
            success: true,
            data: taskResponse.data,
            message: '任务合成成功'
          }

          // 测试4: 提交模块
          console.log('🧪 测试4: 提交模块')
          try {
            const moduleResponse = await modulesApi.submitModule(
              taskResponse.data.task.id,
              '任务识别模块',
              '这是一个用于识别和分类用户任务的模块',
              'test_user_002'
            )
            results.submitModule = {
              success: true,
              data: moduleResponse.data,
              message: '模块提交成功'
            }

            // 测试5: 构建智能体
            console.log('🧪 测试5: 构建智能体')
            try {
              const agentResponse = await agentsApi.buildAgent(
                taskResponse.data.task.id,
                [moduleResponse.data.module.id]
              )
              results.buildAgent = {
                success: true,
                data: agentResponse.data,
                message: '智能体构建成功'
              }

              // 测试6: 获取智能体演示
              console.log('🧪 测试6: 获取智能体演示')
              try {
                const demoResponse = await agentsApi.getAgentDemo(agentResponse.data.agent.id)
                results.getAgentDemo = {
                  success: true,
                  data: demoResponse.data,
                  message: '智能体演示获取成功'
                }
              } catch (error) {
                results.getAgentDemo = {
                  success: false,
                  error: error instanceof Error ? error.message : '未知错误',
                  message: '智能体演示获取失败'
                }
              }

            } catch (error) {
              results.buildAgent = {
                success: false,
                error: error instanceof Error ? error.message : '未知错误',
                message: '智能体构建失败'
              }
            }

          } catch (error) {
            results.submitModule = {
              success: false,
              error: error instanceof Error ? error.message : '未知错误',
              message: '模块提交失败'
            }
          }

        } catch (error) {
          results.synthesizeTask = {
            success: false,
            error: error instanceof Error ? error.message : '未知错误',
            message: '任务合成失败'
          }
        }

      } catch (error) {
        results.submitWish = {
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
          message: '愿望提交失败'
        }
      }

      // 测试7: 获取愿望列表
      console.log('🧪 测试7: 获取愿望列表')
      try {
        const wishesResponse = await wishesApi.getWishes(1, 5)
        results.getWishes = {
          success: true,
          data: wishesResponse.data,
          message: '愿望列表获取成功'
        }
      } catch (error) {
        results.getWishes = {
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
          message: '愿望列表获取失败'
        }
      }

      // 测试8: 获取任务列表
      console.log('🧪 测试8: 获取任务列表')
      try {
        const tasksResponse = await tasksApi.getTasks(1, 5)
        results.getTasks = {
          success: true,
          data: tasksResponse.data,
          message: '任务列表获取成功'
        }
      } catch (error) {
        results.getTasks = {
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
          message: '任务列表获取失败'
        }
      }

    } catch (error) {
      console.error('测试过程中发生错误:', error)
    }

    setTestResults(results)
    setIsRunning(false)
  }

  const getStatusIcon = (success: boolean) => {
    return success ? '✅' : '❌'
  }

  const getStatusColor = (success: boolean) => {
    return success ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">前后端集成测试</h1>
          <p className="text-zinc-400 mb-6">测试前后端API连接和功能完整性</p>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            {isRunning ? '测试中...' : '开始测试'}
          </button>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">测试结果</h2>
            
            {Object.entries(testResults).map(([testName, result]: [string, any]) => (
              <div key={testName} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{testName}</h3>
                  <span className={`text-lg ${getStatusColor(result.success)}`}>
                    {getStatusIcon(result.success)}
                  </span>
                </div>
                <p className="text-zinc-300 mb-2">{result.message}</p>
                {result.error && (
                  <p className="text-red-400 text-sm">错误: {result.error}</p>
                )}
                {result.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-zinc-400 hover:text-white">
                      查看响应数据
                    </summary>
                    <pre className="mt-2 p-2 bg-zinc-900 rounded text-xs overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}

            <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
              <h3 className="text-lg font-medium mb-2">测试总结</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">总测试数:</span>
                  <span className="ml-2 text-white">{Object.keys(testResults).length}</span>
                </div>
                <div>
                  <span className="text-zinc-400">成功:</span>
                  <span className="ml-2 text-green-400">
                    {Object.values(testResults).filter((r: any) => r.success).length}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">失败:</span>
                  <span className="ml-2 text-red-400">
                    {Object.values(testResults).filter((r: any) => !r.success).length}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">成功率:</span>
                  <span className="ml-2 text-white">
                    {Math.round((Object.values(testResults).filter((r: any) => r.success).length / Object.keys(testResults).length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 

export default function IntegrationTest() {
  return (
    <DevOnly>
      <IntegrationTestContent />
    </DevOnly>
  )
}