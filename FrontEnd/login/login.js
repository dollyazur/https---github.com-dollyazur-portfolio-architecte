//on la met en premier, parce que c'est le click du bouton que ca va l'appeler donc faut qu'elle soit deja en place
async function login(emailValue, motDePasseValue) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //comment je veux avoir les données, ici en json
    },
    body: JSON.stringify({
      //les données que j'envoie c'est des chaines de char, on va les transformer en json pour qu l'API comprenne
      email: emailValue,
      password: motDePasseValue,
    }),
  })
    .then((response) => {
      // Traiter la réponse
      return response.json(); //On traduit la réponse en json, sinon on ne peut pas lire nous humains
    })
    .then((data) => {
      console.log(data);
      let connexionToken = data.token;
      console.log(connexionToken);
      localStorage.setItem("connexionToken", connexionToken); //on stocke le token lisible dans la variable globale "sessionStorage)"
      window.location.href = "../index.html";
    })

    .catch((error) => {
      // Gérer les erreurs c'est juste pour moi, l'user ne le voit pas
      console.log("La requête n'a pas fonctionné");
    });
}

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

  //Comme d'habitude, on a créé la fonction, medor sait s'asseoir, mais faut lui dire!
  login(emailValue, motDePasseValue); //ce qui est crée en ligne 29 et 34, c'est avec ça qu'on va faire le fetch
});

//problème rechargement de la page

const form = document.querySelector(".login-form");

// Quand on submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");
});

//toujours use email et mdp fourni dans le readme
