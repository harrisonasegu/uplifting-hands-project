<script setup lang="ts">
  defineProps<{
    videoUrl: string
  }>()
</script>

<template>
  <div class="video-item">
    <iframe 
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>
  
  <style lang="scss" scoped>
  // cards item
  div.video-item {
    width: 286px;
    height: fit-content;
  
    &>iframe {
      width: 100%;
    }
  }
  
  // MEDIA QUERY
  
  // XX-SM (<251px)
  @media (max-width: 250.9px) {
    // cards item
    div.video-item {
      width: 100%;
    }
  }
  
  // XX-SM
  @media (min-width: 251px) and (max-width: 350.9px) {
    // cards item
    div.video-item {
      width: 100%;
    }
  }
  
  // X-SM
  @media (min-width: 351px) and (max-width: 575.9px) {
    // cards item
    div.video-item {
      width: 100%;
    }
  }
  
  // SM
  @media (min-width: 576px) and (max-width: 767.9px) {
    // cards item
    div.video-item {
      width: calc((100% / 2.2) - 5px);
    }
  }
  
  // MD
  @media (min-width: 768px) and (max-width: 991.9px) {
    // cards item
    div.video-item {
      width: calc((100% / 2.2) - 5px);
    }
  }
  
  // LG
  @media (min-width: 992px) and (max-width: 1200.9px) {
    // cards item
    div.video-item {
      width: calc((100% / 4.5) - 5px);
    }
  }
  
  // XL
  @media (min-width: 1201px) {
    div.video-item {
      width: calc((100% / 4.5) - 5px);
    }
  }
  </style>
  