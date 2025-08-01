import { cn } from "~/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Buffer } from "buffer";
import { api } from "~/trpc/react";
import { GridPattern } from "~/components/ui/grid-pattern";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  endpoint = "documentUploader",
  onUploadComplete,
  onUploadError,
}: {
  onChange?: (files: File[]) => void;
  endpoint?: "documentUploader";
  onUploadComplete?: (res: string) => void;
  onUploadError?: (error: string) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createFlashcards = api.flashcard.createFlashcards.useMutation({
    onSuccess: (data) => {
      console.log("Flashcards created successfully:", data);
      setIsUploading(false);
      if (onUploadComplete) {
        onUploadComplete("Flashcards created successfully");
      }
    },
    onError: (error) => {
      console.error("Error creating flashcards:", error);
      setIsUploading(false);
      if (onUploadError) {
        onUploadError(error.message || "Failed to create flashcards");
      }
    },
  });

  // Unified file processing function
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    // Add file to local state to show in UI
    setFiles((prevFiles) => [...prevFiles, file]);

    if (onChange) {
      onChange([file]);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64File = Buffer.from(arrayBuffer).toString("base64");

      await createFlashcards.mutateAsync({
        fileData: base64File,
        fileName: file.name,
        fileType: file.type,
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: `Flashcards generated from ${file.name}`,
      });
    } catch (error) {
      console.error("Error creating flashcards:", error);
      // Remove file from state if upload failed
      setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
      if (onUploadError) {
        onUploadError(
          error instanceof Error
            ? error.message
            : "Failed to create flashcards",
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    const file = newFiles[0]; // Since we only accept single files
    if (file) {
      void handleFileUpload(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input value to allow re-uploading the same file
    }
  };

  const handleDeleteFile = (indexToDelete: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete),
    );
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        void handleFileUpload(file);
      }
    },
    onDropRejected: (rejectedFiles) => {
      console.log("Rejected files:", rejectedFiles);
      if (onUploadError) {
        onUploadError("File type not supported or file too large");
      }
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={(e) => handleFileChange(Array.from(e.target.files ?? []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-300 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative mx-auto mt-10 w-full max-w-xl">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-24 dark:bg-neutral-900",
                    "shadow-sm",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
                    >
                      {file.name}
                    </motion.p>
                    <div className="flex items-center gap-2">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(idx);
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        title="Delete file"
                      >
                        <IconX className="h-3 w-3" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-black group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-neutral-100"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-100 dark:text-neutral-600" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-white dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
              ></motion.div>
            )}
          </div>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <p className="text-neutral-600 dark:text-neutral-300">
                Processing file and generating flashcards...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
