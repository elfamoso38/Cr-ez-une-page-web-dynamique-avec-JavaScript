
//Prévisualisation de l'image
const previewImage = document.querySelector(".Filecontainer img");
const inputFile = document.querySelector(".Filecontainer input");
const labelFile = document.querySelector(".Filecontainer label");
const iconFile = document.querySelector(".Filecontainer .fa-image");
const paragrapheFile = document.querySelector(".Filecontainer p");
const modalContainer = document.querySelector(".modal-container");
const body = document.querySelector("body");
const divGallery = document.querySelector(".gallery");
const divGalleryModal = document.querySelector(".modalGallery");

//Changement au click sur l'input file
inputFile.addEventListener("change",() => {
    const file = inputFile.files[0]
    console.log(file);
    file.Accept = "image/jpg", "image/png", "image/4mo";

if (file.size < 4000000) {
if (file.type == "image/jpeg"|| file.type == "image/png") { 

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = "flex";
            labelFile.style.display = "none";
            iconFile.style.display ="none";
            paragrapheFile.style.display = "none";
        }
    reader.readAsDataURL(file);
    }

} else {
    console.log("Type d'image non autriser");
    //Création d'une alerte si le type d'image n'est pas respecté
    const FilecontainerError = document.querySelector("formError");
    if (!FilecontainerError) {
        const Filecontainer = document.querySelector(".Filecontainer");
        const alertForm = document.querySelector("p");
        alertForm.textContent = "Erreur, taille ou type d'image non respectée !";
        alertForm.style.color = "red";
        Filecontainer.insertBefore(alertForm, Filecontainer.firstChild);
    }
}

} else {
    console.log("image trop grosse");
    //Création d'une alerte si la taille d'image n'est pas respecté
    const FilecontainerError = document.querySelector("formError");
    if (!FilecontainerError) {
        const Filecontainer = document.querySelector(".Filecontainer");
        const alertForm = document.querySelector("p");
        alertForm.textContent = "Erreur, taille ou type d'image non respectée !";
        alertForm.style.color = "red";
        Filecontainer.insertBefore(alertForm, Filecontainer.firstChild);
    }
}

});

// code pour la method POST

const title = document.querySelector(".modal3 #title");
const category = document.querySelector(".modal3 #category");
const BtnValidate = document.querySelector("form .button");
const Modal2 = document.querySelector(".modal2");
const Modal3 = document.querySelector(".modal3");



BtnValidate.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", inputFile.files[0]);
    previewImage.style.display = "none";
    labelFile.style.display = "flex";
    iconFile.style.display ="flex";
    paragrapheFile.style.display = "flex";
    title.value = "";
    category.value = "";
    modalContainer.style.display = "flex";
    

//console.log(title.value,category.value,inputFile.files[0]);

    //Appel à l'API
    fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer "+ window.localStorage.getItem("myToken"),
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
       console.log("L'image a bien été ajoutée");
       modalContainer.style.display = "none";
       body.style.backgroundColor = "#FFFEF8";
       // Affichage de l'image dans la gallery
       const figureWork = document.createElement("figure");
        const imageWork = document.createElement("img");
        figureWork.dataset.workId = data.id;
        imageWork.src = data.imageUrl;
        const titleWork = document.createElement("figcaption");
        titleWork.textContent = data.title;
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
        divGallery.appendChild(figureWork);
        //Affichage de l'image dans la modale
        const figureWorkModal = document.createElement("figure");
        const imageWorkModal = document.createElement("img");
        imageWorkModal.src = data.imageUrl;
        figureWorkModal.appendChild(imageWorkModal);
        divGalleryModal.appendChild(figureWorkModal);
        const buttonTrash = document.createElement("button");
        buttonTrash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        buttonTrash.style.cursor = "pointer";
        figureWorkModal.appendChild(buttonTrash);
        buttonTrash.addEventListener("click", async function () {
            event.preventDefault();
           
            const deleteWork = await fetch(`http://localhost:5678/api/works/${data.id}`,{
                method: "DELETE",
                headers: {
                    Accept: "*/*",
                    Authorization: "Bearer "+ window.localStorage.getItem("myToken"),
                } 
            })
            console.log(deleteWork)
            if (deleteWork.ok) {
                figureWork.remove();
                figureWorkModal.remove();
                 modalContainer.style.display = "flex";
                body.style.backgroundColor = "#FFFEF8";
                console.log("Image supprimé");
            } else {
                console.log("Erreur lors de la suppression");
            }
        });


    })
    .catch(error => console.log("voici l'erreur",error));
    Modal2.style.display = "none";
});


// Condition pour le formulaire
function conditionForm() {
   const BtnValidate = document.querySelector("form .button");
   const form = document.querySelector(".modal3 form");
   form.addEventListener("input", () => {
       if (!title.value == "" && !category.value == "" && !inputFile.value == "") {
           BtnValidate.style.backgroundColor = "#1D6154";
           BtnValidate.disabled = false;
           // Si tous les champs sont rempli, le bouton est accessible

       }
       else {
           BtnValidate.style.backgroundColor = "#A7A7A7";
           BtnValidate.disabled = true;
           console.log("Veuillez remplir tout les champs");
           //si non, le bouton est désactiver
       }
   })
} 
conditionForm();
