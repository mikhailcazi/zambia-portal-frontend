import { Project } from "@/components/project-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileFields } from "./formSchema";
import { File } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
  {
    header: "",
    id: "status",
    cell: ({ row }) => {
      const status = row.getValue("proposalStatus");
      let bg = "";
      if (status === "APPROVED") bg = "#4e6e54";
      else if (status === "PENDING") bg = "#bed62f";
      else if (status === "REJECTED") bg = "#6d6e70";

      return (
        <div
          style={{ width: "10px", height: "40px", backgroundColor: bg }}
          title={"Proposal Status: " + status}
        />
      );
    },
  },
  {
    accessorKey: "projectTitle",
    header: "PROJECT TITLE",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("projectTitle")}</div>
    ),
  },
  {
    accessorKey: "organization",
    header: "ORGANIZATION",
  },
  {
    accessorKey: "sector",
    header: "SECTOR",
  },
  {
    accessorKey: "stage",
    header: "PROJECT STAGE",
  },
  {
    id: "categories",
    accessorKey: "categories",
    header: "ELIGIBLE CATEGORIES",
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
    header: "EST. INVESTMENT",
  },
  {
    accessorKey: "currency",
    header: "CURRENCY",
  },
  {
    accessorKey: "location",
    header: "LOCATION",
  },
  {
    accessorKey: "startDate",
    header: "START DATE",
    cell: ({ row }) =>
      new Date(row.getValue("startDate")).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "proposalStatus",
    header: "PROPOSAL STATUS",
  },
  {
    accessorKey: "supportingDocuments",
    header: "DOCS",
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
    header: "CREATED AT",
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
