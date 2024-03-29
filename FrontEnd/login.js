document.addEventListener("DOMContentLoaded", function() {

    //Ligne de code pour gérer le formulaire de connexion
    const connectButton = document.getElementById("connect");
connectButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const emailForm = document.getElementById("email").value;
    console.log(emailForm)
    const passwordForm = document.getElementById("pass").value;
    console.log(passwordForm)
    await validateForm(emailForm, passwordForm);
});
})
console.log("DOMContentLoaded");
console.log("click");

async function validateForm(email, password) {
    //try {
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if (responseLogin.ok) {
            const responseData = await responseLogin.json();
            console.log(responseData);
            location = "index.html";
            window.localStorage.setItem("myToken", responseData.token);
        } else {
            console.log("Erreur de connexion");
            const existingError = document.querySelector("#loginError")
            if (!existingError) {
                const loginForm = document.querySelector("#login form");
                const logError = document.querySelector("p");
                logError.textContent = "Erreur dans les identifiants !"
                logError.id = "loginError";
                logError.style.color = "red"
                loginForm.insertBefore(logError, loginForm.firstChild);
            }
        }
    //} catch (error) {
        //console.error("Erreur lors de la requete:", error)
    //}
}

export function getToken() {
    return window.localStorage.getItem("myToken");
}

const storedToken = getToken();

if (storedToken) {
    console.log("Le token est stocké :", storedToken);
} else {
    console.log("Aucun token n'est stocké");
}