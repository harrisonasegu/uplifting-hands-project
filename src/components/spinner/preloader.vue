<template>
  <div>
    <h3>Loading....</h3>
  </div>
</template>

<style lang="scss" scoped>
div {
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    animation-name: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transition: all 0.5;
    font-size: 16px;
    color: $base-color;
  }

  @keyframes loading {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
