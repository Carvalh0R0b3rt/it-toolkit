import { useState } from "react";
import { ActiveTab } from "@/types/toolkit";
import WorkflowPanel from "@/components/WorkflowPanel";
import ContactCharts from "@/components/ContactCharts";
import ProjectsPanel from "@/components/ProjectsPanel";

const tabs: { key: ActiveTab; label: string }[] = [
  { key: "toolkit", label: "Toolkit" },
  { key: "projects", label: "Projects" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("toolkit");

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* CONTROL COLUMN */}
      <div className="w-64 shrink-0 border-r border-border flex flex-col bg-background">
        <div className="px-5 py-5 border-b border-border">
          <h1 className="font-mono-ui text-sm font-bold uppercase tracking-widest text-secondary">
            MarketOps
          </h1>
        </div>

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

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          {activeTab === "toolkit" && (
            <div className="space-y-4">
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
            <div className="h-[45%] shrink-0 border-b border-border">
              <WorkflowPanel />
            </div>
            <div className="flex-1 min-h-0">
              <ContactCharts />
            </div>
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
