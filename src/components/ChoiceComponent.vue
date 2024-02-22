<template>
       

        <div id="choices">
                <div class="choice_btn" v-for="diff in difficulties" @click="taskSelected(diff)"  :key="diff.id" :style="{backgroundColor: '#'+ diff.color, opacity: diff.opacity}">
                    {{ points[7-diff.id] }}
                </div>
        </div>
</template>

<script>
let colors = ['FFE6A9','FFCEA3', 'FFAB9A', 'FF9BA1','FF889F', 'FF5F8D', 'FF2472' ]
// let colors = ['FF2472', 'FF5F8D', 'FF889F', 'FF9BA1', 'FFAB9A', 'FFCEA3', 'FFE6A9']
    
export default {
    name: 'ChoiceComponent',

    data() {
        return {
            choiceTimerId: null,
            time: 0,
            points : [3, 6, 12, 20, 30, 45, 75],
            difficulties: colors.map((color, index) => {
                    return {    
                        id: colors.length-index,
                        color: color,
                        opacity: 1,
                    }
            }),
        }

    },
    mounted(){
        this.choiceTimerId = setInterval(() => {
            this.time += 100
        }, 100);
        },
    unmounted(){
        clearInterval(this.choiceTimerId);
        },

    methods: {
        taskSelected(diff){
            clearInterval(this.choiceTimerId)
            this.$emit('task-selected', 8-diff.id, this.time)
        }
    } 
    }
</script>

<style scoped>
#choices{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    /* height: 68%; */
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;

    /* box-sizing: border-box; */
}
.choice_btn{
    
    /* padding-top: 2%; */
    flex-grow: 1;
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    height: 8vh;
    
    border: 2px solid #000;
    border-radius: 7px;
    box-shadow: 2.5px 2.5px 0px #000;
    text-align: center;
    line-height: 8vh;
}

.choice_btn:active{
    transform: scale(0.98)
}
</style>
