import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router";
import { columnVisibility, getColumns } from "@/lib/schema/columnDefs";
import { UploadedFile } from "@/pages/admin/proposal-details";
import { ArrowDown, ArrowUp } from "lucide-react";

export type Project = {
  id: string;
  projectTitle: string;
  organization: string;
  contactPerson: string;
  location: string;
  startDate: string;
  endDate: string;
  sector: string;
  stage: string;
  currency: string;
  estimatedInvestment: string;
  partners: string;
  projectOverview: UploadedFile;
  categories: string[];
  categoriesOther: string;
  envImpact: string[];
  envImpactIndicator: string;
  envImpactDescription: string;
  socialImpact: string[];
  socialImpactDescription: string;
  compliance: { [key: string]: string };
  fundingOptions: { [key: string]: string };
  totalCost: string;
  fundingSought: string[];
  scalable: string;
  measureableImpact: boolean;
  annualReporting: boolean;
  keyIndicators: boolean;
  monitoring: boolean;
  companyRegistration: UploadedFile;
  businessPlan: UploadedFile;
  financialStatements: UploadedFile;
  partnerships: UploadedFile;
  techStudies: UploadedFile;
  other: UploadedFile;
  signedName: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  proposalStatus?: string;
};

interface ProjectTableProps {
  data: Project[];
  isAdmin: boolean;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function ProjectTable({
  data,
  isAdmin,
  globalFilter,
  setGlobalFilter,
}: ProjectTableProps) {
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
    initialState: {
      columnVisibility: columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="">
      <Table>
        <TableHeader className="bg-[#c5e6dc]">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={
                    (header.column.getIsSorted() && "bg-[#a5d8c7] ") +
                    "cursor-pointer select-none text-xs text-[#4e6e54]"
                  }
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <ArrowUp className="h-3" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <ArrowDown className="h-3" />
                    )}
                  </div>
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
              className="cursor-pointer hover:bg-neutral-100/50"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cell.column.id == "status" ? "" : "p-2"}
                >
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
