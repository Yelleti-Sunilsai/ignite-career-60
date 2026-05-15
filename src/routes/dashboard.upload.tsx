import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/upload")({ component: UploadPage });

function UploadPage() {
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  function fakeUpload() {
    setFile({ name: "ada_lovelace_resume.pdf", size: "248 KB" });
    setScanning(true);
    setTimeout(() => { setScanning(false); setDone(true); }, 3500);
  }

  return (
    <DashboardShell title="Upload Resume" subtitle="PDF or DOCX. Max 10MB.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.label
            htmlFor="file"
            whileHover={{ scale: 1.005 }}
            className="glass relative flex h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-white/15 text-center"
          >
            <input id="file" type="file" className="hidden" onChange={fakeUpload} accept=".pdf,.docx" />
            <div className="absolute inset-0 bg-gradient-aurora opacity-5" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary glow-purple">
              <Upload className="h-7 w-7 text-white" />
            </motion.div>
            <h3 className="mt-5 text-xl font-semibold">Drop your resume here</h3>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1">.PDF</span>
              <span className="rounded-full bg-white/5 px-3 py-1">.DOCX</span>
            </div>
          </motion.label>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {file && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary"><FileText className="h-5 w-5 text-white" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.size}</div>
                  </div>
                  <button onClick={() => { setFile(null); setDone(false); setScanning(false); }}><X className="h-4 w-4 text-muted-foreground" /></button>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: scanning ? "70%" : done ? "100%" : "0%" }} transition={{ duration: scanning ? 3 : 0.5 }} className="h-full bg-gradient-primary" />
                </div>

                {scanning && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}>
                      <Sparkles className="h-4 w-4 text-accent" />
                    </motion.div>
                    <span className="text-muted-foreground">AI is analyzing your resume…</span>
                  </div>
                )}
                {done && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-accent"><CheckCircle2 className="h-4 w-4" />Analysis ready</div>
                    <Button asChild className="w-full bg-gradient-primary text-white"><Link to="/dashboard/analysis">View Analysis</Link></Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-2xl p-5 text-sm">
            <div className="font-medium">Pro tips</div>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• Use a single-column layout</li>
              <li>• Avoid images and tables</li>
              <li>• Save as PDF (text-based)</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}