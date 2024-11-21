"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { SearchIcon, X } from "lucide-react";

// Column headers and corresponding keys in mockData
const columns = [
  { header: "User Code", key: "userCode" },
  { header: "Name", key: "name" },
  { header: "Login Date", key: "loginDate" },
];

const mockUserData = [
      { userCode: "U001", name: "John Doe", loginDate: "2024-11-01" },
      { userCode: "U002", name: "Jane Smith", loginDate: "2024-11-02" },
      { userCode: "U003", name: "Alex Brown", loginDate: "2024-11-03" },
    ]


function LoginHistory() {
  const [filters, setFilters] = useState({
    userCode: "",
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );
  const data = mockUserData;
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter data based on user code and date range
  const filteredData = data.filter((row) => {
    const matchesUserCode = !filters.userCode || row.userCode.toLowerCase().includes(filters.userCode.toLowerCase());
    const matchesStartDate = !filters.startDate || dayjs(row.loginDate).isAfter(dayjs(filters.startDate).subtract(1, 'day'));
    const matchesEndDate = !filters.endDate || dayjs(row.loginDate).isBefore(dayjs(filters.endDate).add(1, 'day'));
    return matchesUserCode && matchesStartDate && matchesEndDate;
  });


  const allSelected = filteredData.length > 0 && selectedRows.length === filteredData.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.userCode));
    }
  };
  
  const handleRowSelection = (userCode) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(userCode)
        ? prevSelectedRows.filter((code) => code !== userCode)
        : [...prevSelectedRows, userCode]
    );
  };


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
    const fileName = `Login_History_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;

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
  doc.text("Login History Report", pageWidth / 10, 20); // Centered position
  
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
  doc.save(`Login_History_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
} catch (error) {
  console.error("Error exporting to Pdf:", error);
  alert("An error occurred while exporting to PDF. Please try again.");
}
};


  return (
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
      <div className="flex gap-2 mb-8 items-center py-4">
        <div className="relative">
          <Input
            placeholder="Search User"
            value={filters.userCode}
            onChange={(e) => handleFilterChange("userCode", e.target.value)}
            className="w-fit"
          />
          {filters.userCode === "" ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" onClick={(e) => handleFilterChange("userCode", "")} />
            </span>
          }
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="outline" className="ml-auto bg-white">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {columns.map(({ header }) => (
              <DropdownMenuCheckboxItem
                className="bg-white"
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
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="outline" className="bg-white">
              Download As <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem className="bg-white" onClick={convertToExcel}>Excel Format</DropdownMenuItem>
            <DropdownMenuItem className="bg-white" onClick={convertToPDF}>PDF Format</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
          <TableRow className="bg-white-100 hover:bg-white-200 transition-all">
          <TableHead className="pr-3 pl-3 py-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleSelectAll}
          />
        </TableHead>
              {columns.map(({ header, key }) =>
                visibleColumns[header] ? (
                  <TableHead className="font-semibold py-2 px-3" key={header}>{header}</TableHead>
                ) : null
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} className="hover:bg-violet-50 transition-all">
            <TableCell className="px-3 py-2">
            <Checkbox
              checked={selectedRows.includes(row.userCode)}
              onCheckedChange={() => handleRowSelection(row.userCode)}
            />
          </TableCell>
                {columns.map(({ header, key }) =>
                  visibleColumns[header] ? (
                    <TableCell key={header} className="px-3 py-2">
                      {row[key]}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LoginHistory;




