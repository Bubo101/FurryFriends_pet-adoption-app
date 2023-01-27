import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import fetchPet from "./fetchPet"
//use params is a hook for grabbing url context, needs browser router working 

const Details = () => {
    const {id} = useParams()
    const results = useQuery(["details", id], fetchPet)
    //if the id is not already cached, run fetchPet

    if (results.isLoading){
        return (
            <div className="loading-pane">
                <h2 className="loader">🐋</h2>
            </div>
        )
    }

    const pet = results.data.pets[0]
    return (
        <div className="details">
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city} - {pet.state}</h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>
            </div>
        </div>
    )
}

export default Details