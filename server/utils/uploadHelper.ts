import mammoth from "mammoth";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";
import Tesseract from "tesseract.js";

async function convertDocToDocxWithAPI(buffer: ArrayBuffer): Promise<Buffer> {
  return Buffer.from([]);
}

export async function extractFileToText(file: File): Promise<string> {
  const mime = file.type;
  const buffer = await file.arrayBuffer();

  if (mime === "application/pdf") {
    // PDF logic
    const buffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const result = await extractText(pdf, { mergePages: true });
    return Array.isArray(result.text) ? result.text.join(" ") : result.text;
  } else if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docxResult = await mammoth.extractRawText({
      buffer: Buffer.from(buffer),
    });
    return docxResult.value;
  } else if (mime === "text/plain") {
    return Buffer.from(buffer).toString("utf8");
  } else if (mime === "text/csv") {
        // === Use csv-parse/sync instead of PapaParse ===
        const csvText = Buffer.from(buffer).toString("utf8");
        // parse returns an array of arrays by default
        const records = parse(csvText, {
          skip_empty_lines: true,
          // other options as needed (e.g., delimiter)
        });
        // records is an array of arrays
        // so we convert each row to a string, then join rows with newlines
        return records.map((row: string[]) => row.join(" ")).join("\n");    
  } else if (
    mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    const workbook = XLSX.read(buffer, { type: "array" });
    let textOutput = "";
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(sheet);
      textOutput += `--- Sheet: ${sheetName} ---\n${csv}\n`;
    });
    return textOutput;
  } else if (mime.startsWith("image/")) {
    const {
      data: { text },
    } = await Tesseract.recognize(Buffer.from(buffer));
    return text;
  } else if (mime === "application/msword") {
    const docxBuffer = await convertDocToDocxWithAPI(buffer);
    const docxResult = await mammoth.extractRawText({ buffer: docxBuffer });
    return docxResult.value;
  } else {
    throw new Error(`Unsupported file type: ${mime}`);
  }

  //return Promise.resolve("Hello World");
}