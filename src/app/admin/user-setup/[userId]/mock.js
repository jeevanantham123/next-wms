export const userDetails = {
  data: {
    userDetails: {
      userData: {
        username: "john_doe",
        email: "john.doe@example.com",
        firstname: "John",
        lastname: "Doe",
        phone_no: "9876543210",
        created_at: "2024-11-25T23:31:23.123",
        gender: "male",
        date_of_birth: "1995-05-15",
        active: true,
        hold: false,
        avatar: "https://picsum.photos/200/200",
      },
      assignedData: {
        companies: [
          { company_code: "C101", company_name: "Tech Innovators" },
          { company_code: "C102", company_name: "Global Solutions" },
        ],
        sites: [
          {
            site_name: "Main Warehouse",
            site_code: "C10101",
            company_code: "C101",
          },
          {
            site_name: "Secondary Warehouse",
            site_code: "C10201",
            company_code: "C102",
          },
        ],
        modules: [
          { module_code: "M101", module_name: "Warehouse Management" },
          { module_code: "M102", module_name: "Admin" },
        ],
        transactions: [
          {
            transaction_code: "T101",
            transaction_name: "Stock Entry",
            module_code: "M101",
          },
          {
            transaction_code: "T103",
            transaction_name: "User Roles",
            module_code: "M102",
          },
        ],
      },
    },
  },
};

export const globalValues = {
  data: {
    availableData: {
      companies: [
        { company_code: "C101", company_name: "Tech Innovators" },
        { company_code: "C102", company_name: "Global Solutions" },
        { company_code: "C103", company_name: "Pioneer Industries" },
        { company_code: "C104", company_name: "Alpha Enterprises" },
        { company_code: "C105", company_name: "Beta Tech" },
        { company_code: "C201", company_name: "Future Tech" },
        { company_code: "C202", company_name: "Neptune Corp" },
      ],
      sites: [
        {
          site_name: "Main Warehouse",
          site_code: "C10101",
          company_code: "C101",
        },
        {
          site_name: "Secondary Warehouse",
          site_code: "C10201",
          company_code: "C102",
        },
        {
          site_name: "Northern Hub",
          site_code: "C20101",
          company_code: "C201",
        },
        {
          site_name: "Eastern Depot",
          site_code: "C20201",
          company_code: "C202",
        },
        {
          site_name: "North Storage",
          site_code: "C10301",
          company_code: "C103",
        },
        {
          site_name: "West Facility",
          site_code: "C10401",
          company_code: "C104",
        },
      ],
      modules: [
        { module_code: "M101", module_name: "Warehouse Management" },
        { module_code: "M102", module_name: "Admin" },
        { module_code: "M103", module_name: "Auditing" },
        { module_code: "M104", module_name: "Inventory Management" },
        { module_code: "M105", module_name: "Reporting" },
      ],
      transactions: [
        {
          transaction_code: "T101",
          transaction_name: "Stock Entry",
          module_code: "M101",
        },
        {
          transaction_code: "T102",
          transaction_name: "Stock Dispatch",
          module_code: "M101",
        },
        {
          transaction_code: "T103",
          transaction_name: "User Roles",
          module_code: "M102",
        },
        {
          transaction_code: "T104",
          transaction_name: "Permissions Management",
          module_code: "M102",
        },
        {
          transaction_code: "T201",
          transaction_name: "Inventory Adjustments",
          module_code: "M104",
        },
        {
          transaction_code: "T202",
          transaction_name: "Generate Report",
          module_code: "M105",
        },
      ],
    },
  },
};
