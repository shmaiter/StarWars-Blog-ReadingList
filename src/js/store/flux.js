import jwt_decode from "jwt-decode";
// $ npm install jwt-decode

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			people: [],
			planets: [],
			favorites: [],
			isPending: true,
			error: null,
			url: "https://3000-pink-alpaca-gwk8o5kp.ws-us03.gitpod.io"
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");
				console.log("Application jus loaded, synching the session storage token");
				if (token && token != "" && token != undefined) setStore({ token: token });
				console.log("current token on SYNC: ", store.token);
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Loging out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				const store = getStore();

				try {
					// Await for the fetch

					const resp = await fetch(`${store.url}/token`, opts);
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					// Await for the response
					const data = await resp.json();
					console.log("This came from the backend", data);
					// Setting into the persistent storage
					sessionStorage.setItem("token", data);
					//console.log(sessionStorage.getItem("token"));
					setStore({ token: data });
					return true;
				} catch {
					console.error("There has been an error login in");
				}
			},

			getPeople: () => {
				const store = getStore();
				fetch(`${store.url}/characters`)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for that resource");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, CHARACTERS: ", data);
						setStore({ people: data, isPending: false, error: null });
					})
					.catch(err => {
						console.error(err.message);
						setStore({ people: [], isPending: true, error: true });
					});
			},
			getPlanets: () => {
				const store = getStore();
				fetch(`${store.url}/planets`)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for that resource");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, PLANETS: ", data);
						setStore({ planets: data, isPending: false, error: null });
					})
					.catch(err => {
						console.error(err.message);
						setStore({ planets: [], isPending: true, error: true });
					});
			},
			getFavorites: () => {
				const store = getStore();
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					}
				};
				console.log("current token on GET FAV: ", store.token);

				fetch(`${store.url}/favorites`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for FAVORITES RESOURSE");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, FAVORITES: ", data);
						setStore({ favorites: data });
					})
					.catch(err => {
						console.error(err.message);
						setStore({ favorites: [] });
					});
			},
			deleteFavorite: index => {
				const store = getStore();
				let newFavorites = store.favorites.filter((_, favIndex) => favIndex !== index);
				setStore({ favorites: newFavorites });
			}
		}
	};
};

export default getState;
