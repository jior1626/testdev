import React, { useEffect, useState } from "react";
import apiServices from "../services/api";

import "./../App.css";

const AppTest: React.FC = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({ nombre: "", correo: "", edad: "" });

	const onChangeValue = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const listUser = () => {
		let response: any = apiServices.getUsers();
		setUsers(response.data);
	};

	useEffect(() => {
		listUser();
	}, []);

	const deleteUser = (id: any) => {
		let response: any = apiServices.eliminarUser(id);
		setUsers(users.filter((user: any) => user.id !== id));
	};

	const addUser = () => {
		if (user.nombre === "" || user.correo === "" || user.edad === "") {
			alert("Todos los campos son obligatorios");
			return;
		}
		let response: any = apiServices.createUser(user);
		setUser({ nombre: "", correo: "", edad: "" });
		listUser();
	};

	return (
		<>
			<div>
				<h1>PRUEBA JORDAN</h1>
			</div>
			<ul>
				<div className="container">
					<div className="row">
						<div className="form-group">
							<label>Nombre de la persona *</label>
							<input
								type="text"
								className="form-control"
								name="nombre"
								placeholder="Digitar el nombre"
								value={user.nombre}
								onChange={(e) => onChangeValue(e)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group">
							<label>Correo *</label>
							<input
								type="email"
								className="form-control"
								placeholder="Digitar el correo"
								name="correo"
								value={user.correo}
								onChange={(e) => onChangeValue(e)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group">
							<label>Edad *</label>
							<input
								type="number"
								className="form-control"
								placeholder="Digitar la edad"
								name="edad"
								value={user.edad}
								onChange={(e) => onChangeValue(e)}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<button className="btn btn-success center" onClick={addUser}>
							Guardar
						</button>
					</div>
				</div>
				{users.map((user: any) => (
					<li key={user.id}>
						{user.name} - {user.email} - {user.edad}
						<div>
							<button
								className="btn btn-xs btn-danger"
								onClick={() => deleteUser(user.id)}
							>
								Eliminar
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default AppTest;
