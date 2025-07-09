import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateFlashcards } from "~/server/server/services/ai-services";
import { processFile } from "~/server/server/services/file-processor";

export const flashcardRouter = createTRPCRouter({
  createFlashcards: protectedProcedure
    .input(
      z.object({
        fileData: z.string(),
        fileName: z.string(),
        fileType: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileData, fileType, title, description } = input;

      const buffer = Buffer.from(fileData, "base64");
      const blobData = new Blob([buffer], { type: fileType });

      // Process the file to extract text
      const text = await processFile(blobData, fileType);

      // Generate flashcards using AI
      const flashcards = await generateFlashcards(text);

      // Save flashcards to the database
      const createdFlashcardSet = await ctx.db.flashcardSet.create({
        data: {
          title: title ?? "Untitled Flashcard Set",
          description: description ?? "No description provided",
          fileName: input.fileName,
          fileType: input.fileType,
          userId: ctx.session.user.id,
          flashcards: {
            create: flashcards.map((card) => ({
              question: card.question,
              answer: card.answer,
              difficulty: card.difficulty || "medium",
            })),
          },
        },
        include: {
          flashcards: true,
        },
      });

      return createdFlashcardSet;
    }),

  getFlashcardSets: protectedProcedure.query(async ({ ctx }) => {
    const flashcardSets = await ctx.db.flashcardSet.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        flashcards: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return flashcardSets;
  }),

  getFlashcardSetById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const flashcardSet = await ctx.db.flashcardSet.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id, // Ensure the user owns the flashcard set
        },
        include: {
          flashcards: true,
        },
      });
      if (!flashcardSet) {
        throw new Error("Flashcard set not found");
      }
      return flashcardSet;
    }),
});
