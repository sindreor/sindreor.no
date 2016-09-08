//Type variables
var sc = false;
var ph = false;
var nr = false;

//Universal variables
var CVcolor = "rgba(255, 0, 0, 0.30)";
var prosjektColor = "rgba(0, 0, 255, 0.30)";
var menucolor = "rgba(0, 0, 0, 0.30)";
var ids = ["CVContent", "ProsjekterContent"];
var openStatus = [false, false];
var section = "";


//Screen variables
var timer = null;
var t = 0;
var h = 0;
var width = 0;
var start = 0;
var horScrollDistance = [0.35, 0.60];
var scrolldistance = 0;
var lastFrame = 0;

//Phone variables
var scrollPos = 0;
var scrollboxes = document.getElementsByClassName("scrollbox");

//Functions called when buttons are clicked
function openCV(){
    if (sc) {
        menudrop(30, 40, 'CVContent');
    }
    else if(ph || nr){
        openContent('CVContent');
    }
}
function openProjects(){
    if (sc) {
        menudrop(30, 70, 'ProsjekterContent');
    }
    else if(ph || nr){
        openContent('ProsjekterContent');
    }
}

//Menu control (phone)
function openContent(id) {
    if (id == section) {
        reset();
        section = "";
    }
    else {
        reset();
        section = id;
        if (section == 'CVContent') {
            document.getElementById('CV').style.backgroundColor = CVcolor;
            openStatus[0] = true;
            document.getElementById('CVContent').style.visibility = "visible";
            document.getElementById(section).style.width = "100vw";
            document.getElementById(section).style.height = "90vh";
        }
        else if (section == 'ProsjekterContent') {
            document.getElementById('prosjekt').style.backgroundColor = prosjektColor;
            openStatus[1] = true;
            document.getElementById('ProsjekterContent').style.visibility = "visible";
            document.getElementById(section).style.width = "100vw";
            document.getElementById(section).style.height = "90vh";
        }

        //Control if the front page is visible
        frontPageCheck();
    }
}

//Visual effect in menu(screen)
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
        lastFrame = new Date().getTime();
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
    frontPageCheck();

}

//Timed function for vertical movement
var elapsed = 0;
function rollVertical() {
    var now = new Date().getTime();
    elapsed += (now - lastFrame);
    h = 0.0005 * Math.pow(elapsed, 2);
    if(elapsed>=424){
        h = 90;
        clearInterval(timer);
        elapsed = 0;
        timer = setInterval(rollHorizontal, 1);

    }
     document.getElementById(section).style.height = h + "vh";
     lastFrame = now;
    /*
    t += 1;
    h = 19 * Math.log(t);
    if (h >= 90) {
        h = 90;
        clearInterval(timer);
        t = 0;
        timer = setInterval(rollHorizontal, 1);
    }
    document.getElementById(section).style.height = h + "vh";
    */
}
//Timed function for horizontal movement
function rollHorizontal() {
    var now = new Date().getTime();
    elapsed += (now - lastFrame);
    start = start - (0.4*Math.log(elapsed));
    width = width + (0.4*Math.log(elapsed));
    if (elapsed>=116618) {
        start = 0;
        width = 100;
        clearInterval(timer);
        elapsed = 0;
    }
    if (width >= 100) {
        width = 100;

    }
    if (start <= 0) {
        start = 0;
    }
    lastFrame = now;
    document.getElementById(section).style.width = width + "vw";
    document.getElementById(section).style.marginLeft = start + "vw";
    /*t += 1;
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
    */
}
//Resets the menu
function reset() {
    if (sc) {
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
        //t = 0;
        elapsed = 0;

        //Control fading of front page
        frontPageCheck();
        
    }
    else if(ph || nr){
        for (i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).style.visibility = "hidden";
            openStatus[i] = false;
        }
        document.getElementById('CV').style.backgroundColor = menucolor;
        document.getElementById('prosjekt').style.backgroundColor = menucolor;
    
        //Control if the front page is visible
        frontPageCheck();

        //Reset scroll
        scrollPos = 0;
    
        if(section=="CVContent"){
            $(scrollboxes[0]).scrollTop(scrollPos);
        }
        else{
            $(scrollboxes[1]).scrollTop(scrollPos);
        }
        
        document.getElementsByTagName('nav')[0].style.display = "inline";
        document.getElementsByTagName('header')[0].style.display = "inline";
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

//Function which is called when scroll-buttons are clicked(screen)
function leftRightScroll(direction) {
    winwidth = window.innerWidth;
    clearInterval(scrolltimer);
    //lastFrame = new Date().getTime();
    //elapsed = 0;
    if (direction) {//Scroll left
        endpos = scrollpos - (winwidth * scrolldistance);              
        scrolltimer = setInterval(timedScrollLeft, 20);
    }

    else {//Scroll right
        endpos = scrollpos + (winwidth * scrolldistance);     
        scrolltimer = setInterval(timedScrollRight, 20);
    }

}

//Function which scrolls based on time
function timedScrollRight() {
    /*var now = new Date().getTime();
    elapsed += (now - lastFrame);
    scrollpos = scrollpos + (Math.log(elapsed));
    if (scrollpos >= endpos) {
        elapsed = 0;
        scrollpos = endpos;
        $(".scrollbox").scrollLeft(scrollpos);
        clearInterval(scrolltimer);
        
    }
    $(".scrollbox").scrollLeft(scrollpos); //jQuery
    lastFrame=now;
    */
    time += 20;
    scrollpos = scrollpos + 8*Math.log(time));
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
    time += 20;
    scrollpos = scrollpos - (8*Math.log(time));
    if (scrollpos < endpos) {
        time = 0;
        scrollpos = endpos;
        $(".scrollbox").scrollLeft(scrollpos);
        clearInterval(scrolltimer);

    }
    $(".scrollbox").scrollLeft(scrollpos); //jQuery
}
function updateScroll() {
    if (sc) {
        scrollpos = $(".scrollbox").scrollLeft();
    }
    else if(ph || nr){
        var current = 0;
        if(section=="CVContent"){
            current = $(scrollboxes[0]).scrollTop();
        }
        else{
            current = $(scrollboxes[1]).scrollTop();
        }
        if(scrollPos> current){
            document.getElementById(section).style.height = "64vh";
            document.getElementById(section).style.marginTop = "36vh";
            document.getElementsByTagName('nav')[0].style.visibility = "visible";
            document.getElementsByTagName('header')[0].style.visibility = "visible";
        }
        else if(scrollPos<current){
            document.getElementById(section).style.height = "100vh";
            document.getElementById(section).style.marginTop = "0px";
            document.getElementsByTagName('nav')[0].style.visibility = "hidden";
            document.getElementsByTagName('header')[0].style.visibility = "hidden";
        }
        if(section=="CVContent"){
            scrollPos = $(scrollboxes[0]).scrollTop();
        }
        else{
            scrollPos = $(scrollboxes[1]).scrollTop();
        }
    }
}


