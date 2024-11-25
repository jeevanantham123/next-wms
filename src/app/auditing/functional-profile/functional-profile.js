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

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
const mockUserData = [
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
  },
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
  },
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
  },
];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-[50px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "functionalProfile",
    header: "Functional Profile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("functionalProfile")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Description
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "accessCodes",
    header: "All Access Codes",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       All Access Codes
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">
        {row.getValue("accessCodes")?.map((access) => {
          return (
            <Badge
              className="rounded-full bg-[#ECFDF3] text-[#027A48] h-[26px] shadow-none font-normal text-[12px]"
              key={access}
            >
              {access}
            </Badge>
          );
        })}
      </div>
    ),
  },
];

function FunctionalProfile() {
  const [filters, setFilters] = useState({
    functionalProfile: "",
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.header]: true }), {})
  );
  const data = mockUserData;
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  //Filter data based on user inputs
  const filteredData = data.filter(
    (row) =>
      !filters.functionalProfile ||
      row.functionalProfile
        .toLowerCase()
        .includes(filters.functionalProfile.toLowerCase())
  );

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
      const fileName = `Functional_Profile_Data_${new Date()
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

      doc.setFontSize(12); // Slightly smaller font for subtitle
      doc.text("Functional Profile Report", pageWidth / 10, 20); // Centered position

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
        `Functional_Profile_Data_${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")}.pdf`
      );
    } catch (error) {
      console.error("Error exporting to Pdf:", error);
      alert("An error occurred while exporting to PDF. Please try again.");
    }
  };

  const table = useReactTable({
    data: mockUserData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
      <div className="flex gap-2 mb-4 items-center py-4">
        <div className="flex flex-col">
          <div className="text-[18px] font-medium text-pt">
            Functional Profile Code
          </div>
          <div className="text-[14px] text-st">Description</div>
        </div>
        {/* <div className="relative">
          <Input
            placeholder="Functional profile co.."
            value={table.getColumn("functionalProfile")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("functionalProfile")
                ?.setFilterValue(event.target.value)
            }
            className="w-150"
          />
          {!table.getColumn("functionalProfile").getFilterValue() ? (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
          ) : (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X
                className="h-4 w-4 text-muted-foreground"
                onClick={(e) => handleFilterChange("functionalProfile", "")}
              />
            </span>
          )}
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button
              variant="outline"
              className="ml-auto border text-theme border-theme bg-white"
            >
              Columns <ChevronDownIcon className="ml-2 h-4 w-4 text-theme" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown for Download Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="default" className="">
              Download As{" "}
              <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
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
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="h-[44px] bg-[#F9FAFB]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[14px] font-normal text-[#667085]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="h-[44px]"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FunctionalProfile;
