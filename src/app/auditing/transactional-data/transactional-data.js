"use client";

import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem as MuiMenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from "@/components/ui/button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


const columns = [
    { header: "Table", key: "table" },
    { header: "Table Title", key: "tableTitle" },
    { header: "Transaction", key: "transaction" },
    { header: "Date", key: "date" },
    { header: "Time", key: "time" },
    { header: "Operation", key: "operation" },
    { header: "User", key: "user" },
    { header: "Name", key: "name" },
    { header: "Folder", key: "folder" },
    { header: "Table Field", key: "tableField" },
    { header: "Field Description", key: "fieldDescription" },
  ];

  const primaryColor = 'green';

  // Styles (similar to User.js)
const inputStyles = {
    border: "2px solid lightgrey",
    borderRadius: "4px",
    width: '150px',
    height: "40px",
    transition: "border-color 0.3s",
    "&:hover": { borderColor: primaryColor },
    "&:focus": { borderColor: primaryColor },
  };

// Define custom styles
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

const TransactionData = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [user, setUser] = useState('');
    const [operation, setOperation] = useState('');
    const [module, setModule] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    

    const [filters, setFilters] = useState({
        user: "", operation: "", module: ""
      });
      const [visibleColumns, setVisibleColumns] = useState(
        columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
      );

    const [data, setData] = useState([]);

     // Mock data
     useEffect(() => {
        setData([
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'SORDER', tableTitle: 'POs', transaction: 'ZA001', date: '11/01/24', time: '07:05', operation: 'UPDATE', user: 'SREE', name: 'Sree G', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SREE', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
            { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
        ]);
    }, []);

      const handleFilterChange = (field, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
      };
    
      const filteredData = data.filter((row) =>
        (!filters.user || row.user.toLowerCase().includes(filters.user.toLowerCase())) &&
        (!filters.operation || row.operation.toLowerCase().includes(filters.operation.toLowerCase())) &&
        (!filters.module || row.function.toLowerCase().includes(filters.function.toLowerCase())) 
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
            const fileName = `Transactional_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
        
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
  doc.text("Transactional Data Report", pageWidth / 10, 20); // Centered position
  
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
  doc.save(`Transactional_Data_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
} catch (error) {
  console.error("Error exporting to Pdf:", error);
  alert("An error occurred while exporting to PDF. Please try again.");
}
};

    return (
        <>
            <div style={{ padding: '70px' }}>
                {/* <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}> */}
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
          label="User"
          value={filters.user}
          onChange={(e) => handleFilterChange("user", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />
                    <TextField
          label="Operation"
          value={filters.operation}
          onChange={(e) => handleFilterChange("operation", e.target.value)}
          variant="outlined"
          InputProps={{ style: inputStyles }}
        />
                    <TextField
                        label="Module"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                        select
                        variant="outlined"
                        InputProps={{ style: { ...styles.selectField } }}
                    >
                        <MenuItem value="Purchasing">Purchasing</MenuItem>
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
        </>
    );
};

export default TransactionData;





