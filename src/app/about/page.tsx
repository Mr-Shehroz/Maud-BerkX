import CredentialsSection from "@/components/about/credentials"
import AboutHero from "@/components/about/hero"
import MissionApproachSection from "@/components/about/mission"
import StorySection from "@/components/about/story"

const About = () => {
  return (
    <section>
        <AboutHero />
        <StorySection />
        <MissionApproachSection />
        <CredentialsSection />
    </section>
  )
}

export default About