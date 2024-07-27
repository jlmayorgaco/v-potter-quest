<template>
    <div class="splash">
        <div class="splash__container">
            <div class="splash__title">
                <h2>WHAT'S YOUR</h2>
                <h1>HOUSE?</h1>
            </div>
            <div class="splash__houses">
                <div class="splash__house" :class="{'active': theme.house === 'gryffindor'}" @click="setHouse('gryffindor')">
                    <img src="../assets/h1.png" alt="">
                </div>
                <div class="splash__house" :class="{'active': theme.house === 'slytherin'}" @click="setHouse('slytherin')">
                    <img src="../assets/h2.png" alt="">
                </div>
                <div class="splash__house" :class="{'active': theme.house === 'hufflepuff'}" @click="setHouse('hufflepuff')">
                    <img src="../assets/h3.png" alt="">
                </div>
                <div class="splash__house" :class="{'active': theme.house === 'ravenclaw'}" @click="setHouse('ravenclaw')">
                    <img src="../assets/h4.png" alt="">
                </div>
            </div>
            <div class="splash__message">
                <h2>TAP ON A HOUSE AND PRESS CONFIRM</h2>
            </div>
            <div class="splash__button" @click="doContinue()">
                CONTINUE
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useThemeStore } from '../stores/theme';

@Options({})
export default class SplashComponent extends Vue {
  msg!: string;

  public theme = useThemeStore();
  
  setHouse(houseName: string){
    this.theme.setHouse(houseName);
  }

  doContinue(){
    this.theme.setSplash(false);
  }
}
</script>
<style coped lang="scss">
@import '../styles/index';
.splash{
    display: block;
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #f7f7f7;

    box-sizing: border-box;
    padding: 2em;
    z-index: 1000;
}
.splash__container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    max-width: $size-max-w !important;
  max-height: $size-max-h !important;
  margin: 0 auto !important;


    background-color: #f7f7f7;

}
.splash__title{
    width: fit-content;
    font-size: 30px;
    font-weight: 900;
    color:#564936;

    margin-bottom: 1em;
}
.splash__title h1{
    font-size: 1.75em;
}
.splash__title h2{
    font-size: 1em;
    padding-bottom: 0.25em;
    margin-bottom: 0.25em;
    border-bottom: 5px groove #564936;
}
.splash__houses{
  display:grid;
  grid-template-columns: 150px 150px;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;



}
.splash__house{
    display:flex;
    align-items:center;
    justify-content:center;

    padding: 1em;
    background-color: #dcd4cb;
    border-radius: 0.75em;

    border: 3px solid rgba(0,0,0,0);

    img{
        width: 100%;
    }

    &.active{
        border: 3px solid var(--color-main);
    }

}
.splash__message{

    display: block;

    padding-top: 1em;
    padding-bottom: 1em;

    font-size: 20px;
    font-weight: 600;
    color: #4d4035;

    width: 250px;
    margin: 0 auto;
}
.splash__button{ 
    display: block;
    padding: 1em 2em;
    border-radius: 10em;
    background-color: #564936;
    color: white;
}
</style>