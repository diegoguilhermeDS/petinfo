import { getLocalStorage } from "../../scripts/localstorage.js";
import { getUserInfor, getPosts } from "../../scripts/api.js";
import { setAtribute, getButtonModalControl } from "../../scripts/modal.js";
import { dat } from "../../scripts/dates.js";


const verifyPermission = () => {
    const user = getLocalStorage()

    if (user == "") {
        location.replace("/index.html")
    }
}


const getToken = getLocalStorage().token
const getUser = await getUserInfor(getToken)


async function renderProfile(user) {
    const {id, username, avatar} = user
    
    const divUser = document.querySelector(".login-user")
    
    divUser.innerHTML = `
        <div class="profile" id="${id}">
            <img src="${avatar}" alt="">
        </div>
        <div class="modal-user">
            <h3 class="text-1-medium userName gray-1">@${username}</h3>
            <div class="logout" id="logout" >
                <img src="/assets/img/sign-out-alt.png" alt="">
                <span class="text-2-medium gray-1">Sair da conta</span>
            </div>
        </div>
    `
}


async function renderPosts() {
    const listPosts = document.querySelector(".list-posts")
    listPosts.innerHTML = ''
    const arrPosts = await getPosts()

    arrPosts.forEach((element) => {
        const {id, title,content, user, createdAt} = element
        let data = new Date(createdAt)

        const post = document.createElement("li")
        post.classList.add("post")
        post.id = id

        post.innerHTML = `
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
                <p class="text-1 gray-3 " id='container-text'>${content}</p>
                <button class="button-acessar-post  text-1-medium brand button-modal" id="show-post">Acessar publicação</button>
            </article>
        `
        
        listPosts.appendChild(post)

        const userCurentId = getUser.id
        if (user.id === userCurentId) {
            const divForm = document.getElementById(id).children[0].children[1]
            divForm.innerHTML = `
            <form class="form-post">
                <button class="button-second button-white button-modal" id="edit-post">Editar</button>
                <button class="button-second button-gray button-modal" id="delete-post">Excluir</button>
            </form>
            `
        }
    })

    const textContainer = Array.from(document.querySelectorAll("#container-text"))

    textContainer.forEach((element) => {
        const text = element.innerText
        element.innerText = `${text.substring(0, 145)}...`
    })

    setAtribute()
    getButtonModalControl()
}


function renderPage(user, ) {
    renderProfile(user)
    renderPosts() 
}


async function logoutHomePage() {
    localStorage.setItem("user", JSON.stringify(""))
    location.replace("/index.html")   
}


if (location.pathname === "/pages/home/homepage.html") {
    renderPage(getUser)

    const logoutDiv = document.querySelector(".logout")
    logoutDiv.addEventListener("click", () => {
        setTimeout(() => {
            logoutHomePage()
        }, 1500)
    })

    verifyPermission()
}



export {
    renderPosts
}