import { useState } from "react";
import { HierarchicalTable } from "./components/HierarchicalTable";
import { TableData } from "./types/types";

const initialData: TableData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      originalValue: 1500,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          originalValue: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          originalValue: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          originalValue: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          originalValue: 700,
        },
      ],
    },
  ],
};

function App() {
  const [tableData, setTableData] = useState<TableData>(initialData);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hierarchical Table</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <HierarchicalTable data={tableData} onDataChange={setTableData} />
        </div>
      </div>
    </div>
  );
}

export default App;
