<template>
  <div class="vr" style="margin: 0px; overflow: hidden">
    <h1>Find the object? {{ flag }}</h1>
    <div class="vr__container">
      
      <video id="webcam" autoplay playsinline></video>

      <a-scene vr-mode-ui="enabled: false">
        <a-sphere cursor-listener position="-7 0 7" radius="1.25" color="yellowgreen"></a-sphere>
        <a-sphere cursor-listener position="-7 0 -7" radius="1.25" color="green"></a-sphere>
        <a-sphere cursor-listener position="7 0 7" radius="1.25" color="aqua"></a-sphere>
        <a-sphere cursor-listener position="7 0 -7" radius="1.25" color="orange"></a-sphere>
        <a-entity camera look-controls>
          <a-entity
            cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -0.6"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: blue; shader: flat"
          >
          </a-entity>
        </a-entity>
      </a-scene>

    </div>
  </div>
</template>


<script lang="ts">
/* eslint-disable */
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
const AFRAME = (window as any).AFRAME;
AFRAME.registerComponent('cursor-listener', {
      init: function () {
        let self = this;
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue']
        this.el.addEventListener('click', function (evt:any) {
          lastIndex = (lastIndex + 1) % COLORS.length;
          evt.target.setAttribute('material', 'color', COLORS[lastIndex])
          console.log(' evt ')
          console.log(evt)
          console.log('I was clicked at: ', evt.detail.intersection.point)
        })
      }
    });

@Options({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {
  public flag = false
  /*eslint no-loss-of-precision: "error"*/
  mounted(): void {
    var cameraView: any;

    var constraints = {
      audio: false,
      video: {
        facingMode: 'environment'
      }
    }

    // Access the device camera and stream to cameraView
    function cameraStart() {
      cameraView = document.querySelector('#webcam')
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          cameraView.srcObject = stream
        })
        .catch(function (error) {
          console.error('Oops. Something is broken.', error)
        })
    }

    cameraStart();

    // Start the video stream when the window loads
   //window.addEventListener('load', cameraStart, false)

    // Component to change to a sequential color on cursor suspension.

  }
}
</script>

<style lang="scss">
.vr {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: block;
}
#webcam {
  opacity: 0.5;
  position: fixed;
  background-size: 100% 100%;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>