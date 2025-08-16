/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { ApproverProjectTable } from "@/components/ProjectTable";

const data = [
  {
    id: "1b3992ec-7cdb-464e-a34b-5afce44d9fdd",
    projectName: "Mangrove Restoration Project",
    contactPerson: "Ayesha Khan",
    location: "Sundarbans, West Bengal",
    status: "Draft",
    siteName: "Site A",
    siteCapacity: "150 KW",
    sitePhone: "+91-9876543210",
    siteEmail: "site@example.com",
    advisorName: "Dr. Arvind Rao",
    advisorPhone: "+91-9123456780",
    advisorEmail: "advisor@example.com",
    website: "https://mangroveproject.org",
    partners: "WWF India, Local Panchayat",
    description:
      "This project aims to restore degraded mangrove ecosystems and protect biodiversity.",
    problems: "Coastal erosion and habitat loss",
    solution: "Community-led mangrove replantation and monitoring",
    priorities: "Restoration, Livelihoods, Climate Resilience",
    outcomes: "Increased forest cover, reduced erosion, community employment",
    challenges: "Monsoon delays, local resistance",
    biodiversityHotspot: true,
    protectedAreaExpansion: false,
    generatingRevenue: true,
    communities: "Fisherfolk, Farmers",
    smmes: "Eco-tourism cooperatives",
    org: "GreenRoots Foundation",
    scalable: "Can be scaled to nearby deltas with similar conditions",
    envImpact: "Improved soil quality and carbon sequestration",
    socialImpact: "Better livelihood and education for locals",
    sustainability: "Relies on local stewardship and low-cost maintenance",
    profitability: "Revenue from ecotourism and carbon credits",
    funding: [
      {
        amount: "20000",
        activity: "Seedling Purchase",
      },
      {
        amount: "15000",
        activity: "Community Training",
      },
    ],
    fundingOptions: ["CSR", "Government Grant"],
    attachments: [],
    createdAt: "2025-07-28T10:54:33.757Z",
    updatedAt: "2025-07-28T10:54:33.757Z",
  },
  {
    id: "24eb961d-c27a-4e0b-8ae5-c5b23b56243e",
    projectName: "Mangrove Restoration Project 2",
    contactPerson: "Ayesha Khan",
    location: "Sundarbans, West Bengal",
    status: "Draft",
    siteName: "Site A",
    siteCapacity: "150 KW",
    sitePhone: "+91-9876543210",
    siteEmail: "site@example.com",
    advisorName: "Dr. Arvind Rao",
    advisorPhone: "+91-9123456780",
    advisorEmail: "advisor@example.com",
    website: "https://mangroveproject.org",
    partners: "WWF India, Local Panchayat",
    description:
      "This project aims to restore degraded mangrove ecosystems and protect biodiversity.",
    problems: "Coastal erosion and habitat loss",
    solution: "Community-led mangrove replantation and monitoring",
    priorities: "Restoration, Livelihoods, Climate Resilience",
    outcomes: "Increased forest cover, reduced erosion, community employment",
    challenges: "Monsoon delays, local resistance",
    biodiversityHotspot: true,
    protectedAreaExpansion: false,
    generatingRevenue: true,
    communities: "Fisherfolk, Farmers",
    smmes: "Eco-tourism cooperatives",
    org: "GreenRoots Foundation",
    scalable: "Can be scaled to nearby deltas with similar conditions",
    envImpact: "Improved soil quality and carbon sequestration",
    socialImpact: "Better livelihood and education for locals",
    sustainability: "Relies on local stewardship and low-cost maintenance",
    profitability: "Revenue from ecotourism and carbon credits",
    funding: [
      {
        amount: "20000",
        activity: "Seedling Purchase",
      },
      {
        amount: "15000",
        activity: "Community Training",
      },
    ],
    fundingOptions: ["CSR", "Government Grant"],
    attachments: [],
    createdAt: "2025-07-28T19:04:23.174Z",
    updatedAt: "2025-07-28T19:04:23.174Z",
  },
  {
    id: "935d9b1b-a18d-42cb-99db-7c807636a6e6",
    projectName: "SAVE Forests",
    contactPerson: "John Doe",
    location: "Mumbai",
    status: "Greenfield",
    siteName: "Mr X",
    siteCapacity: "Owner",
    sitePhone: "9897989869",
    siteEmail: "johndoe@gmail.com",
    advisorName: "John Doe",
    advisorPhone: "1231231232",
    advisorEmail: "johndoe@gmail.com",
    website: "project.com",
    partners: "Yes",
    description: "Yes",
    problems: "Yes",
    solution: "Yesy",
    priorities: "Yes",
    outcomes: "Yes",
    challenges: "Yes",
    biodiversityHotspot: true,
    protectedAreaExpansion: false,
    generatingRevenue: true,
    communities: "Yes",
    smmes: "Yees",
    org: "Yes",
    scalable: "Yees",
    envImpact: "Yes",
    socialImpact: "TYes",
    sustainability: "YEs",
    profitability: "Yes",
    funding: [
      {
        amount: "1",
        activity: "Own",
      },
    ],
    fundingOptions: ["grant", "guarantees", "sub_loan"],
    attachments: [],
    createdAt: "2025-07-28T19:27:59.227Z",
    updatedAt: "2025-07-28T19:27:59.227Z",
  },
];

export default function ProjectList() {
  const [projects, setProjects] = useState<any>(data);

  useEffect(() => {
    api
      .getProjects()
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="my-5 font-bold">Project Dashboard</h1>
      <ApproverProjectTable data={projects} />
    </div>
  );
}
