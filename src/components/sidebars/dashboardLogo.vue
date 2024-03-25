<script setup lang="ts">
import imgUrl from '@/assets/logo-dashboard.jpg'
</script>

<template lang="">
    <div class="img-wrap">
        <img :src="imgUrl" alt="logo">
    </div>
</template>

<style lang="scss" scoped>
    div.img-wrap {
        width: fit-content;
        height: 80px;
        margin: 0 auto;
        padding: 0 5px;

        &>img {
            width: 100%;
            height: inherit;
        }
    }
</style>
