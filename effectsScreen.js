var timer = null;
var t = 0;
var h = 0;
var width = 0;
var start = 0;
var section = "";

var CVcolor = "rgba(255, 0, 0, 0.30)";
var prosjektColor = "rgba(0, 0, 255, 0.30)";
var menucolor = "rgba(0, 0, 0, 0.30)";

var ids = ["CVContent", "ProsjekterContent"];
var openStatus = [false, false];
var horScrollDistance = [0.35, 0.60];
var scrolldistance = 0;
//Functions called when buttons are clicked
function openCV(){
    menudrop(30, 40, 'CVContent');
}
function openProjects(){
    menudrop(30, 70, 'ProsjekterContent');
}

//Visual effect in menu
function menudrop(startwidth, startpos, id) {
    if (id == section) {
        reset();
        section = "";

    }
    else {

        reset();
        width = startwidth;
        start = startpos;
        section = id;
        clearInterval(timer);
        timer = setInterval(rollVertical, 1);
        document.getElementById(section).style.visibility = "visible";
        document.getElementById(section).style.width = startwidth + "vw";
        document.getElementById(section).style.marginLeft = startpos + "vw";
        if (section == 'CVContent') {
            document.getElementById('CV').style.backgroundColor = CVcolor;
            openStatus[0] = true;
            scrolldistance = horScrollDistance[0]; //Sets how much the scroller should scroll
        }
        else if (section == 'ProsjekterContent') {
            document.getElementById('prosjekt').style.backgroundColor = prosjektColor;
            openStatus[1] = true;
            scrolldistance = horScrollDistance[1]; //Sets how much the scroller should scroll
        }
    }
    //Control fading of front page
    var show = true;
    for (i = 0; i < openStatus.length; i++) {
        if (openStatus[i] == true) {
            show = false;
        }
    }
    if (show) {
        showFront(true);
    }
    else {
        showFront(false);
    }

}

//Timed function for vertical movement
function rollVertical() {
    t += 1;
    h = 19 * Math.log(t);
    if (h >= 90) {
        h = 90;
        clearInterval(timer);
        t = 0;
        timer = setInterval(rollHorizontal, 1);
    }
    document.getElementById(section).style.height = h + "vh";

}
//Timed function for horizontal movement
function rollHorizontal() {
    t += 1;
    start = start - (0.5 * Math.log(t));
    width = width + (0.5 * Math.log(t));
    if (start < 0 && width > 100) {
        start = 0;
        width = 100;
        clearInterval(timer);
    }
    else if (width >= 100) {
        width = 100;

    }
    else if (start <= 0) {
        start = 0;
    }

    document.getElementById(section).style.width = width + "vw";
    document.getElementById(section).style.marginLeft = start + "vw";
}
//Resets the menu
function reset() {
    scrollpos = 0;
    $(".scrollbox").scrollLeft(scrollpos); //This to avoid scrolling in CV to affect scrolling in projects and vice versa
    for (i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style.height = "0vh";
        document.getElementById(ids[i]).style.visibility = "hidden";
        openStatus[i] = false;
    }
    document.getElementById('CV').style.backgroundColor = menucolor;
    document.getElementById('prosjekt').style.backgroundColor = menucolor;
    h = 0;
    t = 0;

    //Control fading of front page
    var show = true;
    for (i = 0; i < openStatus.length; i++) {
        if (openStatus[i] == true) {
            show = false;
        }
    }
    if (show) {
        showFront(true);
    }
    else {
        showFront(false);
    }
}
//Hover-functionality for menu buttons
function hover(id) {
    if (id == 'CV') {
        document.getElementById('CV').style.backgroundColor = CVcolor;
    }
    else if (id == 'prosjekt') {
        document.getElementById('prosjekt').style.backgroundColor = prosjektColor;
    }
}
function hoverleave(id) {
    if (id == 'CV' && section != 'CVContent') {
        document.getElementById('CV').style.backgroundColor = menucolor;
    }
    else if (id == 'prosjekt' && section != 'ProsjekterContent') {
        document.getElementById('prosjekt').style.backgroundColor = menucolor;
    }
}

