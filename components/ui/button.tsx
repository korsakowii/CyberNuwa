
export function Button({ type = "button", className = "", children }: any) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
