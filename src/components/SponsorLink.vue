<template>
    <div class="content">
        <div class="link-container" v-for="photo in content.photos" :key="photo">
            <div class="link-image" :style="{backgroundImage:'url(' +photo.fileUrl+ ')'}">
                <div class="link1">
                    <a target="_blank" href="https://www.starbucks.com.tw/home/index.jspx?r=45"></a>
                </div>
                <div class="link2">
                    <a target="_blank" href="https://www.louisacoffee.co/"></a>
                </div>
                <div class="link3">
                    <a target="_blank" href="https://www.85cafe.com/"></a>
                </div>
                <div class="link4">
                    <a target="_blank" href="https://www.barista.com.tw/"></a>
                </div>
                <div class="link5">
                    <a target="_blank" href="https://events.tk3c.com/events_net/crowncoffee/index.html?utm_source=crown&utm_medium=facebook&utm_campaign=about&fbclid=IwAR0gyHNbD8bYzgHr_XAb4_JtUmuzlChd2TzXdUDR6oJlK0ysqQv6ipsUA9s"></a>
                </div>
                <div class="link6">
                    <a target="_blank" href="https://www.camacafe.com/"></a>
                </div>
                <div class="link7">
                    <a target="_blank" href="https://www.cometrue-coffee.com/"></a>
                </div>
                <div class="link8">
                    <a target="_blank" href="http://www.dante.com.tw/"></a>
                </div>
                <div class="link9">
                    <a target="_blank" href="https://www.hwcroasters.com/"></a>
                </div>
                <div class="link10">
                    <a target="_blank" href="https://www.zhanlu.com.tw/"></a>
                </div>
                <div class="link11">
                    <a target="_blank" href="https://www.ikari.com.tw/"></a>
                </div>
                <div class="link12">
                    <a target="_blank" href="https://www.mrbrown.com.tw/"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    box-sizing: border-box;
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
        .link-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .link-image {
            position: relative;
            background-size: cover;
            background-position: center center;
            padding-top: 56.25%;
            .link1 {
                position: absolute;
                top: 0;
                left: 0;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link2 {
                position: absolute;
                top: 0;
                left: 25%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link3 {
                position: absolute;
                top: 0;
                left: 50%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link4 {
                position: absolute;
                top: 0;
                left: 75%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link5 {
                position: absolute;
                top: 33.333333%;
                left: 0;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link6 {
                position: absolute;
                top: 33.333333%;
                left: 25%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link7 {
                position: absolute;
                top: 33.333333%;
                left: 50%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link8 {
                position: absolute;
                top: 33.333333%;
                left: 75%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link9 {
                position: absolute;
                top: 66.666666%;
                left: 0%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link10 {
                position: absolute;
                top: 66.666666%;
                left: 25%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link11 {
                position: absolute;
                top: 66.666666%;
                left: 50%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .link12 {
                position: absolute;
                top: 66.666666%;
                left: 75%;
                width: 25%;
                height: 33.333333%;
                a {
                    box-sizing:border-box;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        }
}
</style>
