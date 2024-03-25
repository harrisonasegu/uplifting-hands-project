<template>
  <div class="button-container">
    <section>
      <div class="btn-content">
        <span class="btn-label">Profile</span>
        <div class="btn-action-container">
          <span class="btn-action-text">Action required</span>
          <router-link to="/student-portal/create-profile">Open</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
div.button-container {
  display: flex;
  justify-content: center;

  &>section {
    width: 965px;
    height: 152px;
    border: 3px dashed #FFF;
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;
    background: transparent;

    &>div.btn-content {
      width: 100%;
      padding-left: 28px;
      padding-right: 19px;
      display: flex;
      row-gap: 20px;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      color: #FFF;

      &>span.btn-label {
        font-size: 40px;
      }

      &>div.btn-action-container {
        display: flex;
        row-gap: 40px;
        column-gap: 40px;
        justify-content: center;
        align-items: center;

        &>span.btn-action-text {
          font-size: 30px;
        }

        &>a {
          width: 160px;
          height: 57px;
          border: 2px solid #ffffff;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          text-align: center;
          font-size: 25px;
          color: #FFF;
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.button-container {
    &>section {
      width: 100%;
      height: fit-content;
      border: 1px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span.btn-label {
          font-size: 15.5px;
        }

        &>div.btn-action-container {
          flex-direction: column;

          &>span.btn-action-text {
            font-size: 15px;
          }

          &>a {
            width: 100px;
            height: 45px;
            border: 1px solid #ffffff;
            border-radius: 10px;
            font-size: 15px;
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.button-container {
    &>section {
      width: 100%;
      height: fit-content;
      border: 1px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span.btn-label {
          font-size: 15.5px;
        }

        &>div.btn-action-container {
          flex-direction: column;
          
          &>span.btn-action-text {
            font-size: 15px;
          }

          &>a {
            width: 100px;
            height: 45px;
            border: 1px solid #ffffff;
            border-radius: 10px;
            font-size: 15px;
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.button-container {
    &>section {
      width: 85%;
      height: fit-content;
      border: 2px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span.btn-label {
          font-size: 20px;
        }

        &>div.btn-action-container {
          flex-direction: column;

          &>span.btn-action-text {
            font-size: 15px;
          }

          &>a {
            width: 100px;
            height: 45px;
            border: 1px solid #ffffff;
            border-radius: 10px;
            font-size: 15px;
          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.button-container {
    &>section {
      width: 80%;
      border: 1px dashed #FFF;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        column-gap: 30px;

        &>span.btn-label {
          font-size: 20px;
        }

        &>div.btn-action-container {
          &>span.btn-action-text {
            font-size: 16px;
          }

          &>a {
            width: 100px;
            height: 45px;
            border: 1px solid #ffffff;
            border-radius: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.button-container {
    &>section {
      width: 75%;
      border: 2px dashed #FFF;

      &>div.btn-content {
        padding: 20px;
        column-gap: 30px;

        &>span.btn-label {
          font-size: 20px;
        }

        &>div.btn-action-container {
          &>span.btn-action-text {
            font-size: 17px;
          }

          &>a {
            width: 120px;
            height: 50px;
            border: 1px solid #ffffff;
            border-radius: 15px;
            font-size: 16px;
          }
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.button-container {
    &>section {
      width: 700px;
      height: 120px;

      &>div.btn-content {
        padding: 20px;
        column-gap: 30px;

        &>span.btn-label {
          font-size: 24px;
        }

        &>div.btn-action-container {
          &>span.btn-action-text {
            font-size: 20px;
          }

          &>a {
            width: 10px;
            height: 55px;
            border: 1px solid #ffffff;
            // border-radius: 15px;
            font-size: 18px;
          }
        }
      }
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
