<template>
    <div id="tut">
    <div id="p1">
        So wird dir angezeigt, wie viele Punkte du in deiner nächsten Mission erreichen musst. Die Punktzahl passt sich an dich an.     </div>
    <div id="example">
        <div id="next_mission">NEXT MISSION:</div>
        <div id="points">15</div>
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
        <div id="time">IN 2 MIN</div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'tut_4',
    // Your component's JavaScript logic goes here
};
</script>

<style scoped>
svg{
   display: block;
}
#tut{
    display:grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: start;
    /* font-weight: medium; */

}
#p1{
    font-size: 18px;
    font-weight: 500;
    grid-row: 1/2;
    display:block;
    text-align: left;
}
#example{
    display:grid;
    grid-template-rows: 1fr 1fr 1fr 1fr ;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: start;
    /* font-weight: medium; */

}
#next_mission{
    font-size: 28px;
    font-weight: 700;
    grid-row: 1/2;
    grid-column: 1/3;
    display:block;
    text-align: center;
    align-self: end;
}
#points{
    font-size: 55px;
    font-weight: 700;
    grid-row: 2/3;
    grid-column: 1/2;
    display:block;
    text-align: center;
    justify-self: end;
}
#coin_svg{
    /* grid-row: 3; */
    grid-column: 2/3;
    display:block;
    justify-self: start;
    text-align: center;
}
#time{
    font-size: 22px;
    font-weight: 600;
    grid-row: 3/4;
    grid-column: 1/3;
    display:block;
    text-align: center;
    align-self: start;
}
/* Your component's CSS styles go here */
</style>
