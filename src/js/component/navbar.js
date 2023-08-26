import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {actions} = useContext(Context)
	let location = useLocation()

	function deleteStorage(){
		sessionStorage.removeItem('contact');
		console.log("Deleted local contact info");
	}

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-2">
			<Link to="/" style={{textDecoration:"none"}}>
				<span className="navbar-brand mb-0 h1">Contact List</span>
			</Link>
			{/* Adding conditional display of the create contact button to only when path is home */}
			{location.pathname == '/' && 
			<div className="ml-auto">
				<Link to="/forms">
					<button className="btn btn-success" onClick={deleteStorage}>Add new contact</button>
				</Link>
			</div>
			}
		</nav>
	);
};
