<script setup lang="ts">
import Welcome from '@/components/homepage/welcomeComponent.vue'
import CardContainer from '@/components/card-containers/applicationCardContainer.vue'
import DonationComponent from '@/components/homepage/donationComponent.vue'
import ImpactComponent from '@/components/homepage/impactComponent.vue'
import Carousel from '@/components/carousel/carousel.vue'
import HomepageSection from '@/components/sections/homepageSection.vue'

const applicationSummary = [1250, 1000, 200, 50]
</script>

<template>
  <div class="page-view">
    <Welcome /> 

    <CardContainer
      :applicationSummary="applicationSummary"
      backgroundColor="#F5F5F5"
    />

    <HomepageSection>
      <template #caption>Make a Donation</template>
      <DonationComponent />
    </HomepageSection> 

    <HomepageSection bg-class-name="white-bg">
      <template #caption>Our Impact</template>
      <ImpactComponent />
    </HomepageSection>

    <Carousel /> 
  </div>
</template>
