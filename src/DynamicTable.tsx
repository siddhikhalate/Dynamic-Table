import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Column } from './App';
import './table.css'

interface DynamicTableProps {
  columns: Column[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns }) => {
  const [data, setData] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterColumn, setFilterColumn] = useState('');

  const { control, handleSubmit } = useForm();

  // Add new row
  const onSubmit = (rowData: any) => {
    setData([...data, rowData]);
  };

  // Filter logic
  const filteredData = filterColumn
    ? data.filter((row) => {
        const cellValue = row[filterColumn];
        return Array.isArray(cellValue)
          ? cellValue.includes(filterValue)
          : cellValue?.toString().includes(filterValue);
      })
    : data;

  return (
    <div>
      <h2>Table</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {columns.map((col) => (
          <Controller
            key={col.accessor}
            name={col.accessor}
            control={control}
            defaultValue={col.type === 'number' ? 0 : ''}
            render={({ field }) => (
              <div>
                <label>{col.header}</label>
                <input
                  {...field}
                  type={col.type === 'number' ? 'number' : 'text'}
                />
              </div>
            )}
          />
        ))}
        <button type="submit">Add Row</button>
      </form>

      {/* Filter Section */}
      <div>
        <h3>Filter Rows</h3>
        <select onChange={(e) => setFilterColumn(e.target.value)}>
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col.accessor} value={col.accessor}>
              {col.header}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter value"
        />
      </div>

      {/* Table */}
      <table border={1}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
