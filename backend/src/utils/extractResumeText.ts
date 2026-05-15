import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { PdfReader } from "pdfreader";

export const extractResumeText = async (
    filePath: string
) => {
    try {
        // PDF
        if (filePath.endsWith(".pdf")) {
            const dataBuffer = fs.readFileSync(filePath);
            
            try {
                const data = await pdfParse(dataBuffer);
                return data.text;
            } catch (pdfParseError: any) {
                console.log("pdf-parse failed, trying fallback...", pdfParseError.message);
                
                // Fallback to pdfreader for more robust parsing of "bad" PDFs
                return new Promise((resolve, reject) => {
                    let text = "";
                    new PdfReader().parseBuffer(dataBuffer, (err: any, item: any) => {
                        if (err) {
                            console.error("pdfreader failed too:", err);
                            reject("Failed to extract text");
                        } else if (!item) {
                            resolve(text);
                        } else if (item.text) {
                            text += item.text + " ";
                        }
                    });
                });
            }
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