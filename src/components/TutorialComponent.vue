<template>
    <div id="container">
        <div @click="this.$emit('return-landing')" class="exit-button">
                <svg id="x" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.48 14.196C15.7787 14.5373 15.928 14.9 15.928 15.284C15.928 15.732 15.736 16.116 15.352 16.436C15.0533 16.692 14.7333 16.82 14.392 16.82C13.9013 16.82 13.4427 16.596 13.016 16.148L8.088 10.804L3.16 16.148C2.73333 16.5747 2.27467 16.788 1.784 16.788C1.37867 16.788 1.048 16.6707 0.792 16.436C0.429333 16.1373 0.248 15.7533 0.248 15.284C0.248 14.8573 0.397333 14.4947 0.696 14.196L5.944 8.5L1.08 3.22C0.738667 2.836 0.568 2.43067 0.568 2.004C0.568 1.53467 0.749333 1.15067 1.112 0.851999C1.41067 0.617333 1.72 0.5 2.04 0.5C2.59467 0.5 3.096 0.745333 3.544 1.236L8.088 6.164L12.632 1.236C13.08 0.745333 13.56 0.5 14.072 0.5C14.4133 0.5 14.7333 0.617333 15.032 0.851999C15.416 1.172 15.608 1.556 15.608 2.004C15.608 2.43067 15.4373 2.836 15.096 3.22L10.232 8.5L15.48 14.196Z" fill="black"/>
                </svg>
        </div>
        <div class="instruction">
            <tut_1 v-if="current_tut == 1"/>
            <tut_2 v-else-if="current_tut == 2"/>
            <tut_3 v-else-if="current_tut == 3"/>
            <tut_4 v-else-if="current_tut == 4"/>
            <tut_5 v-else-if="current_tut == 5"/>
            <tut_6 v-else-if="current_tut == 6"/>
            <tut_7 @startTut="startTut()" v-else-if="current_tut == 7"/>
        </div>
        <div id="page">{{ current_tut }} / 7 </div>
            <div @click="navigate_back()" v-if="current_tut!=1" class="back">
                    <svg id="b" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2L2.81577 8.79042C1.53305 9.56922 1.53305 11.4308 2.81577 12.2096L14 19" stroke="black" stroke-width="3" stroke-linecap="round"/>
                    </svg>
            </div>
            <div v-if="current_tut==7" @click="startTut()" id="start_button">start</div>
            <div v-else @click="navigate_next()" class="next">
                    <svg id="n" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L13.1842 8.79042C14.4669 9.56922 14.4669 11.4308 13.1842 12.2096L2 19" stroke="black" stroke-width="3" stroke-linecap="round"/>
                    </svg>
            </div>
    </div>
</template>

<script>
import tut_1 from './tut_components/tut_1.vue'
import tut_2 from './tut_components/tut_2.vue'
import tut_3 from './tut_components/tut_3.vue'
import tut_4 from './tut_components/tut_4.vue'
import tut_5 from './tut_components/tut_5.vue'
import tut_6 from './tut_components/tut_6.vue'
import tut_7 from './tut_components/tut_7.vue'
export default {
    components: {
        tut_1,
        tut_2,
        tut_3,
        tut_4,
        tut_5,
        tut_6,
        tut_7
    },
    data() {
        return {
            current_tut: 1

        }
    },

    name: 'TutorialComponent',
    methods: {
        navigate_back(){
            if (this.current_tut > 1){
                this.current_tut -= 1;
            }
        },
        navigate_next(){
            console.log('next hit')
            if (this.current_tut < 7){
                this.current_tut += 1;
            }
        },
        startTut(){
            this.current_tut=1
            console.log('startTut');
            this.$emit('skip-tut');
        }   
    },
}
</script>

<style scoped>

#start_button {
    font-size: 22px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
    background-color: none;
    border: none;
    text-decoration: underline;
    grid-row: 11/12;
    grid-column: 6/7;
    align-items: end;
    justify-content: end;
}

#container{
    display:grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    align-items: center;
    justify-content: start;
}
#page{
    grid-row: 2/3;
    grid-column: 5/7;
    align-items: end;
    justify-content: end;
    font-size: 18px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #9d9d9d;

}
.exit_button{
    grid-row: 3/4;
    grid-column: 2/3;
    align-items: end;
    justify-content: end;
}
#x{
    padding-top: 3vh;
    padding-left: 3vw;
}
.instruction{
    grid-row: 3/11;
    grid-column: 2/7;
    height: 100%;
    font-size: 20px;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
}
svg{
    display: inline;
}
.back{
    grid-row: 11/12;
    grid-column: 2/3;
    align-items: end;
    justify-content: end;
}
.next{
    grid-row: 11/12;
    grid-column: 6/7;
    align-items: end;
    justify-content: end;
   

}
#b{
    padding-top: 3vh;
}
#n{
        
    stroke-width: 0;
    padding-top: 3vh;
}

</style>
