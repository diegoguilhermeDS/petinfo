import { register } from "../../scripts/api.js";

const eventRegister = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    const buttonRegister = elements[4]

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                const listArrEmpty = elements.filter(elem => elem.value == "")

                if (listArrEmpty.length <= 1) {
                    buttonRegister.disabled = false
                }
            })
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if (element.tagName == "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }
        })

        const textInforFail = document.getElementById('text-fail')

        if (textInforFail !== null) {
            textInforFail.remove()
            const inputsAlert = document.querySelectorAll(".input-alert")

            inputsAlert.forEach((input) => {
                input.classList.remove("input-alert")
            })
        }

        await register(body, buttonRegister)
        buttonLogin.innerHTML = `
            <img class="icon-search" src="/assets/img/spinner.png" alt="icone de procura">
        `
        setTimeout(() => {
            buttonLogin.innerHTML = "Cadastrar"
        }, 3000)
    })
}

eventRegister()