import AboutSection from '@/components/about';
import FaithVisionSection from '@/components/FaithVisionSection';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/Hero';
import JournalSection from '@/components/journal';
import NewsletterSection from '@/components/newsletter';
import PodcastSection from '@/components/podcast';
import TestimonialsSection from '@/components/testimonials';
import CoreValuesSection from '@/components/values';

export default function Home() {
  return (
    <main className="relative bg-[#f6f6f6] overflow-x-hidden">
      <Header />
      <Hero />
      <AboutSection />
      <CoreValuesSection />
      <FaithVisionSection />
      <TestimonialsSection />
      <JournalSection />
      <PodcastSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}