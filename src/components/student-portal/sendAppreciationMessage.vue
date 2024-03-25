<script setup lang="ts">
import { reactive } from 'vue';

import {
  NSpace,
  NButton,
  type CollapseProps
} from 'naive-ui'

const expandedItem = reactive({
  name: '3',
  expanded: true
})

const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({ name, expanded }) => {
  expandedItem.name = name
  expandedItem.expanded = expanded
}
</script>

<template>
  <div class="page-view">
    <n-space vertical :size="40">
      <div class="send-message-wrap">
        <div class="div-h3">
          <h3>Send Appreciation Message</h3>
        </div>
        <div class="message-contents">
          <textarea name="" id="" cols="30" rows="10">

            </textarea>
        </div>

        <div class="send-btn">
          <n-button>Send</n-button>
        </div>
      </div>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.send-message-wrap {
  // border: 5px solid #fff;
  background-color: #fff;
  margin: 50px 50px;
  padding: 50px 100px;

  &>.div-h3 {

    h3 {
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
      letter-spacing: 0em;
      padding-bottom: 50px;
    }
  }


  // message-contents
  &>.message-contents {
    // border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    textarea {
      // border: 1px solid #000;
      background-color: #D9D9D9;
      width: 100%;
      height: 514px;
      margin-bottom: 50px;
      font-size: 25px;
    }
  }

  &>.send-btn {
    // border: 2px solid red;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;


    .n-button {
      // border: 11px solid red;
      background-color: $base-color;
      border-radius: 20px;
      width: 260px;
      height: 86px;
      font-size: 35px;
      font-weight: 700;
      line-height: 42px;
      letter-spacing: 0em;
      text-align: center;
      padding: 0 20px;
      color: #fff;
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  .send-message-wrap {
    // border: 5px solid #fff;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -12px;


    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 20px;


      .n-button {
        // border: 11px solid red;
        border-radius: 15px;
        width: 100%;
        height: 45px;
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  .send-message-wrap {
    // border: 5px solid red;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -23px;

    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 30px;


      .n-button {
        // border: 11px solid red;
        border-radius: 15px;
        width: 100%;
        height: 45px;
        font-size: 16px;
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  .send-message-wrap {
    // border: 5px solid red;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -32px;

    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 40px;


      .n-button {
        // border: 11px solid red;
        width: 100%;
        border-radius: 15px;
        height: 55px;
        font-size: 18px;
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  .send-message-wrap {
    // border: 5px solid red;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -32px;

    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 50px;


      .n-button {
        // border: 11px solid red;
        width: 100%;
        border-radius: 15px;
        height: 60px;
        font-size: 18px;
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  .send-message-wrap {
    // border: 5px solid red;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -32px;
    margin-top: 40px;

    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 35px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 500px;
        margin-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 50px;


      .n-button {
        // border: 11px solid red;
        width: 100%;
        border-radius: 15px;
        height: 60px;
        font-size: 20px;
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  .send-message-wrap {
    // border: 5px solid red;
    background-color: #fff;
    margin: 0px 0px;
    padding: 30px 10px;
    margin-bottom: -32px;
    margin-top: 40px;

    &>.div-h3 {

      h3 {
        text-align: center;
        font-size: 35px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0em;
        padding-bottom: 30px;
      }
    }


    // message-contents
    &>.message-contents {
      // border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      textarea {
        // border: 1px solid #000;
        background-color: #D9D9D9;
        width: 100%;
        height: 500px;
        margin-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 25px;
      }
    }

    &>.send-btn {
      // border: 2px solid red;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding: 0 50px;


      .n-button {
        // border: 11px solid red;
        width: 100%;
        border-radius: 15px;
        height: 70px;
        font-size: 25px;
      }
    }
  }
}

// XL
@media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
@media (min-width: 1500px) {}
</style>
