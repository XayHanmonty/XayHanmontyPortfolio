import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type VisitorProps = Record<string, never>;
type CounterResponse = { pk: string; count: number };

const API_BASE =
  "https://gm2nkn3li9.execute-api.us-west-2.amazonaws.com"; // API GATEWAY URL

const Visitor = forwardRef<HTMLDivElement, VisitorProps>((_, ref) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const didRunRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        // Prevent double run in React 18 StrictMode (dev)
        if (didRunRef.current) return;
        didRunRef.current = true;

        const pk = encodeURIComponent("site#global");
        const sessionKey = "visitorCounter.incremented";

        // Increment once per session; prefer POST's returned count
        if (!sessionStorage.getItem(sessionKey)) {
          const postRes = await fetch(`${API_BASE}/counter?pk=${pk}`, {
            method: "POST",
            signal: controller.signal,
          });
          if (!postRes.ok) throw new Error(`POST /counter ${postRes.status}`);
          const postData = (await postRes.json()) as CounterResponse;
          if (typeof postData?.count === "number") {
            setVisitorCount(postData.count);
            sessionStorage.setItem(sessionKey, "1");
            return; // no need for a follow-up GET
          }
        }

        // Fallback/read
        const getRes = await fetch(`${API_BASE}/counter?pk=${pk}`, {
          method: "GET",
          signal: controller.signal,
        });
        if (!getRes.ok) throw new Error(`GET /counter ${getRes.status}`);
        const getData = (await getRes.json()) as CounterResponse;
        setVisitorCount(typeof getData?.count === "number" ? getData.count : 0);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-32"
      >
        <h2 className="text-3xl font-light mb-12 tracking-wider text-center">
          Visitors
        </h2>

        <div className="flex justify-center mb-16">
          <ul
            className="space-y-3 text-gray-400 font-light flex flex-col items-center"
            aria-live="polite"
          >
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
