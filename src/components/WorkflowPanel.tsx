import { useState } from "react";
import { Workflow } from "@/types/toolkit";
import AddWorkflowModal from "./AddWorkflowModal";

const DEMO_WORKFLOWS: Workflow[] = [
  { id: "1", name: "Lead Nurture Sequence", url: "https://n8n.example.com/webhook/lead-nurture", status: "active" },
  { id: "2", name: "Welcome Email Flow", url: "https://n8n.example.com/webhook/welcome", status: "active" },
  { id: "3", name: "Re-engagement Campaign", url: "https://n8n.example.com/webhook/reengage", status: "error" },
];

const statusColors: Record<Workflow["status"], string> = {
  active: "bg-green-500",
  inactive: "bg-muted-foreground",
  error: "bg-destructive",
};

const WorkflowPanel = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(DEMO_WORKFLOWS);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (name: string, url: string) => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name,
      url,
      status: "active",
    };
    setWorkflows((prev) => [...prev, newWorkflow]);
    setModalOpen(false);
  };

  return (
    <div className="border border-border bg-card h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="font-mono-ui text-xs font-semibold uppercase tracking-widest text-primary">
          n8n Workflows
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="font-mono-ui text-xs uppercase tracking-wider px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Add Workflow
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-2">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="border border-border bg-background p-4 flex items-center justify-between"
          >
            <div className="min-w-0 flex-1">
              <p className="font-mono-ui text-sm text-foreground truncate">{wf.name}</p>
              <p className="font-body text-xs text-muted-foreground truncate mt-1">{wf.url}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <span className={`w-2 h-2 ${statusColors[wf.status]}`} />
              <span className="font-mono-ui text-xs uppercase text-muted-foreground">
                {wf.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AddWorkflowModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
};

export default WorkflowPanel;
