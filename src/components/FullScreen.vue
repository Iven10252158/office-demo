<template>
    <button v-show="sceneReady" type="button" class="fullscreenBtn" @click="fullScreen">
        <span>
            <i class="fa-solid fa-expand"></i>
        </span>
    </button>
</template>

<script>
export default {
  props: {
    sceneReady: {
      type: Boolean
    }
  },
  methods: {
    fullScreen () {
      this.$emit('full-screen')
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreenBtn {
    position: absolute;
    bottom: 20px;
    right: 10px;
    z-index: 1;
    cursor: pointer;
    border: none;
    background-color: rgba(0,0,0,0.5);
    padding: 5px 30px;
    border-radius: 20px;
    > span {
        font-size: 26px;
        background-color: transparent;
        color: #eee;
        &:hover {
            color: #71a1c1;
        }
    }
}
</style>
