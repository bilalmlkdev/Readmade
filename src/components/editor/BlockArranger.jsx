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
import { BLOCK_META, BLOCK_ICONS, BLOCK_TYPES } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
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
      className="w-full app:w-[380px] flex flex-col bg-[#FAFAFB] border border-gray-200 h-full rounded-lg overflow-hidden"
      data-tour="blocks"
    >
      {/* README Settings */}
      <div className="shrink-0 border-b border-gray-200">
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="w-full flex items-center justify-between px-3 py-3"
        >
          <span className="text-[14px] font-medium text-black">
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
              <label className="text-[12px] text-gray-500 text-right">
                README Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
                placeholder="README"
                className="w-full px-3 py-1.5 text-[13px] bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid grid-cols-[85px_1fr] gap-2 items-center">
              <label className="text-[12px] text-gray-500 text-right">
                Description
              </label>
              <input
                type="text"
                value={settings.description}
                onChange={(e) =>
                  updateSettings({ description: e.target.value })
                }
                placeholder="Short summary"
                className="w-full px-3 py-1.5 text-[13px] bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <label className="text-[12px] text-gray-500 text-right">
                Author
              </label>
              <input
                type="text"
                value={settings.author}
                onChange={(e) => updateSettings({ author: e.target.value })}
                placeholder="Your name"
                className="w-full px-3 py-1.5 text-[13px] bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className=" px-3 py-2.5 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-2">
            <h2 className="text-[14px] font-semibold text-black">Blocks</h2>
            <p className="text-xs text-black mt-0.5">
              ({blocks.length} {blocks.length === 1 ? "block" : "blocks"})
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`flex items-center gap-1 px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors bg-white ${
                showSearch
                  ? "text-black bg-gray-100"
                  : "text-gray-500 hover:text-black hover:bg-gray-100"
              }`}
            >
              <Search size={14} />
            </button>
            {/* Templates */}
            <button
              onClick={onOpenTemplates}
              className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-100 rounded-lg transition-colors"
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
                className="flex-1 pl-2 pr-3 py-2 text-[13px] bg-gray-100 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
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
            <p className="text-base text-black font-medium">
              {search ? "No blocks match" : "No blocks yet"}
            </p>
            <p className="text-sm text-gray-600 mt-1 max-w-[80%] mx-auto">
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
              <div className="space-y-0.5 px-3">
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
                <div className="flex items-center gap-2.5 px-3 py-2 bg-white border border-gray-200 shadow-lg rounded-lg opacity-90">
                  {activeIcon && (
                    <div className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 shrink-0">
                      <activeIcon size={12} className="text-gray-600" />
                    </div>
                  )}
                  <span className="text-[12px] font-medium text-gray-700 truncate">
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
  } = useSortable({ id: block.id });

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
      className={`rounded-xl transition-all group bg-white border border-gray-200 shadow-xs overflow-hidden ${
        isActive || isExpanded
          ? "bg-white"
          : "hover:bg-white/80"
      } ${isDragging ? "z-50 shadow-xs" : ""} ${isHidden ? "opacity-55" : ""}`}
    >
      <div
        className="flex items-center gap-2 px-2 py-2.5 cursor-pointer"
        onClick={() => {
          onToggleExpand();
          onActive();
        }}
      >
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0"
        >
          <GripVertical size={14} />
        </div>

        {/* Icon */}
        {IconComponent && (
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 shrink-0">
            <IconComponent size={15} className="text-gray-500" />
          </div>
        )}

        {/* Label + subtitle */}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-800 block truncate leading-tight">
            {meta?.label}
          </span>
          <span className="text-[11px] text-black/60 font-medium block truncate">
            {block.content?.name || block.content?.text?.slice(0, 30) || `Block ${index + 1}`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={handleToggleHidden}
            className={`p-1.5 rounded-lg transition-colors ${
              isHidden
                ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                : "text-gray-400 hover:text-black hover:bg-gray-100"
            }`}
            title={isHidden ? "Show in preview" : "Hide from preview"}
            aria-label={isHidden ? "Show in preview" : "Hide from preview"}
            aria-pressed={isHidden}
          >
            {isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            title="Open in popup"
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
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
          className="border-t border-gray-100 bg-white px-3 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <InlineBlockEditor key={block.id} block={block} updateBlock={updateBlock} />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {BLOCK_ICONS[block.type] && (() => {
              const Icon = BLOCK_ICONS[block.type];
              return (
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 shrink-0">
                  <Icon size={16} className="text-gray-600" />
                </div>
              );
            })()}
            <div>
              <h3 className="text-[16px] font-semibold text-black">{meta?.label}</h3>
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
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
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

