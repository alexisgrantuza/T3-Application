declare module "pdf-parse" {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: never;
    metadata: never;
    version: string;
    text: string;
  }

  function parse(
    buffer: Buffer | Uint8Array,
    options?: never,
  ): Promise<PDFData>;

  export default parse;
}
