<script setup lang="ts">
import { reactive, type PropType } from 'vue'

import {
  NCollapseItem,
  NSpace,
  NCollapse,
  NButton,
  type CollapseProps
} from 'naive-ui'

import { useSystemUtilsStore } from '@/stores/modules/systemUtils'

const props = defineProps({
  fundApplicationInfo: Object as PropType<{
    name: string
    status: string
  }>
})

const expandedItem = reactive({
  name: '',
  expanded: false
})

const systemUtilsStore = useSystemUtilsStore()

const statusList = systemUtilsStore.getApplicationStatus?.map(status => status?.statusName)

const fundApplicationStatusListIndex = statusList?.indexOf(props.fundApplicationInfo?.status as string)

const fundApplicationStatusItem = systemUtilsStore.getApplicationStatus[fundApplicationStatusListIndex]
const fundApplicationDescription = fundApplicationStatusItem?.statusDescription.replace('\'', '')

const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({ name, expanded }) => {
  expandedItem.name = name
  expandedItem.expanded = expanded
}
</script>

<template>
  <div class="page-view">
    <n-space vertical :size="40">
      <div class="pending-page-wrap">
        <div class="pending-contents">

          <div class="pending-status-content">
            <div class="collapse">
              <n-collapse accordion arrow-placement="right" :default-expanded-names="expandedItem.name"
                @item-header-click="handleItemHeaderClick">
                <template #arrow>&VeryThinSpace;</template>

                <n-collapse-item name="1">
                  <template #header>
                    <div class="collapsed-item-header">
                      <div class="app-h2">
                        <h2>{{ fundApplicationInfo?.name }}</h2>
                      </div>
                      <div class="pending-view">
                        <div 
                          :class="[
                            'application-status',
                            fundApplicationInfo?.status?.toLowerCase()
                          ]"
                        >{{ fundApplicationInfo?.status }}</div>
                      </div>
                    </div>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <div class="icon-button">
                        <Icon
                          v-if="(expandedItem.name === '1' && expandedItem.expanded)" 
                          icon="mingcute:up-line" 
                        />
                        <!-- button for v-else -->
                        <div class="view" v-else>
                          <n-button>View</n-button>
                          <Icon icon="mingcute:down-line" />
                        </div>
                      </div>
                    </div>
                  </template>

                  <section>
                    <p>
                      {{ fundApplicationDescription }}
                    </p>

                    <!-- appreciation text -->
                    <!-- <div>
                      <SendAppreciationMessage />
                    </div> -->
                  </section>
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
.pending-page-wrap {
  // border-top: 3px solid #fff;
  // border-bottom: 3px solid #fff;
  color: #fff;

  // application-contents
  &>.pending-contents {
    &>.pending-status-content {
      background-color: $base-color;
      padding: 50px;
      display: flex;
      flex-direction: column;
      row-gap: 50px;

      &>.pending-status {
        font-style: normal;
        font-size: 30px;
        font-weight: 700;
        line-height: 54px;
        letter-spacing: 0em;
        text-align: center;
      }

      &>.collapse {
        padding: 0px 50px;

        .n-collapse {
          border: 2px solid #fff;
          padding: 40px 40px 0;
          line-height: 50px;

          .n-collapse-item {
            margin: 0;
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 50px;
            border-bottom: 1px solid $base-color;

            // make non-first-child item border transparent
            &:last-of-type {
              border-bottom: 1px solid transparent;
            }


            // collapse header and header extra
            .collapsed-item-header {
              width: 100%;
              display: flex;
              justify-content: space-between;
              line-height: 40px;
              color: #fff;

              &>.app-h2 {
                h2 {
                  text-transform: uppercase;
                  font-size: 25px;
                  font-weight: 700;
                  line-height: 48px;
                  letter-spacing: 0em;
                }
              }

              &>.pending-view {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                &>.application-status{
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 36px;
                  letter-spacing: 0em;
                  
                  // status indicators

                  // pending
                  &.pending {
                    color: $pending;
                  }

                  // reviewed
                  &.reviewed {
                    color: $reviewed;
                  }

                  // approved
                  &.approved {
                    color: $approved;
                  }

                  // declined
                  &.declined {
                    color: $declined;
                  }

                  // disbursed
                  &.disbursed {
                    color: $disbursed;
                  }
                }
              }
            }

            .header-extra-container {
              font-size: 35px;
              font-weight: bolder;
              color: #fff;

              &>.icon-button {
                width: 160px;
                display: flex;
                justify-content: center;
                align-items: center;

                // The button container for switch between view and up icon
                &>.view {
                  .n-button {
                    width: 100px;
                    height: 40px;
                    border: 1px solid #ffffff;
                    border-radius: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    text-align: center;
                    font-size: 16px;
                    color: #FFF;

                    // caret down icon
                    &~* {
                      display: none;
                    }
                  }
                }
              }
            }
          }

          // collapsed content
          p {
            width: 829px;
            font-size: 16px;
            font-weight: 700;
            line-height: 35px;
            margin-bottom: 20px;
            color: #fff;
          }
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  .pending-page-wrap {
    // border-top: 1px solid #fff;
    // border-bottom: 1px solid #fff;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        padding: 40px 10px 50px;
        row-gap: 30px;

        &>.pending-status {
          font-size: 18px;
          font-weight: 600;
          line-height: unset;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            border: 1px solid #fff;
            padding: 20px 10px 0;

            .n-collapse-item {
              padding-left: 0;
              padding-right: 0;

              // collapse header and header extra
              .collapsed-item-header {
                width: 100%;
                flex-direction: column;
                align-items: flex-start;

                &>.app-h2 {
                  h2 {
                    font-size: 12.5px;
                  }
                }

                &>.pending-view {

                  &>.application-status{
                    font-size: 14px;
                    font-weight: 600;
                  }
                }
              }

              .header-extra-container {
                width: 100%;
                font-size: 20px;

                &>.icon-button {
                  width: fit-content;

                  // The button container for switch between view and up icon
                  &>.view {
                    .n-button {
                      display: none;

                      // caret down icon
                      &~* {
                        display: unset;
                      }
                    }
                  }
                }
              }
            }

            // collapsed content
            p {
              width: 100%;
              font-size: 15px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  .pending-page-wrap {
    // border-top: 1px solid #fff;
    // border-bottom: 1px solid #fff;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        padding: 40px 10px 50px;
        row-gap: 30px;

        &>.pending-status {
          font-size: 18px;
          font-weight: 600;
          line-height: unset;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            border: 1px solid #fff;
            padding: 20px 10px 0;

            .n-collapse-item {
              padding-left: 0;
              padding-right: 0;

              // collapse header and header extra
              .collapsed-item-header {
                width: 100%;
                flex-direction: column;
                align-items: flex-start;

                &>.app-h2 {
                  h2 {
                    font-size: 13px;
                  }
                }

                &>.pending-view {

                  &>.application-status{
                    font-size: 14px;
                    font-weight: 600;
                  }
                }
              }

              .header-extra-container {
                width: 100%;
                font-size: 20px;

                &>.icon-button {
                  width: fit-content;

                  // The button container for switch between view and up icon
                  &>.view {
                    .n-button {
                      display: none;

                      // caret down icon
                      &~* {
                        display: unset;
                      }
                    }
                  }
                }
              }
            }

            // collapsed content
            p {
              width: 100%;
              font-size: 15px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  .pending-page-wrap {
    // border-top: 1px solid #fff;
    // border-bottom: 1px solid #fff;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        padding: 40px 20px 50px;
        row-gap: 30px;

        &>.pending-status {
          font-size: 20px;
          font-weight: 600;
          line-height: unset;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            border: 1px solid #fff;
            padding: 20px 10px 0;

            .n-collapse-item {
              padding-left: 0;
              padding-right: 0;

              // collapse header and header extra
              .collapsed-item-header {
                width: 100%;
                flex-direction: column;
                align-items: flex-start;

                &>.app-h2 {
                  h2 {
                    font-size: 16px;
                  }
                }

                &>.pending-view {

                  &>.application-status{
                    font-size: 15px;
                    font-weight: 600;
                  }
                }
              }

              .header-extra-container {
                width: 100%;
                font-size: 20px;

                &>.icon-button {
                  width: fit-content;

                  // The button container for switch between view and up icon
                  &>.view {
                    .n-button {
                      display: none;

                      // caret down icon
                      &~* {
                        display: unset;
                      }
                    }
                  }
                }
              }
            }

            // collapsed content
            p {
              width: 100%;
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  .pending-page-wrap {
    // border-top: 1px solid #FFF;
    // border-bottom: 1px solid #FFF;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        padding: 40px 20px 60px;
        row-gap: 30px;

        &>.pending-status {
          font-size: 22px;
          font-weight: 600;
          line-height: unset;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            border: 1px solid #fff;
            padding: 20px 20px 0;

            .n-collapse-item {
              padding-left: 0;
              padding-right: 0;

              // collapse header and header extra
              .collapsed-item-header {
                width: 90%;

                &>.app-h2 {
                  h2 {
                    font-size: 18px;
                  }
                }

                &>.pending-view {

                  &>.application-status{
                    font-size: 16px;
                    font-weight: 600;
                  }
                }
              }

              .header-extra-container {
                width: 100%;
                font-size: 20px;

                &>.icon-button {
                  width: fit-content;

                  // The button container for switch between view and up icon
                  &>.view {
                    .n-button {
                      display: none;

                      // caret down icon
                      &~* {
                        display: unset;
                      }
                    }
                  }
                }
              }
            }

            // collapsed content
            p {
              width: 100%;
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  .pending-page-wrap {
    // border-top: 1px solid #FFF;
    // border-bottom: 1px solid #FFF;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        row-gap: 30px;

        &>.pending-status {
          font-size: 25px;
          line-height: unset;
        }

        &>.collapse {
          padding: 0px;

          .n-collapse {
            border: 1px solid #fff;
            padding: 20px 20px 0;

            .n-collapse-item {
              // collapse header and header extra
              .collapsed-item-header {
                width: 90%;

                &>.app-h2 {
                  h2 {
                    font-size: 18px;
                  }
                }

                &>.pending-view {

                  &>.application-status{
                    font-size: 18px;
                  }
                }
              }

              .header-extra-container {
                width: 100%;
                font-size: 20px;

                &>.icon-button {
                  width: fit-content;

                  // The button container for switch between view and up icon
                  &>.view {
                    .n-button {
                      display: none;

                      // caret down icon
                      &~* {
                        display: unset;
                      }
                    }
                  }
                }
              }
            }

            // collapsed content
            p {
              width: 100%;
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  .pending-page-wrap {
    // border-top: 2px solid #FFF;
    // border-bottom: 2px solid #FFF;

    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        &>.pending-status {
          font-size: 28px;
        }

        &>.collapse {
          .n-collapse {
            border: 2px solid #fff;

            .n-collapse-item {
              // collapse header and header extra
              .collapsed-item-header {
                &>.app-h2 {
                  h2 {
                    font-size: 22px;
                  }
                }
              }

              .header-extra-container {
                font-size: 30px;
              }
            }

            // collapsed content
            p {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
@media (min-width: 1500px) {
  .pending-page-wrap {
    // application-contents
    &>.pending-contents {
      &>.pending-status-content {
        padding-left: 155px;
        padding-right: 155px;

        &>.collapse {
          .n-collapse {
            // collapsed content
            p {
              width: 1000px;
            }
          }
        }
      }
    }
  }
}
</style>
