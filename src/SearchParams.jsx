import { useState, useEffect } from 'react'
import useBreedList from './useBreedList'
import Results from './Results'
//effects happen outside of your component, do something outside of the component lifecycle


const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
    const [location, setLocation] = useState("") //default state Seattle
    // the destructuring because usestate gives array, destructures it ahead of time to make it easy to work with 
    //onChange takes event e and runs function setlocation giving target value
    //render functions need to be fast and stateless, not have to rerender all the time
    //all hooks start with use
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([])
    const [breeds] = useBreedList(animal)

    useEffect(() => {
        requestPets()
    },[])   // eslint-disable-line react-hooks/exhaustive-deps
    //effect runs every time component is re rendered by default which would happen every time it is typed
    //if you give it an empty array of dependencies it will only call it once the first time the page is rendered
    //if you put "animal" in the empty array that means whenever animal state changes it will re run the api request 

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await res.json()

        setPets(json.pets)

    }


    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input onChange={(e) => setLocation(e.target.value)} id="location" value={location} placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select id="animal" value={animal} onChange={e => {setAnimal(e.target.value);setBreed("")}}>
                        <option></option>
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                        
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select id="breed" value={breed} disabled={breeds.length === 0} onChange={e => {setBreed(e.target.value)}}>
                        <option></option>
                        
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                        
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams

//rules about hooks:
//have to be called in the exact same order, not within ifs or for loops 