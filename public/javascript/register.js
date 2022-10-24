async function registerFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-register").value.trim();
    const email = document.querySelector("#email-register").value.trim();
    const password = document.querySelector("#password-register").value.trim();

    if (username && email && password) {
        const response = await fetch("api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {"Content-Type": "application/json"},
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please fill in all fields!");
        }
    }
}

document.querySelector(".register-form").addEventListener("submit", registerFormHandler);
