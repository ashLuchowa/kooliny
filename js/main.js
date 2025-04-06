const targets = document.querySelectorAll('.scroll');
const sections = document.querySelectorAll('.scroll-other');

function scrollParallax(target) {
    scrollPositionY = window.scrollY;
    let targetPositionY = target.getBoundingClientRect().top;
    let rate = (scrollPositionY - targetPositionY) * 0.15;
    
    target.style.transform = `translate3d(0px, ${-rate}px, 0px)`;
}

function scrollAppear(target) {
    let introPosition = target.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.05;

    if(introPosition < screenPosition) {
        target.classList.add('scroll-appear');
    } else {
        target.classList.remove('scroll-appear');
    }
}

function scrollAppearOther(section) {
    let introPosition = section.getBoundingClientRect().top;
    let screenPosition = window.innerHeight;

    if(introPosition < screenPosition) {
        section.classList.add('scroll-appear-other');
    } else {
        section.classList.remove('scroll-appear-other');
    }
}

function setMargin() {
    targets.forEach((target, index) => {
        const marginTop = 200 + index * 300;
        target.style.marginTop = `${marginTop}px`;
    });
}

window.addEventListener('scroll', () => {
    targets.forEach(target => {
        scrollAppear(target);
        scrollParallax(target);
        setMargin();
    });
    sections.forEach(section => {
        scrollAppearOther(section);
    })
});


//BACK TO TOP SCROLL
const showOnPx = 100;
const topBtn = document.querySelector('.back-top');

const scrollContainer = () => {
    return document.documentElement || document.body;
};

document.addEventListener('scroll', () => {
    if (scrollContainer().scrollTop > showOnPx) {
        topBtn.style.opacity = '1';
    } else {
        topBtn.style.opacity = '0';
    }
});

//smooth scroll
const goToTop = () => {
    document.body.scrollIntoView({
        behavior: 'smooth',
    });
};

topBtn.addEventListener('click', goToTop);

//Sub Menu
const button = document.querySelector('.hamburger-content');
const subNav = document.querySelector('.sub-nav');
const body = document.querySelector('#about-para');

button.addEventListener('click', () => {
    subNav.classList.toggle('active');
    body.classList.toggle('active');
    button.classList.toggle('active');
});


//--- Platform Card Generation --- //
// Variables
const studentMainContainer = document.querySelector('.student-policies');
const teacherMainContainer = document.querySelector('.teacher-policies');
const downloadBtn = document.querySelectorAll('.download-btn');

class Cards {
    constructor(title, description, btn, tags) {
        this.title = title;
        this.description = description;
        this.btn = btn;
        this.tags = tags;
    }
}

