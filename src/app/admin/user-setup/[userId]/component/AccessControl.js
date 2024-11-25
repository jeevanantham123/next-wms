"use client";

import DragDropComponent from "./DragAndDrop";

export default function AccessControl() {
  const DaDcompanies = [
    { id: 1, name: "Company 1", assigned: false },
    { id: 2, name: "Company 2", assigned: false },
    { id: 3, name: "Company 3", assigned: false },
    { id: 4, name: "Company 4", assigned: false },
  ];

  const DaRoles = [
    { id: 1, name: "Role 1", assigned: false },
    { id: 2, name: "Role 2", assigned: false },
    { id: 3, name: "Role 3", assigned: false },
    { id: 4, name: "Role 4", assigned: false },
  ];

  const DaPermissions = [
    { id: 1, name: "Permission 1", assigned: false },
    { id: 2, name: "Permission 2", assigned: false },
    { id: 3, name: "Permission 3", assigned: false },
    { id: 4, name: "Permission 4", assigned: false },
  ];

  const DaSites = [
    { id: 1, name: "Site 1", assigned: false },
    { id: 2, name: "Site 2", assigned: false },
    { id: 3, name: "Site 3", assigned: false },
    { id: 4, name: "Site 4", assigned: false },
  ];

  const DaModules = [
    { id: 1, name: "Module 1", assigned: false },
    { id: 2, name: "Module 2", assigned: false },
    { id: 3, name: "Module 3", assigned: false },
    { id: 4, name: "Module 4", assigned: false },
  ];

  const DaTransactions = [
    { id: 1, name: "Transaction 1", assigned: false },
    { id: 2, name: "Transaction 2", assigned: false },
    { id: 3, name: "Transaction 3", assigned: false },
    { id: 4, name: "Transaction 4", assigned: false },
  ];

  const DaFolders = [
    { id: 1, name: "Folder 1", assigned: false },
    { id: 2, name: "Folder 2", assigned: false },
    { id: 3, name: "Folder 3", assigned: false },
    { id: 4, name: "Folder 4", assigned: false },
  ];
  return (
    <div className="flex mt-[16px] flex-wrap gap-4 flex-col">
      <div className="flex flex-wrap items-center justify-start gap-8">
        <DragDropComponent title={"Companies"} dropItems={DaDcompanies} />
        <DragDropComponent title={"Sites"} dropItems={DaSites} />
      </div>

      <div className="flex flex-wrap items-center justify-start gap-8">
        <DragDropComponent title={"Modules"} dropItems={DaModules} />
        <DragDropComponent title={"Transactions"} dropItems={DaTransactions} />
      </div>
      <div>
        <DragDropComponent title={"Folders"} dropItems={DaFolders} />
      </div>
    </div>
  );
}
