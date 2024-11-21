"use client";
import { useState } from "react";
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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { SearchIcon, X } from "lucide-react";

// Column headers and corresponding keys in mockData
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

const mockUserData = [
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "SORDER",
    tableTitle: "POs",
    transaction: "ZA001",
    date: "11/01/24",
    time: "07:05",
    operation: "UPDATE",
    user: "SREE",
    name: "Sree G",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SREE",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
];

function MasterData() {
  const [filters, setFilters] = useState({
    user: "",
    operation: "",
    module: "",
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );
  const data = mockUserData;
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  //Filter data based on user inputs
  const filteredData = data.filter(
    (row) =>
      (!filters.user ||
        row.user.toLowerCase().includes(filters.user.toLowerCase())) &&
      (!filters.operation ||
        row.operation
          .toLowerCase()
          .includes(filters.operation.toLowerCase())) &&
      (!filters.module ||
        row.function.toLowerCase().includes(filters.function.toLowerCase()))
  );
  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  98 / 10;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const allSelected =
    filteredData.length > 0 && selectedRows.length === filteredData.length;

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
      const exportData = filteredData.map((row) =>
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
        .filter((column) => visibleColumns[column.header])
        .map((column) => ({
          wch: Math.max(
            15,
            ...filteredData.map(
              (row) => (row[column.key] || "").toString().length + 2
            )
          ),
        }));
      worksheet["!cols"] = columnWidths;

      // Define header style (bold, white font on dark blue background, centered)
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "00396B" } }, // Dark blue background
        alignment: { horizontal: "center", vertical: "center" },
      };

      // Apply style to headers
      const headers = columns
        .filter((column) => visibleColumns[column.header])
        .map((col) => col.header);
      headers.forEach((header, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
        worksheet[cellAddress].s = headerStyle;
      });

      // Apply center alignment to all data cells
      exportData.forEach((_, rowIndex) => {
        headers.forEach((_, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowIndex + 1,
            c: colIndex,
          });
          if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = {
              alignment: { horizontal: "center", vertical: "center" },
            };
          }
        });
      });

      // Create workbook and append worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Generate a custom filename with current date and time
      const fileName = `Master_Data_${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.xlsx`;

      // Export the workbook to an Excel file
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  //new req
  const convertToPDF = () => {
    try {
      const doc = new jsPDF("landscape"); // Landscape for more horizontal space

      // Set up header text
      const headerText = "SV Stack";
      const pageWidth = doc.internal.pageSize.getWidth();

      // Center-align the header text
      doc.setFontSize(18);
      doc.text(headerText, pageWidth / 2, 15, { align: "center" });

      // Subtitle "Master Data" centered, slightly smaller font
      doc.setFontSize(12); // Slightly smaller font for subtitle
      doc.text("Master Data Report", pageWidth / 10, 20); // Centered position

      // Prepare table data
      const tableColumnHeaders = columns
        .filter((column) => visibleColumns[column.header])
        .map((column) => column.header);

      const tableRows = filteredData.map((row) =>
        columns
          .filter((column) => visibleColumns[column.header])
          .map((column) => row[column.key])
      );

      // Add table to PDF with single-page adjustments
      doc.autoTable({
        head: [tableColumnHeaders],
        body: tableRows,
        startY: 25,
        theme: "striped",
        headStyles: {
          fillColor: [0, 57, 107],
          valign: "middle",
          halign: "center",
        },
        styles: {
          fontSize: 7, // Reduced font size for fitting more columns
          cellPadding: 1, // Tighter cell padding
          valign: "middle",
          halign: "center",
          overflow: "hidden", // Ensures text does not overflow outside cells
        },
        tableWidth: "auto", // Compresses table to fit within the page width
        columnStyles: {
          0: { cellWidth: "auto" }, // Dynamically adjust column widths
        },
        margin: { top: 10 },
      });
      doc.save(
        `Master_Data_${new Date().toISOString().replace(/[:.]/g, "-")}.pdf`
      );
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
            value={filters.user}
            onChange={(e) => handleFilterChange("user", e.target.value)}
            className="w-fit"
          />
          {filters.user === "" ? (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
          ) : (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X
                className="h-4 w-4 text-muted-foreground"
                onClick={(e) => handleFilterChange("user", "")}
              />
            </span>
          )}
        </div>
        <div className="relative">
          <Input
            placeholder="Search operation"
            value={filters.operation}
            onChange={(e) => handleFilterChange("operation", e.target.value)}
            className="w-fit"
          />
          {filters.operation === "" ? (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
          ) : (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X
                className="h-4 w-4 text-muted-foreground"
                onClick={(e) => handleFilterChange("operation", "")}
              />
            </span>
          )}
        </div>
        <div className="relative">
          <Input
            placeholder="Search module"
            value={filters.module}
            onChange={(e) => handleFilterChange("module", e.target.value)}
            className="w-fit"
          />
          {filters.module === "" ? (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
          ) : (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X
                className="h-4 w-4 text-muted-foreground"
                onClick={(e) => handleFilterChange("module", "")}
              />
            </span>
          )}
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
            <DropdownMenuItem className="bg-white" onClick={convertToExcel}>
              Excel Format
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-white" onClick={convertToPDF}>
              PDF Format
            </DropdownMenuItem>
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
                  <TableHead className="font-semibold py-2 px-3" key={header}>
                    {header}
                  </TableHead>
                ) : null
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-violet-50 transition-all"
              >
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

export default MasterData;
