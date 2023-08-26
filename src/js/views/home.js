import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	let imgUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

	useEffect(()=>{actions.getContacts();
		console.log("Running!");
	},[store.contacts.length>-1])
	
	function saveContact(obj) {
		actions.setSingle(obj);
	}
	function deleteStorage(){
		sessionStorage.removeItem('contact');
		console.log("Deleted local contact info");
	}

	return (
		<div className="container gap-2">
			{((store.contacts < 1)? (<div className="d-block text-center">
				<h3>No contacts, create one using the link below</h3>
				<Link to="/forms">
					<button className="btn btn-success" onClick={deleteStorage}>Create a contact</button>
				</Link>
			</div>):(Array.isArray(store.contacts)?(
				<ul className="list-group list-unstyled">
					{store.contacts.map((contact, index) => {
						return (
							<li key={index} className="list-group-item d-flex flex-row align-items-center justify-content-between flex-wrap p-3 gap-4">
								<div className="d-flex flex-row flex-wrap gap-4">
									<div>
										<img src={imgUrl} style={{maxWidth:"100%", maxHeight:"18vh", borderRadius:"50%", objectFit:"contain", overflow:"hidden"}}></img>
									</div>
									<ul className="list-unstyled align-self-center">
										<li><h4>{contact.full_name}</h4></li>
										<li><strong>{contact.address}</strong></li>
										<li>{contact.phone}</li>
										<li><small>{contact.email}</small></li>
									</ul>
								</div>
								<div className="d-flex flex-row align-self-start gap-4">
									<Link to={"/forms/"+`${contact.id}`}>
										<button className="btn btn-success" onClick={()=>saveContact(contact)}>Edit</button>
									</Link>
									<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
									 {/* Modal */}
									<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
										<div class="modal-header">
											<h1 class="modal-title fs-5" id="exampleModalLabel">Delete {contact.full_name}?</h1>
											<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div class="modal-body">
											Are you sure you want to delete this contact?
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											<button type="button" class="btn btn-primary" onClick={()=>actions.deleteContact(contact)} data-bs-dismiss="modal">Delete</button>
										</div>
										</div>
									</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>):null))}
		</div>
	);
	
}