// fileCheck.ts
export const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  
  export function isAllowedFileType(file: File): boolean {
    return ALLOWED_FILE_TYPES.includes(file.type);
  }
  