<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'

</script>

<template>
    <n-space vertical :size="40">
        <div class="button-page-wrap">
            <div class="content-background">
                <div class="content">

                    <span>
                        <n-button type="default">
                            <a href="#">Status:Open</a>
                        </n-button>
                    </span>
                </div>

                <div class="content">

                    <span class="second-span">
                        <n-button type="default">
                            <a href="#">Sign In to Apply</a>
                        </n-button>
                    </span>

                    <span>
                        <n-button type="default">
                            <a href="#">Start Profile!</a>
                        </n-button>
                    </span>
                    
                </div>

            </div>
        </div>
    </n-space>
</template>

<style lang="scss" scoped>
.button-page-wrap {
    // border: 5px solid red;

    // content-background 
    &>.content-background {
        // border: 5px solid green;
        background-color: #23233F;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 50px;
        row-gap: 50px;
        color: #fff;

        //   content
        &>.content {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            column-gap: 20px;

            // span
            span {
                button {
                    border-radius: 50px;
                    width: 196px;
                    padding: 20px;

                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
    }
}

// Media Query
// @media (max-width: 767.9px) {
@media (max-width: 991.9px) {
    .content-background {
        // border: 2px solid red;
        display: flex;
        flex-wrap: wrap;

        // students picture contents
        &>.student-picture {
            // border: 1px solid red;
            width: 776px;
            margin: auto;

            // image
            img {
                border: 2px solid red;
                height: 497px;
            }
        }
    }
}


@media (min-width: 1500px) {
    .home-extension-wrap {
        // border: 2px solid red;
        padding: 0 240px;
    }
}
</style>
