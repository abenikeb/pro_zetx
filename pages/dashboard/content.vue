<template>
  <div class="w-full flex flex-col justify-center items-center">
    <span class="text-lg md:text-2xl font-semibold mb-6 mt-4"
      >Navigate greencheddar easily</span
    >

    <div class="w-full md:w-4/5 mx-2">
      <video-player
        src="https://player.vimeo.com/video/657840656?h=bfa7455d28&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&portrait=0&byline=0"
      />
    </div>
    <span class="text-xl md:text-3xl font-semibold text-center mt-6 text-accent"
      >Articles
    </span>
    <div class="flex flex-col md:flex-row mt-7">
      <div
        class="
          card
          w-full
          md:w-1/3
          card-bordered card-compact
          bg-gray-100
          lg:card-normal
          mt-2
          md:mx-5
        "
      >
        <figure>
          <img src="~assets/images/cop.jpg" />
        </figure>
        <div class="card-body">
          <a
            href="https://carbonmarketwatch.org/2021/10/28/cop26-five-reasons-why-carbon-markets-article-6-matter/"
            target="_blank"
            class="link-hover"
          >
            <h2 class="card-title text-accent">
              Five reasons why carbon markets matter
            </h2>
            <p>
              Carbon markets are high on the agenda at the UN’s COP26 climate
              change conference. Carbon Market Watch’s Gilles Dufrasne has
              prepared this handy guide to explain the issues at stake related
              to Article 6.
            </p>
          </a>
        </div>
      </div>
      <div
        class="
          card
          w-full
          md:w-1/3
          card-bordered card-compact
          lg:card-normal
          bg-gray-100
          mt-3
          md:mx-5
        "
      >
        <figure>
          <img src="~assets/images/blog1.png" />
        </figure>
        <div class="card-body">
          <a
            href="https://www.bbc.com/news/explainers-59232599"
            target="_blank"
            class="link-hover"
          >
            <h2 class="card-title text-accent">
              Climate change: Do I need to stop eating meat?
            </h2>
            <p>
              Almost a quarter of global greenhouse gas emissions comes from
              agriculture and other related land use, according to the United
              Nations. With livestock being one of the main contributors
            </p>
          </a>
        </div>
      </div>
      <div
        class="
          card
          w-full
          md:w-1/3
          card-bordered card-compact
          lg:card-normal
          bg-gray-100
          mt-3
          md:mx-5
        "
      >
        <figure>
          <img src="~assets/images/energy.png" />
        </figure>
        <div class="card-body">
          <a
            href="https://www.energysage.com/energy-efficiency/why-conserve-energy/environmental-impact-of-ee/"
            class="link-hover"
            target="_blank"
          >
            <h2 class="card-title text-accent">
              The environmental benefits of energy efficiency
            </h2>
            <p>
              It’s not uncommon to question exactly how your home’s electricity
              use relates to greenhouse gas (GHG) emissions. In contrast to the
              straightforward combustion of fossil fuels that occurs when we
              drive
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VideoPlayer from 'nuxt-video-player'

require('nuxt-video-player/src/assets/css/main.css')
export default {
  data() {
    return {
      src: 'https://player.vimeo.com/api/player.js',
    }
  },
  components: {
    VideoPlayer,
  },
}
</script>
