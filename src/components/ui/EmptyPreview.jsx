export default function EmptyPreview() {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[300px] select-none px-4">
      <div className="flex flex-col items-center text-center space-y-5 max-w-[260px]">
        <div className="space-y-1.5">
          <p className="text-base font-medium text-black dark:text-white">
            Nothing to preview
          </p>
          <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
            Add blocks on the left and your README preview will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