//Front page fading(screen)
var fadeTime = 0;
var fadetimer = null;
var fadeval = 1.0;

//Function for checking if the frontpage should be vissible or not
function frontPageCheck(){
    var show = true;
    for (i = 0; i < openStatus.length; i++) {
            if (openStatus[i] == true) {
                show = false;
            }
        }
    if(sc||nr){
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
    else{
        if (show) {
            document.getElementById("front").style.visibility = "visible";
        }
        else {
            document.getElementById("front").style.visibility = "hidden";
        }
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
    if (nr || sc) {
        var element = document.getElementById(id);
        element.style.visibility = "visible";
        element.style.height = "10vh";
    }
}
function hideDiv(id) {
    if (nr || sc) {
        var element = document.getElementById(id);
        element.style.visibility = "hidden";
        element.style.height = "0px";
    }
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

function screenFit() {
    //reset();
    sc = false;
    ph = false;
    nr = false;
    var w = window.innerWidth;
    var sw = screen.width;


    if (navigator.userAgent.match(/Windows Phone/i)) {
            $("#style").attr("href", "phone_windows.css");
            ph = true;
            sc = false;
            nr = false;
            document.getElementById("CVContent").style.marginTop = "36vh";
            document.getElementById("ProsjekterContent").style.marginTop = "36vh";
        //document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"phone_windows.css\">")
        //document.write("<script src=\"effectsPhone.js\"><\/script>");
    }
    else if (navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)

) {
    $("#style").attr("href", "phone.css");
    ph = true;
    sc = false;
    nr = false;
    document.getElementById("CVContent").style.marginTop = "36vh";
    document.getElementById("ProsjekterContent").style.marginTop = "36vh";
    //$("#effect").attr("src", "effectsPhone.js");
        //document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"phone.css\">")
        //document.write("<script src=\"effectsPhone.js\"><\/script>");
    }

    else if (w <= sw / 2) {
        $("#style").attr("href", "narrow.css");
        ph = false;
        sc = false;
        nr = true;
        document.getElementById("CVContent").style.marginTop = "36vh";
        document.getElementById("ProsjekterContent").style.marginTop = "36vh";
        //$("#effect").attr("src", "effectsNarrow.js");
        //document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"phone.css\">")
        //document.write("<script src=\"effectsNarrow.js\"><\/script>");
    }
    else {
        $("#style").attr("href", "screen.css");
        ph = false;
        sc = true;
        nr = false;
        document.getElementById("CVContent").style.marginTop = "10vh";
        document.getElementById("ProsjekterContent").style.marginTop = "10vh";
        document.getElementsByTagName('nav')[0].style.visibility = "visible";
        document.getElementsByTagName('header')[0].style.visibility = "visible";
        //$("#effect").attr("src", "effectsScreen.js");
        //document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"screen.css\">")
        //document.write("<script src=\"effectsScreen.js\"><\/script>");

    }
                
}