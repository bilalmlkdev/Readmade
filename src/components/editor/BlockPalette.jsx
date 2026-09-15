import { BLOCK_META, BLOCK_TYPES, BLOCK_ICONS } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
import UserAccountPreview from "../ui/UserAccountPreview.jsx";
import Tooltip from "../ui/Tooltip.jsx";
import logo from "/logo.svg";

const ALL_BLOCKS = [
  BLOCK_TYPES.TITLE,
  BLOCK_TYPES.BADGES,
  BLOCK_TYPES.DESCRIPTION,
  BLOCK_TYPES.FEATURES,
  BLOCK_TYPES.INSTALLATION,
  BLOCK_TYPES.USAGE,
  BLOCK_TYPES.SCREENSHOTS,
  BLOCK_TYPES.API,
  BLOCK_TYPES.CONTRIBUTING,
  BLOCK_TYPES.LICENSE,
  BLOCK_TYPES.CUSTOM,
];

export default function BlockPalette({ onReset }) {
  const addBlock = useReadme((s) => s.addBlock);

  return (
    <div className="w-[56px] flex-shrink-0 flex flex-col items-center bg-white border-r border-gray-200 py-3 h-full" data-block-palette data-tour="sidebar">
      {/* Logo */}
      <Tooltip content="Readmade" side="right">
        <a href="/" className="flex items-center justify-center w-8 h-8 mb-3">
          <img src={logo} alt="Readmade" className="w-8 h-8" />
        </a>
      </Tooltip>

      {/* Divider */}
      <div className="w-5 h-px bg-gray-200 mb-2" />

      {/* Block icons */}
      <div className="flex-1 flex flex-col items-center gap-0.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {ALL_BLOCKS.map((type) => {
          const meta = BLOCK_META[type];
          const IconComponent = BLOCK_ICONS[type];
          return (
            <Tooltip key={type} content={`Add ${meta.label}`} side="right">
              <button
                onClick={() => addBlock(type)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150"
              >
                {IconComponent && <IconComponent size={18} />}
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-5 h-px bg-gray-200 mt-2 mb-2" />

      {/* Reset icon */}
      <Tooltip content="Reset workspace" side="right">
        <button
          onClick={onReset}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150 mb-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </Tooltip>

      {/* User Avatar */}
      <Tooltip content="Account" side="right">
        <div>
          <UserAccountPreview minimized={true} />
        </div>
      </Tooltip>
    </div>
  );
}
