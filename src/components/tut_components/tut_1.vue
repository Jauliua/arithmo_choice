<template>
    <div>
        <div id="p1">
            In diesem Spiel geht es darum, Kopfrechenaufgaben zu lösen und dabei Punkte zu sammeln.         </div>
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
        <div id="p2">
            Um eine Mission zu schaffen, musst du in 2 Minuten eine bestimmte Punktzahl erreichen.         </div>
        <div id="p3">
            Du kannst die <span>Schwierigkeit jeder Aufgabe selbst wählen.</span>
        </div>


    </div>
</template>

<script>
export default {
    name: 'YourComponentName',
    // Your component's JavaScript logic goes here
}
</script>

<style scoped>
/* Your component's CSS styles go here */
/* svg {
    scale: 0.87;
    display: inline;
    position:relative;
} */
#p1{
    font-weight: 500;
    font-size: 17px;
    font-weight: 500;
    display:block;
    text-align: left;
}
#p2{
    font-weight: 500;
    font-size: 17px;
    font-weight: 500;
    /* grid-row: 5/6; */
    display:block;
    text-align: left;
}
#p3{
    margin-top: 20px;
    font-weight: 500;
    font-size: 17px;
    font-weight: 500;
    /* grid-row: 1/2; */
    display:block;
    text-align: left;
}
span{
    font-weight: 700;
    /* color: #FFD700; */
    text-align: left;
}
</style>
