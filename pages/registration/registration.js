import { register } from "../../scripts/api.js";

const eventRegister = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    const buttonLogin = elements[4]

    elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            elem.addEventListener("keydown", () => {
                const listArrEmpty = elements.filter(elem => elem.value == "")

                if (listArrEmpty.length <= 1) {
                    buttonLogin.disabled = false
                }
                console.log(listArrEmpty.length <= 1)
                
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

        await register(body)
        buttonLogin.innerHTML = `
            <img class="icon-search" src="/assets/img/spinner.png" alt="icone de procura">
        `
        setTimeout(() => {
            buttonLogin.innerHTML = "Cadastrar"
        }, 3000)
    })
}

eventRegister()