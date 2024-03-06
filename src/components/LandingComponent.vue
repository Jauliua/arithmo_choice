<template>
    <div class="landing-page">
        <SessionComponent v-if="sessionComponent" @close="storeSessionID"></SessionComponent>
        <h1 class="title">ARITHMO</h1>
        <h3 class="type_title">choice</h3>
        <!-- <Vue3Lottie id="wow_anim" :animationData="wow" :height="200" :width="200" /> -->
        <div id="tutorial-button">
            <div @click="startTut()" id="tutorial">TUTORIAL</div></div>
        <div @click="startGame()" class="skip-button"><div id="skip">start</div> </div>
    </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import SessionComponent from './SessionComponent.vue';
export default {
    components: {
        // Vue3Lottie,
        SessionComponent
    },

    data() {
        return {
            sessionComponent: true
        }
    },
    name: 'LandingComponent',
    computed: {
        sessionID() {
            return this.$store.state.sessionID
        }
    },
    methods: {
        startGame() {
            this.$emit('skip-tut');
        },
        startTut() {
            this.$emit('start-tut');
        },
        storeSessionID() {
            this.sessionComponent = false;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kodchasan&display=swap');
#wow_anim{
    background-color: yellow;
}
.landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100vh;
    font-family: 'Kodchasan', sans-serif;
}
.type_title{
    margin-top: 0;
    font-size: 26px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;

}
.title {
    padding-top: 12vh;
    margin-bottom: 0;
    color: #fff;
    position: relative;
    letter-spacing: 0.1em;
    font-weight: 700;
    font-size: 40px;
    text-shadow:     1px 1.7px 0px black,
    0.8px 1.4px 0px black,

    1.7px 1px 0px black,

    1.8px 1.8px 0px black;

    -webkit-text-stroke: 2px #000;
}

#tutorial-button {
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: 25vh;
    cursor: pointer;
    border: 1.5px solid rgb(0, 0, 0);
    padding: 3px 7px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 2px 0px #000;

}
#tutorial{
    font-size: 22px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    }
.skip-button {
    font-size: 1rem;
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: 17vh;
    font-family: 'Kodchasan', sans-serif;
}


.tutorial-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-family: 'Kodchasan', sans-serif;
    /* Add the same styling as the start button in the HomeComponent */
}

.skip-button {
    /* Add specific styling for the skip button */
    font-size: 22px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    background-color: none;
    border: none;
    text-decoration: underline;
}
</style>
