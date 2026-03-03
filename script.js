window.onload = function () {

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if(form){

form.addEventListener("submit", async function(e) {

e.preventDefault();

const data = new FormData(form);

try {

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

} catch(error) {
status.innerHTML = "Network error. Please try again.";
status.style.color = "red";
}

});

}

};