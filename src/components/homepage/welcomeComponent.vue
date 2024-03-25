<script setup lang="ts">
import { NSpace } from 'naive-ui'

import StudentImage from '@/assets/Images/Home-Images/studentImage.png'

</script>

<template>
    <n-space vertical :size="40">
        <div class="welcome-page-wrap">
            <div class="content-background">
                <div class="content">
                    <p>
                        Welcome to “Nigerian Students and Young People Empowerment Initiative”, your trusted platform dedicated to supporting students in their
                        journey towards academic success. We understand the financial challenges that many students face
                        when it comes to paying for school fees and exams. That's why we're here to lend a helping hand and
                        ensure that no student's dreams are hindered by financial constraints.
                    </p>

                    <div class="link-container">
                        <router-link to="/apply">Apply Now</router-link>
                    </div>
                </div>
                <div class="student-picture">
                    <img :src="StudentImage" alt="student-picture">
                </div>
            </div>
        </div>
    </n-space>
</template>

<style lang="scss" scoped>
.welcome-page-wrap {

    // content-background 
    &>.content-background {
        border-top: 3px solid #fff;
        border-bottom: 3px solid #fff;
        background-color: $base-color;
        padding: 0 0 0 60px;
        display: flex;
        column-gap: 50px;
        row-gap: 50px;
        color: #fff;

        //   content
        &>.content {
            // border: 1px solid red;
            display: flex;
            flex-direction: column;
            row-gap: 80px;
            padding-bottom: 20px;


            // paragraphy
            p {
                // border: 1px solid red;
                width: 615px;
                padding-top: 34px;
                font-size: 18px;
                font-weight: 700;
                line-height: 30px;
                letter-spacing: 0em;
                font-weight: 400;
                line-height: 30px;
                letter-spacing: 0em;
            }

            // paragraphy

            // span
            div {

                a {
                    width: 196px;
                    border: 2px solid #fff;
                    border-radius: 50px;
                    padding: 10px 15px;
                    display: inline-block;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    text-decoration: none;
                    transition: all 0.3s;

                    &:hover {
                        background-color: #fff;
                        color: $base-color;
                    }
                }
            }
        }


        &>.student-picture {
            // border: 1px solid red;
            width: 100%;

            // image
            img {
                // border: 12px solid red;
                width: auto;
                height: 497px;
            }
        }

    }
}

// MEDIA QUERY---

// XX-SM (<251px)
@media (max-width: 250.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border: transparent;
            padding: 0 0 70px;
            flex-direction: column-reverse;
            row-gap: 10px;

            //   content
            &>.content {
                padding: 0 10px;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    font-size: 14px;
                }


                &>div {
                    display: flex;
                    justify-content: center;

                    a {
                        // border: 2px solid red;
                        width: 60%;
                        border-width: 1px;
                        border-radius: 10px;
                        padding: 5px 10px;
                        font-size: 14px;
                    }
                }
            }


            &>.student-picture {

                display: flex;
                justify-content: center;
                overflow: hidden;

                // image
                img {
                    width: 120%;
                    height: auto;
                    position: relative;
                    left: -10px;
                }
            }
        }
    }
}


// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border: transparent;
            padding: 0 0 70px;
            flex-direction: column-reverse;
            row-gap: 10px;

            //   content
            &>.content {
                padding: 0 10px;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    font-size: 14px;
                }


                &>div {
                    display: flex;
                    justify-content: center;

                    a {
                        width: 50%;
                        border-width: 1px;
                        border-radius: 10px;
                        padding: 5px 10px;
                        font-size: 14px;
                    }
                }
            }


            &>.student-picture {

                display: flex;
                justify-content: center;
                overflow: hidden;

                // image
                img {
                    width: 120%;
                    height: auto;
                    position: relative;
                    left: -25px;
                }
            }
        }
    }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border: transparent;
            padding: 0 0 70px;
            flex-direction: column-reverse;
            row-gap: 10px;

            //   content
            &>.content {
                padding: 0 10px;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    font-size: 14px;
                }


                &>div {
                    display: flex;
                    justify-content: center;

                    a {
                        width: 50%;
                        border-width: 1px;
                        border-radius: 10px;
                        padding: 5px 10px;
                        font-size: 14px;
                    }
                }
            }


            &>.student-picture {

                display: flex;
                justify-content: center;
                overflow: hidden;

                // image
                img {
                    width: 120%;
                    height: auto;
                    position: relative;
                    left: -25px;
                }
            }
        }
    }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border: transparent;
            padding: 0 0 70px;
            flex-direction: column-reverse;
            row-gap: 10px;

            //   content
            &>.content {
                padding: 0 10px;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    font-weight: normal;
                    font-size: 15px;
                }


                &>div {
                    display: flex;
                    justify-content: center;

                    a {
                        width: 40%;
                        border-width: 2px;
                        padding: 8px 10px;
                        font-size: 14px;
                    }
                }
            }


            &>.student-picture {

                display: flex;
                justify-content: center;
                overflow: hidden;

                // image
                img {
                    width: 120%;
                    height: auto;
                }
            }
        }
    }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border: transparent;
            padding: 5px 0 70px;
            flex-direction: column-reverse;
            row-gap: 10px;

            //   content
            &>.content {
                padding: 0 20px;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    font-weight: normal;
                    font-size: 15px;
                }


                &>div {
                    display: flex;
                    justify-content: center;

                    a {
                        width: 40%;
                        border-width: 2px;
                        padding: 8px 10px;
                        font-size: 14px;
                    }
                }
            }


            &>.student-picture {

                display: flex;
                justify-content: center;
                overflow: hidden;

                // image
                img {
                    width: 120%;
                    height: auto;
                }
            }
        }
    }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            border-top: 2px solid #fff;
            border-bottom: 2px solid #fff;
            padding: 0 0 70px 60px;

            //   content
            &>.content {
                width: 100%;
                row-gap: 60px;

                // paragraphy
                &>p {
                    width: 100%;
                    padding-right: 50px;
                    font-size: 18px;
                }


                &>div {
                    a {
                        width: 170px;
                        border-width: 2px;
                        padding: 10px 15px;
                        font-size: 16px;
                    }
                }
            }


            &>.student-picture {
                min-width: 550px;
                display: flex;
                justify-content: center;

                // image
                img {
                    width: inherit;
                    max-height: 450px;
                }
            }
        }
    }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
@media (min-width: 1500px) {
    .welcome-page-wrap {

        // content-background 
        &>.content-background {
            padding: 0 0 0 200px;

            column-gap: unset;

            //   content
            &>.content {
                width: 100%;
                padding: 40px 0;
            }


            &>.student-picture {
                width: 100%;
                display: flex;
                align-items: center;

                // image
                img {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}</style>
