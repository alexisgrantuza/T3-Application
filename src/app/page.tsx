import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { FileUploadDemo } from "~/components/FileUploadDemo";
import Navbar from "~/components/Navbar";
import FlashcardList from "~/components/FlashcardList";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }


  return (
    <HydrateClient>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Generated <span className="text-[hsl(280,100%,70%)]">AI</span>{" "}
            Flashcard
          </h1>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h2 className="text-3xl font-bold">
            Upload a file to generate flashcards
          </h2>
          <FileUploadDemo />
          <p className="text-lg text-gray-400">
            Supported formats: .txt, .pdf, .docx
          </p>
        </div>

        <div className="container px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold">Your Flashcards</h2>
          <FlashcardList />
        </div>
      </main>
    </HydrateClient>
  );
}
