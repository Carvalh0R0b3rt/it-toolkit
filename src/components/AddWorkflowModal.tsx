import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, url: string) => void;
}

const AddWorkflowModal = ({ open, onClose, onAdd }: AddWorkflowModalProps) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (name.trim() && url.trim()) {
      onAdd(name.trim(), url.trim());
      setName("");
      setUrl("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="relative z-10 w-full max-w-lg border border-border bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-mono-ui text-sm font-semibold uppercase tracking-widest text-primary mb-6">
              Add n8n Workflow
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono-ui uppercase tracking-wider text-muted-foreground mb-2">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 font-mono-ui text-sm text-foreground caret-primary focus:outline-none focus:border-primary"
                  placeholder="e.g. Lead Nurture Sequence"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-ui uppercase tracking-wider text-muted-foreground mb-2">
                  Workflow Endpoint URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 font-mono-ui text-sm text-foreground caret-primary focus:outline-none focus:border-primary"
                  placeholder="https://n8n.example.com/webhook/..."
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="font-mono-ui text-xs uppercase tracking-wider px-6 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !url.trim()}
                className="font-mono-ui text-xs uppercase tracking-wider px-6 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Add Workflow
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddWorkflowModal;
