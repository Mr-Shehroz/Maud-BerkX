import JournalArchive from '@/components/journal/archive'
import FeaturedArticle from '@/components/journal/featured'
import JournalHero from '@/components/journal/hero'
import PodcastPromo from '@/components/journal/podcast-promo'
import JoinSection from '@/components/newsletter'

const Journal = () => {
  return (
    <section>
        <JournalHero />
        <FeaturedArticle />
        <JournalArchive />
        <PodcastPromo />
        <JoinSection />
    </section>
  )
}

export default Journal