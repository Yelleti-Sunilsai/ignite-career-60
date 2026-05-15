import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { uploadResume } from "@/services/resume.service";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/upload")({
  component: UploadPage,
});

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    try {
      setScanning(true);
      const data = await uploadResume(file);
      
      // Store the full response for the analysis page
      localStorage.setItem("resumeAnalysis", JSON.stringify(data));
      
      setScanning(false);
      setDone(true);
      toast.success("Resume uploaded successfully");
    } catch (error: any) {
      console.error(error);
      setScanning(false);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };


  return (
    <DashboardShell title="Upload Resume" subtitle="PDF or DOCX. Max 10MB.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.label
            htmlFor="file"
            whileHover={{ scale: 1.005 }}
            className="glass relative flex h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-white/15 text-center"
          >
            <input
              id="file"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <div className="absolute inset-0 bg-gradient-aurora opacity-5" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary glow-purple"
            >
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
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{selectedFile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setDone(false);
                      setScanning(false);
                    }}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: scanning ? "70%" : done ? "100%" : "0%" }}
                    transition={{ duration: scanning ? 3 : 0.5 }}
                    className="h-full bg-gradient-primary"
                  />
                </div>

                {scanning && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4 text-accent" />
                    </motion.div>
                    <span className="text-muted-foreground">AI is analyzing your resume…</span>
                  </div>
                )}

                {done && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                      Analysis ready
                    </div>
                    <Button asChild className="w-full bg-gradient-primary text-white">
                      <Link to="/dashboard/analysis">View Analysis</Link>
                    </Button>
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
