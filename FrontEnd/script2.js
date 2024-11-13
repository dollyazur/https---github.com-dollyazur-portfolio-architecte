//création fonction qui recup les projets
async function recupProjet() {
  //toujours async d'abord si on utilise await
  const response = await fetch("http://localhost:5678/api/works"); //penser à mettre les guillemets autour de l'url
  const projets = await response.json(); //retourne la réponse en JSON t'es bien brave!
  return projets; //demande de réponse! logique! on retourne le "projet" vu qu'on vient d'appeler la const "projet"
}
console.log(recupProjet()); //on affiche notre fonction, et on appelle la fonction dans la fonction donc ()

// fonction médor, pas taper 11 fois le même code!!!
//on a RECUP les projets, Faut les afficher now!!
function afficherProjet(projets) {
  const gallery = document.querySelector(".gallery"); //on recup la gallery dans le DOM
  gallery.innerHTML = ""; //effacement total des element sus mentionnés

  // On parcourt tous les projets récupérés
  projets.forEach((projet) => {
    // Création des éléments nécessaires pour chaque projet
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // On assigne les attributs et contenus
    img.src = projet.imageUrl; // On prend l'image depuis l'API
    img.alt = projet.title; // On ajoute une description alternative pour l'image
    figcaption.textContent = projet.title; // Le titre sous l'image

    // On ajoute l'image et le titre dans la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // On ajoute la figure dans la galerie
    gallery.appendChild(figure);
  });
}

function afficherProjetModale(projets) {
  const gallery = document.querySelector(".gallery-modale"); //on recup la gallery dans le DOM
  gallery.innerHTML = ""; //effacement total des element sus mentionnés

  // On parcourt tous les projets récupérés
  projets.forEach((projet) => {
    // Création des éléments nécessaires pour chaque projet
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    // On assigne les attributs et contenus
    img.src = projet.imageUrl; // On prend l'image depuis l'API
    img.alt = projet.title; // On ajoute une description alternative pour l'image

    // Créer l'icône de poubelle
    const poubelle = document.createElement("img");
    poubelle.src = "./assets/icons/trash.png"; // Chemin de l'image de poubelle dans les assets
    poubelle.alt = "Supprimer";
    poubelle.classList.add("icon-poubelle"); // Ajouter une classe pour le style

    // Ajouter un écouteur d'événement pour supprimer le projet
    poubelle.addEventListener("click", () =>
      supprimerProjet(projet.id, figure)
    );

    // Positionner l'icône de poubelle
    figure.style.position = "relative"; // Conteneur relatif pour la position absolue
    poubelle.style.position = "absolute";
    poubelle.style.top = "10px"; // Positionner selon vos besoins  //possible en css??
    poubelle.style.right = "10px"; // Positionner selon vos besoins

    // On ajoute l'image et le titre dans la figure
    figure.appendChild(img);
    figure.appendChild(poubelle);

    // On ajoute la figure dans la galerie
    gallery.appendChild(figure);
  });
}

//rajouter l'icon de poubelle
//il faut enregistrer la poubelle dans les assets
//et l'afficher pour chaque image avec un position relative/absolute
//et ajouter l'id du projet en id de l'icone

//créer une fonction de suppression qui sera activée à chaque fois qu'un utilisateur clique sur la poubelle
function supprimerProjet(id, figure) {
  // Supprimer l'élément du DOM
  figure.remove();

  // Définir le jeton d'authentification (exemple)
  //const token = "VOTRE_JETON_D_AUTHENTIFICATION"; // Remplacez par votre token

  // Requête API pour supprimer le projet dans la base de données
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}` // Ajout de l'authentification
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Projet ${id} supprimé avec succès`);
      } else {
        console.error("Erreur lors de la suppression du projet");
      }
    })
    .catch((error) => {
      console.error("Erreur réseau :", error);
    });
}

//trier

// Fonction pour récupérer les catégories de l'API (si disponible) ou depuis des données locales
async function recupCategories() {
  try {
    //a voir si je le garde
    const response = await fetch("http://localhost:5678/api/categories"); // Requête API pour les catégories
    const categories = await response.json(); // On convertit la réponse en JSON
    console.log(categories); //fournit dans le JSON de base
    return categories; // On retourne les catégories récupérées
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories : ", error);
    return []; // On retourne un tableau vide en cas d'erreur
  }
}

// Fonction pour générer dynamiquement le menu de catégories
function genererMenuCategories(categories, projets) {
  const menu = document.querySelector(".menu-categories"); // Sélection du menu dans le DOM
  menu.innerHTML = ""; // On vide le menu existant

  // Créer un bouton "Tous" pour afficher tous les projets
  const boutonTous = document.createElement("button");
  boutonTous.textContent = "Tous"; // Texte du bouton
  boutonTous.addEventListener("click", () => afficherProjet(projets)); // Filtre par "Tous" (affiche tous les projets)
  menu.appendChild(boutonTous); // On ajoute le bouton au menu

  // Pour chaque catégorie, créer un bouton
  categories.forEach((categorie) => {
    const bouton = document.createElement("button");
    bouton.textContent = categorie.name; // Nom de la catégorie
    bouton.addEventListener("click", () => {
      const projetsFiltres = projets.filter(
        (projet) => projet.categoryId === categorie.id // on filtre par l'id de la categorie comme affiché dans le console.log
      ); // Filtrer les projets par catégorie
      afficherProjet(projetsFiltres); // Afficher les projets filtrés
    });
    menu.appendChild(bouton); // Ajouter le bouton au menu
  });
}

