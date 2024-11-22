document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();

    const emailValue = document.getElementById("mail").value;
    const motDePasseValue = document.getElementById("password").value;

    //On crée un objet avec les données de connexion
    const loginData = {
      email: emailValue,
      password: motDePasseValue,
    };

    if (!emailValue || !motDePasseValue) {
      afficherMessageErreur("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //comment je veux avoir les données, ici en json
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Connexion réussie :", data);

        localStorage.setItem("connexionToken", data.token); // Stocker le token
        window.location.href = "../index.html"; // Redirection après connexion
      } else {
        // Gérer les erreurs côté utilisateur
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent =
          "Erreur de connexion : vérifiez vos identifiants.";
      }
    } catch (error) {
      console.error("La requête n'a pas fonctionné", error);
    }
  });

  // Fonction pour afficher les erreurs
  function afficherMessageErreur(message) {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
  }
});
