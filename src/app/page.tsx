import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { FeatureDemo } from "@/components/ui/demo";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroGeometric />
      <FeatureDemo />
      <Footer />
    </>
  );
}
