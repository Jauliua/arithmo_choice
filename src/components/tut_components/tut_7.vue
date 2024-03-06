<template>
    <div id="tut">
        <div id="p1">
            Im oberen Abschnitt wird dein Punktestand und ein Countdown angezeigt. Behalte beides im Blick, wenn du die Schwierigkeit wählst!        
        </div>
        <!-- <div id="empty"></div> -->
        <div id="state">
            <div id="coin">
                <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40.5" cy="40.3954" r="24.0253" fill="white" stroke="black" stroke-width="5"/>
                    <path d="M43.6511 22.9462L33.2041 44.5152" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M33.204 44.5152L45.4815 36.3437" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M34.8227 55.6058C34.4234 56.486 34.8133 57.5232 35.6935 57.9225C36.5737 58.3217 37.6109 57.9318 38.0101 57.0517L34.8227 55.6058ZM43.8879 35.6208L34.8227 55.6058L38.0101 57.0517L47.0753 37.0666L43.8879 35.6208Z" fill="black"/>
                    <path d="M41.8691 53.2753L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M34.8255 50.4782L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            </div>
            <div id="current_points">6</div>
            <div id="points">/ 15</div>
            <p id="timer">1:26</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tut_2',
    // Your component's JavaScript logic goes here
};
</script>

<style scoped>
svg{
   display: inline;
}
#tut{
    display:grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: start;

}
#p1{
    font-weight: 500;
    font-size: 18px;
    grid-row: 1/2;
    display:block;
    text-align: left;
}
#level_svg_big{
    position: relative;
    top: 36vh;
}
#state {
    margin-left: -3vw;
    margin-right: -3vw;
    margin-top: 10vh;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
}
#current_points {
    justify-self: start;
    font-size: 30px;
    grid-row: 1/2;
    grid-column: 2/3;
    align-self: end;
}
#points {
    justify-self: start;
    font-size: 26px;
    grid-row: 2/3;
    grid-column: 2/3;
    align-self: start;
}
#timer {
    width: 50px;
    font-size: 26px;
    grid-row: 1/3;
    grid-column: 3/5;
    vertical-align: middle;
    /* justify-self: end; */
}
#coin {
    scale: 0.8;
    grid-row: 1/3;
    grid-column: 1/2;
}
</style>
