// /app/about-us/page.js
import AboutUsClient from "@/app/about-us/AboutUsClient";

export const metadata = {
  title: "About Us | AnguliLekha",
  description:
    "Learn about AnguliLekha's mission to bridge communication gaps through Indian Sign Language recognition.",
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
