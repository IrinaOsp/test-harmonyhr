import { ColumnDef } from "@tanstack/react-table";
import { DataForTable } from "./data";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

export const columns: ColumnDef<DataForTable>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "usedDays",
    header: "Used Days (-)",
    cell: ({ row }) => <div className="">{row.getValue("usedDays")}</div>,
  },
  {
    accessorKey: "earnedDays",
    header: "Earned Days (+)",
    cell: ({ row }) => <div className="">{row.getValue("earnedDays")}</div>,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <div className="">{(row.getValue("balance") as number).toFixed(2)}</div>
    ),
  },
];
