export default function HeroSection() {
  return (
    // Main hero section container
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center"
      style={{
        // Radial gradient background
        background: `radial-gradient(
          ellipse at 40% 30%, 
          rgba(2,0,36,1) 0%, 
          rgba(2,0,36,1) 59%, 
          rgba(255,105,31,1) 74%, 
          rgba(255,18,172,1) 84%, 
          rgba(0,212,255,1) 93%, 
          rgba(0,212,255,1) 100%
        )`,
      }}
    >
      {/* Content container with max width */}
      <div>
        {/* Main heading */}
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          {/* White text for the first line */}
          <span className="text-white">
            TRANSFORM your STUDY materials into
          </span>
          <br />
          {/* Gray text for the second line */}
          <span className="text-gray-400">SMART flashcards</span>
        </h1>

        {/* Subheading / description with gradient text */}
        <p className="bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-base text-transparent sm:text-lg md:text-xl">
          Your Brain’s New Best Friend: Adaptive AI Flashcards.
        </p>
      </div>
    </section>
  );
}
