import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Project = {
  id: string;
  projectName: string;
  contactPerson: string;
  location: string;
  status: string;
  siteName: string;
  siteCapacity: string;
  sitePhone: string;
  siteEmail: string;
  advisorName: string;
  advisorPhone: string;
  advisorEmail: string;
  website: string;
  partners: string;
  biodiversityHotspot: boolean;
  protectedAreaExpansion: boolean;
  generatingRevenue: boolean;
  funding: { amount: string; activity: string }[];
  fundingOptions: string[];
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: "Project",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("projectName")}</div>
    ),
  },
  {
    accessorKey: "contactPerson",
    header: "Contact",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "biodiversityHotspot",
    header: "Hotspot",
    cell: ({ row }) => (
      <span>{row.getValue("biodiversityHotspot") ? "✅" : "—"}</span>
    ),
  },
  {
    accessorKey: "generatingRevenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span>{row.getValue("generatingRevenue") ? "💰" : "—"}</span>
    ),
  },
  {
    accessorKey: "funding",
    header: "Funding Activities",
    cell: ({ row }) => {
      const funding = row.getValue("funding") as {
        amount: string;
        activity: string;
      }[];
      return (
        <div className="space-y-1">
          {funding.map((f, i) => (
            <div key={i}>
              ₹{f.amount} – {f.activity}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
];

export function ApproverProjectTable({ data }: { data: Project[] }) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
