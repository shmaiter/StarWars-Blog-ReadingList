import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CharacterList from "../component/characterList.js";
import PlanetsList from "../component/planetsList";
import FavoriteList from "../component/favoriteList";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			{!store.isPending ? (
				<div>
					<div>
						<CharacterList />
						<PlanetsList />
						<FavoriteList />
					</div>
					<hr />
				</div>
			) : (
				<h2>Loading. . .</h2>
			)}
		</div>
	);
};
