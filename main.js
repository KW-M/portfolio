



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
window.addEventListener("scroll", function () {
    if (throttleInterval == null) throttleInterval = setInterval(() => {
        if ((new Date().getTime() - lastTime) > 250) {
            clearInterval(throttleInterval);
            throttleInterval = null;
        }
        checkScroll()
    }, 200);
    lastTime = new Date().getTime();
}, true);

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
        $(".about-container").css({ visibility: 'visible' })
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
            $(".about-container").css({ visibility: 'hidden' })
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

var topBarElem = document.getElementById("top_bar");
console.log(topBarElem)
topBarElem.addEventListener('focusin', (event) => {
    topBarElem.className = 'expanded';
    event.preventDefault();
});

topBarElem.addEventListener('focusout', (event) => {
    topBarElem.className = '';
});

function getGithubPages() {
    let projectLinks = { 'UC Santa Cruz | Class Projects': [{ 'link': 'https://people.ucsc.edu/~kworcest/CS%20Programming%20Assignment%20Archive/', 'name': 'UCSC Class Projects', 'archived': false }] }
    fetch('https://api.github.com/users/KW-M/repos?type=all&per_page=100').then(response => response.json()).then((repos) => {

        for (let repo_indx = 0; repo_indx < repos.length; repo_indx++) {
            const repo_obj = repos[repo_indx];
            if (repo_obj.has_pages) {
                let [user_name, repo_name] = repo_obj.full_name.split('/');
                let linkList = projectLinks["Github | " + user_name] = projectLinks["Github | " + user_name] || []
                linkList.push({ 'link': 'https://' + user_name + '.github.io/' + repo_name, 'name': repo_name, 'archived': repo_obj.archived });
                //fetch(`https://api.github.com/repos/${repo_obj.full_name}/pages`).then(response => response.json()).then(json => ({ 'link': json.html_url, 'name': repo_obj.full_name, 'archived': repo_obj.archived })))
            }
        }
        let selectElem = document.getElementById("project_pages_select");
        selectElem.addEventListener("change", (ev) => {
            window.open(ev.target.value);
            ev.target.selectedIndex = 0;
        });//window.open('')
        // selectElem.innerHTML = "";
        for (const label in projectLinks) {
            if (Object.hasOwnProperty.call(projectLinks, label)) {
                const linkList = projectLinks[label];
                const optGroup = document.createElement('OPTGROUP');
                optGroup.setAttribute("label", label)
                for (let index = 0; index < linkList.length; index++) {
                    const projectObj = linkList[index];
                    const opt = document.createElement('OPTION')
                    opt.text = projectObj.name;
                    opt.value = projectObj.link;
                    if (projectObj.archvied) opt.classList.add('faded_page');
                    optGroup.appendChild(opt);
                }
                selectElem.appendChild(optGroup);
            }
        }


        console.log(selectElem, projectLinks)
    });

    // fetch('https://api.github.com/users/KW-M/orgs').then(response => response.json()).then(console.log)
}
getGithubPages();