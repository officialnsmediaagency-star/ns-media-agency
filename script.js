// =========================================
// FIREBASE FIRESTORE CONNECTION
// =========================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBR_J0JISRfNmH9cpQUaE3OU43qsthgc",
    authDomain: "ns-media-agency.firebaseapp.com",
    projectId: "ns-media-agency",
    storageBucket: "ns-media-agency.firebasestorage.app",
    messagingSenderId: "332535957542",
    appId: "1:332535957542:web:66c6c53a40636143acfee7",
    measurementId: "G-8FVFSFS9ZX"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ==========================================
   NS MEDIA AGENCY
   Premium Website JavaScript
========================================== */

// ==============================
// Mobile Navigation
// ==============================

const menuBtn = document.querySelector(".menu");
const navMenu = document.querySelector("#menu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// ==============================
// Sticky Navbar
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});

// ==============================
// FAQ Accordion
// ==============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

const question=item.querySelector(".faq-question");

const answer=item.querySelector(".faq-answer");

const icon=question.querySelector("span");

question.addEventListener("click",()=>{

faqItems.forEach(other=>{

if(other!==item){

other.querySelector(".faq-answer").style.maxHeight=null;

other.querySelector(".faq-question span").innerHTML="+";

}

});

if(answer.style.maxHeight){

answer.style.maxHeight=null;

icon.innerHTML="+";

}else{

answer.style.maxHeight=answer.scrollHeight+"px";

icon.innerHTML="−";

}

});

});

// ==============================
// Counter Animation
// ==============================

const counters=document.querySelectorAll(".counter");

const speed=150;

const startCounter=()=>{

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const increment=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(update,15);

}else{

counter.innerText=target;

}

};

update();

});

};

// Trigger Counter Once

let counterStarted=false;

window.addEventListener("scroll",()=>{

const stats=document.querySelector(".stats");

if(!stats) return;

const position=stats.getBoundingClientRect().top;

if(position<window.innerHeight-100 && !counterStarted){

counterStarted=true;

startCounter();

}

});

// =========================================
// TESTIMONIAL AUTO SLIDER
// =========================================

const testimonials = document.querySelectorAll(".testimonial");

let currentTestimonial = 0;

function showTestimonial(index){

    testimonials.forEach((item)=>{

        item.classList.remove("active");

    });

    testimonials[index].classList.add("active");

}

setInterval(()=>{

    currentTestimonial++;

    if(currentTestimonial >= testimonials.length){

        currentTestimonial = 0;

    }

    showTestimonial(currentTestimonial);

},5000);

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(

".about,.stats,.services,.creators,.brands,.testimonials,.cta,.faq,.contact"

);

const revealOnScroll = ()=>{

    revealElements.forEach((element)=>{

        const top = element.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if(top < windowHeight - 120){

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =========================================
// ACTIVE NAVIGATION
// =========================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// =========================================
// CONTACT FORM
// =========================================

const form = document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("✅ Thank you! Your message has been received. We'll contact you soon.");

form.reset();

});

}

// =========================================
// SMOOTH BUTTON HOVER
// =========================================

const buttons = document.querySelectorAll(".gold-btn,.outline-btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-5px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});

console.log("✅ NS Media Agency Website Loaded Successfully");


const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await addDoc(collection(db, "creatorApplications"), {

            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            companyOrCreatorName:
                document.getElementById("company").value,
            projectDetails:
                document.getElementById("message").value,
            createdAt: serverTimestamp()

        });

        alert("Your information has been submitted successfully!");

        form.reset();

    } catch (error) {

        console.error("Firestore Error:", error);

        alert("Error: " + error.message);

    }

});

// ================================
// FIREBASE CONTACT FORM
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        // STOP PAGE REFRESH
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const company = document.getElementById("company").value;
        const message = document.getElementById("message").value;

        try {

            // Save data to Firebase
            await addDoc(collection(db, "creatorApplications"), {
                name: name,
                email: email,
                phone: phone,
                companyOrCreatorName: company,
                projectDetails: message,
                createdAt: new Date()
            });

            alert("Your application has been submitted successfully!");

            // Clear the form
            contactForm.reset();

        } catch (error) {

            console.error("Error submitting application:", error);

            alert("Something went wrong. Please try again.");

        }
    });
}
