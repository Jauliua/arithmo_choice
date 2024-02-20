<template>
  <div id="app">
    <KeepAlive :exclude="['GameComponent']">
    <component :is="mainComponent" v-on="currenMainEvents" class="main-component"/>
  </KeepAlive>
  </div>
</template>

<script>
import ContainerComponent from './components/ContainerComponent.vue'
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
    LandingComponent
  },
  computed: {
    currenMainEvents: function() {
      if (this.mainComponent === 'LandingComponent') {
        return { 'skip-tut': this.startGame }
      }
      if (this.mainComponent === 'ContainerComponent') {
        return { 'return-landing': this.returnLanding }
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
    }
  }
  // ,mounted() {
  //   // Scroll to top after page load to shrink Safari navigation bar
  //   window.scrollTo(0, 1);
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
