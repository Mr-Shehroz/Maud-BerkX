import JournalArchive from '@/components/journal/archive'
import CategoriesFilter from '@/components/journal/categories'
import FeaturedArticle from '@/components/journal/featured'
import JournalHero from '@/components/journal/hero'
import JoinSection from '@/components/newsletter'

const Journal = () => {
  return (
    <section>
        <JournalHero />
        <FeaturedArticle />
        <JournalArchive />
        <JoinSection />
        {/* <CategoriesFilter /> */}
    </section>
  )
}

export default Journal