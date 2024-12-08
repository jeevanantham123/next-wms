"use client";

import React, { useState } from "react";
import DragDropComponent from "./DragAndDrop"; // Assuming you have this component
import { useAvailableData, useUserDataStore } from "./store";
import { useEffect } from "react";

// Helper function to create drop items
const createDropItems = (items, assignedItems, idKey, nameKey, key) => {
  return items.map((item) => ({
    id: item[idKey],
    name: item[nameKey],
    assigned: assignedItems.some((assigned) => assigned["id"] === item[idKey]),
    key: key,
  }));
};

// Helper function to create assigned items
const createAssignedItems = (assignedItems, idKey, nameKey, key, parentKey) =>
  assignedItems.map((item) => ({
    id: item[idKey],
    name: item[nameKey],
    key: key,
    parent: item[parentKey],
  }));

const AccessControl = () => {
  const userData = useUserDataStore((state) => state.userData);
  const globalData = useAvailableData((state) => state.availableData);

  const { assignedData = {} } = userData?.userDetails || {};
  const {
    companies = [],
    sites = [],
    modules = [],
    transactions = [],
  } = assignedData;
  const availableData = globalData?.availableData || {};

  const [assignedCompanies, setAssignedCompanies] = useState(
    createAssignedItems(companies, "company_code", "company_name", "company")
  );
  const [assignedSites, setAssignedSites] = useState(
    createAssignedItems(sites, "site_code", "site_name", "site", "company_code")
  );
  const [assignedModules, setAssignedModules] = useState(
    createAssignedItems(modules, "module_code", "module_name", "module")
  );
  const [assignedTransactions, setAssignedTransactions] = useState(
    createAssignedItems(
      transactions,
      "transaction_code",
      "transaction_name",
      "transaction",
      "module_code"
    )
  );
  // Filter available sites based on assigned companies
  const [filteredSites, setFilterSites] = useState(
    availableData.sites?.filter((site) =>
      assignedCompanies.some((company) => company["id"] === site.company_code)
    ) || []
  );

  // Filter available transactions based on assigned modules
  const [filteredTransactions, setFilteredTransactions] = useState(
    availableData.transactions?.filter((transaction) =>
      assignedModules.some((module) => module["id"] === transaction.module_code)
    ) || []
  );

  useEffect(() => {
    // Update assignedSites based on assignedCompanies
    const updatedAssignedSites = assignedSites?.filter((site) =>
      assignedCompanies?.some((company) => company.id === site.parent)
    );
    const updatedDropItems =
      availableData.sites?.filter((site) =>
        assignedCompanies.some((company) => company["id"] === site.company_code)
      ) || [];

    setAssignedSites(updatedAssignedSites);
    setFilterSites(updatedDropItems);
  }, [assignedCompanies, availableData.sites]);

  useEffect(() => {
    console.log("Modu", assignedModules);
    const updatedAssignedTransactions = assignedTransactions?.filter(
      (transaction) =>
        assignedModules?.some((module) => module.id === transaction.parent)
    );
    const updatedDropItems =
      availableData.transactions?.filter((transaction) =>
        assignedModules.some(
          (module) => module["id"] === transaction.module_code
        )
      ) || [];

    setAssignedTransactions(updatedAssignedTransactions);
    setFilteredTransactions(updatedDropItems);
  }, [assignedModules, availableData.transactions]);

  return (
    <div className="flex mt-[16px] flex-wrap gap-4 flex-col">
      <div className="flex flex-wrap items-center justify-start gap-8">
        <DragDropComponent
          title="Companies"
          dropItems={createDropItems(
            availableData.companies,
            assignedCompanies,
            "company_code",
            "company_name",
            "company"
          )}
          assignedItems={assignedCompanies}
          setAssignedItems={setAssignedCompanies}
          allowedKey="company"
        />

        <DragDropComponent
          title="Sites"
          dropItems={createDropItems(
            filteredSites,
            assignedSites,
            "site_code",
            "site_name",
            "site"
          )}
          assignedItems={assignedSites}
          setAssignedItems={setAssignedSites}
          allowedKey="sites"
        />
      </div>

      <div className="flex flex-wrap items-center justify-start gap-8">
        <DragDropComponent
          title="Modules"
          dropItems={createDropItems(
            availableData.modules,
            assignedModules,
            "module_code",
            "module_name",
            "module"
          )}
          assignedItems={assignedModules}
          setAssignedItems={setAssignedModules}
          allowedKey="module"
        />

        <DragDropComponent
          title="Transactions"
          dropItems={createDropItems(
            filteredTransactions,
            assignedTransactions,
            "transaction_code",
            "transaction_name",
            "transaction"
          )}
          assignedItems={assignedTransactions}
          setAssignedItems={setAssignedTransactions}
          allowedKey="transaction"
        />
      </div>
    </div>
  );
};

export default AccessControl;
