/* Desenvolva seu código aqui */
import { login } from "../../scripts/api.js";

const eventLogin = () => {
    const formLogin = document.querySelector(".forms")
    const elements = [...formLogin.elements]
    const buttonLogin = elements[2]

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                if (elements[0].value !== "" && elements[1].value !== '') {
                    buttonLogin.disabled = false
                }
            })
        }
    })

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if (element.tagName == "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }

            element.value = ''
        })

        const textInforFail = document.getElementById('text-fail')

        if (textInforFail !== null) {
            textInforFail.remove()
            const inputsAlert = document.querySelectorAll(".input-alert")

            inputsAlert.forEach((input) => {
                input.classList.remove("input-alert")
            })
        }

        await login(body, buttonLogin)
        buttonLogin.innerHTML = `
            <img class="icon-search" src="/assets/img/spinner.png" alt="icone de procura">
        `
        setTimeout(() => {
            buttonLogin.innerHTML = "Acessar"
        }, 3000)
    })
}

eventLogin()
