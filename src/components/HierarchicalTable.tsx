import React from "react";
import { TableData } from "../types/types";

interface HierarchicalTableProps {
  data: TableData;
  onDataChange: (newData: TableData) => void;
}

export const HierarchicalTable: React.FC<HierarchicalTableProps> = ({
  data,
  onDataChange,
}) => {
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
            <tr>
              <td className="px-4 py-2">{row.label}</td>
              <td className="px-4 py-2">{row.value}</td>
            </tr>
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
