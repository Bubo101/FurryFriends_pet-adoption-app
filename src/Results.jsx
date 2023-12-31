import Pet from "./Pet";

const Results = ({ pets }) => {
    return (
        <div className="search">
            {!pets.length ? (
                <h1>No Pets Have Been Found!</h1>
            ) : (
                pets.map(pet => (
                    <Pet
                        animal = {pet.animal}
                        id={pet.id}
                        name = {pet.name}
                        breed = {pet.breed}
                        images = {pet.images}
                        key = {pet.id}
                        location = {`${pet.city}, ${pet.state}`}
                    />
                ))
            )}
        </div>
    )
}

export default Results