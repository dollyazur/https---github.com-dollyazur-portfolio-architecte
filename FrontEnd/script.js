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

  for (const projet in projets) {
    // pour chaque ligne de projet, on va faire ce qu'il y a dans les {}
    console.log(projet); //medor on lui a appris à s'asseoir, il sait faire, mais on lui pas dit "assis"
  }
}
//on va dire "assis à Médor"
afficherProjet(recupProjet()); //celui tout en haut dans l'async
//j'affiche les projets que j'ai récup dans récupProjet

//avec chatgpt

// Fonction pour récupérer les projets de l'API
async function recupProjet() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Requête API
    const projets = await response.json(); // On convertit la réponse en JSON
    return projets; // On retourne les projets récupérés
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
  }
}

// Fonction pour afficher les projets dans la galerie
function afficherProjet(projets) {
  const gallery = document.querySelector(".gallery"); // Sélection de la galerie dans le DOM
  gallery.innerHTML = ""; // On vide le contenu existant de la galerie

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

// Appel de la fonction principale pour récupérer et afficher les projets
recupProjet().then((projets) => {
  afficherProjet(projets); // Quand les projets sont récupérés, on les affiche
});

//trier
// Fonction pour récupérer les projets de l'API
async function recupProjet() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Requête API pour les projets
    const projets = await response.json(); // On convertit la réponse en JSON
    return projets; // On retourne les projets récupérés
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
  }
}

// Fonction pour récupérer les catégories de l'API (si disponible) ou depuis des données locales
async function recupCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories"); // Requête API pour les catégories
    const categories = await response.json(); // On convertit la réponse en JSON
    return categories; // On retourne les catégories récupérées
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories : ", error);
    return []; // On retourne un tableau vide en cas d'erreur
  }
}

// Fonction pour afficher les projets dans la galerie
function afficherProjet(projets) {
  const gallery = document.querySelector(".gallery"); // Sélection de la galerie dans le DOM
  gallery.innerHTML = ""; // On vide le contenu existant de la galerie

  // On parcourt tous les projets récupérés
  projets.forEach((projet) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = projet.imageUrl; // On prend l'image depuis l'API
    img.alt = projet.title; // On ajoute une description alternative pour l'image
    figcaption.textContent = projet.title; // Le titre sous l'image

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure); // On ajoute la figure dans la galerie
  });
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
        (projet) => projet.categoryId === categorie.id
      ); // Filtrer les projets par catégorie
      afficherProjet(projetsFiltres); // Afficher les projets filtrés
    });
    menu.appendChild(bouton); // Ajouter le bouton au menu
  });
}

function modeEditeur() {
  if (sessionStorage.getItem("connexionToken") !== null) {
    console.log("L'utilisateur est connecté.");
  } else {
    console.log("L'utilsateur n'est pas connecté.");
  }
}

// Appel des fonctions pour récupérer les projets et les catégories, puis les afficher et générer le menu
async function init() {
  const projets = await recupProjet(); // On récupère les projets
  const categories = await recupCategories(); // On récupère les catégories

  afficherProjet(projets); // On affiche tous les projets par défaut
  genererMenuCategories(categories, projets); // On génère le menu de catégorie
}

init(); // Initialisation du script
modeEditeur(); // on verifie si l'user est connecté ou non
//Récupération des catégories :

//La fonction recupCategories récupère les catégories depuis une API (ou tu peux les ajouter manuellement si elles ne sont pas disponibles via l'API).
// Création du menu de catégories :

// La fonction genererMenuCategories crée dynamiquement des boutons pour chaque catégorie.
// Un bouton "Tous" est ajouté pour afficher l'ensemble des projets.
// Chaque bouton de catégorie filtre les projets correspondant à cette catégorie et affiche les projets filtrés.
// Filtrage des projets par catégorie :

// Lorsque tu cliques sur un bouton de catégorie, les projets sont filtrés en fonction de l'ID de la catégorie (categoryId), et seulement les projets de cette catégorie sont affichés.
//Initialisation :

// La fonction init est appelée pour lancer le processus : elle récupère les projets et les catégories, puis affiche les projets et génère le menu.

//html
//<div class="menu-categories"></div> <!-- Menu de catégories -->
//<div class="gallery"></div> <!-- Galerie des projets -->
