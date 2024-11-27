import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const downloadExcel = (fileName, sheetName, jsonData) => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); //sheet1
  XLSX.writeFile(workbook, fileName); //data.xlsx
};

export const downloadPDF = (columns, jsonData, fileName, title) => {
  const doc = new jsPDF("landscape"); // Landscape for more horizontal space

  // Set up header text
  const headerText = "SV Stack";
  const pageWidth = doc.internal.pageSize.getWidth();

  // Center-align the header text
  doc.setFontSize(18);
  doc.text(headerText, pageWidth / 2, 15, { align: "center" });

  doc.setFontSize(12); // Slightly smaller font for subtitle
  doc.text(title, pageWidth / 10, 20, { align: "center" });

  doc.autoTable({
    head: [columns],
    body: jsonData,
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
    margin: { top: 10 }, // Map your JSON fields
  });
  doc.save(fileName); //doc.pdf
};
