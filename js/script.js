const links = document.querySelectorAll('nav li');
const icons = document.getElementById("icons");
const navigator =document.getElementById("navBar");

icons.addEventListener("click", () => {
    navigator.classList.toggle("active");
});

links.forEach((link) => {
    link.addEventListener("click", () => {
        navigator.classList.remove("active");
    });
});