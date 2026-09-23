import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
import EditBlockFields from "../blocks/EditBlockFields.jsx";
import { Search, Trash2, GripVertical, Maximize2, ChevronDown, X, Eye, EyeOff } from "lucide-react";
import { CgTemplate } from "react-icons/cg";

export default function BlockArranger({ onOpenTemplates }) {
  const {
    blocks,
    reorderBlocks,
    updateBlock,
    activeBlockId,
    setActiveBlock,
    settings,
    updateSettings,
    expandedId,
    toggleExpanded,
  } = useReadme();
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const searchInputRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8, delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const filteredBlocks = search
    ? blocks.filter((b) =>
        BLOCK_META[b.type]?.label.toLowerCase().includes(search.toLowerCase())
      )
    : blocks;

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null);
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex((b) => b.id === active.id);
      const newIdx = blocks.findIndex((b) => b.id === over.id);
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx));
    }
  }

  function handleEditBlock(block) {
    setEditingBlock(block);
  }

  function handleCloseEdit() {
    setEditingBlock(null);
  }

  function handleSaveEdit(blockId, newContent) {
    updateBlock(blockId, newContent);
    setEditingBlock(null);
  }

  const activeBlock = blocks.find((b) => b.id === activeId);
  const activeMeta = activeBlock ? BLOCK_META[activeBlock.type] : null;
  const activeIcon = activeBlock ? BLOCK_ICONS[activeBlock.type] : null;

  return (
    <div
      className="w-full app:w-[380px] flex flex-col bg-[#FAFAFB] dark:bg-[#111] border border-gray-200 dark:border-white/10 h-full rounded-lg overflow-hidden"
      data-tour="blocks"
    >
      {/* README Settings */}
      <div className="shrink-0 border-b border-gray-200 dark:border-white/10">
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="w-full flex items-center justify-between px-3 py-3"
        >
          <span className="text-[14px] font-medium text-black dark:text-white">
            README Settings
          </span>
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform ${settingsOpen ? "rotate-180" : ""}`}
          />
        </button>
        {settingsOpen && (
          <div className="pb-3 space-y-2.5 animate-slide-down">
            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
              <label className="text-[12px] text-gray-500 dark:text-gray-400 text-right">
                README Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
                placeholder="README"
                className="w-full px-3 py-1.5 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div className="grid grid-cols-[85px_1fr] gap-2 items-center">
              <label className="text-[12px] text-gray-500 dark:text-gray-400 text-right">
                Description
              </label>
              <input
                type="text"
                value={settings.description}
                onChange={(e) =>
                  updateSettings({ description: e.target.value })
                }
                placeholder="Short summary"
                className="w-full px-3 py-1.5 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <label className="text-[12px] text-gray-500 dark:text-gray-400 text-right">
                Author
              </label>
              <input
                type="text"
                value={settings.author}
                onChange={(e) => updateSettings({ author: e.target.value })}
                placeholder="Your name"
                className="w-full px-3 py-1.5 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gray-200 dark:border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-2">
            <h2 className="text-[14px] font-semibold text-black dark:text-white">Blocks</h2>
            <p className="text-xs text-black dark:text-white/70 mt-0.5">
              ({blocks.length} {blocks.length === 1 ? "block" : "blocks"})
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`flex items-center gap-1 px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors bg-white dark:bg-[#1a1a1a] ${
                showSearch
                  ? "text-black dark:text-white bg-gray-100 dark:bg-white/10"
                  : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              <Search size={14} />
            </button>
            {/* Templates */}
            <button
              onClick={onOpenTemplates}
              className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-black dark:text-white bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              title="Templates"
            >
              <CgTemplate size={15} />
              Templates
            </button>
          </div>
        </div>

        {/* Search input - collapsible */}
        {showSearch && (
          <div className="relative animate-slide-down mt-2">
            <div className="flex items-center gap-2">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search blocks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 pl-2 pr-3 py-2 text-[13px] bg-gray-100 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/10 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white dark:focus:bg-[#1a1a1a] transition-colors"
              />
              <button
                onClick={() => {
                  setSearch("");
                  setShowSearch(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Block list */}
      <div
        className="flex-1 overflow-y-auto relative py-3"
        style={{ scrollbarWidth: "thin" }}
      >
        {filteredBlocks.length === 0 ? (
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-12 w-full">
            <p className="text-base text-black dark:text-white font-medium">
              {search ? "No blocks match" : "No blocks yet"}
            </p>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-1 max-w-[75%] mx-auto">
              {search
                ? "Try a different search"
                : "Click a block type on the left, or use Templates to start from a ready-made form."}
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredBlocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1.5 px-3">
                {filteredBlocks.map((block, index) => (
                  <SortableBlockItem
                    key={block.id}
                    block={block}
                    index={index}
                    isActive={activeBlockId === block.id}
                    onActive={() =>
                      setActiveBlock(
                        activeBlockId === block.id ? null : block.id,
                      )
                    }
                    isExpanded={expandedId === block.id}
                    onToggleExpand={() => toggleExpanded(block.id)}
                    onEdit={() => handleEditBlock(block)}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activeId && activeBlock && activeMeta && (
                <div className="flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 shadow-lg rounded-lg opacity-90">
                  {activeIcon && (
                    <div className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 shrink-0">
                      <activeIcon size={12} className="text-gray-600" />
                    </div>
                  )}
                  <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300 truncate">
                    {activeMeta.label}
                  </span>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {/* Edit Block Modal */}
      {editingBlock && (
        <EditBlockModal
          block={editingBlock}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

function SortableBlockItem({ block, index, isActive, onActive, isExpanded, onToggleExpand, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, disabled: isExpanded });

  const { removeBlock, updateBlock, toggleBlockHidden } = useReadme();
  const meta = BLOCK_META[block.type];
  const IconComponent = BLOCK_ICONS[block.type];
  const isHidden = !!block.hidden;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  function handleDelete(e) {
    e.stopPropagation();
    removeBlock(block.id);
  }

  function handleToggleHidden(e) {
    e.stopPropagation();
    toggleBlockHidden(block.id);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl transition-all group bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 shadow-xs overflow-hidden ${
        isActive || isExpanded ? "bg-white dark:bg-[#161616]" : "hover:bg-white/80 dark:hover:bg-white/5"
      } ${isDragging ? "z-50 shadow-xs" : ""} ${isHidden ? "opacity-55" : ""}`}
    >
      <div
        className="flex items-center gap-2 px-2 py-2.5 cursor-pointer"
        onClick={() => {
          onToggleExpand();
          onActive();
        }}
      >
        {/* Drag handle — disabled while expanded so form inputs stay usable */}
        {isExpanded ? (
          <div className="shrink-0 text-gray-200" aria-hidden="true">
            <GripVertical size={14} />
          </div>
        ) : (
          <div
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-white/20 dark:hover:text-white/40 transition-colors shrink-0"
            title="Drag to reorder"
          >
            <GripVertical size={14} />
          </div>
        )}

        {/* Icon */}
        {IconComponent && (
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0">
            <IconComponent size={15} className="text-gray-500 dark:text-gray-300" />
          </div>
        )}

        {/* Label + subtitle */}
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

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title="Open in popup"
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={handleToggleHidden}
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
            onClick={handleDelete}
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
            className="p-1.5 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded editor */}
      {isExpanded && (
        <div
          className="border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#161616] px-3 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <InlineBlockEditor
            key={block.id}
            block={block}
            updateBlock={updateBlock}
          />
        </div>
      )}
    </div>
  );
}

function InlineBlockEditor({ block, updateBlock }) {
  const [content, setContent] = useState(() => JSON.parse(JSON.stringify(block.content)));

  function setAndSave(action) {
    setContent((prev) => {
      const next = typeof action === "function" ? action(prev) : action;
      updateBlock(block.id, next);
      return next;
    });
  }

  return <EditBlockFields block={block} content={content} setContent={setAndSave} />;
}

function EditBlockModal({ block, onClose, onSave }) {
  const [content, setContent] = useState(() => JSON.parse(JSON.stringify(block.content)));

  const meta = BLOCK_META[block.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg bg-white dark:bg-[#161616] rounded-xl shadow-xl overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            {BLOCK_ICONS[block.type] && (() => {
              const Icon = BLOCK_ICONS[block.type];
              return (
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0">
                  <Icon size={16} className="text-gray-600 dark:text-gray-300" />
                </div>
              );
            })()}
            <div>
              <h3 className="text-[16px] font-semibold text-black dark:text-white">{meta?.label}</h3>
              <p className="text-[12px] text-gray-400">Edit block content</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <EditBlockFields block={block} content={content} setContent={setContent} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#121212]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(block.id, content)}
            className="px-4 py-2 text-[13px] font-medium text-white bg-black hover:bg-black/90 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
