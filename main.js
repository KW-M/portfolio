// load lowrez blur background first, then show hi-rez when loaded:
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

// $('.embla__container').slick({
//     dots: false,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     centerMode: true,
//     variableWidth: true,
//     centerPadding: '60px',
// });

const emblaCarouselOptions = { loop: true }
function addCarousel(emblaNode) {
    const embla = EmblaCarousel(emblaNode, emblaCarouselOptions)
    embla.on('select', (eventName) => {
        embla.slideNodes()[embla.selectedScrollSnap()].classList.add('active')
        embla.slideNodes()[embla.previousScrollSnap()].classList.remove('active')
    })
    console.log(embla)
    const slideNodes = embla.slideNodes();
    for (var i = 0; i < slideNodes.length; i++) {
        const slideIndex = i
        slideNodes[slideIndex].addEventListener("pointerdown", (e) => {
            if (slideIndex == embla.selectedScrollSnap()) return;
            const pointerPosX = e.clientX;
            const pointerPosY = e.clientY;
            slideNodes[slideIndex].addEventListener("pointerup", (e) => {
                if (Math.abs(e.clientX - pointerPosX) + Math.abs(e.clientY - pointerPosY) < 6) embla.scrollTo(slideIndex)
                slideNodes[slideIndex].removeEventListener("pointerup", this)
            })

        }, false)
    }
}

for (deck of document.getElementsByClassName('embla__carousel')) {
    addCarousel(deck)
}


var focusTrapEvent = function (e) {
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) {
        return;
    }

    if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
        }
    } else { // if tab key is pressed
        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
        }
    }
};
function addModalFocusTrap(modal) {
    // add all the elements inside modal which you want to make focusable
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


    document.addEventListener('keydown', focusTrapEvent);

    firstFocusableElement.focus();
}

function removeModalFocusTrap() {
    document.removeEventListener('keydown', focusTrapEvent);
}

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


var headerElm = document.getElementById("Header");
function pageDown(overide) {
    if (aboutScreenOpen) {
        toggleAboutScreen()
    }
    window.scrollTo({
        top: 620,
        behavior: 'smooth'
    })
}

function toggleAboutScreen() {
    let aboutContainer = document.getElementById("about-container")
    if (!aboutScreenOpen) {
        aboutScreenOpen = true
        aboutContainer.style.visibility = 'visible';
        document.getElementById("Header").classList.add("full-expansion")
        document.getElementById("email_link").setAttribute("href", ["mailto:kworcest", "ucsc.edu"].join("@"))
        document.body.style.overflow = "hidden";
        addModalFocusTrap()
    } else {
        aboutScreenOpen = false;
        document.getElementById("Header").classList.remove("full-expansion")
        document.body.style.overflow = "auto";
        setTimeout(function () {
            aboutContainer.style.visibility = 'hidden';
        }, 100)
    }
}

var iconLinksExpanded = true
function checkScroll() {
    if (iconLinksExpanded && window.scrollY > (window.screen.height / 2)) {
        document.getElementById('icon_links').classList.remove('expanded')
        iconLinksExpanded = false
    } else if (!iconLinksExpanded && window.scrollY < (window.screen.height / 2)) {
        document.getElementById('icon_links').classList.add('expanded')
        iconLinksExpanded = true
    }
    if (sectionArray[currSectionIndex] && document.getElementById(sectionArray[currSectionIndex]).offsetTop > window.scrollY + (window.screen.height / 2)) {
        onCorrectSection = false;
        currSectionIndex--;
    } else if (sectionArray[currSectionIndex + 1] && document.getElementById(sectionArray[currSectionIndex + 1]).offsetTop - (window.screen.height / 2) < window.scrollY) {
        onCorrectSection = false;
        currSectionIndex++;

    } else {
        onCorrectSection = true;
    }
}



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
            window.open(ev.target.value, "_self");
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