<template>
    <div id="task">
        <div>
            <div id="challenge_card" :style="{backgroundColor: task_color}">
                <div id="task_section">
                    <div id="problem">{{problem}}</div>
                    <div id="input_field">{{input_field}}</div>
                    <div id="input_line"  :class="{ shake: disabled }">
                        <svg id='line' width="191" height="12" viewBox="0 0 211 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5H206.04C207.973 3.5 209.54 5.067 209.54 7C209.54 8.933 207.973 10.5 206.04 10.5H7C5.067 10.5 3.5 8.933 3.5 7Z" fill="black" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.5C1 2.567 2.567 1 4.5 1H203.54C205.473 1 207.04 2.567 207.04 4.5C207.04 6.433 205.473 8 203.54 8H4.5C2.567 8 1 6.433 1 4.5Z" fill="white" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div id="problem_val">
                <div id="value">{{ task_points }}</div>
                <div id="coin_val"> 
                    <svg width="47" height="47" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40.5" cy="40.3954" r="24.0253" fill="white" stroke="black" stroke-width="5"/>
    <path d="M43.6511 22.9462L33.2041 44.5152" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M33.204 44.5152L45.4815 36.3437" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M34.8227 55.6058C34.4234 56.486 34.8133 57.5232 35.6935 57.9225C36.5737 58.3217 37.6109 57.9318 38.0101 57.0517L34.8227 55.6058ZM43.8879 35.6208L34.8227 55.6058L38.0101 57.0517L47.0753 37.0666L43.8879 35.6208Z" fill="black"/>
    <path d="M41.8691 53.2753L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M34.8255 50.4782L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div id="tries" :class="{ larger: tries_animation }" :style="{ color: tries - tries_left == tries-1 ? '#CC084E' : 'black' }">TRY: {{ tries - tries_left }}/{{ tries }}</div>

            </div>

        </div>
        <div id="keyboard">
            <div class="btn" @click="keyClicked(k.val)" v-for="k in keys" :key="k.id" id="">
                {{ k.val }}
            </div>
    
            <div class="btn" @click="keyClicked('c')" id="c">C</div>
            <div class="btn" @click="keyClicked(0)" id="zero">0</div>
            <div class="btn" @click="keyClicked('b')" id="back">
                <div id="enter_svg">
                    <svg width="37" height="21" viewBox="0 0 33 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31 10.9521C31.8975 10.9521 32.625 10.2246 32.625 9.32713C32.625 8.42966 31.8975 7.70213 31 7.70213V10.9521ZM4.5 10.9521H20.6915V7.70213H4.5V10.9521ZM20.6915 10.9521H31V7.70213H20.6915V10.9521Z" fill="black"/>
<path d="M2.5 9.57692L16.0137 2" stroke="black" stroke-width="3.25" stroke-linecap="round"/>
<path d="M2.5 9.57692L14.8875 16.0714" stroke="black" stroke-width="3.25" stroke-linecap="round"/>
</svg>
                </div>
            </div>
            <div class="btn" @click="checkInput()" id="enter">ENTER</div>

        </div>
    </div>
</template>

<script>
import {Howl} from 'howler';



let key_vals = Array.from({length: 9}, (_, i) => i + 1)
let colors = ['FFE6A9','FFCEA3', 'FFAB9A', 'FF9BA1','FF889F', 'FF5F8D', 'FF2472' ]
let points = [3, 6, 12, 20, 30, 45, 75]
let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let howl_successAudio = new Howl({src: [require('@/assets/success/collect_cut.mp3')],});
let howl_wrongAudio = new Howl({src: [require('@/assets/error/error_cut.mp3')],});  
let howl_missionCompleteAudio = new Howl({src: [require('@/assets/mission_complete/success_cut.mp3')],});
let howl_triesUpAudio = new Howl({src: [require('@/assets/mission_failed/negative_beeps.mp3')],});
let operators = {addition: '+', subtraction: '-', multiplication: 'x', division: '/'}

