export interface Flow {
  name: string;
  steps: string[];
  error_path: string;
}

export interface Spec {
  vision: string;
  users: string;
  features: string[];
  flows: Flow[];
  architecture: string;
  requirements: string;
}

export interface HistorySpecItem {
  id: string;
  name: string;
  createdAt: string;
  spec: Spec;
}

export interface SpecProject {
  id: string;
  title: string;
  status: "Draft" | "Active Review" | "Closed";
}

