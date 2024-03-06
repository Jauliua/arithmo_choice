<template>
  <div id="app">
    <KeepAlive :exclude="['GameComponent']">
    <component :is="mainComponent" v-on="currenMainEvents" class="main-component"/>
  </KeepAlive>
  </div>
</template>

<script>
import ContainerComponent from './components/ContainerComponent.vue'
import TutorialComponent from './components/TutorialComponent.vue'
import LandingComponent from './components/LandingComponent.vue';
export default {
  name: 'App',
  data() {
    return {
      mainComponent: 'LandingComponent'
    }
  },
  components: {
    ContainerComponent,
    LandingComponent,
    TutorialComponent
  },
  computed: {
    currenMainEvents: function() {
      if (this.mainComponent === 'LandingComponent') {
        return { 'skip-tut': this.startGame, 'start-tut': this.startTut}
      }
      if (this.mainComponent === 'ContainerComponent') {
        return { 'return-landing': this.returnLanding }
      }
      if (this.mainComponent === 'TutorialComponent') {
        return { 'skip-tut': this.startGame, 'return-landing': this.returnLanding }
      }
      return {};
    }
  },
  methods: {
    startGame() {
      console.log('startGame');
      this.mainComponent = 'ContainerComponent';
    },
    returnLanding() {
      console.log('returnLanding App');
      this.mainComponent = 'LandingComponent';
    },
    startTut(){
      console.log('startTut');
      this.mainComponent = 'TutorialComponent';
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}


html, body {
    margin: 0;
    height: 100%;
    /* overflow: hidden; */
}


</style>
