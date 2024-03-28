import "./Post.js";

const myToken = window.localStorage.getItem("myToken");
console.log(myToken);
if (myToken) {
    document.getElementById("modal1").style.display = "flex";
}

//Récupération des travaux
const divCategory = document.createElement("div");
const headerSection = document.querySelector("header");
const sectionIntroduction = document.getElementById("introduction");
const sectionPortfolio = document.getElementById("portfolio");
async function getWorkAndCategories () {
    //console.log("test getWork");
    try {
        const reponseJSON = await fetch ("http://localhost:5678/api/works");
        const reponseJS = await reponseJSON.json();
        console.log(reponseJS);
        const reponseCategory = await fetch ("http://localhost:5678/api/categories");
        console.log(reponseCategory);
        const reponseJSCategory = await reponseCategory.json();
        console.log(reponseJSCategory);
        const divGallery = document.querySelector(".gallery");
        const divGalleryModal = document.querySelector(".modalGallery");

        //Création de la gallery du DOM
        reponseJS.forEach(work => {
                const figureWork = document.createElement("figure");
                const imageWork = document.createElement("img");
                figureWork.dataset.workId = work.id;
                imageWork.src = work.imageUrl;
                const titleWork = document.createElement("figcaption");
                titleWork.textContent = work.title;
                figureWork.appendChild(imageWork);
                figureWork.appendChild(titleWork);
                divGallery.appendChild(figureWork);
                //Création de la gallery dans la première modal
                const figureWorkModal = document.createElement("figure");
                const imageWorkModal = document.createElement("img");
                imageWorkModal.src = work.imageUrl;
                figureWorkModal.appendChild(imageWorkModal);
                divGalleryModal.appendChild(figureWorkModal);
                const buttonTrash = document.createElement("button");
                buttonTrash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                buttonTrash.style.cursor = "pointer";
                figureWorkModal.appendChild(buttonTrash);
                
                //code pour la method DELETE
                buttonTrash.addEventListener("click", async (event) => {
                    event.preventDefault();
                    modalContainer.style.display = "flex";
                    body.style.backgroundColor = "#FFFEF8";
                    const deleteWork = await fetch(`http://localhost:5678/api/works/${work.id}`,{
                        method: "DELETE",
                        headers: {
                            Accept: "*/*",
                            Authorization: `Bearer ${myToken}`,
                        } 
                    })
                    console.log(deleteWork)
                    if (deleteWork.ok) {
                        figureWork.remove();
                        figureWorkModal.remove();
                        console.log("Image supprimé");
                    } else {
                        console.log("Erreur lors de la suppression");
                    }
                });
        });
        
        // Affichage de la page mode édition en supprimant les boutons filtre
        divCategory.classList.add = "divCategory";
        sectionPortfolio.appendChild(divCategory);
        divCategory.style.display = "flex";
        divCategory.style.marginInline = "260px";
        const myToken = window.localStorage.getItem("myToken");
        console.log(myToken);
        if (myToken) {
        divCategory.style.display = "none";
        btnModifier.style.display = "inline-flex";
    };
        
    // Création des boutons filtre par catégories
        reponseJSCategory.forEach((category, index) => {
            const workCategory = document.createElement("input");
            workCategory.setAttribute("Type", "submit");
            workCategory.id = `categoryButton_${index}`
            workCategory.value = category.name;
            sectionPortfolio.appendChild(divCategory);
            sectionPortfolio.appendChild(workCategory);

            divCategory.appendChild(workCategory);
            sectionPortfolio.insertBefore(divCategory, divGallery);
            workCategory.addEventListener("click", function(){
                // Récupération de l'id de la catégorie
                const categoryId = category.id;
                //suppression de la galerie
                divGallery.innerHTML = "";
                
                //filtrage des travaux par catégorie
                reponseJS.forEach(work => {
                    if (work.categoryId === categoryId) {
                        const figureWork = document.createElement("figure");
                        const imageWork = document.createElement("img");
                        imageWork.src = work.imageUrl;
                        const titleWork = document.createElement("figcaption");
                        titleWork.textContent = work.title;
                        figureWork.appendChild(imageWork);
                        figureWork.appendChild(titleWork);
                        divGallery.appendChild(figureWork);
                    }
                })
            })
        });

        //bouton pour afficher tout les travaux
        const resetFilter = document.createElement("input");

        resetFilter.setAttribute("Type", "submit");
        resetFilter.defaultValue = "Tous";
        resetFilter.autofocus = "Tous";
        divCategory.appendChild(resetFilter);
        //sectionPortfolio.insertBefore(resetFilter, divGallery);
        resetFilter.addEventListener("click", function(){
            divGallery.innerHTML = "";
            reponseJS.forEach(work => {
                    const figureWork = document.createElement("figure");
                    const imageWork = document.createElement("img");
                    imageWork.src = work.imageUrl;
                    const titleWork = document.createElement("figcaption");
                    titleWork.textContent = work.title;
                    figureWork.appendChild(imageWork);
                    figureWork.appendChild(titleWork);
                    divGallery.appendChild(figureWork);
            });
        });
    }
    catch (error){
        console.log(error, "erreur")
    };
};
getWorkAndCategories();

// affichage de la modal au click
const ButtonAdd = document.getElementById("ajouter-photo");
const Modal2 = document.querySelector(".modal2");
const Modal3 = document.querySelector(".modal3");
const modalContainer = document.querySelector(".modal-container");
const xMark = document.querySelector(".fa-xmark");
const arrowLeft = document.querySelector(".fa-arrow-left");
const btnModifier = document.getElementById("button-modifier");
btnModifier.style.display = "none";
const body = document.querySelector("body");
const previewImage = document.querySelector(".Filecontainer img");
const labelFile = document.querySelector(".Filecontainer label");
const iconFile = document.querySelector(".Filecontainer .fa-image");
const paragrapheFile = document.querySelector(".Filecontainer p");
const title = document.querySelector(".modal3 #title");
const category = document.querySelector(".modal3 #category");


btnModifier.addEventListener("click", () => {
    console.log("btnModifier");
    modalContainer.style.display = "flex";
    body.style.backgroundColor = "rgba(128, 128, 128, 0.347)";
});

xMark.addEventListener("click", () => {
    console.log("xMark");
    modalContainer.style.display = "none";
    body.style.backgroundColor = "#FFFEF8";
});

ButtonAdd.addEventListener("click", () => {
    console.log("ButtonAdd");
    Modal3.style.display = "flex";
    Modal2.style.display = "none";
});

arrowLeft.addEventListener("click", () => {
    Modal3.style.display = "none";
    Modal2.style.display = "flex";
    // réinitialisation des champs du formulaire
    title.value = "";
    category.value = "";
    previewImage.style.display = "none";
    labelFile.style.display = "flex";
    iconFile.style.display ="flex";
    paragrapheFile.style.display = "flex";
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("fa-xmark")) {
        modalContainer.style.display = "none";
        body.style.backgroundColor = "#FFFEF8";
    }
});
