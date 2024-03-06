<template>
    <div>
        <div class="navigation-bar">
            <div @click="returnLanding()" class="exit-button">
                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2L2.81577 8.79042C1.53305 9.56922 1.53305 11.4308 2.81577 12.2096L14 19" stroke="black" stroke-width="3" stroke-linecap="round"/>
            </svg>
            </div>
            <div class="more-button">
                <svg width="29" height="8" viewBox="0 0 41 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5.5" cy="5.5" r="5.5" fill="black"/>
                    <circle cx="20.5" cy="5.5" r="5.5" fill="black"/>
                    <circle cx="35.5" cy="5.5" r="5.5" fill="black"/>
                </svg>
            </div>
        </div>
        <div  id="overview">
            <div id="rank">
                <div id="rank_text">YOUR LEVEL: </div>
                <div id="plus_skip" :class="{text_animation: text_in_n_out_animation}"> +1 SKIP</div>
                <div :class="{levle_out : level_out_animation, level_in: level_in_animation}" id="level_svg_big">
                    <div id="rank_in_svg" :style="current_rank<10 ? {'font-size': '70px'} : {'font-size': '55px'}">{{ current_rank }}</div>
                    <svg width="177" height="186" viewBox="0 0 126 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Level">
                        <g id="polygon">
                        <mask id="path-1-inside-1_68_12" fill="white">
                        <path d="M71.3725 116.65C67.5631 123.511 57.6965 123.511 53.8871 116.65L5.95887 30.3308C2.88328 24.7917 5.66851 17.825 11.7151 15.9328L59.6433 0.934595C61.5878 0.326097 63.6718 0.326098 65.6163 0.934595L113.544 15.9328C119.591 17.825 122.376 24.7917 119.301 30.3308L71.3725 116.65Z"/>
                        </mask>
                        <path d="M71.3725 116.65C67.5631 123.511 57.6965 123.511 53.8871 116.65L5.95887 30.3308C2.88328 24.7917 5.66851 17.825 11.7151 15.9328L59.6433 0.934595C61.5878 0.326097 63.6718 0.326098 65.6163 0.934595L113.544 15.9328C119.591 17.825 122.376 24.7917 119.301 30.3308L71.3725 116.65Z" fill="#FFE6A9" stroke="black" stroke-width="6" mask="url(#path-1-inside-1_68_12)"/>
                        </g>
                        </g>
                    </svg>
                </div>
            </div>
            <div id="row_state">
                <Vue3Lottie ref="row_anim" id="row" :animationData="row_animation" :speed="1" :loop="false" :delay="500"></Vue3Lottie>
                <div :class="{levle_out : level_out_animation, level_in: level_in_animation}" id="level_svg_small">
                        <div  id="rank_in_svg_small" :style="current_rank+1<10 ? {'font-size': '45px'} : {'font-size': '34px'}">{{ current_rank+1 }}</div>
                        <svg width="115" height="121" viewBox="0 0 126 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Level">
                            <g id="polygon">
                            <mask id="path-1-inside-1_68_12" fill="white">
                            <path d="M71.3725 116.65C67.5631 123.511 57.6965 123.511 53.8871 116.65L5.95887 30.3308C2.88328 24.7917 5.66851 17.825 11.7151 15.9328L59.6433 0.934595C61.5878 0.326097 63.6718 0.326098 65.6163 0.934595L113.544 15.9328C119.591 17.825 122.376 24.7917 119.301 30.3308L71.3725 116.65Z"/>
                            </mask>
                            <path d="M71.3725 116.65C67.5631 123.511 57.6965 123.511 53.8871 116.65L5.95887 30.3308C2.88328 24.7917 5.66851 17.825 11.7151 15.9328L59.6433 0.934595C61.5878 0.326097 63.6718 0.326098 65.6163 0.934595L113.544 15.9328C119.591 17.825 122.376 24.7917 119.301 30.3308L71.3725 116.65Z" fill="#FFFFF" stroke="black" stroke-width="6" mask="url(#path-1-inside-1_68_12)"/>
                            </g>
                            </g>
                        </svg>
                    </div>
            </div>
            <div id="mission">
                <div  id="next_mission">NEXT MISSION:</div>
                <div id="goal">
                    <div @click="this.$refs.row_anim.play();" id="goal_points" >{{ missionPoints }}</div>
                    <div id="coin_svg">
                        <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40.5" cy="40.3954" r="24.0253" fill="white" stroke="black" stroke-width="5"/>
                            <path d="M43.6511 22.9462L33.2041 44.5152" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                            <path d="M33.204 44.5152L45.4815 36.3437" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                            <path d="M34.8227 55.6058C34.4234 56.486 34.8133 57.5232 35.6935 57.9225C36.5737 58.3217 37.6109 57.9318 38.0101 57.0517L34.8227 55.6058ZM43.8879 35.6208L34.8227 55.6058L38.0101 57.0517L47.0753 37.0666L43.8879 35.6208Z" fill="black"/>
                            <path d="M41.8691 53.2753L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                            <path d="M34.8255 50.4782L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div id="mission_time">IN {{ missionTime/60 }} MIN</div>
            </div>
        </div>
        <div @click="startMission()" id="start_container">
                <div id="start">START</div>
        </div>
    </div>
