<template>
  <div>
    <h3>Please wait....</h3>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(5, 5, 32, 0.705);

  h3 {
    animation-name: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transition: all 0.3;
    font-size: 17px;
    color: white;
  }

  @keyframes loading {
    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
