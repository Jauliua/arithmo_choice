<template>
    <div id="tut">
        <div id="p1">
            Dieser Abschnitt auf der Startseite zeigt an, wie viele Missionen du schon geschafft hast.        </div>
        <div id="level_up_box">
            <svg id="succ_in_a_row" width="145" height="26" viewBox="0 0 145 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.08051 2.21162H22.7458V24H4.08051V2.21162Z" fill="white"/>
                <mask id="mask0_8_330" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="4" y="2" width="19" height="22">
                <path d="M4.08051 2.21162H22.7458V24H4.08051V2.21162Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_8_330)">
                <path d="M4.58032 13.1058C4.58032 8.58121 8.36571 4.91337 13.0351 4.91337C17.7045 4.91337 21.4898 8.58121 21.4898 13.1058C21.4898 17.6303 17.7045 21.2983 13.0351 21.2983C8.36571 21.2983 4.58032 17.6303 4.58032 13.1058Z" fill="#FF1AA7"/>
                </g>
                <path d="M61.5458 2.21162H83.6161V24H61.5458V2.21162Z" fill="white"/>
                <mask id="mask1_8_330" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="61" y="2" width="23" height="22">
                <path d="M61.5458 2.21162H83.6161V24H61.5458V2.21162Z" fill="white"/>
                </mask>
                <g mask="url(#mask1_8_330)">
                <path d="M64.1262 13.1058C64.1262 8.58121 67.9114 4.91337 72.5808 4.91337C77.2503 4.91337 81.0355 8.58121 81.0355 13.1058C81.0355 17.6303 77.2503 21.2983 72.5808 21.2983C67.9114 21.2983 64.1262 17.6303 64.1262 13.1058Z" fill="#FF1AA7"/>
                </g>
                <path d="M2 13C2 6.92481 6.92485 2 13 2C19.0752 2 24 6.92481 24 13C24 19.0751 19.0752 24 13 24C6.92485 24 2 19.0751 2 13Z" stroke="#151515" stroke-width="2.61309" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M121 13C121 6.92481 125.925 2 132 2C138.075 2 143 6.92481 143 13C143 19.0751 138.075 24 132 24C125.925 24 121 19.0751 121 13Z" stroke="#151515" stroke-width="2.61309" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M62 13C62 6.92481 66.9249 2 72.9999 2C79.0751 2 84 6.92481 84 13C84 19.0751 79.0751 24 72.9999 24C66.9249 24 62 19.0751 62 13Z" stroke="#151515" stroke-width="2.61309" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 13H62" stroke="#151515" stroke-width="2.61309" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M84 13C92.6904 13 121 13 121 13" stroke="#151515" stroke-width="2.61309" stroke-miterlimit="10" stroke-linejoin="round"/>
            </svg>
            <div id="level_svg_small">
                <div id="rank_in_svg">2</div>                    
                <svg id="polygon" width="63" height="66" viewBox="0 0 63 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.5735 61.8399L2.04775 15.8678C0.717298 13.4717 1.92214 10.458 4.53779 9.63952L30.0636 1.65171C30.9047 1.38848 31.8062 1.38848 32.6474 1.65171L58.1731 9.63953C60.7888 10.458 61.9936 13.4717 60.6632 15.8679L35.1374 61.8399C33.4895 64.8077 29.2214 64.8077 27.5735 61.8399Z" fill="white" stroke="black" stroke-width="2"/>
                </svg>
            </div>
        </div>
        <div id="p2">
            Wenn du aufsteigst, erhältst du einen <span>SKIP</span> mit dem du eine Aufgabe überspringen kannst. 
        </div>
    </div>
</template>

<script>
export default {
    name: 'tut_3',
    // Your component's JavaScript logic goes here
};
</script>

<style scoped>
svg{
   display: inline;
}
#tut{
    display:grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
#p2{
    font-weight: 500;
    font-size: 18px;
    grid-row: 6/7;
    display:block;
    text-align: left;
}
span{
    font-weight: 600;
    font-style: italic;
    
    /* font-family:  */
    font-size: 15px;
}
#rank_in_svg{
    font-size: 30px;
    font-family: 'Kodchasan';
    /* font-weight: medium; */
    right: 10;
}
#level_up_box{
    position: absolute;
    top: 43vh;
    display:grid;
    grid-template-columns: 1fr 1fr;

    /* grid-row: 3/4; */
}
#level_svg_small{
    grid-column: 2/3;
    align-items: start;
    margin-top: -2vh;
    scale: 1.2;
}
#succ_in_a_row{
    grid-column: 1/2;
}
/* Your component's CSS styles go here */
</style>
