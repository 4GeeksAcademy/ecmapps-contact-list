const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts:[],
			singleContact:[],
			single:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
			setSingle: (obj)=> {
				setStore({single:obj})
				sessionStorage.setItem("contact", JSON.stringify(obj))
			},
			getContacts:async ()=>{
				const {singleContact} = getStore()
				console.log({singleContact})
				try{
					fetch('https://playground.4geeks.com/apis/fake/contact/agenda/ecmapps')
					.then(response=>{
						if(!response.ok){
							if (response.status == 404){ createUser() }
							else{ throw Error(response.status +": "+ response.statusText) }
						}
						return response.json()
					}).then(data=>{
						setStore({contacts:data})
					})
				} catch (error) {
					console.error({error})
					return
				}
			},
			getContact:async (id)=>{
				try{
					fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`)
					.then(response=>{
						if(!response.ok){
							if (response.status == 404){ throw Error("No contact associated with ID provided") }
							else{ throw Error(response.status +": "+ response.statusText) }
						}
						return response.json()
					}).then(data=>{
						console.log({data}+" Succesfully fetched from the server")
						setStore({singleContact:data})
						return data;
					})
				} catch (error) {
					console.error({error})
					return
				}
			},
			deleteContact:async (obj)=>{
				try{
					fetch(`https://playground.4geeks.com/apis/fake/contact/${obj.id}`, {
						method: 'DELETE'
					})
					.then(response=>{
						if(!response.ok){
							if (response.status == 404){ throw Error("No contact associated with ID provided") }
							else{ throw Error(response.status +": "+ response.statusText) }
						}
						return response.json()
					}).then(data=>{
						console.log({data}+" Succesfully deleted contact from server")
						setStore({contacts:data})
					})
				} catch (error) {
					console.error({error})
					return
				}
			},
			createContact: (obj) => {
				try {
					fetch(`https://playground.4geeks.com/apis/fake/contact/`,{
						method: 'POST',
						body: JSON.stringify(obj),
						headers:{
							'Content-Type':'application/json'
						}
					}).then(response=>{
						if (!response.ok){throw Error(response.status+": "+response.statusText)}
						return response.json()
					}).then(data=>{
						console.log("Success: "+data)
					})
				} catch (error) {
					console.error(error)
				}
			},
			updateContact: async (obj, id)=>{
				try {
					//Use email as contact id
					fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'PUT',
						body: JSON.stringify(obj),
						headers:{
							'Content-Type':'application/json'
						}
					}).then(response=>{
						if(!response.ok){throw Error (response.status+": "+response.statusText)}
						return response.json()
					}).then(data=>{
						console.log("Success: "+data)
					})
				} catch (error) {
					console.error(error)
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
