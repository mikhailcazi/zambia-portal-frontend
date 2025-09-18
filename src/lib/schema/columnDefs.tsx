import { Project } from "@/components/ProjectTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "generatingRevenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span>{row.getValue("generatingRevenue") ? "Yes" : "No"}</span>
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
              ZMW {f.amount} – {f.activity}
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
  // {
  //   id: "actions", // custom column id since it's not in Project type
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const project = row.original;
  //     return (
  //       <div className="flex gap-2">
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={(e) => {
  //             e.stopPropagation(); // prevent row click navigation
  //             alert(`Viewing ${project.projectName}`);
  //           }}
  //         >
  //           View
  //         </Button>
  //         <Button
  //           variant="destructive"
  //           size="sm"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             alert(`Deleting ${project.projectName}`);
  //           }}
  //         >
  //           Delete
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];

export const getColumns = (isAdmin: boolean) => {
  return isAdmin ? columns : columns.slice(0, 6);
};