// Generate each card
const copyright = new Cards('Copyright Policy', 'Content on this Site may contain the trademarks of other entities.', createButton('Download', 'download-btn', './assets/policies/student/Copyright Policy.pdf'), 'student');
const disclaimer = new Cards('Disclaimer', 'This disclaimer (“Disclaimer”) sets forth the general guidelines, disclosures, and terms of your use of the Koorliny Kaattijin website.', createButton('Download', 'download-btn', './assets/policies/student/Disclaimer.pdf'), 'student');
const htmlGuideline = new Cards('HTML Coding Guidelines v1-1', 'HTML Coding Guidelines and Policy for Staff.', createButton('Download', 'download-btn', './assets/policies/student/HTML Coding Guidelines v1-1.pdf'), 'student');
const ict = new Cards('ICTWEB450 Test performance of web hosting service guidelines v1.1', 'Test performance of web hosting service guidelines for Staff.', createButton('Download', 'download-btn', './assets/policies/student/ICTWEB450 Test performance of web hosting service guidelines  v1.1.pdf'), 'student');
const informationServices = new Cards('Information services acceptable use staff', 'Information services acceptable use staff', createButton('Download', 'download-btn', './assets/policies/student/Information services acceptable use staff.pdf'), 'student');
const monitoring = new Cards('Monitoring and reporting on website traffic guidelines v1.0', 'Monitoring and reporting on website traffic guidelines for Staff.', createButton('Download', 'download-btn', './assets/policies/student/Monitoring and reporting on website traffic guidelines  v1.0.pdf'), 'student');
const privacy = new Cards('Privacy Policy', 'Koorliny Kaattijin collects client information to complete the enrolment process.', createButton('Download', 'download-btn', './assets/policies/student/Privacy Policy.pdf'), 'student');
const codeOfConduct = new Cards('Staff code of conduct', 'provides practical guidance and information on our corporate governance, regulatory and policy frameworks.', createButton('Download', 'download-btn', './assets/policies/student/Staff code of conduct.pdf'), 'student');
const vulnerability = new Cards('Vulnerability Management Policy', 'Ensuring a higher level of security for Koorliny Kaattijin IT Resources.', createButton('Download', 'download-btn', './assets/policies/student/Vulnerability Management Policy.pdf'), 'student');
const webAppSecurity = new Cards('Web Application Security Policy', 'Enforces that web applications maintain the security posture, compliance and risk management.', createButton('Download', 'download-btn', './assets/policies/student/Web Application Security Policy.pdf'), 'student');
const webAccessibility = new Cards('Website Accessibility Policy v1.1', 'Ensures that all content published on Organisation IT websites is accessible for all users.', createButton('Download', 'download-btn', './assets/policies/student/Website Accessibility Policy v1.1.pdf'), 'student');

// Card library
cardLibrary = [copyright, disclaimer, htmlGuideline, ict, informationServices, monitoring, privacy, codeOfConduct, vulnerability, webAppSecurity, webAccessibility];

// DOM for each card
function generateItem(item, studentMainContainer) {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('student-policies-card');

    generateItemData(itemContainer, 'student-policies-title', item.title);
    generateItemData(itemContainer, 'student-policies-description', item.description);
    generateItemData(itemContainer, 'student-policies-btn', item.btn);

    studentMainContainer.appendChild(itemContainer);
}

// Item data function
function generateItemData(itemContainer, className, itemType) {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add(className);

    if(itemType instanceof HTMLElement) {
        contentContainer.appendChild(itemType);
    } else {
        contentContainer.textContent = itemType;
    }

    itemContainer.appendChild(contentContainer);
}

for (item of cardLibrary) {
    generateItem(item, studentMainContainer);
}

//Create button
function createButton(text, className, link) {
    const anchorContainer = document.createElement('a');
    anchorContainer.href = link;
    anchorContainer.target = '_blank';

    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);

    anchorContainer.appendChild(button);
    return anchorContainer;
}

// Search function
function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.student-policies-card');
    cards.forEach((card) => {
        const title = card.querySelector('.student-policies-title').textContent.toLowerCase();
        const description = card.querySelector('.student-policies-description').textContent.toLowerCase();

        if(title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search Event Listener
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e)=> {
    const searchTerm = e.target.value.toLowerCase();
    filterCards(searchTerm);
});


//--- PROMPT ---//
// prompt modal generate
function generatePrompt() {
    const promptMain = document.querySelector('.prompt-box');
    const promptStudent = document.getElementById('prompt-student');
    const promptLecturer = document.getElementById('prompt-lecturer');

    let array = [promptStudent, promptLecturer];

    for(item of array) {
        item.addEventListener('click', (e) => {
            if(e.target === promptStudent) {
                studentMainContainer.style.display = 'grid';
                teacherMainContainer.style.display = 'none';
            } else if (e.target === promptLecturer) {
                let promptResult = prompt('Input Password [Any password will work]', '');
                if(promptResult) {
                    console.log(promptResult);
                    studentMainContainer.style.display = 'none';
                    teacherMainContainer.style.display = 'grid';
                } else if (promptResult === null || !promptResult){
                    alert('Any password will work');
                    return promptResult;
                }
            }
            // Smooth transition out
            promptMain.style.opacity = '0';
            setTimeout(() => {
                promptMain.classList.add('hidden');
            }, 500);
        });
    }
}
generatePrompt();