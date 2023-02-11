import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useBreedList from './useBreedList'
import Results from './Results'
import fetchSearch from './fetchSearch'
//effects happen outside of your component, do something outside of the component lifecycle


const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
    // the destructuring because usestate gives array, destructures it ahead of time to make it easy to work with 
    //onChange takes event e and runs function setlocation giving target value
    //render functions need to be fast and stateless, not have to rerender all the time
    //all hooks start with use
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    
    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    
    return (
        <div className="search-params">
        <form
            onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            //pulls data directly from browser instead of relying on state from react (uncontrolled form)
            const obj = {
                animal: formData.get("animal") ?? "",
                breed: formData.get("breed") ?? "",
                location: formData.get("location") ?? "",
            };
            setRequestParams(obj);
            }}
        >
            <label htmlFor="location">
            Location
            <input id="location" name="location" placeholder="Location" />
            </label>
    
            <label htmlFor="animal">
            Animal
            <select
                id="animal"
                name="animal"
                onChange={(e) => {
                setAnimal(e.target.value);
                }}
                onBlur={(e) => {
                setAnimal(e.target.value);
                }}
            >
                <option />
                {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                    {animal}
                </option>
                ))}
            </select>
            </label>
    
            <label htmlFor="breed">
            Breed
            <select disabled={!breeds.length} id="breed" name="breed">
                <option />
                {breeds.map((breed) => (
                <option key={breed} value={breed}>
                    {breed}
                </option>
                ))}
            </select>
            </label>
    
            <button>Submit</button>
        </form>
        <Results pets={pets} />
        </div>
    );
};

export default SearchParams;

//rules about hooks:
//have to be called in the exact same order, not within ifs or for loops 