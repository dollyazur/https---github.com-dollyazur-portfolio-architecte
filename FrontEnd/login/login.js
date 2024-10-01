const buttonEnvoi = document.querySelector(".button-envoi");
buttonEnvoi.addEventListener("click", function () {
  //on va recuperer l'email et le MDP de l'user
  let email = document.getElementById("mail"); //recuperation champ de formulaire
  //on recupère la valeur du champ
  let emailValue = email.value; //le email qu'on a crée en let, pas son nom "e-mail"
  console.log(emailValue); // affiche ce qui est contenu dans la balise email

  //faire pareil pour le password
  let motDePasse = document.getElementById("password");
  let motDePasseValue = motDePasse.value;
  console.log(motDePasseValue);
});

async function login() {} //voir pour ecrire le fetch avec un methode post et non get (différent : revoir le cours)

fetch("http://localhost:5678/api-docs/#/default/post_users_login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", //je ne sais pas ce que c'est
  },
  body: JSON.stringify({
    // Les données à envoyer
    key1: "emailValue",
    key2: "motDePasseValue",
  }),
})
  .then((response) => {
    // Traiter la réponse
  })
  .catch((error) => {
    // Gérer les erreurs
  });

//problème rechargement de la page

const form = document.querySelector(".login-form");

// Quand on submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");
});

form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");

  // On récupère les deux champs et on affiche leur valeur
  const motDePasse = document.getElementById("password").value;
  const email = document.getElementById("mail").value;
  console.log(motDePasseValue);
  console.log(emailValue);
});
