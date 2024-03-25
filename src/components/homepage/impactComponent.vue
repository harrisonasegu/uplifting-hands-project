<script setup lang="ts">
import CardComponent from '@/components/card-containers/youtubeVideoCardContainer.vue'
</script>

<template>
    <div class="content">
        <div class="paragraphy-caption">
            “Empowering Students, Transforming Future”
        </div>

        <div class="paragraphy">
            <p>
                “Nigerian Students and Young People Empowerment Initiative” our impact goes beyond providing financial assistance for school fees and
                exams. We are dedicated to empowering students and transforming their futures through education.
                We believe that education is a powerful catalyst for change, and our mission is to ensure that
                no student's potential is limited by financial barriers
            </p>
        </div>

        <CardComponent />
    </div>
</template>

<style lang="scss" scoped>
.content {
    &>.paragraphy-caption {
        font-weight: 800;
        font-size: 22px;
        line-height: 30.26px;
        padding-bottom: 10px;
        color: $base-color;
    }

    &>.paragraphy {

        p {
            font-style: normal;
            font-size: 18px;
            padding-bottom: 30px;
        }
    }

    &>.youtube-videos {
        // border: 3px solid #8a1414;
        display: flex;
        // justify-content: space-evenly;
        column-gap: 20px;
        row-gap: 20px;
        flex-wrap: wrap;
        width: 100%;

        .videos {
            border: 2px solid greenyellow;
            width: calc(100%/3.5);
        }
    }
}

// Media Query-------------------
@media (max-width: 250.9px) {
    .content {
        padding: 0 10px;

        .paragraphy-caption {
            font-size: 15px;
        }

        .paragraphy {

            p {
                font-size: 16px;
            }
        }
    }
}

@media (min-width: 251px) and (max-width: 350.9px) {
    .content {
        padding: 0 10px;

        .paragraphy-caption {
            font-size: 17px;
        }

        .paragraphy {

            p {
                font-size: 16px;
            }
        }
    }
}

@media (min-width: 351px) and (max-width: 575.9px) {
    .content {
        padding: 0 10px;

        .paragraphy-caption {
            font-size: 18px;
        }

        .paragraphy {

            p {
                font-size: 16px;
            }
        }
    }
}

@media (min-width: 576px) and (max-width: 767.9px) {
    .content {
        padding: 0 10px;

        .paragraphy-caption {
            font-size: 20px;
        }

        .paragraphy {

            p {
                font-size: 17px;
            }
        }
    }
}

@media (min-width: 768px) and (max-width: 991.9px) {
    .content {
        padding: 0 20px;

        .paragraphy-caption {
            font-size: 20px;
            font-weight: 600;
        }

        .paragraphy {

            p {
                font-size: 18px;
            }
        }
    }
}

@media (min-width: 992px) and (max-width: 1449.9px) {
    .content {
        padding: 0 50px;

        .paragraphy-caption {
            font-size: 20px;
            font-weight: 600;
        }
    }


    .paragraphy {

        p {
            font-size: 20px;
        }
    }
}

@media (min-width: 1500px) {
    .content {
        padding: 0 200px;
    }
}
</style>