</template>

<script>
import {Vue3Lottie} from "vue3-lottie";

import row00 from "../assets/succ_in_a_row/0-0.lottie.json";
import row11 from "../assets/succ_in_a_row/1-1.lottie.json";
import row22 from "../assets/succ_in_a_row/2-2.lottie.json";
import row01 from "../assets/succ_in_a_row/0-1.lottie.json";
import row10 from "../assets/succ_in_a_row/1-0.lottie.json";
import row12 from "../assets/succ_in_a_row/1-2.lottie.json";
import row21 from "../assets/succ_in_a_row/2-1.lottie.json";
import row20 from "../assets/succ_in_a_row/2-0.lottie.json";
import { Howl } from "howler";
let level_up_audio  = new Howl({src: [require('@/assets/click-level-up.mp3')],});

let row_anim_dict ={
    a0_0: row00, //also special case where animation is not played
    a5_0: row00,
    a0_1: row01,
    a5_1: row11, // case when page is freshly loaded 
    a1_1: row11, //case when mission aborted
    a1_0: row10,
    a1_2: row12,
    a2_2: row22, //case when mission aborted teste 
    a0_2: row22, //case when page is freshly loaded
    a5_2: row22, //case when page is freshly loaded
    a2_1: row21,
    a2_0: row20
}
export default {
    components: {
        Vue3Lottie
    },
    name: 'HomeComponent',

    props: {
        missionPoints: {
            type: Number,
            required: true
        },
        missionTime: {
            type: Number,
            required: true
        },
        prev_success_in_a_row: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            level_out_animation: false,
            level_in_animation: false,
            text_in_n_out_animation: false,
            animation_key : 'a'+this.prev_success_in_a_row+'_'+this.$store.state.success_in_a_row,
            row_animation: row_anim_dict['a'+this.prev_success_in_a_row+'_'+this.$store.state.success_in_a_row],
        };
    },
    mounted(){
        if(this.prev_success_in_a_row+1==3 && this.$store.state.success_in_a_row==0){
            setTimeout(()=>{
                this.level_out_animation = true
                setTimeout(() => {
                    this.$store.commit('setSkips', this.$store.state.skips+1)
                    this.$store.commit('setRank', this.current_rank+1)
                    this.level_in_animation = true
                    this.level_out_animation = false
                    level_up_audio.play();
                    setTimeout(() => {
                        this.level_in_animation = false
                        setTimeout(()=>{
                            this.text_in_n_out_animation = true
                        setTimeout(() => {
                            console.log(this.text_in_n_out_animation)
                            this.text_in_n_out_animation = false
                        }, 2200);
                        }, 300)
                        
                    }, 500)
                }, 500)
            }, 500)
        }
    },
    methods: {
        startMission() {
            this.$store.commit('setNthMission', this.$store.state.nth_mission+1)
            // Emit an event to trigger the startMission in the container component
            this.$emit('start-game');
        },
        returnLanding() {
            // Emit an event to trigger the returnLanding in the container component
            this.$emit('return-landing');
        }
    },
    computed:   {
        current_rank: function(){
            return this.$store.state.rank
        }
    }
};
</script>

