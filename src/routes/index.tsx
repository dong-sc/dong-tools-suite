import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ToolsGrid } from "@/components/site/ToolsGrid";
import { Upcoming } from "@/components/site/Upcoming";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <Nav />
      <main>
        <Hero />
        <ToolsGrid />
        <Upcoming />
      </main>
      <Footer />
    </div>
  );
}
