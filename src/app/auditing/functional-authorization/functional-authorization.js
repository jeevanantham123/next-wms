// FunctionalProfileAuthorization.js
"use client";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { blue, blueGrey } from "@mui/material/colors";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";




// Define columns for Functional Profile Authorization
const columns = [
  { header: "Profile Code", key: "profileCode" },
  { header: "Desc", key: "desc" },
  { header: "Function", key: "function" },
  { header: "Description", key: "description" },
  { header: "Module", key: "module" },
  { header: "Group by Site", key: "groupBySite" },
  { header: "Access", key: "access" },
  { header: "Permissions", key: "permissions" },
];

// Styles (similar to User.js)
const inputStyles = {
  border: "2px solid lightgrey",
  borderRadius: "4px",
  width: '150px',
  height: "40px",
  transition: "border-color 0.3s",
  "&:hover": { borderColor: blue },
  "&:focus": { borderColor: blueGrey },
};

function FunctionalProfileAuthorization() {
  const [filters, setFilters] = useState({
    profileCode: "", desc: "", function: "", description: "", module: "", groupBySite: "", access: "", permissions: ""
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );

  const [data, setData] = useState([]);

  // Mock data
  useEffect(() => {
    setData([
      { profileCode: "PC001", desc: "Admin", function: "User Management", description: "Manage users", module: "Admin", groupBySite: "Yes", access: "Full", permissions: "Read/Write" },
      { profileCode: "PC002", desc: "Sales", function: "Order Processing", description: "Process orders", module: "Sales", groupBySite: "No", access: "Limited", permissions: "Read-Only" },
      { profileCode: "PC003", desc: "Inventory", function: "Stock Management", description: "Manage stock", module: "Inventory", groupBySite: "Yes", access: "Full", permissions: "Read/Write" },
      { profileCode: "PC004", desc: "Finance", function: "Invoicing", description: "Generate invoices", module: "Finance", groupBySite: "No", access: "Full", permissions: "Read-Only" },
      { profileCode: "PC005", desc: "Operations", function: "Scheduling", description: "Schedule tasks", module: "Operations", groupBySite: "Yes", access: "Limited", permissions: "Read/Write" },
      { profileCode: "PC006", desc: "Admin", function: "User Management", description: "Manage users", module: "Admin", groupBySite: "Yes", access: "Full", permissions: "Read/Write" },
      { profileCode: "PC007", desc: "Sales", function: "Order Processing", description: "Process orders", module: "Sales", groupBySite: "No", access: "Limited", permissions: "Read-Only" },
      { profileCode: "PC008", desc: "Inventory", function: "Stock Management", description: "Manage stock", module: "Inventory", groupBySite: "Yes", access: "Full", permissions: "Read/Write" },
      { profileCode: "PC009", desc: "Finance", function: "Invoicing", description: "Generate invoices", module: "Finance", groupBySite: "No", access: "Full", permissions: "Read-Only" },
      { profileCode: "PC010", desc: "Operations", function: "Scheduling", description: "Schedule tasks", module: "Operations", groupBySite: "Yes", access: "Limited", permissions: "Read/Write" },
    ]);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const filteredData = data.filter((row) =>
    (!filters.profileCode || row.profileCode.toLowerCase().includes(filters.profileCode.toLowerCase())) &&
    (!filters.desc || row.desc.toLowerCase().includes(filters.desc.toLowerCase())) &&
    (!filters.function || row.function.toLowerCase().includes(filters.function.toLowerCase())) &&
    (!filters.description || row.description.toLowerCase().includes(filters.description.toLowerCase())) &&
    (!filters.module || row.module.toLowerCase().includes(filters.module.toLowerCase())) &&
    (!filters.groupBySite || row.groupBySite.toLowerCase().includes(filters.groupBySite.toLowerCase())) &&
    (!filters.access || row.access.toLowerCase().includes(filters.access.toLowerCase())) &&
    (!filters.permissions || row.permissions.toLowerCase().includes(filters.permissions.toLowerCase()))
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
    const fileName = `Functional_Authorization_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;

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
  doc.text("Functional Authorization Report", pageWidth / 10, 20); // Centered position
  
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
  doc.save(`Functional_Authorization_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
} catch (error) {
  console.error("Error exporting to Pdf:", error);
  alert("An error occurred while exporting to PDF. Please try again.");
}
};


  return (
    <div style={{ padding: '70px' }}>
    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}> */}
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
   <div className="flex gap-2 mb-12 items-center py-4">

    {/* <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '20px' }}> */}
        <TextField
          label="Profile Code"
          value={filters.profileCode}
          onChange={(e) => handleFilterChange("profileCode", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Desc"
          value={filters.desc}
          onChange={(e) => handleFilterChange("desc", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Function"
          value={filters.function}
          onChange={(e) => handleFilterChange("function", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />
        <TextField
          label="Module"
          value={filters.module}
          onChange={(e) => handleFilterChange("module", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />

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


      <div style={{  float:'right', marginBottom:'10px'}}>
                    {/* <h3>Row Count: {data.length}</h3> */}
                    <h3>Row Count: {filteredData.length}</h3>
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
                    <TableCell key={header}>{row[key]}</TableCell>
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

export default FunctionalProfileAuthorization;


