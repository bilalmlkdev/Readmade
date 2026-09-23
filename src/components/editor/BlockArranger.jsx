import { useState } from "react";
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
} from "@dnd-kit/sortable";
import { BLOCK_META, BLOCK_ICONS } from "../../lib/blocks.js";
import useReadme from "../../store/useReadme.js";
import useScrollVisible from "../../hooks/useScrollVisible.js";
import { filterBlocksBySearch } from "./filterBlocks.js";
import BlockSettings from "./BlockSettings.jsx";
import BlockListHeader from "./BlockListHeader.jsx";
import SortableBlockItem from "./SortableBlockItem.jsx";
import EditBlockModal from "./EditBlockModal.jsx";

function EmptyList({ search }) {
  return (
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
  );
}

function DragPreview({ block }) {
  const meta = BLOCK_META[block.type];
  const Icon = BLOCK_ICONS[block.type];
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 shadow-lg rounded-lg opacity-90">
      {Icon && (
        <div className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-white/10 shrink-0">
          <Icon size={12} className="text-gray-600 dark:text-gray-300" />
        </div>
      )}
      <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300 truncate">
        {meta?.label}
      </span>
    </div>
  );
}

export default function BlockArranger({ onOpenTemplates }) {
  const {
    blocks,
    reorderBlocks,
    updateBlock,
    activeBlockId,
    setActiveBlock,
    expandedId,
    toggleExpanded,
  } = useReadme();
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const { showing: scrollbarVisible, onScroll: onScrollbarScroll } =
    useScrollVisible();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8, delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const filteredBlocks = filterBlocksBySearch(blocks, search);
  const activeBlock = blocks.find((b) => b.id === activeId);

  function handleDragEnd({ active, over }) {
    setActiveId(null);
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex((b) => b.id === active.id);
      const newIdx = blocks.findIndex((b) => b.id === over.id);
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx));
    }
  }

  function handleSaveEdit(blockId, newContent) {
    updateBlock(blockId, newContent);
    setEditingBlock(null);
  }

  return (
    <div
      className="w-full app:w-[380px] flex flex-col bg-[#FAFAFB] dark:bg-[#111] border border-gray-200 dark:border-white/10 h-full rounded-lg overflow-hidden"
    >
      <BlockSettings />

      <BlockListHeader
        blockCount={blocks.length}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((v) => !v)}
        onOpenTemplates={onOpenTemplates}
        search={search}
        onSearchChange={setSearch}
        onCloseSearch={() => {
          setSearch("");
          setShowSearch(false);
        }}
      />

      <div
        onScroll={onScrollbarScroll}
        className={`flex-1 overflow-y-auto relative py-3 scroll-hide ${
          scrollbarVisible ? "scroll-hide-show" : ""
        }`}
      >
        {filteredBlocks.length === 0 ? (
          <EmptyList search={search} />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => setActiveId(active.id)}
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
                    onEdit={() => setEditingBlock(block)}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activeId && activeBlock && <DragPreview block={activeBlock} />}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {editingBlock && (
        <EditBlockModal
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
