

var CVcolor = "rgba(255, 0, 0, 0.40)";
var prosjektColor = "rgba(0, 0, 255, 0.40)";
var menucolor = "rgba(0, 0, 0, 0.40)";
var ids = ["CVContent", "ProsjekterContent"];
var openStatus = [false, false];
var section="";
var scrollPos = 0;
var scrollboxes = document.getElementsByClassName("scrollbox");

//Functions called when buttons are clicked
function openCV(){
    openContent('CVContent');
}
function openProjects(){
    openContent('ProsjekterContent');
}

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
            document.getElementById('CVContent').style.display = "inline";
        }
        else if (section == 'ProsjekterContent') {
            document.getElementById('prosjekt').style.backgroundColor = prosjektColor;
            openStatus[1] = true;
            document.getElementById('ProsjekterContent').style.display = "inline";
        }

        //Control if the front page is visible
        var show = true;
        for (i = 0; i < openStatus.length; i++) {
            if (openStatus[i] == true) {
                show = false;
            }
        }
        if (show) {
            document.getElementById('front').style.display = "inline";
        }
        else {
            document.getElementById('front').style.display = "none";
        }
    }
}

function reset() {
    for (i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style.display="none";
        openStatus[i] = false;
    }
    document.getElementById('CV').style.backgroundColor = menucolor;
    document.getElementById('prosjekt').style.backgroundColor = menucolor;
    
    //Control if the front page is visible
    var show = true;
    for (i = 0; i < openStatus.length; i++) {
        if (openStatus[i] == true) {
            show = false;
        }
    }
    if (show) {
        document.getElementById("front").style.display="inline";
    }
    else {
        document.getElementById("front").style.display="none";
    }

    //Reset scroll
    scrollPos = 0;
    
    if(section=="CVContent"){
        $(scrollboxes[0]).scrollTop(scrollPos);
    }
    else{
        $(scrollboxes[1]).scrollTop(scrollPos);
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


function updateScroll(){
    var current = 0;
    if(section=="CVContent"){
        current = $(scrollboxes[0]).scrollTop();
    }
    else{
        current = $(scrollboxes[1]).scrollTop();
    }
    if(scrollPos> current){
        document.getElementById(section).style.height = "64vh";
        document.getElementById(section).style.marginTop = "10vh";
        document.getElementsByTagName('nav')[0].style.display = "inline";
        document.getElementsByTagName('header')[0].style.display = "inline";
    }
    else if(scrollPos<current){
        document.getElementById(section).style.height = "100vh";
        document.getElementById(section).style.marginTop = "0px";
        document.getElementsByTagName('nav')[0].style.display = "none";
        document.getElementsByTagName('header')[0].style.display = "none";
    }
    if(section=="CVContent"){
        scrollPos = $(scrollboxes[0]).scrollTop();
    }
    else{
        scrollPos = $(scrollboxes[1]).scrollTop();
    }
    
    
}