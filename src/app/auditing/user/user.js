"use client";
import React, { useState, useEffect, useMemo  } from "react";
import axios from 'axios';
import { FilterList,TextField,MenuItem,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { blue, blueGrey } from "@mui/material/colors";
import { Blaka_Hollow } from "next/font/google";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import ExcelJS from 'exceljs';

// Column headers and corresponding keys in mockData
const columns = [
  { header: "User code", key: "userCode" },
  { header: "User name", key: "userName" },
  { header: "First name", key: "firstName" },
  { header: "Last name", key: "lastName" },
  { header: "Active", key: "active" },
  { header: "Email", key: "email" },
  { header: "Mobile", key: "mobile" },
  { header: "Login id", key: "loginId" },
  { header: "Functional profile", key: "functionalProfile" },
  { header: "Menu profile", key: "menuProfile" },
  { header: "Professional code", key: "professionalCode" },
  { header: "Date/time of last connection", key: "lastConnection" },
];

// Styles with dynamic width based on label length
const inputStyles = (label) => ({
  border: "2px solid lightgrey",
  borderRadius: "4px",
  width: '150px',
  height: "40px",
  transition: "border-color 0.3s",
  "&:hover": { borderColor: blue },
  "&:focus": { borderColor: blueGrey },
});

const styles = {
  inputField: {
      border: '2px solid lightgrey',
      borderRadius: '4px',
      width: '150px',
      height: '40px',
      transition: 'border-color 0.3s',
      '&:hover': {
          borderColor: blue,
      },
      '&:focus': {
          borderColor: blueGrey,
      }
  },
  selectField: {
      border: '2px solid lightgrey',
      borderRadius: '4px',
      width: '150px',
      height: '40px',
      transition: 'border-color 0.3s',
      '&:hover': {
          borderColor: blue,
      },
      '&:focus': {
          borderColor: blue,
      }
  },
};

function User() {
  const [user, setUser] = useState([]); //const [user, setUser] = useState('');

  const [filters, setFilters] = useState({user: "", functionalProfile: "", menuProfile: "",active:""});
  const [showFilterInputs, setShowFilterInputs] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Fetch data here, for now, let's assume data is already loaded
    setData([
      // Sample data
      { userCode: "U001", userName: "WillSmith", firstName: "Will", lastName: "Smith", active: "Yes", email: "willSmith@example.com", mobile: "1234567890", loginId: "WS123", functionalProfile: "Admin", menuProfile: "Full Access", professionalCode: "PRO123", lastConnection: "2024-11-03 14:30" },
      { userCode: "U002", userName: "JaneSmith", firstName: "Jane", lastName: "Smith", active: "No", email: "janesmith@example.com", mobile: "9876543210", loginId: "js456", functionalProfile: "User", menuProfile: "Limited Access", professionalCode: "PRO456", lastConnection: "2024-11-02 10:15" },
      { userCode: "U003", userName: "JhonDeo", firstName: "Jhon", lastName: "Deo", active: "Yes", email: "johndoe@example.com", mobile: "1234567890", loginId: "johnd123", functionalProfile: "SuperAdmin", menuProfile: "Full Access", professionalCode: "PRO123", lastConnection: "2024-11-03 14:30" },
      { userCode: "U004", userName: "KimJhon", firstName: "Kim", lastName: "Jhon", active: "No", email: "kimJhon@example.com", mobile: "9876543210", loginId: "kj456", functionalProfile: "User", menuProfile: "Limited Access", professionalCode: "PRO456", lastConnection: "2024-11-02 10:15" },
      { userCode: "U005", userName: "RobertShim", firstName: "Robert", lastName: "Shim", active: "Yes", email: "robertShim@example.com", mobile: "1234567890", loginId: "rs123", functionalProfile: "Admin", menuProfile: "Full Access", professionalCode: "PRO123", lastConnection: "2024-11-03 14:30" },

    ]);
  }, []);

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(data.map((row) => row.userCode)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle individual row selection
  const handleRowSelection = (userCode) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(userCode)
    ? prevSelectedRows.filter((code) => code !== userCode)
    : [...prevSelectedRows, userCode]
);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/soap-api/getUsers'); // Ensure this is the correct endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // Handle the response data
        setUser(result); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Only run once when the component mounts




  const toggleFilterInput = (header) => {
    setShowFilterInputs((prev) => ({
      ...prev,
      [header]: !prev[header],
    }));
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  //Filter data based on user inputs
  const filteredData = data.filter((row) =>
    (!filters.user || row.userName.toLowerCase().includes(filters.user.toLowerCase())) &&
    (!filters.functionalProfile || row.functionalProfile.toLowerCase().includes(filters.functionalProfile.toLowerCase())) &&
    (!filters.menuProfile || row.menuProfile.toLowerCase().includes(filters.menuProfile.toLowerCase()))&&
    (!filters.active || row.active.toLowerCase().includes(filters.active.toLowerCase()))
  );


  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };


