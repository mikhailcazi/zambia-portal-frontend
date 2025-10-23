import { CategoryValues, FinancialOptions, ProjectStages } from "./formSchema";

export const filterList = ["stage", "categories", "fundingSought"];

export const filterNames = {
  stage: "Project Stage",
  categories: "Categories",
  fundingSought: "Funding Sought",
};

export const filterValuesList = {
  stage: ProjectStages,
  categories: CategoryValues,
  fundingSought: FinancialOptions,
};
