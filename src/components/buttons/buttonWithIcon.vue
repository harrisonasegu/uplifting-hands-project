<script setup lang="ts">
import { NButton } from 'naive-ui';

const emit = defineEmits([
    'buttonClicked'
])

const buttonClicked = () => emit('buttonClicked')
</script>

<template>
    <n-button @click="buttonClicked">
        <span>
            <slot name="buttonText" />
        </span>
        <slot name="buttonIcon" />
    </n-button>
</template>

<style lang="scss" scoped>
.n-button {
    padding: 20px 25px;
    display: flex;
    column-gap: 50px;
    align-items: center;
    color: $base-color;
    transition: $transition;
    text-decoration: none;
    font-size: 16px;

    &:hover {
        background-color: $base-color;
        color: #fff;
    }

    // button text
    span:first-child {
        margin-right: 10px;
    }

    // button icon
    span:last-child {
        font-weight: bolder;
    }
}
</style>