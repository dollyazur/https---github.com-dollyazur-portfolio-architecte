let modal = null; //permet de savoir quelle est la boite modale actuellement open
const focusableSelector = "button, a, input, textarea"; //toutes les choses que va "viser" le Tab
let focusables = []; //le tableau ou l'on stocke les focusables

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
  focusables = Array.from(modal.querySelectorAll(focusableSelector)); //on récupère tout les élément du focusableSelector, mais on veux work with tableau donc un array.from sinon ca renvoie du node

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

const focusInModal = function (e) {
  e.preventDefault();
  //pour passer d'un element à l'autre avec le tab, on cherche l'index dans le tableau
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  console.log(index); // ca marche
  // enleve un cran avec le tab shift
  if (e.shifKey === true) {
    index--;
  } else {
    index++;
  }

  //on rajoute ou on enlève un cran et on utilise la taille totale pour revnir à zero une fois au bout comme le carousel

  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

const loadModal = async function (url) {
  const html = await fetch(url).then((response) => response.text());
  console.log(html);
  //a revoir et a remplir
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  //ecouter la pression sur une touche du clavier pour ceux qui naviguent au clavier
  if (e.key === "Escape" || e.key === "Esc") {
    //l'un ou || l'autre selon les navigateurs
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    //on enferme le focus de l'utilisateur dans la boite modale
    focusInModal(e);
  }
});

//notion d'accessibilité importante, accès au clavier, lecteur d'écran
//ajouter une croix pour fermer, fonction ajouter de la modale
