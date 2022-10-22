import { createPostApi, deletePost, getPosts, editPostApi } from "./api.js"
import { tooltip } from "./tooltip.js"
import { modalCreate, modalEdit, modalShow, modalDelete} from "./typesModal.js"

export function setAtribute() {
    const buttons = document.querySelectorAll("button")
    buttons.forEach(btn => {
        btn.setAttribute("data-control-modal", btn.id)
    })
}

export function getButtonModalControl() {
    const buttonsControlModal = Array.from(document.querySelectorAll("[data-control-modal]"))

    buttonsControlModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            
            const keyModal = btn.getAttribute("data-control-modal")

            createModal(keyModal, e)
        })
    })
}

export function createModal(modal, event) {
    const body = document.getElementsByTagName("body")[0]

    const containerModal = document.createElement("div")
    containerModal.classList.add("container-modal")

    const mainModal = document.createElement("div")
    mainModal.classList.add("main-modal")

    createMainModal(mainModal, modal, event)

    containerModal.appendChild(mainModal)
    body.appendChild(containerModal) 

    closing()
    if (modal === "create-post") {
        createNewPost()
    } else if (modal === "delete-post") {
        deletePostEvent(event)
    } else if (modal === "edit-post") {
        editPostEvent(event)
    }
}

function createMainModal(mainModal, modal, event) {
    if (modal === "create-post") {
        modalCreate(mainModal)
    } else if (modal === "edit-post") {
        modalEdit(mainModal)
    } else if (modal === "delete-post") {
        modalDelete(mainModal, event)
    } else if (modal === "show-post") {
        modalShow(mainModal, event)
    }
}


function closing() {
    const buttonsCloseModal = document.querySelectorAll(".close")
    buttonsCloseModal.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            const listEvent = [...e.path]
            const index = listEvent.findIndex((elem) => elem.className === "container-modal")
            
            const way = e.path[index]
            way.remove()
        })
    })

    const containerModal = document.querySelector(".container-modal")

    containerModal.addEventListener("click", (e) => {
        if (e.path[0].className === "container-modal") {
            containerModal.remove()
        }
    })
}


function createNewPost() {
    const form = document.querySelector(".form-create-post")
    const elements = [...form.elements]
    console.log(elements)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const body = {}
        

        elements.forEach(element => {
            if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
                if (element.value == "") {
                    tooltip("Erro!", "Algo deu errado", "Certifique-se de ter preenchido todos os dados.")
                }
                body[element.id] = element.value
            }
        })

        if (body.title !== '' || body.content !== '') {
            createPostApi(body)
        } 
    })
}


function deletePostEvent(event) {
    const buttonDelete = document.getElementById("deleteBtn")
    const idPost = event.path[4].id
    
    buttonDelete.addEventListener("click", (e) => {
        e.preventDefault()
        
        deletePost(idPost)
    })
}


async function editPostEvent(event) {   
    const FormEdit = document.querySelector(".form-edit-post")
    const btnsFormEdit = [...FormEdit.elements]

    const posts = await getPosts()
    const PostCurrent = posts.find((post) => post.id === event.path[4].id)

    btnsFormEdit.forEach(btn => {
        if (btn.tagName == "INPUT") {
            btn.value = PostCurrent.title
        } else {
            btn.value = PostCurrent.content 
        }
    })

    FormEdit.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const body = {}

        btnsFormEdit.forEach(element => {
            if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
                if (element.value == "") {
                    tooltip("Erro!", "Algo deu errado", "Certifique-se de ter preenchido todos os dados.")
                }
                body[element.id] = element.value
            }
        })

        if (body.title !== PostCurrent.title || body.content !== PostCurrent.content) {
            editPostApi(body, PostCurrent.id)
        } else {
            tooltip("Erro!", "Nenhuma Alteração foi feita", "Caso não queira mais editar aperte no botão Cancelar.")
        }
    })
}