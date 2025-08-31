import {
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
import { useNavigate } from "react-router";
import { getColumns } from "@/lib/schema/columnDefs";

export type Project = {
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
  description: string;
  problems: string;
  solution: string;
  priorities: string;
  outcomes: string;
  challenges: string;

  partners: string;

  biodiversityHotspot: boolean;
  protectedAreaExpansion: boolean;
  generatingRevenue: boolean;

  communities: string;
  smmes: string;
  org: string;
  scalable: string;
  envImpact: string;
  socialImpact: string;
  sustainability: string;
  profitability: string;

  funding: { amount: string; activity: string }[];
  fundingOptions: string[];

  createdAt: string;
  updatedAt: string;
};

interface ProjectTableProps {
  data: Project[];
  isAdmin: boolean;
}

export function ProjectTable({ data, isAdmin }: ProjectTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const handleRowClick = (project: Project) => {
    if (isAdmin) {
      navigate(`/admin/proposals/${project.id}`);
    }
  };

  const table = useReactTable({
    data,
    columns: getColumns(isAdmin),
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
        <TableHeader className="bg-[#c5e6dc]">
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
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              className="cursor-pointer"
            >
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
