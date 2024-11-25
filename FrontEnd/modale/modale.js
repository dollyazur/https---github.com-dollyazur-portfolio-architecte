let modal = null; //permet de savoir quelle est la boite modale actuellement open

const openModal = async function (e) {
  e.preventDefault();

  const target = e.target.getAttribute("href");
  if (target.startsWith("#")) {
    modal = document.querySelector(target);
  } else {
    modal = await loadModal(target); //je lui passe l'url
  }
  if (!modal) {
    console.error("modal not found");
    return;
  }

  modal.style.display = null;
  modal.removeAttribute("aria-hidden"); //on supprime l'élement puisqu'il redevient visible
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal); //on cherche le bouton et on ecoute le click
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  //inverse de open
  if (modal === null) return; //si on essaye de close une modale inexistante, pas besoin d'aller plus loin
  e.preventDefault();
  modal.style.display = "none"; // on remasque la boîte modale
  modal.setAttribute("aria-hidden", "true"); //élément doit être masqué
  modal.removeAttribute("aria-modal"); //on remove le tout, aria modal et le click
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation); // on remove pour tout bien nettoyer
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
}; //empeche la propagation de l'évènement vers les parents et donc de limiter le click à l'endroit precis, pas en cliquant n'importe où

const loadModal = async function (url) {
  const target = "#" + url.split("#")[1]; //pas compris //extraction de l'id de la modale
  const existingModal = document.querySelector(target); // vérifie si la modale existe déjà dans le DOM
  if (existingModal !== null) return existingModal; // une seule modale dans le code source quelque soit le nbre de fois qu'on ouvre la modale, optimise les performance, evite la répétition
  const html = await fetch(url).then((response) => response.text());
  const element = document //pas compris
    .createRange()
    .createContextualFragment(html)
    .querySelector(target); //pas compris //recupère la modale dans le html chargé
  if (element === null)
    throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`; //en cas d'erreur
  document.body.append(element); //pas compris // ajout de la modale au DOM
  return element;
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
