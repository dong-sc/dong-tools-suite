import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { ToolsGrid } from "@/components/site/ToolsGrid";
import { Upcoming } from "@/components/site/Upcoming";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ToolsGrid />
        <Upcoming />
      </main>
      <Footer />
    </div>
  );
}
