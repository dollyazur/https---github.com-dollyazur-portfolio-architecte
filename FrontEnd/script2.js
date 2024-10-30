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
    let modifier = document.querySelector(".lien-modale1");
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
    let modifier = document.querySelector(".lien-modale1");
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

// debut code chat gpt qui ne fonctionne pas
//gestion ouverture/fermeture modale

//selection des 3 éléments (overlay, modale et modale2 par leur id)
const overlay = document.getElementById("overlay");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modale2");

function openModal() {
  //ajout des display
  modal.style.display = "block";
  overlay.style.display = "block";
  // Ajout du lien CSS pour modale.css
  let modalStylesheet = document.createElement("link");
  modalStylesheet.rel = "stylesheet";
  modalStylesheet.href = "./modale/modale.css";
  modalStylesheet.classList.add("modal-stylesheet"); // Pour l'identifier et la retirer plus tard
  document.head.appendChild(modalStylesheet);

  // Autres actions pour ouvrir la modale
}

function closeModal() {
  //ajout des display
  modal1.style.display = "none";
  modal2.style.display = "none";
  overlay.style.display = "none";
  // Retrait du lien CSS pour modale.css
  const modalStylesheet = document.querySelector(".modal-stylesheet");
  if (modalStylesheet) modalStylesheet.remove();
}

//Ecouteurs d'evenements pour ouverture/fermeture modale
document.querySelector(".js-open-modal2").addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(); // Ferme la première modale si elle est ouverte
  openModal(modal2); // Ouvre la deuxième modale
});

overlay.addEventListener("click", closeModal);
document.querySelectorAll(".js-modal-close").forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Écouteur d'événement pour ouvrir modal1
document.querySelector(".js-modal").addEventListener("click", (e) => {
  e.preventDefault();
  openModal(modal1); // Ouvre la première modale
});

// fin code chat gpt qui ne fonctionne pas

// Appel des fonctions pour récupérer les projets et les catégories, puis les afficher et générer le menu
// d'abord on crée les fonctions et ensuite on les appelle
async function init() {
  modeEditeur();
  const projets = await recupProjet(); // On récupère les projets
  const categories = await recupCategories(); // On récupère les catégories

  afficherProjet(projets); // On affiche tous les projets par défaut
  genererMenuCategories(categories, projets); // On génère le menu de catégories
}

init(); // Initialisation du script
