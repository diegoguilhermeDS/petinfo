/* Desenvolva seu código aqui */
import { tooltip } from "../../scripts/tooltip.js";
import { renderPosts } from "../pages/home/homepage.js";
import { getLocalStorage } from "./localstorage.js";

const baseUrl = "http://localhost:3333/"
const getToken = getLocalStorage().token

async function login(body, btn) {
    try {
        const request = await fetch(`${baseUrl}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })


        if (request.ok) {
            const response = await request.json()
            tooltip("Sucesso!", "Login Efetuado com sucesso!", "Aguarde enquanto estamos redirecionando a página.")

            localStorage.setItem("user", JSON.stringify(response))

            setTimeout(() => {
                btn.disabled = true
                location.replace("/pages/home/homepage.html")
            }, 4000)
            
        } else {
            btn.disabled = true
            tooltip("Erro!", "Algo deu errado", "Certifique-se de ter preenchido todos os dados corretamente.")

            const form = document.querySelector("form")
            const elements = [...form.elements]

            const textInforFail = document.getElementById('text-fail')

            if (textInforFail !== null){
                textInforFail.remove()
            }

            elements.forEach((element) => {
                if (element.tagName == "INPUT") {
                    element.classList.add("input-alert")



                    if (element.id == "password") {
                        

                        element.insertAdjacentHTML("afterend", "<p class='alert text-2' id='text-fail'>Email ou Senha inválido!</p>")
                    }
                }
            })

        }

    } catch (err) {
        tooltip("Erro!", "Algo deu errado!")
    }
}


async function register(body) {
    try {
        const request = await fetch(`${baseUrl}users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            tooltip("Sucesso!", "Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:", "Acessar página de login")

            setTimeout(() => {
                location.replace("/index.html")
            }, 4000)

        } else {
            tooltip("Erro!", "Algo deu errado!")
        }

    } catch (err) {
        if (location.pathname === "/index.html") {
            tooltip("Erro!", "Algo deu errado!")
        }
    }
}


async function getUserInfor() {
    try {
        const request = await fetch(`${baseUrl}users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getToken}`
            }
        })

        const response = await request.json()

        return await response
    } catch (err) {
        if (location.pathname === "/pages/home/homepage.html") {
            tooltip("Erro!", "Algo deu errado!")
        }
    }
}

if (location.pathname === "/pages/home/homepage.html") {
    getUserInfor()
}



async function getPosts() {
    try {
        const request = await fetch(`${baseUrl}posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getToken}`
            }
        })

        const response = await request.json()

        return await response
    } catch (err) {
        tooltip("Erro!", "Algo deu errado!")
    }
}


async function createPostApi(body) {
    try {
        const request = await fetch(`${baseUrl}posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getToken}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            const response = await request.json()
            
            setTimeout(() => {
                location.replace("/pages/home/homepage.html")
            }, 1000)

            return response
        }

    } catch (err) {
        tooltip("Erro!", "Algo deu errado!")
    }
}


async function deletePost(id){
    try {
        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization":`Bearer ${getToken}`
            }
        })

        if (request.ok) {
            const response = await request.json()
            
            const containerModalCurrent = document.querySelector(".container-modal")

            containerModalCurrent.remove()
            renderPosts()

            return response
        }

    } catch (err) {
        tooltip("Erro!", "Algo deu errado!")
    }
}


async function editPostApi(body, id) {
    try {
        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getToken}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            const response = await request.json()
            
            setTimeout(() => {
                location.replace("/pages/home/homepage.html")
            }, 1000)

            return response
        }

    } catch (err) {
        tooltip("Erro!", "Algo deu errado!")
    }
}


export {
    login,
    register,
    getUserInfor,
    getPosts,
    createPostApi,
    deletePost,
    editPostApi
}