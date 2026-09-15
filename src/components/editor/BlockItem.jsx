import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BLOCK_META, BLOCK_TYPES, BLOCK_ICONS } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
import TitleBlock from "../blocks/TitleBlock.jsx";
import BadgesBlock from "../blocks/BadgesBlock.jsx";
import DescriptionBlock from "../blocks/DescriptionBlock.jsx";
import FeaturesBlock from "../blocks/FeaturesBlock.jsx";
import InstallationBlock from "../blocks/InstallationBlock.jsx";
import UsageBlock from "../blocks/UsageBlock.jsx";
import ScreenshotsBlock from "../blocks/ScreenshotsBlock.jsx";
import ApiBlock from "../blocks/ApiBlock.jsx";
import ContributingBlock from "../blocks/ContributingBlock.jsx";
import LicenseBlock from "../blocks/LicenseBlock.jsx";
import CustomBlock from "../blocks/CustomBlock.jsx";
import { ChevronDown, Copy, Trash2 } from "lucide-react";

const BLOCK_COMPONENTS = {
  [BLOCK_TYPES.TITLE]: TitleBlock,
  [BLOCK_TYPES.BADGES]: BadgesBlock,
  [BLOCK_TYPES.DESCRIPTION]: DescriptionBlock,
  [BLOCK_TYPES.FEATURES]: FeaturesBlock,
  [BLOCK_TYPES.INSTALLATION]: InstallationBlock,
  [BLOCK_TYPES.USAGE]: UsageBlock,
  [BLOCK_TYPES.SCREENSHOTS]: ScreenshotsBlock,
  [BLOCK_TYPES.API]: ApiBlock,
  [BLOCK_TYPES.CONTRIBUTING]: ContributingBlock,
  [BLOCK_TYPES.LICENSE]: LicenseBlock,
  [BLOCK_TYPES.CUSTOM]: CustomBlock,
};

export default function BlockItem({ block }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });
  const {
    removeBlock,
    updateBlock,
    activeBlockId,
    setActiveBlock,
    duplicateBlock,
  } = useReadme();

  const meta = BLOCK_META[block.type];
  const EditorComponent = BLOCK_COMPONENTS[block.type];
  const IconComponent = BLOCK_ICONS[block.type];
  const isActive = activeBlockId === block.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group rounded-xl transition-all duration-200
        ${isActive
          ? "bg-white border border-gray-200 shadow-sm"
          : "bg-gray-50/60 border border-transparent hover:bg-gray-50 hover:border-gray-100"
        }
        ${isDragging ? "shadow-lg shadow-black/8 z-50" : ""}
      `}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer select-none"
        onClick={() => setActiveBlock(isActive ? null : block.id)}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
            <circle cx="2" cy="2" r="1.2" />
            <circle cx="6" cy="2" r="1.2" />
            <circle cx="2" cy="7" r="1.2" />
            <circle cx="6" cy="7" r="1.2" />
            <circle cx="2" cy="12" r="1.2" />
            <circle cx="6" cy="12" r="1.2" />
          </svg>
        </div>

        {/* Icon */}
        {IconComponent && (
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-150 shrink-0">
            <IconComponent size={14} className="text-gray-600" />
          </div>
        )}

        {/* Label */}
        <span className="text-[13px] font-medium text-gray-700 flex-1 truncate">
          {meta?.label}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateBlock(block.id);
            }}
            aria-label="Duplicate block"
            className="p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Copy size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            aria-label="Remove block"
            className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={14}
          className={`text-gray-300 shrink-0 transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Editor */}
      {isActive && EditorComponent && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          <EditorComponent
            content={block.content}
            onChange={(patch) => updateBlock(block.id, patch)}
          />
        </div>
      )}
    </div>
  );
}
