import { useQuery } from "@tanstack/react-query"
import { useState, useContext} from "react"
import { useParams, useNavigate} from "react-router-dom"
import AdoptedPetContext from "./AdoptedPetContext"
import fetchPet from "./fetchPet"
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary"
import Modal from "./Modal"
//use params is a hook for grabbing url context, needs browser router working 

const Details = () => {
    const [showModal, setShowModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()
    const [_, setAdoptedPet] = useContext(AdoptedPetContext)
    const {id} = useParams()
    const results = useQuery(["details", id], fetchPet)
    //if the id is not already cached, run fetchPet

    if (results.isLoading){
        return (
            <div className="loading-pane">
                <h2 className="loader">🦜</h2>
            </div>
        )
    }

    const pet = results.data.pets[0]

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleConfirmAdoptClick = () => {
        const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber)

        if (!isValidPhoneNumber) {
            alert("Please enter a valid phone number consisting of 10 numeric characters including area code.")
            return
        }

        setAdoptedPet(pet)
        setShowModal(false)
        setShowConfirmationModal(true)
    }

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} - {pet.breed} - {pet.city} - {pet.state}</h2>
                <button onClick={()=> setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {
                    showModal ?
                    (
                        <Modal>
                            <div className="adopt-modal">
                                <h1>Would you like to meet {pet.name}?</h1>
                                <label htmlFor="Phone number">
                                If so:
                                <input
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone number here"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                                </label>
                                <div className="buttons">
                                    <button onClick ={handleConfirmAdoptClick}>Yes, please!</button>
                                    <button onClick={()=> setShowModal(false)}>No, thank you.</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
                { showConfirmationModal ? 
                (
                    <Modal>
                        <div className="adopt-modal">
                            <h1>{pet.name} will be so excited to meet you!</h1>
                            <p>Our staff will reach out to you soon to schedule a meet & greet.</p>
                            <div className="buttons">
                                <button onClick ={()=> {
                                    setShowConfirmationModal(false)
                                    navigate('/')
                                }}>Back to home page</button>
                            </div>
                        </div>
                    </Modal>
                ) : null
                }
            </div>
        </div>
    )
}

function DetailsErrorBoundary(props){
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}
export default DetailsErrorBoundary