import { useState } from "react";

import { uploadResume } from "@/services/resume.service";

import { toast } from "sonner";

export default function UploadPage() {
    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const handleUpload = async () => {
        console.log("clicked");
        if (!file) {
            toast.error("Please select a file");

            return;
        }

        try {
            setLoading(true);

            const data = await uploadResume(file);

            toast.success(
                "Resume uploaded successfully"
            );

            console.log(data);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <button onClick={handleUpload}>
                {loading
                    ? "Uploading..."
                    : "Upload Resume"}
            </button>
        </div>
    );
}