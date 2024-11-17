"use client";
import React, { useState, useEffect } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { blue, blueGrey } from "@mui/material/colors";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


const primaryColor='green';
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
const styles = {
  inputField: {
      border: '2px solid lightgrey',
      borderRadius: '4px',
      width: '150px',
      height: '40px',
      transition: 'border-color 0.3s',
      '&:hover': {
          borderColor: primaryColor,
      },
      '&:focus': {
          borderColor: primaryColor,
      }
  },
  selectField: {
    border: '2px solid lightgrey',
    borderRadius: '4px',
    width: '150px',
    height: '40px',
    transition: 'border-color 0.3s',
    '&:hover': {
        borderColor: primaryColor,
    },
    '&:focus': {
        borderColor: primaryColor,
    }
},
};


const columns = [
  { header: "User Code", key: "userCode" },
  { header: "Name", key: "name" },
  { header: "Login Date", key: "loginDate" },
];

function LoginHistory() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState({
    userCode: "",
    startDate: null,
    endDate: null,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );
  const [data, setData] = useState([]);

  // Load sample data
  useEffect(() => {
    setData([
      { userCode: "U001", name: "John Doe", loginDate: "2024-11-01" },
      { userCode: "U002", name: "Jane Smith", loginDate: "2024-11-02" },
      { userCode: "U003", name: "Alex Brown", loginDate: "2024-11-03" },
    ]);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Filter data based on user code and date range
  const filteredData = data.filter((row) => {
    const matchesUserCode = !filters.userCode || row.userCode.toLowerCase().includes(filters.userCode.toLowerCase());
    const matchesStartDate = !filters.startDate || dayjs(row.loginDate).isAfter(dayjs(filters.startDate).subtract(1, 'day'));
    const matchesEndDate = !filters.endDate || dayjs(row.loginDate).isBefore(dayjs(filters.endDate).add(1, 'day'));
    return matchesUserCode && matchesStartDate && matchesEndDate;
  });


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
    <div style={{ padding: '70px' }}>
    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}> */}
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
   <div className="flex gap-2 mb-12 items-center py-4">
   <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            slotProps={{
                                textField: {
                                    InputProps: { style: { ...styles.inputField } },
                                    variant: "outlined",
                                    focused: true,
                                },
                            }}
                        />

                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            slotProps={{
                                textField: {
                                    InputProps: { style: { ...styles.inputField } },
                                    variant: "outlined",
                                    focused: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                       label="User Code"
                       value={filters.userCode}
                       onChange={(e) => handleFilterChange("userCode", e.target.value)}
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
      <div style={{ textAlign: 'right', float: 'right', marginBottom: '10px' }}>
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

export default LoginHistory;




