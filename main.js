



var backgroundImg = new Image(10, 20);
backgroundImg.addEventListener("load", function () {
    document.getElementById("Background_Image").src = "./Oregon.jpg";
});
backgroundImg.src = './Oregon.jpg';

var aboutScreenOpen = false
var currSectionIndex = 0;
var onCorrectSection = false;

var sectionArray = [
    'About',
    'Geothermal',
    'Graphics',
    'StudyHub',
    'SSROV',
    'Cardboard',
    'Teams'
]

var introTextHeight = 500;
window.onload = () => {
    while (!onCorrectSection) {
        checkScroll();
    }
    introTextHeight = document.getElementById("About").clientHeight;
}

$('.slide-deck').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: '60px',
});

var throttleInterval = null;
var lastTime = new Date().getTime();
window.onscroll = function () {
    if (throttleInterval == null) throttleInterval = setInterval(() => {
        if ((new Date().getTime() - lastTime) > 250) {
            clearInterval(throttleInterval);
            throttleInterval = null;
        }
        checkScroll()
    }, 200);
    lastTime = new Date().getTime();
}

function setSection(sectionId) {
    if (aboutScreenOpen) toggleAboutScreen()
    window.scrollTo({
        top: document.getElementById(sectionId).offsetTop - 95,
        behavior: 'smooth'
    })
    while (!onCorrectSection) {
        checkScroll();
    }
}
var headerElm = document.getElementById("Header");
headerElm.addEventListener("focusin", (event) => {
    headerElm.scroll(0, 0);
    $(headerElm.parentElement).addClass('open-header');
});
headerElm.addEventListener("focusout", (event) => {
    headerElm.scroll(0, 0);
    $(headerElm.parentElement).removeClass('open-header');
});

function pageUp() {
    currSectionIndex--
    if (currSectionIndex < 0) {
        toggleAboutScreen()
        currSectionIndex = 0;
        return
    } else if (aboutScreenOpen) {
        toggleAboutScreen()
        return
    }
    window.scrollTo({
        top: document.getElementById(sectionArray[currSectionIndex]).offsetTop - 95,
        behavior: 'smooth'
    })
}
function pageDown(overide) {
    if (aboutScreenOpen) {
        toggleAboutScreen()
        return
    } else if (!overide) {
        return;
    }
    currSectionIndex++;
    if (currSectionIndex > sectionArray.length - 1) currSectionIndex = 0;
    window.scrollTo({
        top: document.getElementById(sectionArray[currSectionIndex]).offsetTop - 95,
        behavior: 'smooth'
    })
}

function toggleAboutScreen() {
    if (!aboutScreenOpen) {
        aboutScreenOpen = true
        $("#Header").addClass("full-expansion")
        $("#Menu_Fab_Container").addClass("close-button-mode")
        $(".about-container").css({ display: "block", opacity: 0 })
        $(".about-container").animate({
            opacity: 1,
        }, { duration: 200, queue: false }, "swing");
        var temp = currSectionIndex
        currSectionIndex = 0;
        setActiveNavLink()
        currSectionIndex = temp;
        document.body.style.overflow = "hidden";
    } else {
        aboutScreenOpen = false;
        $("#Header").removeClass("full-expansion")
        setActiveNavLink()
        document.body.style.overflow = "auto";
        setTimeout(function () {
            $(".about-container").css({ display: "none" })
        }, 100)
    }
}


function checkScroll() {
    if (sectionArray[currSectionIndex] && document.getElementById(sectionArray[currSectionIndex]).offsetTop > window.scrollY + (window.screen.height / 2)) {
        onCorrectSection = false;
        currSectionIndex--;
    } else if (sectionArray[currSectionIndex + 1] && document.getElementById(sectionArray[currSectionIndex + 1]).offsetTop - (window.screen.height / 2) < window.scrollY) {
        onCorrectSection = false;
        currSectionIndex++;

    } else {
        if (!onCorrectSection) setActiveNavLink();
        onCorrectSection = true;
    }
}

function setActiveNavLink() {
    $.each($('.nav-link'), function () {
        $(this).removeClass("nav-active")
    });
    if (currSectionIndex == 0) {
        $('#Nav_About').addClass("nav-active")
        window.location.hash = '#about';
    } else if (currSectionIndex == 4) {
        $('#Nav_Teams').addClass("nav-active")
        window.location.hash = '#teams';
    } else {
        $('#Nav_Projects').addClass("nav-active")
        window.location.hash = '#projects';
    }
}




document.getElementById("email_link").setAttribute("href", ["mailto:kworcest", "ucsc.edu"].join("@"))