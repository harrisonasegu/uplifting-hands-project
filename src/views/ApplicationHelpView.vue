<script setup lang="ts">
import { reactive } from 'vue';

import {
  NCollapseItem,
  NSpace,
  NCollapse,
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
      <div class="application-page-wrap">
        <div class="application-contents">
          <div class="applicationhelp-background">
            <div class="help-caption">
              <h2>
                Application Help
              </h2>
            </div>
          </div>

          <div class="financial-grants">
            <h2 class="faQ">Financial-Grants FAQ</h2>

            <div class="collapse">

              <n-collapse accordion arrow-placement="right" :default-expanded-names="expandedItem.name"
                @item-header-click="handleItemHeaderClick">
                <template #arrow>&VeryThinSpace;</template>

                <n-collapse-item name="1">
                  <template #header>
                    <h2 class="collapsed-item-header">How does the funding application process work?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '1' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="2">
                  <template #header>
                    <h2 class="collapsed-item-header">What types of financial assistance are available?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '2' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="3">
                  <template #header>
                    <h2 class="collapsed-item-header">Are international students eligible to apply?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '3' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    No, international students are not allowed for funding through our platform currently. Our focus is on
                    supporting students within our local community.
                  </p>
                </n-collapse-item>

                <n-collapse-item name="4">
                  <template #header>
                    <h2 class="collapsed-item-header">Who is eligible to apply for funding?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '4' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="5">
                  <template #header>
                    <h2 class="collapsed-item-header">How are funding decisions made?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '5' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="6">
                  <template #header>
                    <h2 class="collapsed-item-header">What should I include in my application essay or personal statement?
                    </h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '6' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="7">
                  <template #header>
                    <h2 class="collapsed-item-header">Can I apply for multiple funding opportunities?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '7' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="8">
                  <template #header>
                    <h2 class="collapsed-item-header">How can I track the progress of my application?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '8' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="9">
                  <template #header>
                    <h2 class="collapsed-item-header">Can I reapply if my application is not successful?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '9' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

                <n-collapse-item name="10">
                  <template #header>
                    <h2 class="collapsed-item-header">How can I contact support if I have additional questions?</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <Icon
                        :icon="(expandedItem.name === '10' && expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'" />
                    </div>
                  </template>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt reiciendis, qui sapiente quod
                    unde veniam asperiores nulla. Culpa doloremque temporibus maxime dignissimos assumenda omnis aut
                    provident? Earum, sint fuga!
                  </p>
                </n-collapse-item>

              </n-collapse>
            </div>
          </div>
        </div>
      </div>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.application-page-wrap {
  // application-contents
  &>.application-contents {

    //   content
    &>.applicationhelp-background {
      border-top: 3px solid #FFFFFF;
      border-bottom: 3px solid #FFFFFF;
      background-color: $base-color;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 345px;

      // help-caption
      &>.help-caption {
        h2 {
          text-transform: uppercase;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 30px;
          line-height: 58px;
          text-align: center;
        }
      }

    }

    &>.financial-grants {
      padding: 60px 50px;
      display: flex;
      flex-direction: column;
      row-gap: 30px;
      background: #D9D9D9;

      &>.faQ {
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 48px;
        text-align: center;
      }

      &>.collapse {
        padding: 0px 50px;
        // height: 40px;
        font-style: normal;
        font-weight: 800;
        font-size: 25px;

        .n-collapse {
          border: 1px solid $base-color;
          line-height: 50px;


          .n-collapse-item {
            margin: 0;
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid $base-color;

            // make non-first-child item border transparent
            &:last-of-type {
              border-bottom: 1px solid transparent;
            }

            &.n-collapse-item--active {
              border-top: 1px solid $base-color;
            }

            // collapse header and header extra
            .collapsed-item-header {
              padding: 10px 0;
              font-size: 18px;
              font-weight: 800;
              line-height: 40px;
            }

            .header-extra-container {
              font-size: 25px;
              font-weight: bolder;
            }

            // collapsed content
            p {
              width: 829px;
              font-size: 16px;
              font-weight: 700;
              line-height: 25.26px;
              color: $base-color;
            }
          }
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {
      //   content
      &>.applicationhelp-background {
        border-top: 1px solid #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
        height: 200px;

        // help-caption
        &>.help-caption {
          h2 {
            text-transform: capitalize;
            font-size: 18px;
            line-height: normal;
          }
        }

      }

      &>.financial-grants {
        padding: 40px 10px 40px;
        row-gap: 50px;

        &>.faQ {
          font-size: 15px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            line-height: 50px;

            .n-collapse-item {
              padding: 0 0 40px;

              // collapse header and header extra
              .collapsed-item-header {
                padding: 10px 5px;
                font-size: 14px;
                line-height: normal;
              }

              .header-extra-container {
                font-size: 18px;
                font-weight: bold;
              }

              // collapsed content
              p {
                width: 100%;
                padding: 0 5px;
                font-size: 14px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {

      //   content
      &>.applicationhelp-background {
        border-top: 1px solid #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
        height: 200px;

        // help-caption
        &>.help-caption {
          h2 {
            text-transform: capitalize;
            font-size: 18px;
            line-height: normal;
          }
        }

      }

      &>.financial-grants {
        padding: 40px 10px 40px;
        row-gap: 50px;

        &>.faQ {
          font-size: 15px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            line-height: 50px;

            .n-collapse-item {
              padding: 0 0 20px;

              // collapse header and header extra
              .collapsed-item-header {
                padding: 10px 5px;
                font-size: 14px;
                line-height: normal;
              }

              .header-extra-container {
                font-size: 20px;
                font-weight: bold;
              }

              // collapsed content
              p {
                width: 100%;
                padding: 0 5px;
                font-size: 15px;
                font-weight: normal;
                // line-height: normal;
              }
            }
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {

      //   content
      &>.applicationhelp-background {
        border-top: 1px solid #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
        height: 200px;

        // help-caption
        &>.help-caption {
          h2 {
            text-transform: capitalize;
            font-size: 25px;
            line-height: normal;
          }
        }

      }

      &>.financial-grants {
        padding: 40px 10px 40px;
        row-gap: 50px;

        &>.faQ {
          font-size: 18px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            line-height: 50px;

            .n-collapse-item {
              padding: 0 0 20px;

              // collapse header and header extra
              .collapsed-item-header {
                padding: 10px 5px;
                font-size: 16px;
                line-height: normal;
              }

              .header-extra-container {
                font-size: 25px;
                font-weight: bold;
              }

              // collapsed content
              p {
                width: 100%;
                padding: 0 5px;
                font-size: 16px;
                font-weight: normal;
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
  .application-page-wrap {

    // application-contents
    &>.application-contents {

      //   content
      &>.applicationhelp-background {
        border-top: 1px solid #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
        height: 200px;

        // help-caption
        &>.help-caption {
          h2 {
            text-transform: capitalize;
            font-size: 25x;
            line-height: normal;
          }
        }

      }

      &>.financial-grants {
        padding: 40px 20px 40px;
        row-gap: 50px;

        &>.faQ {
          font-size: 22px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            line-height: 50px;

            .n-collapse-item {
              padding: 0 0 20px;

              // collapse header and header extra
              .collapsed-item-header {
                padding: 10px 10px;
                font-size: 18px;
                line-height: normal;
              }

              .header-extra-container {
                font-size: 30px;
                font-weight: bold;
              }

              // collapsed content
              p {
                width: 100%;
                padding: 0 10px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {

      //   content
      &>.applicationhelp-background {
        border-top: 2px solid #FFFFFF;
        border-bottom: 2px solid #FFFFFF;
        height: 250px;

        // help-caption
        &>.help-caption {
          h2 {
            font-size: 25px;
            line-height: normal;
            line-height: 58px;
          }
        }

      }

      &>.financial-grants {
        padding: 40px 20px 40px;
        row-gap: 50px;

        &>.faQ {
          font-size: 23px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            line-height: 50px;

            .n-collapse-item {
              padding: 0 0 40px;

              // collapse header and header extra
              .collapsed-item-header {
                padding: 10px 10px;
                font-size: 20px;
                line-height: normal;
              }

              .header-extra-container {
                font-size: 30px;
                font-weight: bold;
              }

              // collapsed content
              p {
                width: 100%;
                padding: 0 5px;
                font-size: 16px;
                font-weight: 600;
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
  .application-page-wrap {

    // application-contents
    &>.application-contents {

      //   content
      &>.applicationhelp-background {

        // help-caption
        &>.help-caption {
          h2 {
            font-size: 28px;
          }
        }
      }

      &>.financial-grants {
        padding: 40px 50px 40px;

        &>.faQ {
          font-size: 30px;
          line-height: normal;
        }

        &>.collapse {
          padding: 0px 10px;

          .n-collapse {

            .n-collapse-item {
              // collapse header and header extra
              padding-bottom: 40px;

              .collapsed-item-header {
                font-size: 25px;
              }
              // collapsed content
              // p {}
            }
          }
        }
      }
    }
  }
}

// XL
@media (min-width: 1201px) and (max-width: 1499.9px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {
      &>.financial-grants {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}

// XXL
@media (min-width: 1500px) {
  .application-page-wrap {

    // application-contents
    &>.application-contents {
      &>.financial-grants {
        padding-left: 155px;
        padding-right: 155px;
      }
    }
  }
}
</style>