function modeEditeur() {
  if (localStorage.getItem("connexionToken") !== null) {
    console.log("L'utilisateur est connecté.");

    // je cache le lien login
    let lienLogin = document.querySelector(".lien-login");
    lienLogin.classList.add("inactive");

    //j'affiche le logout
    let lienLogout = document.querySelector(".lien-logout");
    lienLogout.classList.remove("inactive");

    //afficher bandeau noir
    let BandeauNoir = document.querySelector(".bandeau-noir");
    BandeauNoir.classList.remove("inactive");

    //afficher le bouton modifier
    let modifier = document.querySelector(".modifier");
    modifier.classList.remove("inactive");

    //cacher les filtres
    let menuCategories = document.querySelector(".menu-categories");
    menuCategories.classList.add("inactive");
  } else {
    console.log("L'utilsateur n'est pas connecté.");

    //j'affiche le login
    let lienLogin = document.querySelector(".lien-login");
    lienLogin.classList.remove("inactive");

    //je cache le lien logout
    let lienLogout = document.querySelector(".lien-logout");
    lienLogout.classList.add("inactive");

    //cacher le bandeau noir
    let BandeauNoir = document.querySelector(".bandeau-noir");
    BandeauNoir.classList.add("inactive");

    //cacher le bouton modifier
    let modifier = document.querySelector(".modifier");
    modifier.remove("inactive");

    //j'affiche les filtres
    let menuCategories = document.querySelector(".menu-categories");
    menuCategories.classList.remove("inactive");
  }
}

let lienLogout = document.querySelector(".lien-logout");
lienLogout.addEventListener("click", () => {
  localStorage.removeItem("connexionToken");
  console.log("Le token est supprimé, l'utilisateur est déconnecté.");
  //rechargement de page
  window.location.href = "index.html";
});

//gestion ouverture/fermeture modale

//selection des 3 éléments (overlay, modale et modale2 par leur id)
const overlay = document.getElementById("overlay");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modale2");

//on récupère le lien modifier qui va déclancher l'affichage de la modale 1
const modifier = document.querySelector(".modifier");

modifier.addEventListener("click", () => {
  //affichage de la modale 1 et de l'overlay au click sur le bouton modifier
  overlay.classList.add("active");
  overlay.classList.remove("inactive");
  modal1.classList.add("active");
  modal1.classList.remove("inactive");
});

//script de fermeture de la modale1
const cross1 = document.querySelector(".cross-modale1");
const cross2 = document.querySelector(".cross-modale2");

cross1.addEventListener("click", () => {
  overlay.classList.remove("active");
  overlay.classList.add("inactive");
  modal1.classList.remove("active");
  modal1.classList.add("inactive");
});

cross2.addEventListener("click", () => {
  overlay.classList.remove("active");
  overlay.classList.add("inactive");
  modal2.classList.remove("active");
  modal2.classList.add("inactive");
});

//ouverture de la modale 2
const ajoutPhoto = document.querySelector(".ajout-photo");

ajoutPhoto.addEventListener("click", () => {
  modal1.classList.remove("active");
  modal1.classList.add("inactive");
  modal2.classList.add("active");
  modal2.classList.remove("inactive");
});

//retour sur la modale 1
const flecheRetour = document.querySelector(".fa-arrow-left");

flecheRetour.addEventListener("click", () => {
  modal1.classList.add("active");
  modal1.classList.remove("inactive");
  modal2.classList.remove("active");
  modal2.classList.add("inactive");
});

//au click sur l'overlay, on ferme tout
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  overlay.classList.add("inactive");
  modal1.classList.remove("active");
  modal1.classList.add("inactive");
  modal2.classList.remove("active");
  modal2.classList.add("inactive");
});

// Appel des fonctions pour récupérer les projets et les catégories, puis les afficher et générer le menu
// d'abord on crée les fonctions et ensuite on les appelle
async function init() {
  modeEditeur();
  const projets = await recupProjet(); // On récupère les projets
  const categories = await recupCategories(); // On récupère les catégories

  afficherProjet(projets); // On affiche tous les projets par défaut
  afficherProjetModale(projets); // On affiche tous les projets par défaut dans la modale 1
  genererMenuCategories(categories, projets); // On génère le menu de catégories

  //rajouter un écouteur d'évènement sur les poubelles qui appellera la fonction supprimerProjet()
}

init(); // Initialisation du script
