// utils/fileTypes.ts
export const ALLOWED_FILE_TYPES = [
  // PDF
  "application/pdf",

  // MS Word (older)
  "application/msword",

  // DOCX
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Plain text
  "text/plain",

  // ... add more as needed
];

/**
 * Checks if a file's MIME type is one of the allowed types.
 * Optionally, you could also fallback to extension checks if needed.
 */
export function isAllowedFileType(file: File): boolean {
  return ALLOWED_FILE_TYPES.includes(file.type);
}
