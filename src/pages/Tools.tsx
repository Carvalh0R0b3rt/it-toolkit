/**
 * Tools Page
 *
 * Grid layout displaying available automation tools as cards.
 * Each card represents an n8n workflow or external tool that can
 * be triggered on demand.
 *
 * Styling uses semantic tokens from index.css:
 *   - bg-background / text-foreground  → page base
 *   - bg-card / text-card-foreground   → card surfaces
 *   - text-secondary                   → orange accent (#ff5d00)
 *   - border-border                    → subtle dividers
 *   - text-muted-foreground            → descriptions
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, FileText } from "lucide-react";

/** Tool definition — add new entries here to extend the grid. */
interface Tool {
  id: string;
  /** Display name shown on the card header */
  name: string;
  /** Short explanation of what the tool does */
  description: string;
  /** Label for the action button */
  buttonLabel: string;
  /** Simulated async duration in ms (will be replaced by real n8n calls) */
  duration: number;
}

/** Registry of available tools. Each entry renders as a card in the grid. */
const TOOLS: Tool[] = [
  {
    id: "vencidos-15",
    name: "Vencidos - 15 dias",
    description:
      "Gera um relatório personalizado dos clientes com contratos vencidos há mais de 15 dias, incluindo detalhes de contato e histórico de interações.",
    buttonLabel: "Gerar Relatório",
    duration: 3000,
  },
];

const Tools = () => {
  /** Tracks which tool is currently running (by id) */
  const [runningId, setRunningId] = useState<string | null>(null);

  /**
   * Simulates triggering an n8n workflow.
   * TODO: Replace setTimeout with a real fetch to the n8n webhook URL.
   */
  const handleRun = (tool: Tool) => {
    setRunningId(tool.id);
    toast.info(`Gerando relatório: ${tool.name}...`);
    setTimeout(() => {
      setRunningId(null);
      toast.success(`Relatório "${tool.name}" gerado com sucesso!`);
    }, tool.duration);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center gap-4">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-mono-ui text-sm font-bold uppercase tracking-widest text-secondary">
          Ferramentas
        </h1>
      </header>

      {/* Card grid — auto-fills columns at 320px min width */}
      <main className="p-6 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {TOOLS.map((tool) => {
          const isRunning = runningId === tool.id;

          return (
            <article
              key={tool.id}
              className="border border-border bg-card p-6 flex flex-col gap-4"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-secondary shrink-0" />
                <h2 className="font-mono-ui text-sm font-semibold text-foreground">
                  {tool.name}
                </h2>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {tool.description}
              </p>

              {/* Action button — uses secondary (orange) accent */}
              <button
                onClick={() => handleRun(tool)}
                disabled={isRunning}
                className={`mt-auto font-mono-ui text-xs uppercase tracking-wider px-4 py-2.5 border transition-colors self-start ${
                  isRunning
                    ? "border-secondary bg-secondary/20 text-secondary animate-pulse cursor-wait"
                    : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {isRunning ? "Gerando…" : tool.buttonLabel}
              </button>
            </article>
          );
        })}
      </main>
    </div>
  );
};

export default Tools;