export default {
    components: {
        // Vue3Lottie,
        // RateComponent
    },

    props:{
        difficulty: {
            type: Number,
            required: true
        }, 
        tries: {
            type: Number,
            required: true
        }, 
        missionPoints: {
            type: Number,
            required: true
        },
        currentPoints: {
            type: Number,
            required: true
        },  
        data: {
            type: Object,
            required: true
        },
        choiceTime: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            keys: key_vals.map((val, index) => {
                return {
                    id: index,
                    val: val,
                }
            }),
            task: '',
            input_field: '',
            disabled: false,
            tries_animation: false,
            total_tries: this.tries,
            tries_left: this.tries,
            responseTimerId: null,
            responseTime: 0,
            if_success_current_points: this.currentPoints+ this.difficulty,
            startRate: false,
            taskComplete: false,
            log_performance: false

        };
    },
    mounted(){
        window.addEventListener('keydown', this.handleKeydown);
        // timer for tracking response time
        
        this.responseTimerId = setInterval(() => {
            this.responseTime += 100;

        }, 100);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    },
    computed: {
        nth_mission : function(){
            return this.$store.state.nth_mission
        },
        task_color: function() {
            return '#' + colors[this.difficulty-1]
        },
        task_points: function() {
            return points[this.difficulty-1]
        },
        problem: function() {
            return this.data.first_number +' '+ operators[this.data.operation] + ' '+this.data.second_number
        },
        sessionid() {
            return this.$store.state.sessionID
        }
    },
    methods: {
        handleKeydown(event) {
           
            if (digits.includes(parseInt(event.key))){
                this.input_field += event.key;
            }
            else if (event.key=='Backspace'){
                this.input_field = this.input_field.slice(0, -1);
            }
            else if (event.key=='Enter'){
                console.log('enter')
                this.checkInput();
            }
        },
        keyClicked(value) {

             if(value == 'c'){
                this.input_field = '';
             }
             else if(value == 'b'){
                this.input_field = this.input_field.slice(0, -1);
             }
             else{ 
                this.input_field += value;
            }  
        },
        checkInput(){
            if(this.input_field == ''){
                console.log('empty')
            }
       
            else{
                     //CORRECT
                if (this.input_field == this.data.result){
                    this.log_performance = true
                    this.taskComplete = true
                    // MISSION COMPLETE
                    if (this.task_points+this.currentPoints >= this.missionPoints){
                        howl_missionCompleteAudio.play();
                        // this.startRate = true
                    }
                    // SUCCESS
                    else{
                        howl_successAudio.play();
                        // this.startRate = true
                        
                    }
                    clearInterval(this.responseTimerId);
                    this.input_field = '';
                    this.$emit('task-checked', this.task_points);
                }

                else{
                    
                    // WRONG
                    this.tries_left -= 1 
                    if (this.tries_left > 0){
                        howl_wrongAudio.play();
                        console.log('wrong')
                        this.disabled = true
                        if (this.tries-this.tries_left == this.tries-1){
                            this.tries_animation = true
                            setTimeout(() => {
                                this.tries_animation = false
                            }, 1000);
                        }
                        setTimeout(() => {
                            this.disabled = false
                        }, 1200)
                        this.input_field = '';
                    }

                    // TRIES UP
                    else{
                        this.log_performance = true
                        clearInterval(this.responseTimerId);
                        howl_triesUpAudio.play();
                        this.input_field = this.data.result
                        setTimeout(() => {
                            this.$emit('task-checked', 0);
                        }, 1500);
                    }
                }
                if (this.log_performance){
                    fetch('https://taskdifficulty.robert-spang.de/next_task', {
                    // fetch('http://127.0.0.1:5051/next_task', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "session_id": this.sessionid,
                            "log_performance": "true",
                            "taskID":  this.data.taskID,
                            "first_number": this.data.first_number,
                            "second_number": this.data.second_number,
                            "operation": this.data.operation,
                            "result": this.data.result,
                            "difficulty": this.difficulty,
                            "tries": this.total_tries - this.tries_left,
                            "taskComplete": this.taskComplete,                 
                            "responseTime": this.responseTime,
                            "choiceTime": this.choiceTime,
                            "timestamp": new Date().toISOString(),
                            "game_type": "choice",
                            "nth_mission": this.$store.state.nth_mission,
                            "skipped": parseInt(0),
                            "aborted": parseInt(0),
                            "time_up": parseInt(0)
                        })
                    })
                    
                    .then(response => response.json())
                    .then(data => {
                        console.log('data after log_performance')
                        console.log(data)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }

            }
        },
    }
};
</script>

