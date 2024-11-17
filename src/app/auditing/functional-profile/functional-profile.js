// FunctionalProfile.js
"use client";
import React, { useState, useEffect } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


const columns = [
  { header: "Functional Profile", key: "functionalProfile" },
  { header: "Description", key: "description" },
  { header: "All Access Codes", key: "accessCodes" },
];

const inputStyles = {
  border: "2px solid lightgrey",
  borderRadius: "4px",
  width: '200px',
  height: "40px",
  transition: "border-color 0.3s",
  "&:hover": { borderColor: "#1976d2" },
  "&:focus": { borderColor: "#546e7a" },
};

function FunctionalProfile() {
  const [filters, setFilters] = useState({
    functionalProfile: ""
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { functionalProfile: "FP001", description: "Admin Profile", accessCodes: "Full Access" },
      { functionalProfile: "FP002", description: "Sales Profile", accessCodes: "Read/Write" },
      { functionalProfile: "FP003", description: "Inventory Profile", accessCodes: "Read-Only" },
      { functionalProfile: "FP001", description: "Admin Profile", accessCodes: "Full Access" },
      { functionalProfile: "FP002", description: "Sales Profile", accessCodes: "Read/Write" },
      { functionalProfile: "FP003", description: "Inventory Profile", accessCodes: "Read-Only" },
      { functionalProfile: "FP001", description: "Admin Profile", accessCodes: "Full Access" },
      { functionalProfile: "FP002", description: "Sales Profile", accessCodes: "Read/Write" },
      { functionalProfile: "FP003", description: "Inventory Profile", accessCodes: "Read-Only" },

    ]);
  }, []);

  const handleFilterChange = (value) => {
    setFilters({ functionalProfile: value });
  };

  const filteredData = data.filter((row) =>
    (!filters.functionalProfile || row.functionalProfile.toLowerCase().includes(filters.functionalProfile.toLowerCase()))
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
    const fileName = `Functional_Profile_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;

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

  doc.setFontSize(12); // Slightly smaller font for subtitle
  doc.text("Functional Profile Report", pageWidth / 10, 20); // Centered position
  
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
  doc.save(`Functional_Profile_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
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

        <TextField
          label="Functional Profile Code"
          value={filters.functionalProfile}
          onChange={(e) => handleFilterChange(e.target.value)}
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
      <div style={{ textAlign:'rignt', float:'right', marginBottom:'10px'}}>
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
                    <TableCell key={key}>{row[key]}</TableCell>
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

export default FunctionalProfile;




