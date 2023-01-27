// do not need to import react because .jsx automatically does

// const Pet = (props) => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, props.name),
//         React.createElement("h2", {}, props.animal),
//         React.createElement("h2", {}, props.breed),
//         ]);
//     };

// the above and below are equivalent 

import { Link } from 'react-router-dom'
//using Link instead of a tag for link doesn't refresh and is less costly for the server

const Pet = (props) => {
    const { name, animal, breed, images, location, id } = props;

    let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
    if (images.length) {
    hero = images[0];
    }

    return (
    <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
        <img src={hero} alt={name} />
        </div>
        <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
    </Link>
    );
};

export default Pet;
