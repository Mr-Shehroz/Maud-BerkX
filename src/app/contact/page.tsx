import ContactAvailabilitySection from "@/components/contact/availability";
import ContactFormSection from "@/components/contact/form";
import ContactHeroSection from "@/components/contact/hero";
import ContactProcessSection from "@/components/contact/process";


export default function ContactPage() {
  return (
    <main>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactProcessSection />
      <ContactAvailabilitySection />
    </main>
  );
}