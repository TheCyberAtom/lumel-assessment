import React, { useState } from "react";
import { Row } from "../types/types";

interface TableRowProps {
  row: Row;
  level: number;
  onValueChange: (id: string, newValue: number) => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  row,
  level,
  onValueChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const originalValue = row.originalValue ?? row.value;
  const variance = originalValue;

  const handleAllocationPercentage = () => {
    const percentage = parseFloat(inputValue);
    if (isNaN(percentage)) return;

    const increase = row.value * (percentage / 100);
    const newValue = row.value + increase;
    onValueChange(row.id, newValue);
    setInputValue("");
  };

  const handleAllocationValue = () => {
    const newValue = parseFloat(inputValue);
    if (isNaN(newValue)) return;

    onValueChange(row.id, newValue);
    setInputValue("");
  };

  return (
    <>
      <tr>
        <td className="px-4 py-2">
          <span style={{ marginLeft: `${level * 20}px` }}>
            {level > 0 ? "-- " : ""}
            {row.label}
          </span>
        </td>
        <td className="px-4 py-2">{row.value.toFixed(2)}</td>
        <td className="px-4 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded px-2 py-1 w-24"
            placeholder="Enter value"
          />
        </td>
        <td className="px-4 py-2">
          <button
            onClick={handleAllocationPercentage}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
          >
            Allocation %
          </button>
        </td>
        <td className="px-4 py-2">
          <button
            onClick={handleAllocationValue}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Allocation Val
          </button>
        </td>
        <td className="px-4 py-2">{variance}%</td>
      </tr>
      {row.children?.map((child) => (
        <TableRow
          key={child.id}
          row={child}
          level={level + 1}
          onValueChange={onValueChange}
        />
      ))}
    </>
  );
};
