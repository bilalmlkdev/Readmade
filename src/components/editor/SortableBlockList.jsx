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
import { useState } from "react";
import useReadme from "../../store/useReadme.js";
import BlockItem from "./BlockItem.jsx";
import { BLOCK_META } from "../../lib/blocks.js";
import EmptyBlocks from "../ui/EmptyBlocks.jsx";
import DragGhost from "../ui/DragGhost.jsx";
import CenterBarHeader from "../app/CenterBarHeader.jsx";

export default function SortableBlockList() {
  const { blocks, reorderBlocks } = useReadme();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8, delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }
  function handleDragCancel() {
    setActiveId(null);
  }
  function handleDragEnd({ active, over }) {
    setActiveId(null);
    if (over && active.id !== over.id) {
      const oldIdx = blocks.findIndex((b) => b.id === active.id);
      const newIdx = blocks.findIndex((b) => b.id === over.id);
      reorderBlocks(arrayMove(blocks, oldIdx, newIdx));
    }
  }

  const activeBlock = blocks.find((b) => b.id === activeId);
  const activeMeta = activeBlock ? BLOCK_META[activeBlock.type] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="h-full flex flex-col bg-white">
          <CenterBarHeader blockCount={blocks.length} />

          <div className="flex-1 overflow-y-auto px-3 pb-4" style={{ scrollbarWidth: "thin" }}>
            {blocks.length === 0 ? (
              <EmptyBlocks />
            ) : (
              <div className="space-y-1.5">
                {blocks.map((block, index) => (
                  <BlockItem
                    key={block.id}
                    block={block}
                    index={index}
                    totalBlocks={blocks.length}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeId && activeBlock && activeMeta && (
          <DragGhost block={activeBlock} meta={activeMeta} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
