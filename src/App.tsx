import React, { useState } from 'react';
import DynamicTable from './DynamicTable';

export interface Column {   // Ensure this is exported
  header: string;
  accessor: string;
  type: 'string' | 'number';
}

const App: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number'>('string');

  // Add new column
  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = {
        header: newColumnName,
        accessor: newColumnName.toLowerCase(),
        type: newColumnType,
      };
      setColumns([...columns, newColumn]);
      setNewColumnName('');
    }
  };

  return (
    <div>
      <h1>Dynamic Table Management</h1>
      <div>
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Column name"
        />
        <select
          value={newColumnType}
          onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number')}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
        <button onClick={addColumn}>Add Column</button>
      </div>
      <DynamicTable columns={columns} />
    </div>
  );
};

export default App;
