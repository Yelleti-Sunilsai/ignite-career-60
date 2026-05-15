import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async (
    filePath: string
) => {
    try {
        // PDF
        if (filePath.endsWith(".pdf")) {
            const dataBuffer =
                fs.readFileSync(filePath);

            const data =
                await pdfParse(dataBuffer);

            return data.text;
        }

        // DOCX
        if (filePath.endsWith(".docx")) {
            const result =
                await mammoth.extractRawText({
                    path: filePath,
                });

            return result.value;
        }

        return "Unsupported file format";
    } catch (error) {
        console.log(
            "========== PDF ERROR =========="
        );

        console.log(error);

        console.log(
            "================================"
        );

        return "Failed to extract text";
    }
};