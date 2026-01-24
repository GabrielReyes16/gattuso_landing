import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
