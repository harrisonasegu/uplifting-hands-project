<script setup lang="ts">
import { NSpace } from 'naive-ui'
import PageBanner from '@/components/banner/banner.vue'
import Carousel from '@/components/carousel/carousel.vue'

import backgroungImageUrl from '@/assets/Images/StudentPage-Image/student-background-image.png'

import studentMaiImage from '@/assets/Images/StudentPage-Image/student-mainpage-image.png'
</script>

<template>
  <div class="page-view">
    <n-space vertical>
      <div class="student-page-view">
        <PageBanner :backgroung-image-url="backgroungImageUrl">Student</PageBanner>

        <div class="student-container">
          <!-- vision-mission -->
          <div class="container">
            <div class="caption-picture">
              <div class="caption">
                <h2>Eligibility Requirements</h2>

                <p>
                  <span class="requirement">Student Status:</span> Applicants must be currently enrolled or accepted in an
                  accredited
                  educational
                  institution, such as a school, college, university, or vocational program. This requirement ensures that
                  the funding is specifically targeted towards students pursuing their education.
                </p>

                <p>
                  <span class="requirement">Financial Need:</span> Eligibility may be based on financial need, considering
                  factors such as
                  household
                  income, family size, and other relevant financial circumstances. This criterion helps prioritize support
                  for students who face significant financial barriers to accessing education.
                </p>

                <p>
                  <span class="requirement">Academic Performaspance:</span> Some funding opportunities may require a
                  minimum level of academic
                  performance,
                  such as a certain GPA (Grade Point Average) or standardized test scores. This requirement ensures that
                  the funds are allocated to students who demonstrate commitment and potential for academic success.
                </p>

                <p>
                  <span class="requirement">Field of Study:</span> Certain scholarships or grants may be available for
                  specific fields of
                  study or academic
                  disciplines. These opportunities can align with the funding organization's goals or industry-specific
                  requirements, encouraging students to pursue careers in particular areas of interest.
                </p>

                <p>
                  <span class="requirement">Citizenship or Rspansidency:</span> Eligibility criteria may include
                  citizenship or residency
                  requirements,
                  specifying that applicants must be citizens or legal residents of a particular country, region, or
                  jurisdiction. This criterion ensures that the funding is targeted towards students within specific
                  geographic boundaries.
                </p>

                <p>
                  <span class="requirement">Community Involvespanent or Leadership:</span> Some funding opportunities may
                  prioritize applicants
                  who have
                  demonstrated active involvement in their community, leadership roles, or participation in
                  extracurricular activities. This requirement highlights the importance of well-rounded individuals who
                  contribute to their communities beyond academics.
                </p>

                <p>
                  <span class="requirement">Essay or PersonalspanStatement:</span> Funding applications may require
                  applicants to submit an essay
                  or personal
                  statement detailing their educational goals, aspirations, and how the funding would positively impact
                  their journey. This criterion allows applicants to showcase their motivations, ambitions, and passion
                  for learning.
                  It's important to note that eligibility requirements can vary depending on the specific funding
                  opportunity or organization helping.
                </p>

                <p class="requirement">
                  It's important to note that eligibility requirements can vary depending on the specific funding
                  opportunity or organization helping.
                </p>

                <div>
                  <router-link to="/apply">Apply Now</router-link>
                </div>
              </div>

              <div class="studentMain-image">
                <img :src="studentMaiImage" alt="studentMain-image">
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
  .student-page-view {
    .student-container {
      // border: 12px solid red;
      justify-content: center;
      background-color: $base-color;
      display: flex;
      color: #fff;

      .container {
        width: 100%;
        border: 2px solid white;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .caption-picture {
          // border: 12px solid red;
          width: 100%;
          display: flex;
          justify-content: space-between;
          column-gap: 50px;
          row-gap: 50px;

          // caption
          &>.caption {
            width: 52%;
            padding: 50px 0;

            h2 {
              // border: 2px solid blue;
              height: 48px;
              font-style: normal;
              font-weight: 800;
              font-size: 25px;
              margin-bottom: 10px;
            }

            p {
              display: flex;
              padding-top: 20px;
              font-size: 16px;

              &.requirement,
              &>span.requirement {
                font-weight: 600;
              }
            }

            // div
            &>div {
              margin-top: 100px;

              a {
                width: 200px;
                border-radius: 50px;
                border: 2px solid #FFF;
                padding: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                word-wrap: break-word;
                font-size: 18px;
                font-weight: 700;
                background: #FFF;
                color: $base-color;
                transition: $transition;

                &:hover {
                  box-shadow: 2px 2px 10px #adabab;
                }
              }
            }
          }

          // paragraphy
          &>.studentMain-image {
            // border: 2px solid blue;
            width: 48%;

            img {
              // border: 2px solid blue;
              height: auto;
              width: 679px;
            }
          }
        }
      }
    }

    // carousel
    .carousel-contents {
      border-top: 3px solid #ffffff;
      border-bottom: 3px solid #ffffff;
    }
  }
}


