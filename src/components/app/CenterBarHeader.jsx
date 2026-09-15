export default function CenterBarHeader({ blockCount }) {
  return (
    <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-[14px] font-semibold text-gray-900">Blocks</h2>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {blockCount} {blockCount === 1 ? "block" : "blocks"} in your README
        </p>
      </div>
    </div>
  );
}
