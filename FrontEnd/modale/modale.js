let modal = null; // Stocke la modale actuellement ouverte

const openModal = async function (e) {
  e.preventDefault(); // Empêche le comportement par défaut

  const target = e.target.getAttribute("href"); // Récupère la cible spécifiée dans l'attribut href
  if (target.startsWith("#")) {
    // Si la cible est un ID
    modal = document.querySelector(target); // Trouve l'élément correspondant dans la page
  } else {
    // Sinon, charge la modale depuis une URL
    modal = await loadModal(target);
  }
  if (!modal) {
    // Si aucune modale n'est trouvée, afficher un message d'erreur et arrêter
    console.error("modal not found");
    return;
  }

  modal.style.display = null; // Affiche la modale en retirant un éventuel style `display: none`
  modal.removeAttribute("aria-hidden"); // modale n'est plus cachée pour l'accessibilité
  modal.setAttribute("aria-modal", "true"); //  fenêtre modale active
  modal.addEventListener("click", closeModal); // Ferme la modale si on clique en dehors du contenu
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal); // fermer la modale au click bouton
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation); // Empêche la fermeture en cliquant ailleurs que défini
};

const closeModal = function (e) {
  if (modal === null) return; // Si aucune modale n'est ouverte, ne rien faire
  e.preventDefault();
  modal.style.display = "none"; // Cache la modale en ajoutant un style `display: none`
  modal.setAttribute("aria-hidden", "true"); // Indique que la modale est cachée pour l'accessibilité
  modal.removeAttribute("aria-modal"); // Retire l'indication de fenêtre modale active
  modal.removeEventListener("click", closeModal); // Supprime l'écouteur de clic en dehors du contenu
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal); // Supprime l'écouteur de clic sur le bouton de fermeture
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation); // Supprime l'écouteur pour empêcher la propagation des clics
  modal = null; // Réinitialise la variable `modal` à null
};

const stopPropagation = function (e) {
  e.stopPropagation(); // fonction de base qui empêche le clic de se propager à d'autres éléments
};

const loadModal = async function (url) {
  const target = "#" + url.split("#")[1]; // Extrait l'ID de la modale depuis l'URL
  const existingModal = document.querySelector(target); // Vérifie si la modale existe déjà dans la page
  if (existingModal !== null) return existingModal; // Si elle existe, la retourner sans la recharger
  const html = await fetch(url).then((response) => response.text()); // Charge le contenu HTML de la modale depuis l'URL
  const element = document // Convertit le HTML dans le DOM
    .createRange()
    .createContextualFragment(html)
    .querySelector(target); // Récupère la modale
  if (element === null)
    throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`; // erreur
  document.body.append(element); // Ajoute la modale au DOM
  return element; // retourne elemnet
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal); // ouvrir la modale au clic
});
