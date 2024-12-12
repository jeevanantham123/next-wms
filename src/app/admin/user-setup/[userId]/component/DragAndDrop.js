import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const DragDropComponent = ({
  dropItems,
  title,
  assignedItems,
  setAssignedItems,
  allowedKey,
}) => {
  const [items, setItems] = useState(dropItems);

  // Sync items state with dropItems prop
  useEffect(() => {
    setItems(dropItems);
  }, [dropItems]);

  // Handlers
  const handleDragStart = useCallback((e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const item = JSON.parse(e.dataTransfer.getData("item"));

      if (item["key"] != allowedKey) return;

      if (assignedItems.some((assigned) => assigned.id === item.id)) return;

      setAssignedItems((prev) => [...prev, item]);
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, assigned: true } : i))
      );
    },
    [assignedItems, setAssignedItems]
  );

  const handleClick = (item) => {
    if (assignedItems.some((assigned) => assigned.id === item.id)) return;

    setAssignedItems((prev) => [...prev, item]);
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, assigned: true } : i))
    );
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemove = (item) => {
    setAssignedItems((prev) => prev.filter((i) => i.id !== item.id));
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, assigned: false } : i))
    );
  };

  return (
    <div className="flex space-x-8">
      {/* Available Items */}
      <div className="w-[240px] p-4 border shadow-md rounded-lg bg-white">
        <h3 className="text-[14px] font-semibold mb-4">{title} available</h3>
        <ScrollArea className="h-[150px]">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                draggable={!item.assigned}
                onClick={() => handleClick(item)}
                onDragStart={(e) => handleDragStart(e, item)}
                className={`p-2 mb-[8px] flex justify-between items-center text-[12px] rounded-lg cursor-pointer transition ${
                  item.assigned
                    ? "bg-purple-200 text-theme"
                    : "bg-theme/80 text-white"
                }`}
              >
                {item.name} <PlusIcon />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-[12px]">
              No available items to assign
            </p>
          )}
        </ScrollArea>
      </div>

      {/* Assigned Items */}
      <div
        className="w-[240px] bg-white shadow-md p-4 border-dashed border-2 border-purple-500 rounded-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        aria-dropeffect="move"
      >
        <h3 className="text-[14px] font-semibold mb-4">{title} assigned</h3>
        <ScrollArea className="h-[150px]">
          {assignedItems.length > 0 ? (
            assignedItems.map((item) => (
              <div
                key={item.id}
                className="flex mb-[8px] text-[12px] justify-between items-center max-h-[40px] p-2 rounded-lg bg-purple-100 text-purple-700"
              >
                <span>{item.name}</span>
                <button
                  onClick={() => handleRemove(item)}
                  className="ml-2 text-sm text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name}`}
                >
                  <Cross2Icon className="text-theme" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-[12px] border border-dashed p-2 rounded-md">
              Drag items here to assign
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default DragDropComponent;