// MEDIA QUERY---
@media (max-width: 250.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {
        // border: 12px solid red;

        .container {
          border: 2px solid transparent;
          padding: 0 10px;

          .caption-picture {
            width: 100%;
            flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 100%;

              h2 {
                font-size: 16px;
              }

              p {
                flex-direction: column;
                font-size: 14px;
              }

              // div
              &>div {
                margin-top: 50px;

                a {
                  max-width: 100px;
                  border-radius: 6px;
                  border: 1px solid #FFF;
                  padding: 5px;
                  font-size: 14px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 100%;
              display: none;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

@media (min-width: 251px) and (max-width: 350.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {
        // border: 12px solid red;

        .container {
          border: 2px solid transparent;
          padding: 0 10px;

          .caption-picture {
            width: 100%;
            flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 100%;

              h2 {
                margin-bottom: 10px;
                font-size: 17px;
              }

              p {
                flex-direction: column;
                font-size: 15px;
              }

              // div
              &>div {
                margin-top: 50px;

                a {
                  max-width: 100px;
                  border-radius: 6px;
                  border: 1px solid #FFF;
                  padding: 5px;
                  font-size: 14px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 100%;
              display: none;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

@media (min-width: 351px) and (max-width: 575.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          border: 2px solid transparent;
          padding: 0 20px;

          .caption-picture {
            width: 100%;
            flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 100%;

              h2 {
                margin-bottom: 10px;
                font-size: 20px;
              }

              p {
                flex-direction: column;
                row-gap: 5px;
                font-size: 16px;
              }

              // div
              &>div {
                margin-top: 100px;

                a {
                  width: 150px;
                  border-radius: 10px;
                  border: 1px solid #FFF;
                  padding: 13px;
                  font-size: 15px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 100%;
              display: none;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

@media (min-width: 576px) and (max-width: 767.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          border: 2px solid transparent;
          padding: 0 20px;

          .caption-picture {
            width: 100%;
            flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 100%;

              h2 {
                margin-bottom: 10px;
                font-size: 20px;
              }

              p {
                flex-direction: column;
                row-gap: 5px;
                font-size: 16px;
              }

              // div
              &>div {
                margin-top: 100px;

                a {
                  width: 150px;
                  border-radius: 10px;
                  border: 1px solid #FFF;
                  padding: 13px;
                  font-size: 15px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 100%;
              display: none;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991.9px) {

  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          border: 2px solid transparent;
          padding: 0 20px;

          .caption-picture {
            width: 100%;
            flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 100%;

              h2 {
                margin-bottom: 10px;
                font-size: 22px;
              }

              p {
                display: block;
                font-size: 16px;
              }

              // div
              &>div {
                margin-top: 100px;

                a {
                  width: 180px;
                  border: 1px solid #FFF;
                  padding: 13px;
                  font-size: 15px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 100%;
              display: none;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1200.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          // border: 2px solid transparent;
          padding: 0 50px;

          .caption-picture {
            width: 100%;
            // flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;
              width: 50%;

              h2 {
                margin-bottom: 10px;
              }

              p {
                flex-direction: column;
                row-gap: 5px;
              }

              // div
              &>div {
                margin-top: 100px;

                a {
                  font-size: 18px;
                  padding: 13px;
                }
              }
            }

            // paragraphy
            &>.studentMain-image {
              // border: 2px solid blue;
              width: 40%;

              img {
                // border: 2px solid blue;
                height: auto;
                width: 679px;
              }
            }
          }
        }
      }

      // carousel
      // .carousel-contents {}
    }
  }
}

@media (min-width: 1201px) and (max-width: 1499.9px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          // border: 2px solid transparent;
          padding: 0 50px;

          .caption-picture {
            // flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;

              p {
                display: block;
              }
            }

            // paragraphy
            // &>.studentMain-image {}
          }
        }
      }

      // carousel
      // .carousel-contents {}
    }
  }
}

@media (min-width: 1500px) {
  .page-view {

    // border: 2px solid red;
    .student-page-view {

      // border: 2px solid blue;
      .student-container {

        // border: 12px solid red;  
        .container {
          // border: 2px solid transparent;
          padding-left: 200px;

          .caption-picture {
            // flex-direction: column;

            // caption
            .caption {
              // border: 3px solid red;

              p {
                display: block;
              }
            }

            // paragraphy
            // &>.studentMain-image {}
          }
        }
      }

      // carousel
      .carousel-contents {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}
</style>