//Scroll-functionality for content
var scrollpos = 0;
var scrolltimer = null;
var winwidth = 0;
var time = 0;
var endpos = 0;

//Function which is called when scroll-buttons are clicked
function leftRightScroll(direction) {
    winwidth = window.innerWidth;
    clearInterval(scrolltimer);
    if (direction) {//Scroll left
        endpos = scrollpos - (winwidth * scrolldistance);
        scrolltimer = setInterval(timedScrollLeft, 1);
    }

    else {//Scroll right
        endpos = scrollpos + (winwidth * scrolldistance);
        scrolltimer = setInterval(timedScrollRight, 1);
    }

}

//Function which scrolls based on time
function timedScrollRight() {
    time += 1;
    scrollpos = scrollpos + (Math.log(time));
    if (scrollpos > endpos) {
        time = 0;
        scrollpos = endpos;
        $(".scrollbox").scrollLeft(scrollpos);
        clearInterval(scrolltimer);

    }
    $(".scrollbox").scrollLeft(scrollpos); //jQuery
}

//Function which scrolls based on time
function timedScrollLeft() {
    time += 1;
    scrollpos = scrollpos - (Math.log(time));
    if (scrollpos < endpos) {
        time = 0;
        scrollpos = endpos;
        $(".scrollbox").scrollLeft(scrollpos);
        clearInterval(scrolltimer);

    }
    $(".scrollbox").scrollLeft(scrollpos); //jQuery
}
function updateScroll() {
    scrollpos = $(".scrollbox").scrollLeft();
}


//Front page fading
var fadeTime = 0;
var fadetimer = null;
var fadeval = 1.0;
function showFront(show) {
    if (show) {
        document.getElementById("front").opacity = "0.0";
        clearInterval(fadetimer);
        fadetimer = setInterval(fadeUpFront, 1);
    }
    else {
        document.getElementById("front").opacity = "1.0";
        clearInterval(fadetimer);
        fadetimer = setInterval(fadeDownFront, 1);
    }

}
function fadeUpFront() {
    fadeTime += 1;
    fadeval += 0.00003 * fadeTime;
    if (fadeval >= 1) {
        fadeTime = 0;
        fadeval = 1;
        document.getElementById("front").opacity = fadeval + "";
        clearInterval(fadetimer);

    }
    document.getElementById("front").style.opacity = fadeval + "";

}
function fadeDownFront() {
    fadeTime += 1;
    fadeval -= 0.00003 * fadeTime;
    if (fadeval <= 0) {
        fadetime = 0;
        fadeval = 0;
        document.getElementById("front").opacity = fadeval + "";
        clearInterval(fadetimer);
    }
    document.getElementById("front").style.opacity = fadeval + "";
}
//Hover-for-more-info-functionality
function showDiv(id) {
    var element = document.getElementById(id);
    element.style.visibility = "visible";
    element.style.height = "10vh";
}
function hideDiv(id) {
    var element = document.getElementById(id);
    element.style.visibility = "hidden";
    element.style.height = "0px";
}
//Language-functions
function changeEnglish() {
    var eng = document.getElementsByClassName('english');
    for (i = 0; i < eng.length; i++) {
        eng[i].style.display = "inline";
    }
    var nor = document.getElementsByClassName('norwegian');
    for (i = 0; i < nor.length; i++) {
        nor[i].style.display = "none";
    }
}
function changeNorwegian() {
    var eng = document.getElementsByClassName('english');
    for (i = 0; i < eng.length; i++) {
        eng[i].style.display = "none";
    }
    var nor = document.getElementsByClassName('norwegian');
    for (i = 0; i < nor.length; i++) {
        nor[i].style.display = "inline";
    }
}