
// ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });
});


const test = document.querySelectorAll(".parallax-section");
test.forEach((el) => observer.observe(el));


const contactForm = document.querySelector(".contact-form");
let nameEl = document.getElementById("name");
let messageEl = document.getElementById("message");
let phoneNumberEl = document.getElementById("phone");
let emailEl = document.getElementById("email");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = {
        name: nameEl.value,
        email: emailEl.value,  // fixed variable usage
        phone: phoneNumberEl.value,  // fixed variable usage
        message: messageEl.value,
    }

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if (xhr.status === 200) { // Check for success response code
            console.log(xhr.responseText);
            if (xhr.responseText === 'success') {
                alert('Email sent');
                nameEl.value = '';
                emailEl.value = '';
                phoneNumberEl.value = '';
                messageEl.value = '';
            } else {
                alert("Something went wrong");
            }
        } else {
            console.error("Error sending the request");
            alert("Failed to send email. Please try again.");
        }
    }

    xhr.onerror = function() {
        console.error("Request failed");
        alert("Failed to send email. Please check your internet connection.");
    }

    xhr.send(JSON.stringify(formData));
})



