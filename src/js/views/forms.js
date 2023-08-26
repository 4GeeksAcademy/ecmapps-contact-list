import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Forms = props => {
	const {store, actions} = useContext(Context);
	useEffect(()=>{
		editContact();
	},[])

	function addUser(){
		let name = document.getElementById("fullNameInput").value
		let email = document.getElementById("emailInput").value
		let phone = document.getElementById("phoneInput").value
		let address = document.getElementById("addressInput").value
		let obj = {
			"full_name": name,
			"email": email,
			"agenda_slug": "ecmapps",
			"address": address,
			"phone": phone
		}
		console.log(obj)
		if (!JSON.parse(sessionStorage.getItem('contact'))){actions.createContact(obj);}
		else {actions.updateContact(obj, JSON.parse(sessionStorage.getItem('contact')).id)}
		actions.getContacts()
		sessionStorage.removeItem('contact');
	}

	async function editContact(){
		if (!JSON.parse(sessionStorage.getItem('contact'))) {
			document.getElementById('header').innerHTML = "Add a contact"
			document.getElementById('saveButton').innerHTML = "save";
			document.getElementById('fullNameInput').value = ''
			document.getElementById('emailInput').value = ''
			document.getElementById('phoneInput').value = ''
			document.getElementById('addressInput').value = ''
			return;
		}
		let currentContact = JSON.parse(sessionStorage.getItem('contact'))
		console.log(currentContact);
		document.getElementById('header').innerHTML = "Edit contact"
		document.getElementById('saveButton').innerHTML = "Update contact"
		document.getElementById('fullNameInput').value = currentContact.full_name
		document.getElementById('emailInput').value = currentContact.email
		document.getElementById('phoneInput').value = currentContact.phone
		document.getElementById('addressInput').value = currentContact.address
	}

	return (
	<div className="container w-50">
		<h1 className="text-center align-self-center" id="header">Add a new contact</h1>
		<form>
			<div className="mb-3">
				<label className="form-label m-0" for="fullNameInput">Full Name</label>
				<input type="text" className="form-control" id="fullNameInput" placeholder="Full Name"></input>
			</div>
			<div className="mb-3">
				<label className="form-label m-0" for="emailInput">Email</label>
				<input type="email" className="form-control" id="emailInput" placeholder="Enter Email"></input>
			</div>
			<div className="mb-3">
				<label className="form-label m-0" for="phoneInput">Phone</label>
				<input type="text" className="form-control" id="phoneInput" placeholder="Enter phone"></input>
			</div>
			<div className="mb-3">
				<label className="form-label m-0" for="addressInput">Address</label>
				<input type="text" className="form-control" id="addressInput" placeholder="Enter address"></input>
			</div>
			<div>
				<Link to={'/'}>
					<button type="button" onClick={addUser} className="btn btn-primary btn-block w-100" id="saveButton">save</button>
				</Link>
			</div>
			<Link to="/">
				<a><small>or get back to contacts</small></a>
			</Link>
		</form>
	</div>
	);
}

