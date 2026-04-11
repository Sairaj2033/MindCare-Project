import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClearNotifications() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <button
        onClick={() => toast.dismiss()}
        className="flex items-center gap-2 bg-card/80 backdrop-blur text-muted-foreground hover:text-foreground hover:bg-accent border border-border shadow-lg font-medium px-4 py-2 rounded-full transition-all opacity-80 hover:opacity-100"
        title="Clear all active notifications"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
        <span className="text-sm">Clear All</span>
      </button>
    </div>
  );
}
