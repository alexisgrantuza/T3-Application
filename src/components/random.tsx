// Component: Displays the "부적합처리" (Nonconformance Handling) section
export default function NonconformanceSection() {
  return (
    <div className="space-y-4 px-4 pt-6">
      <div className="border-t-[4px] border-red-200 border-t-[#FAB2B2] bg-gradient-to-b from-red-50 to-red-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>

          <span className="text-lg font-bold text-red-700">부적합처리</span>
        </div>
      </div>

      <div className="flex gap-3">
        {["재작업", "작업분해", "폐기"].map((label) => (
          <div key={label} className="flex-1 rounded border p-2">
            <div className="mb-1 inline-block rounded-sm text-xs text-gray-400">
              {label}
            </div>
            <input
              type="number"
              step="0.0000"
              placeholder="0.0000"
              className="w-full border-none text-sm font-bold text-black focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
