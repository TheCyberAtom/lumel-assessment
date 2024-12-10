import React from "react";
import { TableRow } from "./TableRow";
import { Row, TableData } from "../types/types";
import {
  calculateSubtotal,
  distributeValueToChildren,
} from "../utils/calculations";

interface HierarchicalTableProps {
  data: TableData;
  onDataChange: (newData: TableData) => void;
}

export const HierarchicalTable: React.FC<HierarchicalTableProps> = ({
  data,
  onDataChange,
}) => {
  const updateRowValue = (rows: Row[], id: string, newValue: number): Row[] => {
    return rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, value: newValue };
        if (row.children) {
          distributeValueToChildren(updatedRow, newValue);
        }
        return updatedRow;
      }

      if (row.children) {
        const updatedChildren = updateRowValue(row.children, id, newValue);
        const newSubtotal = calculateSubtotal({ children: updatedChildren });
        return {
          ...row,
          children: updatedChildren,
          value: newSubtotal,
        };
      }

      return row;
    });
  };

  const handleValueChange = (id: string, newValue: number) => {
    const newRows = updateRowValue(data.rows, id, newValue);
    onDataChange({ rows: newRows });
  };

  const grandTotal = data.rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Label</th>
            <th className="px-4 py-2 text-left">Value</th>
            <th className="px-4 py-2 text-left">Input</th>
            <th className="px-4 py-2 text-left">Allocation %</th>
            <th className="px-4 py-2 text-left">Allocation Val</th>
            <th className="px-4 py-2 text-left">Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              level={0}
              onValueChange={handleValueChange}
            />
          ))}
          <tr className="bg-gray-50 font-bold">
            <td className="px-4 py-2">Grand Total</td>
            <td className="px-4 py-2">{grandTotal.toFixed(2)}</td>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
