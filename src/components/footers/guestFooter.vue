<script setup lang="ts">
import { NLayoutFooter } from "naive-ui"
</script>

<template>
  <n-layout-footer>
    <!-- footer -->
    <div>
      <section class="footer-info-container">
        <div class="logo-container">
          <img src="../../assets/logo.jpg" alt="app logo">
        </div>

        <div class="footer-info-row">
          <div class="footer-info mission">
            <h2 class="caption">Our Mission</h2>
            <div class="content">
              <p>
                At <strong>“Nigerian Students and Young People Empowerment Initiative”</strong>, our mission is simple yet powerful: to empower students by
                providing financial assistance for their school fees and exams. We believe that every student deserves
                equal opportunities to pursue their education and achieve their goals. We are committed to breaking down
                barriers and creating a level playing field for all.
              </p>
            </div>
          </div>

          <div class="footer-info contact">
            <h2 class="caption">Call Us</h2>
            <div class="content">
              <span>0807868000</span>
              <span>0807868000</span>
              <span>0807868000</span>
              <span>0807868000</span>
              <span>0807868000</span>
            </div>
          </div>

          <div class="footer-info address">
            <h2 class="caption">Address</h2>
            <div class="content">
              <address>
                Lorem ipsum dolor sit amet,<br>
                Lorem ipsum dolor sit amet,<br>
                Lorem ipsum dolor sit amet,<br>
                Lorem ipsum dolor sit amet.
              </address>
            </div>
          </div>
        </div>
      </section>

      <section class="copyright-icons-container">
        <section class="icons">
          <div class="all-icons">
            <div>
              <a href="#" @click.prevent="">
                <Icon icon="ri:facebook-fill" color="#8f79ed" width="1.3rem" />
              </a>
            </div>
            <div>
              <a href="#" @click.prevent="">
                <Icon icon="devicon:linkedin" color="#8f79ed" width="1.3rem" />
              </a>
            </div>
            <div>
              <a href="#" @click.prevent="">
                <Icon icon="ph:instagram-logo" color="#dd6d9a" width="1.3rem" />
              </a>
            </div>
            <div>
              <a href="#" @click.prevent="">
                <Icon icon="uil:twitter" color="#79c8ed" width="1.3rem" />
              </a>
            </div>
            <div>
              <a href="#" @click.prevent="">
                <Icon icon="ant-design:youtube-filled" color="#ff0000" width="1.3rem" />
              </a>
            </div>
          </div>
        </section>

        <section class="copyright">
          <div>
            <a href="#">PRIVACY POLICY</a>
            <span class="slash"></span>
            <a href="#">TERMS OF USE</a>
            <span class="slash"></span>
            <a href="#">DISCLAIMER</a>
          </div>

          <div>
            <span>&copy; {{ new Date().getFullYear() }} Student Fund.</span>
            <span>All rights reserved.</span>
          </div>
        </section>
      </section>
    </div>
  </n-layout-footer>
</template>

