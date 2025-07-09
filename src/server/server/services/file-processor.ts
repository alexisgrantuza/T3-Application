import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function processFile(
  blobData: Blob | string,
  fileType: string,
): Promise<string> {
  const response = await fetch(
    blobData instanceof Blob ? URL.createObjectURL(blobData) : blobData,
  );
  const buffer = await response.arrayBuffer();

  switch (fileType) {
    case "application/pdf":
      const pdfData = await pdf(Buffer.from(buffer));
      return pdfData.text;

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      const docxResult = await mammoth.extractRawText({
        buffer: Buffer.from(buffer),
      });
      return docxResult.value;

    case "text/plain":
    case "text/markdown":
      return new TextDecoder().decode(buffer);

    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}
