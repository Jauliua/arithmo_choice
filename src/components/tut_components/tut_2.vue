<template>
    <div id="tut">
        <div id="p1">
            Auf der Startseite wird dir dein aktuelles Level angezeigt.
        </div>
        <div id="level_svg_big">
            <div id="rank_in_svg">1</div>                    
            <svg width="126" height="133" viewBox="0 0 126 133" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div id="p2">
            Du musst drei Missionen schaffen, um aufzusteigen.
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
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
#p2{
    font-weight: 500;
    font-size: 18px;
    grid-row: 10/11;
    display:block;
    align-self: start;
    text-align: left;
}
#rank_in_svg{
    font-size: 50px;
    font-family: 'Kodchasan';
    font-weight: bold;
}
#level_svg_big{
    
    position: absolute;
    top: 33vh;
    /* grid-row: 3/4; */
  


}
/* Your component's CSS styles go here */
</style>
