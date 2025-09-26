import { Project } from "@/components/ProjectTable";
import { ColumnDef } from "@tanstack/react-table";
import { FileFields } from "./formSchema";
import { File } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectTitle",
    header: "Project Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("projectTitle")}</div>
    ),
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
  {
    accessorKey: "sector",
    header: "Sector",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    id: "categories",
    accessorKey: "categories",
    header: "Eligible Categories",
    cell: ({ row }) => {
      const categories: string[] = row.getValue("categories");
      return (
        <div>
          {categories.map((cat, i) => (
            <div key={i}>• {cat}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "estimatedInvestment",
    header: "Estimated Investment",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "startDate",
    header: "Implementation Start Date",
    cell: ({ row }) =>
      new Date(row.getValue("startDate")).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "proposalStatus",
    header: "Proposal Status",
  },
  {
    accessorKey: "supportingDocuments",
    header: "Supporting Documents",
    cell: ({ row }) => {
      let suppDocuments = false;
      FileFields.forEach((field) => {
        if (field !== "projectOverview" && row.original[field])
          suppDocuments = true;
      });
      return suppDocuments ? <File className="h-4" /> : "";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("en-GB"),
  },
];

export const columnVisibility = {
  categories: false,
};

export const getColumns = (isAdmin: boolean) => {
  return isAdmin ? columns : columns.slice(0, 6);
};
