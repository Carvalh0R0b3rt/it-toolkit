import { useState } from "react";
import { Project, ContactType } from "@/types/toolkit";

const DEMO_PROJECTS: Project[] = [
  { id: "1", name: "Q1 Newsletter Campaign", type: "email", description: "Quarterly newsletter targeting existing subscribers with product updates.", status: "completed", createdAt: "2026-01-15" },
  { id: "2", name: "Cart Abandonment WhatsApp", type: "whatsapp", description: "Automated WhatsApp follow-up for abandoned shopping carts.", status: "active", createdAt: "2026-02-20" },
  { id: "3", name: "Flash Sale SMS Blast", type: "sms", description: "Time-sensitive SMS promotion for weekend flash sale event.", status: "active", createdAt: "2026-03-01" },
];

const typeLabels: Record<ContactType, string> = {
  email: "E-mail",
  whatsapp: "WhatsApp",
  sms: "SMS",
};

const statusStyle: Record<Project["status"], string> = {
  draft: "text-muted-foreground",
  active: "text-primary",
  completed: "text-green-500",
};

const ProjectsPanel = () => {
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", type: "email" as ContactType, description: "" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: form.name.trim(),
      type: form.type,
      description: form.description.trim(),
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [newProject, ...prev]);
    setForm({ name: "", type: "email", description: "" });
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Add project form */}
      <div className="border border-border bg-card p-5 mb-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="font-mono-ui text-xs uppercase tracking-wider px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors w-full"
          >
            Add New Project
          </button>
        ) : (
          <div className="space-y-3">
            <h3 className="font-mono-ui text-xs uppercase tracking-widest text-primary">
              New Project
            </h3>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Project name"
              className="w-full bg-background border border-border px-4 py-2 font-mono-ui text-sm text-foreground caret-primary focus:outline-none focus:border-primary"
            />
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ContactType }))}
              className="w-full bg-background border border-border px-4 py-2 font-mono-ui text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="email">E-mail</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
            </select>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description..."
              rows={3}
              className="w-full bg-background border border-border px-4 py-2 font-body text-sm text-foreground caret-primary focus:outline-none focus:border-primary resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="font-mono-ui text-xs uppercase tracking-wider px-4 py-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.name.trim()}
                className="font-mono-ui text-xs uppercase tracking-wider px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-ui text-xs uppercase tracking-wider px-2 py-0.5 border border-border text-muted-foreground">
                {typeLabels[project.type]}
              </span>
              <span className={`font-mono-ui text-xs uppercase ${statusStyle[project.status]}`}>
                {project.status}
              </span>
            </div>
            <h4 className="font-mono-ui text-sm text-foreground">{project.name}</h4>
            <p className="font-body text-xs text-muted-foreground mt-1">{project.description}</p>
            <p className="font-mono-ui text-[10px] text-muted-foreground mt-2">{project.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPanel;
