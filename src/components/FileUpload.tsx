"use client";

import React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useDropzone } from "react-dropzone";
import { Card } from "~/components/ui/card";
// Import necessary components and hooks

export function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const createFlashcards = api.flashcard.createFlashcards.useMutation({
    onSuccess: (data) => {
      console.log("Flashcards created successfully:", data);
      setIsUploading(false);
    },
    onError: (error) => {
      console.error("Error creating flashcards:", error);
      setIsUploading(false);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: (acceptedFiles) => {
      const handleFileUpload = async () => {
        setIsUploading(true);
        const file = acceptedFiles[0];
        if (!file) return;

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
        } finally {
          setIsUploading(false);
        }
      };

      void handleFileUpload();
    },
  });
  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p className="text-gray-500">
              Drag & drop a file here, or click to select a file
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Supported formats: .txt, .pdf, .docx
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              Drag & drop a file here, or click to select a file
            </p>
          </>
        )}
      </div>

      {isUploading && (
        <div className="mt-4">
          <p>Processing file and generating flashcards...</p>
        </div>
      )}
    </Card>
  );
}

export default FileUpload;