<style>
    @keyframes smaller {
        0% {transform: scale(1);}
        100% {transform: scale(0);}
        
    }
    .level_out{
        animation: smaller 0.5s forwards;
    }
    @keyframes bigger {
        0% {transform: scale(0);}
        100% {transform: scale(1);}
        
    }
    .level_in{
        animation: bigger 0.5s forwards;
    }

    #row_state{
        /* width: 50vh;  */
        /* background-color: red; */
        height: 15vh;
        z-index: -100;
        width: 200px;
        position: absolute;
        left: 50%; 
        transform: translate(-50%, 0%);
        top: 38vh;
        display: grid;
        grid-template-columns: 9fr 2fr;
        grid-column-gap: 40px;
        grid-template-rows: 1fr;
        justify-items: center; 
        align-items: center;
        /* scale: (vh/100); */
        /* scale: 0.8; */
        
    }
    #row{
        height: 15vh;
        z-index: -100;
        grid-column: 1/2;
        border: #000;
    }
    #level_svg_small {
        position: absolute;
        grid-column: 2/3;
        justify-self: center;
        scale: 0.65;
        /* margin-left: 10vh; */
    }
    #rank_in_svg_small {
        position: absolute;
        left: 50%;
        top: 37%;
        transform: translate(-50%, -50%);
        letter-spacing: 0.1em;
        font-weight: 700;
        font-size: 42px;
        color: #fff;
        text-shadow:     1px 2.3px 0px black,
        0.8px 1.9px 0px black,

        2.3px 1px 0px black,

        2.5px 2.1px 0px black;

        -webkit-text-stroke: 2px #000;
    }


    #level_svg_big {
        position: absolute;
        left: 3%;
        right: 3%;
        top: 6vh;
    }

    #plus_skip{
        position: relative;
        width: 100%;
        letter-spacing: 0.001em;
        transform : rotateX(-90deg);
        top: 16vh;
        left: 32vw;

    }
    @keyframes fold_up_text {
        0% {transform: rotateX(-90deg);
            opacity: 1;
            top: 20vh;}
        35% {transform: rotateX(0deg);
            opacity: 1;
            top: 16vh;}
        100% {transform: rotateX(0deg);
            opacity: 0;
            top: 16vh;}
        
    }
    .text_animation{
        animation: fold_up_text 2.2s forwards;
    }
    #rank_in_svg {
        position: absolute;
        left: 50%;
        top: 37%;
        transform: translate(-50%, -50%);
        letter-spacing: 0.1em;
        font-weight: 700;
        font-size: 42px;
        color: #fff;
        text-shadow:     1px 2.3px 0px black,
        0.8px 1.9px 0px black,

        2.3px 1px 0px black,

        2.5px 2.1px 0px black;

        -webkit-text-stroke: 2px #000;
    }
    textarea { 
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
    }
    #rank{
        position: absolute;
        left: 6%;
        right: 6%;
        top: 6vh;
    }

    #rank_text {
      display: inline;
      position: relative;
      margin-right: 1%; 
      margin-top: 30%;
      margin-bottom: 30%;
      vertical-align: middle; 
    }
    #level_svg {
      display: inline-block;
      vertical-align: middle; 
    }
    #overview {
        left: 3%;
        right: 3%;
        top: 50vh;
        font-size: 22px;
        font-weight: 600;
        font-family: Kodchasan;
        color: #000;
   
    }
    #start_container {
        position: absolute;
        left: 20%;
        right: 20%;
        bottom: 4vh;
        cursor: pointer;
        border: 1.5px solid rgb(0, 0, 0);
        padding: 3px 7px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 2px 2px 0px #000;

    }
    #start_container:active {
        /* border: .5px solid rgb(0, 0, 0); */
        box-shadow: 2.5px 2.5px 0px #000;
        scale: 0.98;

    }
    #start{
        color: #fff;
        font-family: Kodchasan;
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

    #mission{
        position: absolute;
        left: 6%;
        right: 6%;
        top: 58vh;
    }
    #mission_time{
        position: absolute;
        left: 50%;
        top: 20vh;
        transform: translate(-50%, 0%);
    }
    #next_mission{
        font-size: 33px;
        left: 3%;
        right: 3%;
    }

    #goal{
        position: relative;

    }
    #goal_points {
      font-size: 57px;
      display: inline;
      position: relative;
      margin-right: 1%; 
      margin-top: 30%;
      margin-bottom: 30%;
      vertical-align: middle; 
    }
    #coin_svg {
      display: inline-block;
      vertical-align: middle; 
    }
</style>
