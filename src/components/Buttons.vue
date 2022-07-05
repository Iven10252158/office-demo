<template>
    <div class="btn-group" v-show="sceneReady">
        <button type="button" class="dollhouse" @click="dollHouseMode">
            <span>
                <i class="fa-solid fa-person-running"></i>
            </span>
        </button>
        <button type="button" class="hotSpot" :class="{ check:isHiddeHotspots }"  @click="enableViewerHotspots(!isHiddeHotspots)">
            <span class="hotSpot-icon">
                <i class="fa-solid fa-circle-notch"></i>
            </span>
        </button>
        <button type="button" class="getMediaList" :class="{ check:isOpen }" @click="getMediaList">
            <i class="fa-solid fa-tags"></i>
        </button>
    </div>
</template>

<script>
export default {
  props: {
    viewer: {
      type: Object
    },
    sceneReady: {
      type: Boolean
    }
  },
  data () {
    return {
      isHiddeHotspots: false
    }
  },
  computed: {
    isOpen () {
      return this.$store.getters.isOpen
    }
  },
  methods: {
    dollHouseMode () {
      this.viewer.controls.setDollHouseMode()
    },
    enableViewerHotspots (value) {
      this.isHiddeHotspots = value
      this.viewer.enableHotspots(value)
      console.log('isHiddeHotspots', this.isHiddeHotspots)
    },
    getMediaList () {
      const MediaList = this.viewer.getMediaList()
      this.$store.commit('openMenu', true)
      this.$store.commit('getMediaList', MediaList)
      console.log('MediaList', MediaList)
    }
  }
}

</script>

<style lang="scss" scoped>
.btn-group {
    position: absolute;
    bottom: 20px;
    left: 10px;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 20px;
    background-color: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 20px;
    > button {
        border: none;
    }
    .dollhouse, .hotSpot, .getMediaList {
        cursor: pointer;
        font-size: 26px;
        background-color: transparent;
        color: #eee;
        &:hover {
            color: #71a1c1;
        }
    }
    .check {
      color: #71a1c1;
    }
    .hotSpot {
        &:hover{
            animation: rotate 1s linear infinite;
        }
    }
}
@keyframes rotate {
    100% {
        transform: rotate(360deg)
    }
}

</style>
