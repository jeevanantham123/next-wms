"use client";

import React, { useState } from 'react';
import { TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem as MuiMenuItem, Select } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from "@/components/ui/button";
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";

const primaryColor = 'green';

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
    dropdownSelect: {
        border: '2px solid lightgrey',
        borderRadius: '4px',
        width: '200px',
        height: '40px',
        transition: 'border-color 0.3s',
        '&:hover': {
            borderColor: primaryColor,
        },
        '&:focus': {
            borderColor: primaryColor,
        }
    },
    datePicker: {

        border: '2px solid lightgrey',
        borderRadius: '4px',

        width: '150px', 
        height: '40px', 
        '& .MuiInputBase-root': {
            height: '40px', 
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'lightgrey',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryColor,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryColor,
        },
    },
};

  


const AuditInfo = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [user, setUser] = useState('');
    const [operation, setOperation] = useState('');
    const [module, setModule] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState(['Table', 'Table Title', 'Transaction', 'Date', 'Time', 'Operation', 'User', 'Name', 'Folder', 'Table Field', 'Field Description']);
    
    const open = Boolean(anchorEl);

    const handleSearch = () => {
        // Logic for handling the search
    };

    const handleActionClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleActionClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleEdit = () => {
        if (selectedRow && selectedRow.user === user) {
            alert(`Editing record for user: ${selectedRow.user}`);
        } else {
            alert("You can only edit your own records.");
        }
        handleActionClose();
    };

    const handleDelete = () => {
        if (selectedRow && selectedRow.user === user) {
            alert(`Deleting record for user: ${selectedRow.user}`);
        } else {
            alert("You can only delete your own records.");
        }
        handleActionClose();
    };

    const handleColumnChange = (column) => {
        setVisibleColumns(prev => {
          if (prev.includes(column)) {
            return prev.filter(item => item !== column);
          } else {
            return [...prev, column];
          }
        });
      };

    const mockData = [
        { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
        { table: 'SORDER', tableTitle: 'POs', transaction: 'ZA001', date: '11/01/24', time: '07:05', operation: 'UPDATE', user: 'SREE', name: 'Sree G', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
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
        { table: 'PORDER', tableTitle: 'POs', transaction: 'ZA061', date: '10/22/24', time: '07:05', operation: 'INSERT', user: 'SRAV', name: 'Sravya', folder: 'GITTRN', tableField: 'BPAADD', fieldDesc: 'Address' },
    
    ];

    const columnOptions = [
       'Columns', 'Table', 'Table Title', 'Transaction', 'Date', 'Time', 'Operation', 'User', 'Name', 'Folder', 'Table Field', 'Field Description'
    ];

    return (
        <>
            <div style={{ padding: '70px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
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
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        select
                        variant="outlined"
                        InputProps={{ style: { ...styles.selectField } }}
                    >
                        <MenuItem value="SRAV">SRAV</MenuItem>
                        <MenuItem value="SREE">SREE</MenuItem>
                    </TextField>
                    <TextField
                        label="Operation"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        select
                        variant="outlined"
                        InputProps={{ style: { ...styles.selectField } }}
                    >
                        <MenuItem value="INSERT">INSERT</MenuItem>
                        <MenuItem value="UPDATE">UPDATE</MenuItem>
                    </TextField>
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
                    <Button onClick={handleSearch}>Search</Button>

                    <DropdownMenu>
            <DropdownMenuTrigger>
             <Button width- >Columns</Button> 
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              {columnOptions.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={visibleColumns.includes(column)}
                  onCheckedChange={() => handleColumnChange(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

                </div>

                <div style={{ textAlign:'rignt'}}>
                    <h3>Row Count: {mockData.length}</h3>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                {columnOptions.map((column) =>
                                    visibleColumns.includes(column) ? (
                                        <TableCell key={column} style={{ color: 'grey' }}>{column}</TableCell>
                                    ) : null
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    {visibleColumns.includes('Table') && <TableCell>{row.table}</TableCell>}
                                    {visibleColumns.includes('Table Title') && <TableCell>{row.tableTitle}</TableCell>}
                                    {visibleColumns.includes('Transaction') && <TableCell>{row.transaction}</TableCell>}
                                    {visibleColumns.includes('Date') && <TableCell>{row.date}</TableCell>}
                                    {visibleColumns.includes('Time') && <TableCell>{row.time}</TableCell>}
                                    {visibleColumns.includes('Operation') && <TableCell>{row.operation}</TableCell>}
                                    {visibleColumns.includes('User') && <TableCell>{row.user}</TableCell>}
                                    {visibleColumns.includes('Name') && <TableCell>{row.name}</TableCell>}
                                    {visibleColumns.includes('Folder') && <TableCell>{row.folder}</TableCell>}
                                    {visibleColumns.includes('Table Field') && <TableCell>{row.tableField}</TableCell>}
                                    {visibleColumns.includes('Field Description') && <TableCell>{row.fieldDesc}</TableCell>}
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        </>
    );
};

export default AuditInfo;