function EditBlockFields({ block, content, setContent }) {
  function handleChange(key, value) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleArrayChange(arrKey, index, field, value) {
    setContent((prev) => {
      const newArr = [...prev[arrKey]];
      newArr[index] = { ...newArr[index], [field]: value };
      return { ...prev, [arrKey]: newArr };
    });
  }

  function handleArrayRemove(arrKey, index) {
    setContent((prev) => {
      const newArr = prev[arrKey].filter((_, i) => i !== index);
      return { ...prev, [arrKey]: newArr };
    });
  }

  function handleArrayAdd(arrKey, defaultItem) {
    setContent((prev) => ({ ...prev, [arrKey]: [...prev[arrKey], defaultItem] }));
  }

  return (() => {
  switch (block.type) {
      case BLOCK_TYPES.TITLE:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={content.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={content.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        );

      case BLOCK_TYPES.DESCRIPTION:
        return (
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={content.text}
              onChange={(e) => handleChange("text", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-sans"
            />
          </div>
        );

      case BLOCK_TYPES.FEATURES:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[12px] font-medium text-gray-700">Features</label>
              <button
                onClick={() => handleArrayAdd("items", "New feature")}
                className="text-[12px] font-medium text-black hover:text-black/80"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {content.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("items", i, "0", e.target.value)}
                    className="flex-1 px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                  />
                  <button
                    onClick={() => handleArrayRemove("items", i)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Remove"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case BLOCK_TYPES.INSTALLATION:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Package Manager</label>
              <select
                value={content.manager}
                onChange={(e) => handleChange("manager", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              >
                <option value="npm">npm</option>
                <option value="yarn">yarn</option>
                <option value="pnpm">pnpm</option>
                <option value="bun">bun</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Package Name</label>
              <input
                type="text"
                value={content.package}
                onChange={(e) => handleChange("package", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Extra Commands (optional)</label>
              <textarea
                value={content.extra}
                onChange={(e) => handleChange("extra", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-sans"
                placeholder="Additional install steps..."
              />
            </div>
          </div>
        );

      case BLOCK_TYPES.USAGE:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Language</label>
              <select
                value={content.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              >
                <option value="js">JavaScript</option>
                <option value="ts">TypeScript</option>
                <option value="py">Python</option>
                <option value="go">Go</option>
                <option value="rs">Rust</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="sh">Bash</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Code Example</label>
              <textarea
                value={content.code}
                onChange={(e) => handleChange("code", e.target.value)}
                rows={8}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-mono"
                spellCheck={false}
              />
            </div>
          </div>
        );

      case BLOCK_TYPES.SCREENSHOTS:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[12px] font-medium text-gray-700">Screenshots</label>
              <button
                onClick={() => handleArrayAdd("items", { url: "", alt: "", caption: "" })}
                className="text-[12px] font-medium text-black hover:text-black/80"
              >
                + Add Screenshot
              </button>
            </div>
            <div className="space-y-3">
              {content.items.map((item, i) => (
                <div key={i} className="space-y-2 p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleArrayChange("items", i, "url", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Alt Text</label>
                    <input
                      type="text"
                      value={item.alt}
                      onChange={(e) => handleArrayChange("items", i, "alt", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="Description for accessibility"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Caption (optional)</label>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => handleArrayChange("items", i, "caption", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="Shown below the image"
                    />
                  </div>
                  <button
                    onClick={() => handleArrayRemove("items", i)}
                    className="text-[12px] font-medium text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case BLOCK_TYPES.API:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[12px] font-medium text-gray-700">API Entries</label>
              <button
                onClick={() => handleArrayAdd("entries", { name: "", description: "", params: "" })}
                className="text-[12px] font-medium text-black hover:text-black/80"
              >
                + Add Entry
              </button>
            </div>
            <div className="space-y-3">
              {content.entries.map((entry, i) => (
                <div key={i} className="space-y-2 p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Function / Method Name</label>
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => handleArrayChange("entries", i, "name", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black font-mono"
                      placeholder="functionName(options)"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Description</label>
                    <textarea
                      value={entry.description}
                      onChange={(e) => handleArrayChange("entries", i, "description", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Parameters</label>
                    <input
                      type="text"
                      value={entry.params}
                      onChange={(e) => handleArrayChange("entries", i, "params", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black font-mono"
                      placeholder="options — object with configuration"
                    />
                  </div>
                  <button
                    onClick={() => handleArrayRemove("entries", i)}
                    className="text-[12px] font-medium text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case BLOCK_TYPES.BADGES:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[12px] font-medium text-gray-700">Badges</label>
              <button
                onClick={() => handleArrayAdd("badges", { label: "", url: "", link: "" })}
                className="text-[12px] font-medium text-black hover:text-black/80"
              >
                + Add Badge
              </button>
            </div>
            <div className="space-y-3">
              {content.badges.map((badge, i) => (
                <div key={i} className="space-y-2 p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Label</label>
                    <input
                      type="text"
                      value={badge.label}
                      onChange={(e) => handleArrayChange("badges", i, "label", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="Build"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Badge Image URL</label>
                    <input
                      type="text"
                      value={badge.url}
                      onChange={(e) => handleArrayChange("badges", i, "url", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="https://img.shields.io/badge/build-passing-brightgreen"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-0.5">Link (optional)</label>
                    <input
                      type="text"
                      value={badge.link}
                      onChange={(e) => handleArrayChange("badges", i, "link", e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <button
                    onClick={() => handleArrayRemove("badges", i)}
                    className="text-[12px] font-medium text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case BLOCK_TYPES.CONTRIBUTING:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Intro Text</label>
              <textarea
                value={content.text}
                onChange={(e) => handleChange("text", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-sans"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-[12px] font-medium text-gray-700">Steps</label>
              <button
                onClick={() => handleArrayAdd("steps", "New step")}
                className="text-[12px] font-medium text-black hover:text-black/80"
              >
                + Add Step
              </button>
            </div>
            <div className="space-y-2">
              {content.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleArrayChange("steps", i, "0", e.target.value)}
                    className="flex-1 px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
                  />
                  <button
                    onClick={() => handleArrayRemove("steps", i)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Remove"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case BLOCK_TYPES.LICENSE:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">License Type</label>
              <select
                value={content.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              >
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL 3.0</option>
                <option value="BSD-3-Clause">BSD 3-Clause</option>
                <option value="ISC">ISC</option>
                <option value="Unlicense">Unlicense</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                value={content.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={content.author}
                onChange={(e) => handleChange("author", e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        );

      case BLOCK_TYPES.CUSTOM:
        return (
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1">Markdown Content</label>
            <textarea
              value={content.markdown}
              onChange={(e) => handleChange("markdown", e.target.value)}
              rows={10}
              className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black resize-y font-mono"
              spellCheck={false}
            />
          </div>
        );

      default:
        return <p className="text-gray-500 text-[13px]">No editable fields for this block type.</p>;
    }
  })();
}
