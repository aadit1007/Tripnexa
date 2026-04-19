import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PreviewSection from "../components/PreviewSection";
import FeaturesSection from "../components/FeaturesSection";
import TripsSection from "../components/TripsSection";
import PageShell from "../components/PageShell";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <PageShell>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PreviewSection />
        <FeaturesSection />
        <TripsSection />
      </main>
      <Footer />
    </PageShell>
  );
}
