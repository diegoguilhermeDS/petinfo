import { getUserInfor, getPosts } from "../../scripts/api.js";
import { getLocalStorage } from "./localstorage.js";
import { dat } from "./dates.js";

export async function modalCreate(mainModal) {
    mainModal.innerHTML = `
        <button class="close-modal close">X</button>
        <h2 class="title-3 gray-1">Criando novo post</h2>
        <form class="form-create-post">
            <div class="container-title">
                <label for="title" class="label">Título do post</label>
                <input id="title" class="input" type="text" placeholder="Digite o título aqui..." data-new-post="newPosy">
            </div>
            <div class="container-content">
                <label for="content" class="label">Conteúdo do post</label>
                <textarea class="textArea" name="content" id="content" cols="30" rows="10" placeholder="Desenvolva o conteúdo do post aqui..." data-new-post="newPosy"></textarea>
            </div>
            <div class="container-buttons-create">
                <button class="button-primary button-gray close">Cancelar</button>
                <button class="button-primary button-blue">Publicar</button>
            </div>
        </form>
    `
}

export async function modalShow(mainModal, event) {
    const idPost = event.path[2].id
    const arrPosts = await getPosts(getLocalStorage().token)
    
    arrPosts.forEach(element => {
        const {title, content, createdAt, user} = element
        const data = new Date(createdAt)

        if(element.id === idPost) {
            mainModal.innerHTML = `
                <button class="close-modal">X</button>
                <header class="header-post">
                    <div class="container-infor-post">
                        <img class="img-user-post" src="${user.avatar}" alt="">
                        <h3 class="text-2-medium gray-1">${user.username}</h3>
                        <span class="title-3 gray-6">|</span>
                        <span class="text-2-medium gray-4">${dat[data.getMonth()]} de ${data.getFullYear()}</span>
                    </div>
                    <div class="form-user-post">
                        
                    </div>
                </header>
                <article class="content-post">
                    <h3 class="title-2-semibold gray-1">${title}</h3>
                    <p class="text-1 gray-3 ">${content}</p>
                </article>
            `

            const buttonCloseModal = document.querySelector(".close-modal")
            buttonCloseModal.addEventListener("click", (e) => {
                e.preventDefault()
                e.path[2].remove()
            })
        }
    })
}

export function modalDelete(mainModal) {
    mainModal.innerHTML = `
        <button class="close-modal close">X</button>
        <h2 class="title-3 gray-1">Confirmação de exclusão</h2>
        <div class="deletion-confirmation-container">
            <h1 class="gray-1 title-2">Tem certeza que deseja excluir este post?</h1>
            <span class="gray-3 text-1">Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</span>
        </div>
        <div class="container-buttons-delete">
            <button class="button-primary button-gray close">Cancelar</button>
            <button class="button-primary button-alert" id="deleteBtn">Sim, excluir este post</button>
        </div>
    `

   
}

export function modalEdit(mainModal) {
    mainModal.innerHTML = `
        <button class="close-modal close">X</button>
        <h2 class="title-3 gray-1">Criando novo post</h2>
        <form class="form-edit-post">
            <div class="container-title">
                <label for="title" class="label">Título do post</label>
                <input id="title" class="input" type="text" placeholder="Digite o título aqui..." data-new-post="newPosy">
            </div>
            <div class="container-content">
                <label for="content" class="label">Conteúdo do post</label>
                <textarea class="textArea" name="content" id="content" cols="30" rows="10" placeholder="Desenvolva o conteúdo do post aqui..." data-new-post="newPosy"></textarea>
            </div>
            <div class="container-buttons-create">
                <button class="button-primary button-gray close">Cancelar</button>
                <button class="button-primary button-blue" id="salve-edit">Salva Alterações</button>
            </div>
        </form>
    `
}

