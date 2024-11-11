import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const DragDropComponent = ({ dropItems, title }) => {
  // Initialize state for the list of items and the assigned items
  const [items, setItems] = useState(dropItems);
  const [assignedItems, setAssignedItems] = useState([]);

  // Handle drag start by passing item data
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  // Handle drop on the right side, update assigned items and mark as assigned
  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));

    // Avoid re-adding the same item
    if (assignedItems.find((assigned) => assigned.id === item.id)) return;

    setAssignedItems([...assignedItems, item]);

    // Update items to mark the dragged item as assigned
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, assigned: true } : i))
    );
  };

  // Handle drag over event
  const handleDragOver = (e) => e.preventDefault();

  // Handle removal of item from the assigned list
  const handleRemove = (item) => {
    setAssignedItems(assignedItems.filter((i) => i.id !== item.id));
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, assigned: false } : i))
    );
  };

  return (
    <div className="flex space-x-8">
      {/* Left Side: List of Items */}
      <div className="w-[250px] p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">{title} available</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              draggable={!item.assigned}
              onDragStart={(e) => handleDragStart(e, item)}
              className={`p-2 rounded-lg cursor-pointer transition ${
                item.assigned
                  ? "bg-purple-200 text-theme"
                  : "bg-theme/80 text-white"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Drop Zone */}
      <div
        className="w-[250px] p-4 border-dashed border-2 border-purple-500 rounded-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className="text-lg font-semibold mb-4">{title} assigned</h3>
        <div className="flex items-center justify-center -mt-[30px] h-full">
          {assignedItems.length > 0 ? (
            <div className="flex gap-2 items-center flex-wrap">
              {assignedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center max-h-[40px] p-2 rounded-lg bg-purple-100 text-purple-700"
                >
                  <span>{item.name}</span>
                  <button
                    onClick={() => handleRemove(item)}
                    className="ml-2 text-sm text-red-500 hover:text-red-700"
                  >
                    <Cross2Icon className="text-theme" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 border border-dashed p-2 rounded-md">
              Drag items here to assign
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropComponent;