// Function to convert data to Excel with custom formatting
const convertToExcel = () => {
  try {
    // Map filtered data to export data with only visible columns
    const exportData = filteredData.map(row =>
      columns.reduce((acc, column) => {
        if (visibleColumns[column.header]) {
          acc[column.header] = row[column.key];
        }
        return acc;
      }, {})
    );

    // Create worksheet and add data
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set dynamic column widths based on content length (minimum width of 15 characters)
    const columnWidths = columns
      .filter(column => visibleColumns[column.header])
      .map(column => ({
        wch: Math.max(15, ...filteredData.map(row => (row[column.key] || "").toString().length + 2))
      }));
    worksheet['!cols'] = columnWidths;

    // Define header style (bold, white font on dark blue background, centered)
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "00396B" } }, // Dark blue background
      alignment: { horizontal: "center", vertical: "center" }
    };

    // Apply style to headers
    const headers = columns.filter(column => visibleColumns[column.header]).map(col => col.header);
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      worksheet[cellAddress].s = headerStyle;
    });

    // Apply center alignment to all data cells
    exportData.forEach((_, rowIndex) => {
      headers.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = { alignment: { horizontal: "center", vertical: "center" } };
        }
      });
    });

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate a custom filename with current date and time
    const fileName = `User_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};

//new req
const convertToPDF = () => {
  try{
  const doc = new jsPDF('landscape'); // Landscape for more horizontal space
  
  // Set up header text
  const headerText = "SV Stack";
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Center-align the header text
  doc.setFontSize(18);
  doc.text(headerText, pageWidth / 2, 15, { align: 'center' });

  // Subtitle "Master Data" centered, slightly smaller font
  doc.setFontSize(12); // Slightly smaller font for subtitle
  doc.text("User Data Report", pageWidth / 10, 20); // Centered position
  
  // Prepare table data
  const tableColumnHeaders = columns
    .filter(column => visibleColumns[column.header])
    .map(column => column.header);

  const tableRows = filteredData.map(row =>
    columns
      .filter(column => visibleColumns[column.header])
      .map(column => row[column.key])
  );

  // Add table to PDF with single-page adjustments
  doc.autoTable({
    head: [tableColumnHeaders],
    body: tableRows,
    startY: 25,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 57, 107],
      valign: 'middle',
      halign: 'center'
    },
    styles: {
      fontSize: 7,        // Reduced font size for fitting more columns
      cellPadding: 1,     // Tighter cell padding
      valign: 'middle',
      halign: 'center',
      overflow: 'hidden'  // Ensures text does not overflow outside cells
    },
    tableWidth: 'auto',   // Compresses table to fit within the page width
    columnStyles: {
      0: { cellWidth: 'auto' },  // Dynamically adjust column widths
    },
    margin: { top: 10 },
  });
  doc.save(`User_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
} catch (error) {
  console.error("Error exporting to Pdf:", error);
  alert("An error occurred while exporting to PDF. Please try again.");
}
};

  return (

<div style={{ padding: '30px'}}>
       {/* <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}> */}
       <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
      <div className="flex gap-2 mb-12 items-center py-4">
                   <TextField
                      label="User"
                      value={filters.user}
                      onChange={(e) => handleFilterChange("user", e.target.value)}
                      variant="outlined"
                      InputProps={{ style: inputStyles("User") }}
                   />
                   <TextField
                      label="Functional Profile"
                      value={filters.functionalProfile}
                      onChange={(e) => handleFilterChange("functionalProfile", e.target.value)}
                      variant="outlined"
                      InputProps={{ style: inputStyles("Functional Profile") }}
                   />
                    <TextField
                       label="Menu Profile"
                       value={filters.menuProfile}
                      onChange={(e) => handleFilterChange("menuProfile", e.target.value)}
                      variant="outlined"
                      InputProps={{ style: inputStyles("Menu Profile") }}
                   />
                    {/* <TextField
                       label="Active"
                       value={filters.menuProfile}
                       onChange={(e) => handleFilterChange("active", e.target.value)}
                       variant="outlined"
                       InputProps={{ style: inputStyles("Active") }}
                   /> */}
                       
                    <TextField
                        label="Active"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        select
                        variant="outlined"
                        InputProps={{ style: { ...styles.selectField } }}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </TextField>

                <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map(({ header }) => (
              <DropdownMenuCheckboxItem
                key={header}
                checked={visibleColumns[header]}
                onCheckedChange={() => toggleColumnVisibility(header)}
              >
                {header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
          </DropdownMenu>


{/* Dropdown for Download Options */}
<DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Download As <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={convertToExcel}>Excel Format</DropdownMenuItem>
              <DropdownMenuItem onClick={convertToPDF}>PDF Format</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}> 
      <div className="rounded-md border">

              {/* <div style={{ display: 'flex', gap: '15px', marginBottom: '40px'  }}>

               <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}> */}

                <div style={{ textAlign:'right', float:'right', marginBottom:'10px'}}>
                    <h3>Row Count: {data.length}</h3>
                </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>

              {columns.map(({ header }) =>
                visibleColumns[header] ? (
                  <TableCell key={header} style={{ color: 'grey', whiteSpace: 'nowrap' }}>
                      {header}
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                  {columns.map(({ header, key }) =>
                    visibleColumns[header] ? (
                      <TableCell key={header}>
                        {row[key]}
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
    </div>
    </div>
  );
}

export default User;
