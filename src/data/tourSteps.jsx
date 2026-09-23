export const TOUR_STEPS = [
  {
    target: '[data-tour="sidebar"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Block palette</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Click any icon to add a block to your README. There are 11 blocks
          covering titles, features, installation, API docs, and more.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: '[data-tour="blocks"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Your blocks</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Click a block to expand and edit its content. Drag the handle to
          reorder. The preview updates as you type.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: '[data-tour="preview"]',
    content: (
      <div>
        <h3 className="text-base font-semibold mb-1.5">Live preview</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Your README renders in real time. Use the tabs to switch between
          preview and raw Markdown code.
        </p>
      </div>
    ),
    placement: "left",
    disableBeacon: true,
  },
];
