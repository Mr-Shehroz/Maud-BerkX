import PodcastSection from '@/components/podcast'
import Categories from '@/components/podcast/categories'
import EpisodesArchive from '@/components/podcast/episodes'
import FeaturedEpisode from '@/components/podcast/featured'
import PodcastHero from '@/components/podcast/hero'
import PodcastSubscribe from '@/components/podcast/podcastsubscribe'
import React from 'react'

const Podcast = () => {
  return (
    <section>
        <PodcastHero />
        <FeaturedEpisode />
        <EpisodesArchive />
        <Categories />
        <PodcastSubscribe />
    </section>
  )
}

export default Podcast