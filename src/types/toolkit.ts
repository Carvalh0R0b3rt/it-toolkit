export interface Workflow {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive" | "error";
}

export interface Project {
  id: string;
  name: string;
  type: "email" | "whatsapp" | "sms";
  description: string;
  status: "draft" | "active" | "completed";
  createdAt: string;
}

export type ContactType = "email" | "whatsapp" | "sms";
export type ActiveTab = "toolkit" | "projects";
