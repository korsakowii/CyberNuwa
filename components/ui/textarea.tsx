
export function Textarea({ placeholder, value, onChange, rows = 4, required = false }: any) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  );
}
