import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type VisitorProps = Record<string, never>;
type CounterResponse = { pk: string; count: number };

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://gm2nkn3li9.execute-api.us-west-2.amazonaws.com";

const PK = encodeURIComponent("visitor#site");

const Visitor = forwardRef<HTMLDivElement, VisitorProps>((_, ref) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
  
    const fetchCount = async () => {
      const res = await fetch(`${API_BASE}/counter?pk=${PK}`, {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`GET /counter ${res.status}`);
      const data = (await res.json()) as CounterResponse;
      return data.count ?? 0;
    };
  
    const run = async () => {
      try {
        // Try once, then retry after 200ms if it fails
        try {
          setVisitorCount(await fetchCount());
        } catch {
          await new Promise((r) => setTimeout(r, 200));
          setVisitorCount(await fetchCount());
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Visitor counter error:", err);
        setErrorMsg("Unable to load visitor count.");
        setVisitorCount(0);
      }
    };
  
    run();
    return () => controller.abort();
  }, []);

  const text =
    visitorCount !== null
      ? `Total Visitors: ${visitorCount}`
      : errorMsg ?? "Loading visitor count...";

  return (
    <div id="counter" ref={ref} className="max-w-4xl mx-auto mb-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-32">
        <h2 className="text-3xl font-light mb-12 tracking-wider text-center">Visitors</h2>
        <div className="flex justify-center mb-16">
          <ul className="space-y-3 text-gray-400 font-light flex flex-col items-center" aria-live="polite">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              {text}
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
});

Visitor.displayName = "Visitor";
export default Visitor;
