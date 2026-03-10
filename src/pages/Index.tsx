import { useState } from "react";
import { ActiveTab } from "@/types/toolkit";
import WorkflowPanel from "@/components/WorkflowPanel";
import ContactCharts from "@/components/ContactCharts";
import ProjectsPanel from "@/components/ProjectsPanel";

const tabs: { key: ActiveTab; label: string }[] = [
  { key: "toolkit", label: "Toolkit" },
  { key: "projects", label: "Projects" },
];

interface ToolConfig {
  id: string;
  label: string;
  description: string;
}

const tools: ToolConfig[] = [
  { id: "workflows", label: "n8n Workflows", description: "Manage automation workflows" },
  { id: "charts", label: "Power BI", description: "Contact performance analytics" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("toolkit");
  const [activeTools, setActiveTools] = useState<Record<string, boolean>>({
    workflows: true,
    charts: true,
  });

  const toggleTool = (id: string) => {
    setActiveTools((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const anyToolActive = Object.values(activeTools).some(Boolean);

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* CONTROL COLUMN */}
      <div className="w-64 shrink-0 border-r border-border flex flex-col bg-background">
        {/* Header */}
        <div className="px-5 py-5 border-b border-border">
          <h1 className="font-mono-ui text-sm font-bold uppercase tracking-widest text-secondary">
            MarketOps
          </h1>
        </div>

        {/* Tabs */}
        <nav className="flex flex-col border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-5 py-3 font-mono-ui text-xs uppercase tracking-widest transition-colors ${
                activeTab === tab.key
                  ? "text-secondary border-l-2 border-secondary bg-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Control content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          {activeTab === "toolkit" && (
            <div className="space-y-4">
              {/* Tool toggles */}
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Tools
                </p>
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <div key={tool.id} className="border border-border bg-card p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-mono-ui text-xs uppercase text-foreground">{tool.label}</p>
                        <button
                          onClick={() => toggleTool(tool.id)}
                          className={`font-mono-ui text-[10px] uppercase tracking-wider px-3 py-1 border transition-colors ${
                            activeTools[tool.id]
                              ? "border-secondary bg-secondary text-secondary-foreground"
                              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {activeTools[tool.id] ? "Active" : "Off"}
                        </button>
                      </div>
                      <p className="font-body text-[11px] text-muted-foreground">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Quick Stats
                </p>
                <div className="space-y-2">
                  <div className="border border-border bg-card p-3">
                    <p className="font-mono-ui text-[10px] uppercase text-muted-foreground">Total Contacts</p>
                    <p className="font-mono-ui text-lg font-bold text-secondary">200.1K</p>
                  </div>
                  <div className="border border-border bg-card p-3">
                    <p className="font-mono-ui text-[10px] uppercase text-muted-foreground">Active Workflows</p>
                    <p className="font-mono-ui text-lg font-bold text-secondary">12</p>
                  </div>
                  <div className="border border-border bg-card p-3">
                    <p className="font-mono-ui text-[10px] uppercase text-muted-foreground">Campaigns MTD</p>
                    <p className="font-mono-ui text-lg font-bold text-secondary">8</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "projects" && (
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Filter
              </p>
              <div className="space-y-1">
                {["All", "E-mail", "WhatsApp", "SMS"].map((f) => (
                  <button
                    key={f}
                    className="block w-full text-left px-3 py-2 font-mono-ui text-xs text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DISPLAY COLUMN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === "toolkit" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {!anyToolActive && (
              <div className="flex-1 flex items-center justify-center">
                <p className="font-mono-ui text-sm text-muted-foreground uppercase tracking-widest">
                  Activate a tool to begin
                </p>
              </div>
            )}
            {activeTools.workflows && (
              <div className={activeTools.charts ? "h-[45%] shrink-0 border-b border-border" : "flex-1"}>
                <WorkflowPanel />
              </div>
            )}
            {activeTools.charts && (
              <div className="flex-1 min-h-0">
                <ContactCharts />
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="flex-1 overflow-hidden p-6">
            <ProjectsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
