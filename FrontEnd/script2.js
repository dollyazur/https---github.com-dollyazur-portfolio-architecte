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
  // la gallery est toujours là, pourquoi?

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
    const response = await fetch("http://localhost:5678/api/categories"); // Requête API pour les catégories
    const categories = await response.json(); // On convertit la réponse en JSON
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
        (projet) => projet.categoryId === categorie.id
      ); // Filtrer les projets par catégorie
      afficherProjet(projetsFiltres); // Afficher les projets filtrés
    });
    menu.appendChild(bouton); // Ajouter le bouton au menu
  });
}

// Appel des fonctions pour récupérer les projets et les catégories, puis les afficher et générer le menu
async function init() {
  const projets = await recupProjet(); // On récupère les projets
  const categories = await recupCategories(); // On récupère les catégories

  afficherProjet(projets); // On affiche tous les projets par défaut
  genererMenuCategories(categories, projets); // On génère le menu de catégories
}

init(); // Initialisation du script
