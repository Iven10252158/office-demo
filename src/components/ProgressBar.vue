<template>
    <div class="container" v-if="isShow">
      <div class="box">
        <div class="percent">
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle ref="circle" cx="70" cy="70" r="70"></circle>
          </svg>
          <div class="number">
            <h2>{{ progress }}<span>%</span></h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number
    }
  },
  data () {
    return {
      isShow: true,
      dataProgress: 0
    }
  },

  watch: {
    progress () {
      this.dataProgress = this.progress
      this.$refs.circle.style.strokeDashoffset = `calc(440 - (440 * ${this.progress}) / 100)`
      if (this.progress === 100) {
        this.isShow = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  z-index: 99;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .box {
    position: relative;
    width: 100%;
    height: 100%;
    // background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .percent {
      position: relative;
      width: 150px;
      height: 150px;

      svg {
        position: relative;
        width: 150px;
        height: 150px;

        circle {
          width: 150px;
          height: 150px;
          fill: none;
          stroke-width: 10;
          stroke: #fff;
          stroke-dasharray: 440;
          stroke-dashoffset: 440;
          stroke-linecap: round;
          transform: translate(5px, 5px);

        }
        circle:nth-child(1) {
          stroke-dashoffset: 0;
          stroke: #f3f3f3;
        }
        circle:nth-child(2) {
        //   stroke-dashoffset: calc(440 - (440 * 100) / 100);
          stroke: #3e6d8d;
        }
      }
    }
    .number {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

       h2 {
        font-size: 30px;
        span {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
