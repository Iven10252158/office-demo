<template>
    <div class="bg-image" v-show="showBG"></div>
    <ProgressBar :progress="progressbar"></ProgressBar>
      <fullscreen v-model="fullScreen">
        <transition>
          <div class="popup_iframe" ref="popup" v-show="isOpen" :style="{ width: popupSize.width, height: popupSize.height}">
            <img v-show="isLoading" class="loading" src="../assets/loading.gif" alt="">
            <span class="closeBtn" @click="controlModal('closePopup')">
              <i class="fa-solid fa-xmark"></i>
            </span>

            <template v-if="popupType==='video'">
              <YoutubeVue3 ref="youtube" :videoid="popupContent.videoId" :width="videoWidth" :height="videoHeight"  @played="onPlayed"/>
            </template>
            <template v-else-if="popupType==='facebook'">
              <iframe @load="fbLoad" class="fb_iframe"
              :src="popupContent.fbSrc"
              frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:340px; height:500px;" allowTransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>
            </template>
            <template v-else-if="popupType==='iframe'">
              <iframe @load="load" class="innerPopup_iframe" :class="{ 'bg-white': isWhite }" :src="popupContent.iframeUrl" frameborder="0"></iframe>
            </template>
            <template v-else-if="popupType==='image'">
              <div class="content">
                <div class="image-container" v-for="photo in content.photos" :key="photo">
                  <div class="image bg-cover" :style="{backgroundImage:'url(' +photo.fileUrl+ ')'}"></div>
                  <!-- <img class="image" :src="photo.fileUrl" alt=""> -->
                </div>
                <div class="text-group">
                  <h2 class="title">{{ content.title }}</h2>
                  <h3 class="subTitle">{{ content.subTitle }}</h3>
                  <p class="description">{{ content.description }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="popupType==='link'">
                <SponsorLink :content="content"/>
            </template>
            <template v-else-if="popupType==='3D_Model'">
                <model-viewer id="reveal" style="width: 90%; height: 95%" loading="auto" camera-controls auto-rotate
                  rotation-per-second="30deg" auto-rotate-delay="0"
                  :src="popupContent.model" alt="A 3D model of a printer">
                </model-viewer>
                <a class="readMore" :href="popupContent.iframeUrl" target="_blank">Read More</a>
            </template>
            <template v-else-if="popupType==='punchIn'">
              <span class="closeBtn" @click="controlModal('closeSystem')">
                <i class="fa-solid fa-xmark"></i>
              </span>
              <span class="punchIn-text" v-show="isSuccess" v-for="item in deleteObj" :key="item.num">
                  <h6>員編：<span> {{ item.num }} </span></h6>
                  <h6>姓名：<span> {{ item.name }} </span></h6>
                  <h6><span> {{ time }} </span> 打卡成功</h6>
              </span>
            </template>
            <template v-else-if="popupType === 'game'">
                <span class="closeBtn" @click="controlModal('closeGame')">
                    <i class="fa-solid fa-xmark"></i>
                </span>
                <div class="modal" :class="{'show-qusetion': isShow}">
                    <div class="qusetion" :class="{ moveLeft: isSend }">
                        <h5>光禾感知成立於什麼時候？</h5>
                    </div>
                    <div class="answer-block" :class="{ moveLeft: isSend }">
                        <div class="answer-group" :class="{ disabled:isDisabled  }">
                          <label>
                            <input type="radio" name="date" class="date" value="march" v-model="answer">A.2017年3月
                          </label>
                          <label>
                            <input type="radio" name="date" class="date" value="january" v-model="answer">B.2020年1月
                          </label>
                          <label>
                            <input type="radio" name="date" class="date" value="july" v-model="answer">C.2016年7月
                          </label>
                        </div>
                        <button type="button" class="send" @click="sendAnswer" v-if="answer !== ''">確認送出</button>
                    </div>
                    <div class="answer-container">
                        <div class="correct-box" v-if="answer === 'march'"
                          :class="{'open-box': correctAnswer}">
                          <h6 class="correct-logo" :class="{ 'correct-logo-show': isSend }">
                            <i class="fa-solid fa-circle-check"></i>
                          </h6>
                          <h5 class="correct_answer" :class="{ correct: isSend }">恭喜你答對了！</h5>
                        </div>
                        <div class="wrong-box" v-else-if="answer === 'july' || answer === 'january'"
                          :class="{'open-box': wrongAnswer}">
                          <h6 class="wrong-logo" :class="{ 'wrong-logo-show': isSend }">
                            <i class="fa-solid fa-circle-xmark"></i>
                          </h6>
                          <h5 class="wrong_answer" :class="{ wrong: isSend }">哇～答錯囉！</h5>
                        </div>
                    </div>
                </div>
            </template>
          </div>
        </transition>
        <SideMenu :viewer="viewer" :sceneReady="sceneReady"/>
        <iframe
          id="iframe"
          @load="onLoad"
          className='Viewer'
          ref="iframeref"
          frameBorder='0'
          src='3dviewer/index.html'>
        </iframe>
        <Buttons :viewer="viewer" :sceneReady="sceneReady"/>
        <FullScreenBtn :sceneReady="sceneReady" @full-screen="fullscreen" />
    </fullscreen>
</template>

<script>
import YoutubeVue3 from '@/components/YoutubeVue3.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Buttons from '@/components/Buttons.vue'
import SideMenu from '@/components/SideMenu.vue'
import SponsorLink from '@/components/SponsorLink.vue'
import FullScreenBtn from '@/components/FullScreen.vue'
import data from '../data/data.json'

export default {
  components: {
    ProgressBar,
    Buttons,
    SideMenu,
    SponsorLink,
    FullScreenBtn,
    YoutubeVue3
  },
  data () {
    return {
      ViewerSdkCmd: {
        sceneinfo: 'sceneinfo',
        taginfo: 'taginfo',
        progressbar: 'progressbar',
        sceneready: 'sceneready',
        userhasinteract: 'userhasinteract',
        opentag: 'opentag',
        opencomponent: 'opencomponent'
      },
      myViewer: null,
      viewer: null,
      progressbar: 0,
      isLoading: false,
      sceneReady: false,
      isOpen: false,
      showBG: true,
      videoWidth: '100%',
      videoHeight: '90%',
      popupContent: {
        // fb的iframe網址
        fbSrc: '',
        iframeUrl: '', // iframe連結的網址
        videoId: '', // youtubeId
        model: '' // 3D模型
      },
      popupType: '', // popup種類
      content: {}, // 會議室牆上的tag
      popup: '',
      popupSize: {
        width: 0,
        height: 0
      },
      fullScreen: false,
      isWhite: false,
      isSuccess: false,
      isShow: false,
      time: '',
      deleteObj: {},
      staffInfo: [
        {
          num: 'OC000148',
          name: 'Iven'
        },
        {
          num: 'OC000001',
          name: 'Joseph'
        },
        {
          num: 'OC000066',
          name: 'Steven'
        }
      ],
      isDisabled: false,
      isSend: false,
      correctAnswer: false,
      wrongAnswer: false,
      answer: ''
    }
  },
  methods: {
    onPlayed () {
      this.isLoading = false
    },
    fullscreen () {
      this.fullScreen = true
    },
    onLoad () {
      const viewer = this.$refs.iframeref.contentWindow
      // 載入scene with id
      viewer.init(`${process.env.VUE_APP_SDK_KEY}`) // LE35kztLLmyzanlcCAta
      viewer.setScene({
        sdkDebug: true,
        sceneId: `${process.env.VUE_APP_SCENE_ID}` // '  WDVa915kttuHvv9dR9I4  sDoavMOVsUcsGRobB8rf '
      })
      viewer.focus()
      this.setViewer(viewer)
      window.addEventListener('message', this.viewerMessageHandler, false)
      // keydown
      // for wsad 功能
      window.addEventListener('keydown', e => {
        // console.log('e', e)
        viewer.focus()
        // 傳送到 3d viewer
        viewer.dispatchEvent(
          new KeyboardEvent('keydown', { key: e.key })
        )
      })
    },
    setViewer (viewer) {
      this.viewer = viewer
    },
    setProgress (data) {
      this.progressbar = Math.round(data * 100)
      if (this.progressbar === 100) {
        this.showBG = false
      }
    },
    setSceneReady (boolean) {
      this.sceneReady = boolean
    },
    getProduct (id) {
      data.forEach(item => {
        if (id === item.moduleId) {
          this.popupType = item.popupType
          this.popupSize = item.popupSize
          this.popup.style.width = `${this.popupSize.width}`
          this.popup.style.height = `${this.popupSize.height}`
          this.isOpen = true
          this.isLoading = true
          this.popupContent = {}
          this.content = {}
          this.$http.get(`${process.env.VUE_APP_API_PRODUCT_URL}?id=${id}`).then(res => {
            // console.log('res', res)
            const currentTime = new Date()
            switch (this.popupType) {
              case 'iframe' :
                if (res.data.openLink) {
                  this.popupContent.iframeUrl = res.data.openLink
                }
                break
              case 'video' :
                if (res.data.videoId) {
                  this.popupContent.videoId = res.data.videoId
                }
                break
              case 'facebook' :
                if (this.isOpen) {
                  this.popupContent.fbSrc = 'https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FOSENSETECH&width=340&colorscheme=light&small_header=false&border_color=&stream=true&header=false&height=500'
                  // this.popupContent.fbSrc = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOSENSETECH&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
                }
                break
              case '3D_Model' :
                this.popupContent.model = res.data.fileUrl
                this.popupContent.iframeUrl = res.data.openLink
                this.isLoading = false
                break
              case 'image' :
                this.content = res.data
                if (this.content) {
                  this.isLoading = false
                }
                break
              case 'link' :
                this.content = res.data
                if (this.content) {
                  this.isLoading = false
                }
                break
              case 'punchIn' :
                this.deleteObj = this.staffInfo.splice(0, 1)
                this.isSuccess = true
                this.isLoading = false
                this.time =
                  `${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${currentTime.getDate()}號
                  ${currentTime.getHours()}點
                  ${currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`}分
                  ${currentTime.getSeconds() < 10 ? `0${currentTime.getSeconds()}` : currentTime.getSeconds()}秒`
                break
              case 'game' :
                this.isShow = true
                this.isLoading = false
                this.answer = ''
                break
              default: {
                console.log('default')
                break
              }
            }
          }).catch(err => {
            console.log('err', err)
          })
        }
      })
    },
    sendAnswer () {
      this.isDisabled = true
      this.isLoading = true
      if (this.answer === 'march') {
        this.correctAnswer = true
      } else {
        console.log('no')
        this.wrongAnswer = true
      }
      setTimeout(() => {
        this.isSend = true
        this.isLoading = false
      }, 1000)
    },
    fbLoad () {
      this.$nextTick(() => {
        if (this.popupType === 'facebook' && this.popupContent.fbSrc) {
          this.isLoading = false
        }
      })
    },
    load () {
      this.$nextTick(() => {
        if (this.popupType === 'iframe' && this.popupContent.iframeUrl) {
          this.isLoading = false
          this.isWhite = true
          console.log('iframe載入完成')
        }
      })
    },
    controlModal (trigger) {
      this.isOpen = false
      this.popupType = ''
      switch (trigger) {
        case 'closePopup' :
          this.isWhite = false
          break
        case 'closeSystem' :
          this.isSuccess = false
          this.deleteObj.forEach(item => {
            this.staffInfo.push(item)
          })
          break
        case 'closeGame' :
          this.isDisabled = false
          this.isSend = false
          this.wrongAnswer = false
          this.correctAnswer = false
          this.isShow = false
          this.answer = ''
          break
      }
    },
    // 處理3d viewer傳送過來的資料
    viewerMessageHandler (evt) {
      try {
        const viewerData = JSON.parse(evt.data)
        // console.log('viewerData', viewerData)
        const data = viewerData.data // tags
        // console.log('data', data)
        const viewer = this.$refs.iframeref?.contentWindow
        // console.log(viewer)
        switch (viewerData.command) {
          case this.ViewerSdkCmd.progressbar:
            this.setProgress(data)
            break
          case this.ViewerSdkCmd.sceneready:
            this.setSceneReady(true)
            this.floors = viewer.getAllFloorNumbers()
            // this.setFloors(this.floors)
            break
          case this.ViewerSdkCmd.userhasinteract:
          // 已經進入到場景
            console.log('user interact 3d viewer')
            break
          case this.ViewerSdkCmd.opentag:
            console.log('sdk receives tagId: ' + data.tagId)
            break
          case this.ViewerSdkCmd.taginfo:
          // 得到所有場景tag資料
            this.setTags(data)
            break
          case this.ViewerSdkCmd.opencomponent:
            console.log(`sdk receives moduleId: ${data.moduleId}`)
            // console.log(`sdk receives tokenId: ${data.tokenId}`)
            if (data.tokenId) {
              this.getNft(data.tokenId)
            } else {
              this.getProduct(data.moduleId)
            }
            break
        }
      } catch (e) {

      }
    }
  },
  // created () {
  //   window.addEventListener('resize', () => {
  //     console.log('width:', window.innerWidth)
  //     console.log('height:', window.innerHeight)
  //     this.screenWidth = window.innerWidth
  //     this.screenHeight = window.innerHeight
  //     if (this.screenWidth > 1200) {
  //       this.popupSize.width = '1080px'
  //       this.popupSize.height = '650px'
  //     }
  //   })
  // },
  mounted () {
    this.popup = this.$refs.popup
    this.$nextTick(() => {
      this.onLoad()
    })
  }
}
</script>

<style lang="scss" scoped>
  .Viewer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
  }
  .bg-cover {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .bg-image {
    background-size: cover;
    background-position: center center;
    background-image:url('../assets/OS_bg.jpg');
    max-width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;
  }
  .popup_iframe {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
    z-index: 1;
    width: 0%;
    height: 0%;
    overflow: hidden;
    background-color: rgba(0,0,0,0.7);
    border-radius: 18px;
    box-shadow: rgba(128, 128, 128, 0.75) 0px 5px 15px;

    .loading {
      width: 50px;
      height: 50px;
      z-index: 3;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .closeBtn{
      cursor: pointer;
      position: absolute;
      z-index: 2;
      top: 10px;
      right: 20px;
      font-size: 26px;
      color: #ccc;
    }
    .innerPopup_iframe {
      width: 95%;
      height: 95%;
      border-radius: 18px;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 50%);
      &.bg-white{
        background-color: #fff;
      }
    }
    .content {
      // border: 1px solid yellow;
      position: relative;
      box-sizing: border-box;
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .image-container {
        // border: 1px solid #fff;
        width: 45%;
        height: 90%;
        .image {
          // border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .text-group {
        // border: 1px solid #fff;
        // padding-left: 15px;
        width: 45%;
        height: 80%;
        color: #fff;
        letter-spacing: 0.25em;
        font-weight: 500;
        .title {
          padding: 10px 0;
          font-size: 32px;
        }
        .subTitle {
          padding: 10px 0;
          font-size: 28px;
        }
        .description {
          line-height: 1.4em;
          padding: 10px 0;
          font-size: 16px;
        }
      }
    }
    .readMore {
      cursor: pointer;
      position: absolute;
      right: 5%;
      bottom: 10%;
      background-color: #fff;
      padding: 10px 15px;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 600;
      letter-spacing: 1px;
    }
    model-viewer#reveal{
      --poster-color: transparent;
    }
    .punchIn-text {
      text-align: center;
      line-height: 1.5em;
      letter-spacing: 3px;
      color: #fff;
    }
    .modal {
      overflow:hidden;
      position: relative;
      // border: 1px solid #fff;
      height: 0;
      width: 80%;
      &.show-qusetion {
        height: 90%;
      }
      .qusetion {
        text-align: center;
        padding: 10px 0;
        color: #fff;
        transition: transform 0.1s linear;
        &.moveLeft {
          transform: translateX(-400px);
        }
      }
      .send {
        cursor: pointer;
        border: 0;
        padding: 5px 10px;
        background-color: #71a1c1;
        color: #1a1a1a;
        border-radius: 5px;
        letter-spacing: 2px;
      }
      .answer-block {
        height: 80px;
        color: #fff;
        letter-spacing: 1px;
        font-weight: 500;
        transition: transform 0.1s linear;
        .answer-group {
          text-align: center;
          padding: 10px 0;
            label {
              cursor: pointer;
              display: block;
              // border: 1px solid salmon;
              height: 40px;
            }

          &.disabled{
            background-color: rgba(204, 204, 204, 0.7);
            color: #666;  //disabled可用
            pointer-events: none;
          }
        }
        .send {
          margin: 10px 0;
          position: absolute;
          z-index: 1;
          right: 20px;
          bottom: 0;
        }
        &.moveLeft {
          transform: translateX(-400px);
        }
      }
      .answer-container {
        width: 100%;
        // border: 1px solid #fa0;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .correct-box {
          width: 100%;
          height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          .correct-logo {
            font-size: 28px;
            padding-bottom: 10px;
            color: green;
            transform: translateY(-30px);
            transition: transform 0.3s 1s linear;
            &.correct-logo-show {
              transform: translateY(0px);
            }
          }
          .correct_answer {
            color: #fff;
            opacity: 0;
            transition: opacity 0.3s 1.5s linear;
            &.correct {
              opacity: 1;
            }
          }
          &.open-box {
            height: 60px;
          }
        }
        .wrong-box {
          // border: 1px solid yellow;
          width: 100%;
          height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          .wrong-logo {
            color: red;
            font-size: 28px;
            padding-bottom: 10px;
            transform: translateY(-30px);
            transition: transform 0.3s 1s linear;
            &.wrong-logo-show {
              transform: translateY(0px);
            }
          }
          .wrong_answer {
            color: #fff;
            opacity: 0;
            transition: opacity 0.3s 1.5s linear;
            &.wrong {
              opacity: 1;
            }
          }
          &.open-box {
            height: 60px;
          }
        }
      }

    }
  }
  .v-enter-active, .v-leave-active {
    transition: bottom 0.3s linear;
  }

  .v-enter-from, .v-leave-to {
    left: 50%;
    bottom: -80%;
  }

  .v-enter-to, .v-leave-from {
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 50%);
  }

</style>