<style lang="scss" scoped>
.n-layout-footer {
  padding: 0 20px;
  background-color: #000000;
  overflow: visible;

  &>div {
    &>section {
      &.footer-info-container {
        padding-top: 100px;
        padding-bottom: 50px;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        row-gap: 20px;
        column-gap: 75px;

        // &>.logo-container {}

        &>.footer-info-row {
          display: flex;
          flex-flow: row wrap;
          gap: 30px 75px;
          justify-content: space-between;

          &>.footer-info {
            color: #ffffff;

            // company mission
            &.mission {
              max-width: 400px;
            }

            // company contact
            &.contact {
              display: flex;
              flex-direction: column;

              div.content {
                display: flex;
                flex-direction: column;
              }
            }


            h2.caption {
              margin-bottom: 20px;
              font-weight: 600;
              font-size: 25px;
            }

            div.content {
              font-weight: 400;
              font-size: 18px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }

  .copyright-icons-container {
    padding-bottom: 27.63px;
    display: flex;
    flex-direction: column;
    row-gap: 60px;

    .icons {
      .all-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 20px;

        &>div {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;

          &>* {
            margin-bottom: -5.5px;
          }
        }
      }
    }

    .copyright {
      // border: 2px solid red;
      display: flex;
      flex-direction: column;
      row-gap: 60px;
      justify-content: center;
      align-items: center;

      // copyright and all rights reserved
      &>div {
        // border: 2px solid red;
        width: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: 72px;
        text-align: start;

        // terms of use(links)
        &:first-child {
          display: flex;
          flex-flow: wrap;
          gap: 10px 20px;

          a {
            text-decoration: none;
            font-weight: 700;
            font-size: 18px;
            line-height: 36px;
            color: #ffffff;
            transition: $transition;

            &:hover {
              text-decoration: underline;
            }
          }

          .slash {
            border-left: 4px solid #FFFFFF;
          }
        }

        // copyright
        &:last-child {
          display: flex;
          flex-direction: column;
          flex-flow: wrap;
          gap: 10px 3px;
          font-size: 15px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }
}


// XX-SM
@media (max-width: 350.9px) {
  .n-layout-footer {
    &>div {
      &>section {
        &.footer-info-container {
          padding-top: 50px;
          padding-bottom: 50px;
          flex-direction: column;
          row-gap: 20px;

          &>.logo-container {
            display: none;
          }

          &>.footer-info-row {
            flex-direction: column;
            justify-content: flex-start;
            row-gap: 50px;

            &>.footer-info {
              h2.caption {
                margin-bottom: 40px;
                font-weight: 500;
                font-size: 18px;
              }

              div.content {
                font-weight: normal;
                font-size: 15px;

                // company mission
                &.mission {
                  max-width: 100%;
                }
              }
            }
          }
        }
      }
    }

    .copyright-icons-container {
      display: flex;
      flex-direction: column;
      row-gap: 60px;

      .icons {
        .all-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 20px;

          &>div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            &>* {
              margin-bottom: -5.5px;
            }
          }
        }
      }

      .copyright {
        row-gap: 60px;

        // copyright and all rights reserved
        &>div {
          row-gap: 60px;

          // terms of use(links)
          &:first-child {
            gap: 0 20px;

            a {
              font-weight: normal;
              font-size: 14px;
            }

            .slash {
              display: none;
            }
          }

          // copyright
          &:last-child {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  .n-layout-footer {
    &>div {
      &>section {
        &.footer-info-container {
          padding-top: 50px;
          padding-bottom: 50px;
          flex-direction: column;
          row-gap: 20px;

          &>.logo-container {
            display: none;
          }

          &>.footer-info-row {
            width: 100%;
            flex-direction: column;
            justify-content: flex-start;
            row-gap: 50px;

            &>.footer-info {
              h2.caption {
                margin-bottom: 40px;
                font-weight: 500;
                font-size: 20px;
              }

              div.content {
                font-weight: normal;
                font-size: 17px;

                // company mission
                &.mission {
                  max-width: 100%;
                }
              }
            }
          }
        }
      }
    }

    .copyright-icons-container {
      display: flex;
      flex-direction: column;
      row-gap: 60px;

      .icons {
        .all-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 20px;

          &>div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            &>* {
              margin-bottom: -5.5px;
            }
          }
        }
      }

      .copyright {
        row-gap: 60px;

        // copyright and all rights reserved
        &>div {
          row-gap: 60px;

          // terms of use(links)
          &:first-child {
            gap: 0 20px;

            a {
              font-weight: normal;
              font-size: 14px;
            }

            .slash {
              display: none;
            }
          }

          // copyright
          &:last-child {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 576px) and (max-width: 767.9px) {
  .n-layout-footer {
    &>div {
      &>section {
        &.footer-info-container {
          padding: 0;
          padding-top: 50px;
          padding-bottom: 50px;
          flex-direction: column;
          row-gap: 20px;
          justify-content: flex-start;

          &>.logo-container {
            display: none;
          }

          &>.footer-info-row {
            width: 100%;
            justify-content: flex-start;
            row-gap: 50px;

            &>.footer-info {
              h2.caption {
                margin-bottom: 40px;
                font-weight: 500;
                font-size: 25px;
              }

              div.content {
                font-weight: normal;
                font-size: 18px;
              }

              // company mission
              &.mission {
                max-width: 100%;
              }

              // company contact
              &.contact {
                width: 35%;
              }

              // company address
              &.address {
                width: 45%;
              }
            }
          }
        }
      }
    }

    .copyright-icons-container {
      display: flex;
      flex-direction: column;
      row-gap: 60px;

      .icons {
        .all-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 20px;

          &>div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            &>* {
              margin-bottom: -5.5px;
            }
          }
        }
      }

      .copyright {
        row-gap: 60px;

        // copyright and all rights reserved
        &>div {
          row-gap: 60px;

          // terms of use(links)
          &:first-child {
            gap: 0 20px;

            a {
              font-weight: normal;
              font-size: 14px;
            }

            .slash {
              display: none;
            }
          }

          // copyright
          &:last-child {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
  }
}

// MD or Tab
@media (min-width: 768px) and (max-width: 991.9px) {
  .n-layout-footer {
    padding: 0 58px;

    &>div {
      &>section {
        &.footer-info-container {
          &>.footer-info-row {
            width: 100%;
            justify-content: flex-start;
            row-gap: 50px;

            &>.footer-info {
              h2.caption {
                margin-bottom: 40px;
                font-weight: 500;
                font-size: 25px;
              }

              div.content {
                font-weight: normal;
                font-size: 18px;
              }

              // company mission
              &.mission {
                max-width: 90%;
              }

              // company contact
              &.contact {
                width: 35%;
              }

              // company address
              &.address {
                width: 45%;
              }
            }
          }
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {

  // @media (min-width: 992px) {
  .n-layout-footer {
    padding: 0 58px;

    &>div {
      &>section {
        &.footer-info-container {
          &>.footer-info-row {
            width: 100%;
            justify-content: flex-start;
            row-gap: 50px;

            &>.footer-info {
              h2.caption {
                margin-bottom: 40px;
                font-weight: 500;
                font-size: 25px;
              }

              div.content {
                font-weight: normal;
                font-size: 18px;
              }

              // company mission
              &.mission {
                max-width: 90%;
              }

              // company contact
              &.contact {
                width: 35%;
              }

              // company address
              &.address {
                width: 45%;
              }
            }
          }
        }
      }
    }
  }
}

// xl desktops
@media (min-width: 1201px) and (max-width: 1499.9px) {
  .n-layout-footer {
    padding: 0 50px;

    &>div {
      &>section {
        &.footer-info-container {
          column-gap: 5%;
          // justify-content: space-between;

          // &>.footer-info-row {

          //   // width: calc(100% - 20%);
          //   &>.footer-info {

          //     // company mission
          //     // &.mission {
          //     //   max-width: 300px;
          //     // }
          //   }
          // }
        }
      }
    }
  }
}

// xxl desktops
@media (min-width: 1500px) {
  .n-layout-footer {
    padding: 0 200px;

    &>div {
      &>section {
        &.footer-info-container {
          column-gap: 10%;

          &>.footer-info-row {
            &>.footer-info {
              // company mission
              &.mission {
                max-width: 500px;
              }
            }
          }
        }
      }
    }
  }
}</style>
