import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleClick = () => {
		// Pass login parameters to make a fetch to the back end.
		actions.login(email, password);
	};

	// Every time it finds a token into the storage it will redirect to /home page
	if (store.token && store.token != "" && store.token != undefined) history.push("/");

	return (
		<div className="text-center">
			<h1>Login</h1>
			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in with: " + store.token
			) : (
				<div>
					<div className="mb-3">
						<input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div className="mb-3">
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={handleClick}>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default Login;