<style scoped>
#task{
    height: 100%
}
#anim{
    height: 24vh;
}
#keyboard{
    bottom: 0;
    margin: 1.5pt;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    bottom: 0;
    justify-items: strech;
    align-items: strech;

}
.btn{
    padding: 1%;
    font-size: 5.6vh;
    line-height: 5.6vh;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    border: 2px solid #000;
    border-radius: 7px;
    box-shadow: 2.5px 2.5px 0px #000;
}

.btn:active{
    scale: 0.97;
    background-color: #f0f0f0;
    box-shadow: 2.9px 2.9px 0px #000;
}
#enter{
    grid-column: 1/4;
}
#back {
    position: relative;

}
#enter_svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}




#challenge_card{
    height: 24vh;
    margin-bottom: 1%;
    margin-top: 4%;
    margin-left: 3%;
    margin-right: 3%;
    border: 2px solid #000;
    border-radius: 7px;
    box-shadow: 2.5px 2.5px 0px #000;
    color: #fff;
    font-family: Kodchasan;
    letter-spacing: 0.1em;
    font-weight: 900;
    font-size: 35px;
    text-shadow:1px 1.7px 0px black,
                0.8px 1.4px 0px black,
                1.7px 1px 0px black,
                1.8px 1.8px 0px black;
    -webkit-text-stroke: 2px #000;
    /* background-color: #FFAB9A; */
    /* display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, 1fr);
    justify-items: center; 
    align-items: center; */

}
#task_section{
    height: 24vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, 1fr);
    justify-items: center; 
    align-items: center;
}
#problem{
 grid-row: 1/5;
 padding-top: 2px;
 margin-left: 3%;
margin-right: 3%;
}
svg{ 
    display: block;
}
#input_field{
    border: none;
    color: #fff;
    font-family: Kodchasan;
    letter-spacing: 0.1em;
    font-weight: 700;
    font-size: 35px;
    text-shadow:1px 1.7px 0px black,
                0.8px 1.4px 0px black,
                1.7px 1px 0px black,
                1.8px 1.8px 0px black;
    -webkit-text-stroke: 2px #000;
    grid-row: 7/9;
    align-self: end;
}
#input_line{
    grid-row: 9/10; 
    align-self: start; 
    /* justify-self: center; */
}

@keyframes wobble{
    0% {transform: translateX(-10px);}
    25% {transform: translateX(10px);}
    50% {transform: translateX(-5px);}
    75% {transform: translateX(+5px);}
    100% {transform: translateX(0px);}
}

@keyframes in_n_out{
    0% {transform: scale(0.85);}
    50% {transform: scale(1.15);}
    100% {transform: scale(1);}
}
.shake {
  animation: wobble 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
.larger{
    animation: in_n_out 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

#problem_val{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;

    justify-items: center;
    align-items: center; 
    margin-left: 0%;
    margin-right: 5%;
    margin-top: 2%;
    margin-bottom: 2%;
    

}
#value{
    font-size: 30px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    justify-self: end;
    grid-column: 3/4;
    
}

#coin_val{
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    /* order: 2 */
    justify-self: start;
    grid-column: 4/5;
}
#tries{
    grid-column: 5/7;
    justify-self: end;
    align-self: end;
    font-size: 20px;
    font-weight: 700;
    font-family: Kodchasan;
    color: #000;
    /* margin-left: 60%;
    margin-right: 0%;
    margin-top: 1%;
    margin-bottom: 1%; */
}

</style>
