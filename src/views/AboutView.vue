<script setup lang="ts">
import { NSpace } from 'naive-ui'
import PageBanner from '@/components/banner/banner.vue'
import Carousel from '@/components/carousel/carousel.vue'

import backgroungImageUrl from '@/assets/Images/About-Images/about-background-image.png'
</script>

<template>
  <div class="page-view">
    <n-space vertical>
      <div class="about-page-view">
        <PageBanner :backgroung-image-url="backgroungImageUrl">About Us</PageBanner>

        <div class="about-container">
          <!-- vision-mission -->
          <div class="container">
            <div class="caption-paragrahy">
              <div class="caption">
                <h2>Who We Are</h2>
              </div>
              <div class="paragraphy">
                <p>
                  Nigerian Students and Young People Empowerment Initiative is the brainchild of the Lagos Business School SMP Program 86. Through our user-friendly
                  platform, we connect students with a network of generous donors, sponsors, and scholarship
                  opportunities. We
                  provide a streamlined and transparent process that allows students to apply for financial assistance
                  with
                  ease and convenience. Whether you need support with tuition fees, exam registration costs, or other
                  educational expenses, “Nigerian Students and Young People Empowerment Initiative” is here to support you every step of the way.
                </p>
              </div>
            </div>

            <div class="caption-paragrahy">
              <div class="caption">
                <h2>Mission</h2>
              </div>
              <div class="paragraphy">
                <p>
                  At “Nigerian Students and Young People Empowerment Initiative”, our mission is simple yet powerful: to empower students by providing financial
                  assistance for their school fees and exams. We believe that every student deserves equal opportunities
                  to pursue their education and achieve their goals. We are committed to breaking down barriers and
                  creating a level playing field for all.
                </p>
              </div>
            </div>

            <div class="caption-paragrahy">
              <div class="caption">
                <h2>Vision</h2>
              </div>
              <div class="paragraphy">
                <p>
                  At “Nigerian Students and Young People Empowerment Initiative”, our vision is to enrich every student's educational journey. We envision a world
                  where financial barriers no longer restrict a student's ability to access quality education, pursue
                  their passions, and unlock their full potential. Through our platform, we are dedicated to creating
                  equal opportunities, fostering inclusivity, and inspiring students to dream big, achieve their goals,
                  and shape a brighter future for themselves and their communities."
                </p>
              </div>
            </div>
          </div>

        </div>

        <!-- carousel-contents -->
        <div class="carousel-contents">
          <Carousel />
        </div>
      </div>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

// over-all page view that covers everything
.page-view {

  // border: 2px solid red;
  .about-page-view {
    .about-container {
      // border: 12px solid red;
      justify-content: center;
      background-color: $base-color;
      display: flex;
      color: #fff;

      .container {
        // border: 3px solid white;

        .caption-paragrahy {
          padding: 25px 30px;
          display: flex;
          flex-wrap: wrap;
          column-gap: 30px;
          // justify-content: space-between;

          // caption
          &>.caption {
            width: 300px;

            h2 {
              font-style: normal;
              font-weight: 700;
              font-size: 22px;
              line-height: 48px;
              margin-bottom: 20px;
            }
          }

          // paragraphy
          &>.paragraphy {
            p {
              max-width: 798px;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              word-wrap: break-word;
              line-height: 28px;
            }
          }
        }
      }
    }

    // carousel
    .carousel-contents {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
}

// MEDIA QUERY FOR ALL DEVICES--------------------
// XX-SM
@media (max-width: 250.9px) {

  .page-view {
    // border: 3px solid red;

    .about-page-view {

      .about-container {
        // border: 3px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow-wrap: break-word;

        .container {
          // border: 2px solid white;
          border: none;

          .caption-paragrahy {
            // border: 12px solid red;
            padding: 20px 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            // caption
            &>.caption {
              // border: 12px solid blue;
              display: flex;
              width: 100%;


              h2 {
                height: 48px;
                font-size: 18px;
                line-height: 25px;
                word-break: break-all;
                margin-bottom: 0px;
              }
            }

            // paragraphy
            &>.paragraphy {
              // border: 2px solid blue;

              p {
                font-size: 15px;
              }
            }

          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251.9px) and (max-width: 350.9px) {

  .page-view {
    // border: 3px solid red;

    .about-page-view {

      .about-container {
        // border: 3px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow-wrap: break-word;

        .container {
          // border: 2px solid white;
          border: none;

          .caption-paragrahy {
            // border: 12px solid red;
            padding: 20px 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            // caption
            &>.caption {
              // border: 12px solid blue;
              display: flex;
              width: 100%;


              h2 {
                font-size: 18px;
                line-height: 48px;
                margin-bottom: 0px;
              }
            }

            // paragraphy
            &>.paragraphy {
              // border: 2px solid blue;

              p {
                font-size: 16px;
              }
            }

          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351.9px) and (max-width: 575.9px) {
  .page-view {
    // border: 3px solid red;

    .about-page-view {

      .about-container {
        // border: 3px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow-wrap: break-word;

        .container {
          // border: 2px solid white;
          border: none;

          .caption-paragrahy {
            // border: 12px solid red;
            padding: 20px 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            // caption
            &>.caption {
              // border: 12px solid blue;
              display: flex;
              width: 100%;


              h2 {
                font-size: 20px;
                line-height: 35px;
                margin-bottom: 5px;
              }
            }

            // paragraphy
            &>.paragraphy {
              // border: 2px solid blue;

              p {
                font-size: 16px;
              }
            }

          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  .page-view {
    // border: 3px solid red;

    .about-page-view {

      .about-container {
        // border: 3px solid red;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow-wrap: break-word;

        .container {
          border: 2px solid white;
          border: none;

          .caption-paragrahy {
            // border: 12px solid red;
            padding: 20px 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            // caption
            &>.caption {
              // border: 12px solid blue;
              display: flex;
              width: 100%;


              h2 {
                font-size: 18px;
                line-height: 48px;
                margin-bottom: 5px;
              }
            }

            // paragraphy
            &>.paragraphy {
              // border: 2px solid blue;

              p {
                font-size: 16px;
              }
            }

          }
        }
      }
    }
  }
}

// MD
@media (min-width: 767px) and (max-width: 991.9px) {
  .page-view {

    .about-container {
      // border: 3px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-wrap: break-word;
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  .page-view {

    .about-container {
      // border: 3px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-wrap: break-word;
    }
  }
}

// XL
@media (min-width: 1201px) and (max-width: 1499.9px) {
  .page-view {

    .about-container {
      // border: 3px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-wrap: break-word;
    }
  }
}

// XXL
@media (min-width: 1500px) {

  .page-view {

    .about-container {
      // border: 3px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-wrap: break-word;

      &>.container {
        padding: 0 150px;
      }
    }
  }
}
</style>