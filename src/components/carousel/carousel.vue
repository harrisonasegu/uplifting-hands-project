<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { NCarousel } from 'naive-ui'

import img1 from '@/assets/Images/carousel-images/img1.png'
import img2 from '@/assets/Images/carousel-images/img2.png'
import img3 from '@/assets/Images/carousel-images/img3.png'
import img4 from '@/assets/Images/carousel-images/img4.png'
import img5 from '@/assets/Images/carousel-images/img5.png'
import img6 from '@/assets/Images/carousel-images/img6.png'


const imageUrls = [
  img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6
]

const deviceWidth = window.innerWidth

const carouselOptions = reactive({
  slidesPerPage: 6,
  spaceBetween: 26,
  draggable: true,
  autoplay: true,
  centeredSlides: false
})

const updateCarouselProps = () => {

  if (deviceWidth <= 299.9) {
    carouselOptions.slidesPerPage = 2
    carouselOptions.spaceBetween = 5
    carouselOptions.centeredSlides = true
  }

  if (deviceWidth > 299.9 && deviceWidth < 575.9) {
    carouselOptions.slidesPerPage = 3
    carouselOptions.spaceBetween = 10
    carouselOptions.centeredSlides = true
  }

  if (deviceWidth > 575.9 && deviceWidth < 767.9) {
    carouselOptions.slidesPerPage = 5
    carouselOptions.spaceBetween = 13
  }

  if (deviceWidth > 767.9 && deviceWidth < 991.9) {
    carouselOptions.slidesPerPage = 6
    carouselOptions.spaceBetween = 20
  }
}

onBeforeMount(() => updateCarouselProps())
</script>

<template>
  <div class="carousel-container">
    <h2>Partners</h2>
    
    <n-carousel
      :slides-per-view="carouselOptions.slidesPerPage"
      :space-between="carouselOptions.spaceBetween"
      :draggable="carouselOptions.draggable"
      :autoplay="carouselOptions.autoplay"
      :centered-slides="carouselOptions.centeredSlides"
    >
      <div
        v-for="(url, index) in imageUrls" 
        :key="index"
        class="carousel-item" 
      >
        <img
          :src="url"
          alt="Partner logo"
        />
      </div>

      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === (index as number) - 1 }"
            @click="to((index as number) - 1)" />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<style lang="scss" scoped>
div.carousel-container {
  padding-top: 37px;
  padding-bottom: 52px;
  display: flex;
  flex-direction: column;
  row-gap: 76px;
  background-color: $base-color;

  &>h2 {
    // border: 2px solid red;
    font-weight: 800;
    font-size: 35px;
    text-align: center;
    color: #FFFFFF;
  }

  &>.n-carousel {
    height: max-content;
    overflow: visible;
    .carousel-item {
      width: 239px;
      height: 228px;
      object-fit: contain;

      // img {}
    }

    .custom-dots {
      width: 100%;
      margin-top: 78px;
      display: flex;
      column-gap: 9px;
      justify-content: center;

      & li {
        display: inline-block;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background-color: #FFFFFF;
        transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;

        &.is-active {
          background-color: $carousel-dot-grey;
        }
      }
    }
  }
}

@media (max-width: 299.9px) {
  div.carousel-container {
    row-gap: 50px;
    &>h2 {
      font-weight: normal;
      font-size: 25px;
    }

    &>.n-carousel {
      .carousel-item {
        width: 100px;
        height: 81px;

        img {
          height: inherit;
        }
      }

      .custom-dots {
        display: none;
      }
    }
  }
}

@media (min-width: 300px) and (max-width: 575.9px) {
  div.carousel-container {
    row-gap: 50px;
    &>h2 {
      font-weight: normal;
      font-size: 25px;
    }

    &>.n-carousel {
      .carousel-item {
        width: 111px;
        height: 90px;

        img {
          height: inherit;
        }
      }

      .custom-dots {
        margin-top: 50px;

        & li {
          width: 5px;
          height: 5px;
        }
      }
    }
  }
}

@media (min-width: 576px) and (max-width: 767.9px) {
  div.carousel-container {
    row-gap: 50px;
    &>h2 {
      font-weight: normal;
      font-size: 25px;
    }

    &>.n-carousel {
      .carousel-item {
        width: 111px;
        height: 90px;

        img {
          height: inherit;
        }
      }

      .custom-dots {
        margin-top: 50px;

        & li {
          width: 5px;
          height: 5px;
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991.9px) {
  div.carousel-container {
    &>h2 {
      font-size: 30px;
    }

    &>.n-carousel {
      .carousel-item {
        width: 150px;
        height: 139px;

        img {
          height: inherit;
        }
      }

      .custom-dots {
        margin-top: 60px;

        & li {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199.9px) {
  div.carousel-container {
    // &>h2 {}

    &>.n-carousel {
      .carousel-item {
        width: 180px;
        height: 169px;

        img {
          height: inherit;
        }
      }

      .custom-dots {
        & li {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

// @media (min-width: 1500px) {
//   div.carousel-container {
//     height: 600px;

//     &>.n-carousel {
//       .carousel-item {
//         padding: 0 250px;
//       }
//     }
//   }
// }
</style>
