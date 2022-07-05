<template>
    <div class="sideMenu" :class="{open: isOpen}">
        <template v-for="tag in mediaList.mediaObjects" :key="tag.fileUrl">
            <div class="tag bg-cover" @click="goTagLocation(tag)" v-if="tag.fileUrl.includes('glb')" :style="{backgroundImage:'url(' +tag.thumbnail+ ')'}"></div>
            <div v-else class="tag bg-cover" @click="goTagLocation(tag)" :style="{backgroundImage:'url(' +tag.fileUrl+ ')'}"></div>
        </template>
        <div class="closeSideMenu" @click="closeSideMenu">
            <i class="fa-solid fa-xmark"></i>
        </div>
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

  computed: {
    isOpen () {
      return this.$store.getters.isOpen
    },
    mediaList () {
      return this.$store.getters.mediaList
    }
  },
  methods: {
    goTagLocation (tag) {
      this.viewer.controls.goTagLocation(tag.id)
      this.$store.commit('openMenu', false)
      console.log('go to tag successfully!')
    },
    closeSideMenu () {
      this.$store.commit('openMenu', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-cover{
    background-size: cover;
    background-position: center center;
}
.sideMenu {
    overflow-y: auto;
    width: 350px;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    right: 0;
    z-index: 2;
    transform: translateX(100%);
    transition: transform 0.5s linear;
    &.open {
        transform: translateX(0px);
    }

    .tag {
        box-sizing: border-box;
        cursor: pointer;
        width: 90px;
        height: 90px;
        margin: 10px;
        transition: border 0.1s linear;
        &:hover {
        border: 3px solid skyblue;
        border-radius: 5px;
        }
    }
    .closeSideMenu {
        cursor: pointer;
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 7px;
    }
}
</style>
