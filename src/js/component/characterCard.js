import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const CharacterCard = ({ character, id }) => {
	const { store, actions } = useContext(Context);

	let favoriteNameArray = store.favorites.map(obj => obj.id); // turn favorites object into name array because includes method only works with arrays
	let isFavorite = favoriteNameArray.includes(character.id);

	return (
		<div className="card mr-3 mb-3">
			<img src="http://www.fpoimg.com/400x200?width=400&height=200" className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{character.name}</h5>
				<p className="card-text">Gender: {character.gender}</p>
				<p className="card-text">Hair Color: {character.hair_color} </p>
				<p className="card-text">Eye Color: {character.eye_color} </p>
				<div className="d-flex justify-content-between">
					<Link to={"/people/" + id}>
						<button className="btn btn-primary">Learn more!</button>
					</Link>
					<div>
						<button className="btn btn-outline-warning" onClick={() => actions.addFavorite(character)}>
							<i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

CharacterCard.propTypes = {
	character: PropTypes.shape({
		name: PropTypes.string,
		gender: PropTypes.string,
		hair_color: PropTypes.string,
		eye_color: PropTypes.string
	}),
	id: PropTypes.number
};

export default CharacterCard;
