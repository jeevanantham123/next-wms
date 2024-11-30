import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const DragDropComponent = ({ dropItems, title }) => {

  const [items, setItems] = useState(dropItems);
  console.log(items,'items')
  const [assignedItems, setAssignedItems] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    if (assignedItems.find((assigned) => assigned.id === item.id)) return;
    setAssignedItems([...assignedItems, item]);
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, assigned: true } : i))
    );
  };

  const handleClick = (item) => {
    if (assignedItems.find((assigned) => assigned.id === item.id)) return;
    setAssignedItems([...assignedItems, item]);
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
      <div className="w-[250px] p-4 border shadow-md rounded-lg bg-white">
        <h3 className="text-[14px] font-semibold mb-4">{title} available</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              draggable={!item.assigned}
              onClick={() => handleClick(item)}
              onDragStart={(e) => handleDragStart(e, item)}
              className={`p-2 flex justify-between items-center text-[12px] rounded-lg cursor-pointer transition ${
                item.assigned
                  ? "bg-purple-200 text-theme"
                  : "bg-theme/80 text-white"
              }`}
            >
              {item.name} <PlusIcon />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Drop Zone */}
      <div
        className="w-[250px] bg-white shadow-md p-4 border-dashed border-2 border-purple-500 rounded-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className="text-[14px] font-semibold mb-4">{title} assigned</h3>
        <div className="flex items-center justify-center -mt-[30px] h-full">
          {assignedItems.length > 0 ? (
            <div className="flex gap-2 items-center flex-wrap">
              {assignedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex text-[12px] items-center max-h-[40px] p-2 rounded-lg bg-purple-100 text-purple-700"
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
            <p className="text-gray-500 text-[12px] border border-dashed p-2 rounded-md">
              Drag items here to assign
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropComponent;
