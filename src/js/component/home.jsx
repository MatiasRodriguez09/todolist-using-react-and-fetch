import React, {useState, useEffect} from "react";


const Home = () => {

	
	const [tarea,setTarea] = useState("");
	const [list,setList] = useState([]);

	const borrarTarea = (indexItem) => {
		setList((prevState) =>
		  prevState.filter((listItems, index) => index !== indexItem)
		);
	  };
	  

	function agregarTarea(e) {
		e.preventDefault()
		setList(list.concat({label: tarea, done: false}))
		setTarea("")
	}


	function crearUsuario(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/mrl`,
		{method: 'POST', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify([])
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	function obtenerLista(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/mrl`,
		{method: 'GET', 
		
	  })
		.then((response)=>response.json())
		.then((data)=>setList(data))
	}

	function borrarLista(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/mrl`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data.result)
			if (data.result === "ok"){
				setList([])
			}
		})
		
	}

	function actualizar(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/mrl`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(list)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}



	useEffect (()=>{
		crearUsuario();
		obtenerLista()
	},[])

	useEffect (()=>{
		actualizar()
		},[list])

	return (
		<>
		<div className="card container d-flex bg-light mt-3 md-w50">
		<h2 className="titulo m-auto p-2">To Do List.</h2>
  			<div className="card-body">
  				<input type="text" className="input m-1 w-75" value={tarea} id="exampleInput" aria-describedby="inputHelp" onChange={(e)=>{setTarea(e.target.value)}} placeholder="Añadir una tarea."/>
				<button type="submit" className="btn btn-primary btn-sm"  onClick={agregarTarea}>Agregar tarea</button>
  			</div>
			<div className="to-do-list d-flex">
			  <ul>{list.map((item, index) => (
        <li key={index}>
          {item.label}
          <button className="btn" onClick={() => borrarTarea(index)}>
            <i className="fas fa-trash-alt" />
          </button>
        </li>
      ))}</ul>
			</div>
			<div className="delete-list d-flex justify-content-center mt-3 md-w50 mb-2">
			<button type="submit" className="btn btn-danger btn-sm" onClick={borrarLista}>Borrar lista</button>
			</div>
		</div>
		
		</>
	);
};

export default Home;