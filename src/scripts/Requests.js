import { getRequests, deleteRequest, saveCompletion, getPlumbers } from "./dataAccess.js"

const returnString = (r) => {
    let html = `
     <li>${r.description}
     <button class="request__delete"
                id="request--${r.id}">
            Delete
        </button>
        </li>`
    
     return html
}


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
            ${
                requests.map(returnString).join("")
            }
            <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${
                     plumbers.map(
                        plumber => {
                            return `<option value="${requests.id}--${plumber.id}">${plumber.name}</option>`
                        }
                    ).join("")
                }
            </select>
        </ul>`

        return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = {
                plumberId: parseInt(plumberId),
                requestId: parseInt(requestId),
                date_created: Date.now()
            }

            saveCompletion(completion)
        }
    }
)


