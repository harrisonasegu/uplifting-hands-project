<script setup lang="ts">
import Card from './card_youtubeVideoCard.vue'
</script>

<template>
  <div class="cards-container">
    <div class="cards-wrap">
      <Card video-url="https://www.youtube.com/embed/CVtkXJL60JY" />
      <Card video-url="https://www.youtube.com/embed/CVtkXJL60JY" />
      <Card video-url="https://www.youtube.com/embed/CVtkXJL60JY" />
      <Card video-url="https://www.youtube.com/embed/CVtkXJL60JY" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // cards container
  div.cards-container {
    width: 100%;
    overflow-x: hidden;
    // background: #F5F5F5;

    div.cards-wrap {
      width: 100%;
      padding: 79px 50px;
      display: flex;
      flex-wrap: wrap;
      row-gap: 50px;
      column-gap: 31px;
      justify-content: center;
    }
  }

  // MEDIA QUERY

  // XX-SM (<251px)
  @media (max-width: 250.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 30px 20px;
      }
    }
  }

  // XX-SM
  @media (min-width: 251px) and (max-width: 350.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 30px 20px;
      }
    }
  }

  // X-SM
  @media (min-width: 351px) and (max-width: 575.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 30px 20px;
      }
    }
  }

  // SM
  @media (min-width: 576px) and (max-width: 767.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 30px 20px;
      }
    }
  }

  // MD
  @media (min-width: 768px) and (max-width: 991.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 30px 8px;
      }
    }
  }

  // LG
  @media (min-width: 992px) and (max-width: 1200.9px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 55px 0;
        column-gap: 20px;
      }
    }
  }

  // XXL
  @media (min-width: 1500px) {
    // cards container
    div.cards-container {
      div.cards-wrap {
        padding: 70px 165px;
      }
    }
  }
</style>
