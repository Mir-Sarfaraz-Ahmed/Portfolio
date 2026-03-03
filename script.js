window.onload = function () {

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(e) {

e.preventDefault();

const data = new FormData(form);

const response = await fetch(form.action, {
method: "POST",
body: data,
headers: {
'Accept': 'application/json'
}
});

if (response.ok) {
status.innerHTML = "Message sent successfully!";
status.style.color = "green";
form.reset();
} else {
status.innerHTML = "Submission failed. Try again!";
status.style.color = "red";
}

});

};

function openModal(){
document.getElementById("projectModal").style.display = "block";
}

function closeModal(){
document.getElementById("projectModal").style.display = "none";
}

window.onclick = function(event) {
const modal = document.getElementById("projectModal");
if (event.target == modal) {
modal.style.display = "none";
}
}