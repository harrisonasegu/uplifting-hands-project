<script setup lang="ts">
import { NH2 } from 'naive-ui';

defineProps({
    backgroungImageUrl: String
})
</script>

<template>
    <div :style="{
        backgroundImage: `url(${backgroungImageUrl})`
    }">
        <n-h2>
            <slot>Products</slot>
        </n-h2>
    </div>
</template>

<style lang="scss" scoped>
div {
    height: 500px;
    padding: 100px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .n-h2 {
        text-transform: uppercase;
        font-style: normal;
        font-weight: 800;
        font-size: 30px;
        line-height: 77px;
        color: #fff;
    }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 350.9px) {
    div {
        height: 300px;
        padding: 50px 20px;

        .n-h2 {
            font-size: 14px;
            font-weight: lighter;
        }
    }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
    div {
        height: 400px;
        padding: 50px 20px;

        .n-h2 {
            font-size: 20px;
        }
    }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
    div {
        height: 400px;
        padding: 50px 20px;

        .n-h2 {
            font-size: 25px;
        }
    }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
    div {
        height: 400px;
        padding: 50px 20px;

        .n-h2 {
            font-size: 25px;
        }
    }
}
</style>
