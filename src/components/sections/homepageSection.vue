<script setup lang="ts">
defineProps({
  bgClassName: String
})
</script>

<template>
  <div :class="[
    'section-content-container',
    bgClassName
  ]">
    <h2>
      <slot name="caption" />
    </h2>

    <section class="section-content">
      <!-- section content -->
      <slot />
    </section>
  </div>
</template>

<style lang="scss" scoped>
div.section-content-container {
  padding-top: 37px;
  padding-bottom: 52px;
  display: flex;
  flex-direction: column;
  row-gap: 76px;
  background-color: $base-color;

  &.white-bg {
    background-color: #FFFFFF;

    &>h2 {
      color: $base-color;
    }
  }

  &>h2 {
    font-weight: 800;
    font-size: 35px;
    text-align: center;
    color: #FFFFFF;
  }
}

@media (max-width: 299.9px) {
  div.section-content-container {
    row-gap: 50px;

    &>h2 {
      font-weight: normal;
      font-size: 25px;
    }
  }
}

@media (min-width: 300px) and (max-width: 575.9px) {
  div.section-content-container {
    row-gap: 50px;

    &>h2 {
      font-weight: 600;
      font-size: 25px;
    }
  }
}

@media (min-width: 576px) and (max-width: 767.9px) {
  div.section-content-container {
    row-gap: 50px;

    &>h2 {
      font-size: 25px;
    }
  }
}

@media (min-width: 768px) and (max-width: 991.9px) {
  div.section-content-container {
    row-gap: 60px;

    &>h2 {
      font-size: 30px;
    }
  }
}

@media (min-width: 992px) and (max-width: 1199.9px) {
  div.section-content-container {
    row-gap: 70px;
  }
}

// @media (min-width: 1500px) {}</style>
