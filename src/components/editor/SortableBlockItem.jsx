import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Trash2,
  GripVertical,
  Maximize2,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
import InlineBlockEditor from "./InlineBlockEditor.jsx";

const iconBtn =
  "p-1.5 rounded-lg transition-colors text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10";

// Drag handle stays inert while expanded so form inputs remain usable
function DragHandle({ isExpanded, attributes, listeners }) {
  if (isExpanded) {
    return (
      <div className="shrink-0 text-gray-200" aria-hidden="true">
        <GripVertical size={14} />
      </div>
    );
  }
  return (
    <div
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()}
      className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-white/20 dark:hover:text-white/40 transition-colors shrink-0"
      title="Drag to reorder"
    >
      <GripVertical size={14} />
    </div>
  );
}

export default function SortableBlockItem({
  block,
  index,
  isActive,
  onActive,
  isExpanded,
  onToggleExpand,
  onEdit,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id, disabled: isExpanded });
  const { removeBlock, updateBlock, toggleBlockHidden } = useReadme();
  const meta = BLOCK_META[block.type];
  const IconComponent = BLOCK_ICONS[block.type];
  const isHidden = !!block.hidden;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl transition-all group bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 shadow-xs overflow-hidden ${
        isActive || isExpanded
          ? "bg-white dark:bg-[#161616]"
          : "hover:bg-white/80 dark:hover:bg-white/5"
      } ${isDragging ? "z-50 shadow-xs" : ""} ${isHidden ? "opacity-55" : ""}`}
    >
      <div
        className="flex items-center gap-2 px-2 py-2.5 cursor-pointer"
        onClick={() => {
          onToggleExpand();
          onActive();
        }}
      >
        <DragHandle
          isExpanded={isExpanded}
          attributes={attributes}
          listeners={listeners}
        />

        {IconComponent && (
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0">
            <IconComponent
              size={15}
              className="text-gray-500 dark:text-gray-300"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 block truncate leading-tight">
            {meta?.label}
          </span>
          <span className="text-[11px] text-black/60 dark:text-white/50 font-medium block truncate">
            {block.content?.name ||
              block.content?.text?.slice(0, 30) ||
              `Block ${index + 1}`}
          </span>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className={iconBtn}
            title="Open in popup"
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockHidden(block.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isHidden
                ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                : "text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
            title={isHidden ? "Show in preview" : "Hide from preview"}
            aria-label={isHidden ? "Show in preview" : "Hide from preview"}
            aria-pressed={isHidden}
          >
            {isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className={iconBtn}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div
          className="border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#161616] px-3 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <InlineBlockEditor key={block.id} block={block} updateBlock={updateBlock} />
        </div>
      )}
    </div>
  );
}
