import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers } from "./dataAccess.js"
import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"



export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)