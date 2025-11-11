'use client';

import React from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign in with Google",
      desc: "Create an account or sign in quickly using your Google account — one tap and you’re in.",
      icon: SignInIcon,
    },
    {
      number: 2,
      title: "Upload Your Document",
      desc: "Drop a PDF, DOCX, or paste notes directly. Uploads are fast and secure.",
      icon: UploadIcon,
    },
    {
      number: 3,
      title: "AI Processes Content",
      desc: "Our AI scans, extracts key points, and generates concise question-answer pairs.",
      icon: ProcessIcon,
    },
    {
      number: 4,
      title: "Review Flashcards",
      desc: "Preview, edit, and organize the generated flashcards to match your study style.",
      icon: ReviewIcon,
    },
    {
      number: 5,
      title: "Study & Learn",
      desc: "Use spaced repetition, smart quizzes and progress tracking to master the material.",
      icon: StudyIcon,
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#041133] py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-extrabold text-center text-white"
        >
          How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-orange-400">Works</span>
        </motion.h2>
        <p className="mt-4 text-center text-gray-300 max-w-2xl mx-auto">A simple 5-step flow to turn your notes into adaptive flashcards — fast.</p>

        <div className="relative mt-12 grid grid-cols-1 gap-10 md:gap-14 lg:grid-cols-2 xl:grid-cols-2">
          <div className="hidden lg:block absolute left-1/2 top-10 w-0.5 bg-gradient-to-b from-indigo-300 via-pink-400 to-orange-400 opacity-30 transform -translate-x-1/2" style={{ height: 'calc(60% - 2rem)' }} />

          {steps.map((s, idx) => (
            <motion.article
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`relative flex items-start gap-6 p-6 rounded-2xl shadow-lg hover:shadow-2xl bg-[#061b4a] border border-gray-700 transition-transform transform hover:-translate-y-1 ${
               s.number === 5 ? 'mx-auto col-span-2 max-w-lg' : ''
              }`}

            >
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-bold text-lg shadow">{s.number}</div>
                {s.number !== 5 && <div className="hidden lg:block h-full w-0.5 bg-gradient-to-b from-indigo-300 via-pink-400 to-orange-400 mt-4" />}
              </div>

              <div className="flex-1 max-w-xl">
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0a234f]">
                    <s.icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">{s.desc}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-center lg:items-start gap-3">
                  <button className="text-sm font-medium px-4 py-2 rounded-full border border-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 text-white shadow hover:scale-105 transform transition">Try Step {s.number}</button>
                  <span className="text-xs text-gray-400">Quick preview available</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 rounded-3xl p-6 bg-gradient-to-r from-indigo-900 to-[#041133] border border-gray-700 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-white">Live demo: AI extracts a key fact</h4>
              <p className="mt-2 text-sm text-gray-300">Hover the example flashcard to flip it and see question & answer generation in action.</p>
            </div>

            <div className="w-full lg:w-[360px]">
              <DemoFlashcard />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DemoFlashcard() {
  return (
    <motion.div
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-40 [transform-style:preserve-3d] [perspective:1000px]"
    >
      {/* FRONT */}
      <div className="absolute inset-0 rounded-xl p-6 bg-[#0a234f] border border-gray-600 shadow-md flex flex-col justify-between [backface-visibility:hidden]">
        <div>
          <h5 className="text-sm font-semibold text-white">Key Fact</h5>
          <p className="mt-2 text-xs text-gray-300">
            Mitochondria are the powerhouse of the cell — they produce ATP via cellular respiration.
          </p>
        </div>
        <div className="text-xs text-gray-400">Source: Uploaded Lecture Notes</div>
      </div>

      {/* BACK */}
      <div className="absolute inset-0 rounded-xl p-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md flex flex-col justify-between rotate-y-180 [backface-visibility:hidden]">
        <div>
          <h5 className="text-sm font-semibold">Generated Q&A</h5>
          <p className="mt-2 text-xs">
            Q: What role do mitochondria play in cells?
            <br />A: They generate ATP through cellular respiration.
          </p>
        </div>
        <div className="text-xs opacity-90">Confidence: High • Editable</div>
      </div>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
}

function SignInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12H3m0 0l3.5-3.5M3 12l3.5 3.5M21 12v6a2 2 0 01-2 2H9" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v12m0 0l-4-4m4 4l4-4M21 21H3" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v8m0 0l3-3m-3 3l-3-3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7 7h10v10H7z" />
    </svg>
  );
}

function StudyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20v-8m0 0L8 12m4 0l4 0M3 7h18" />
    </svg>
  );
}

