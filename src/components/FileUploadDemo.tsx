"use client";

import { useState, useCallback } from "react";
import { FileUpload } from "~/components/ui/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    console.log("Files dropped:", acceptedFiles);
  }, []);

  const handleUploadComplete = (res: string) => {
    console.log("Upload complete! Files:", res);
    // You can handle the uploaded files here
    // For example, save file URLs to state or send to your backend
  };

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error);
    alert("Upload failed. Please try again.");
  };

  return (
    <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <FileUpload
        onChange={onDrop}
        endpoint="documentUploader"
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
    </div>
  );
}
