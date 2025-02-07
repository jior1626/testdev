import React, { useEffect, useState } from "react";
import apiServices from "../services/api";
import "./../App.css";

function AppTest() {
	const [users, setUsers] = useState<any>([]);
	const [user, setUser] = useState({ nombre: "", email: "", edad: "" });

	const onChangeValue = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const listUser = async () => {
		let response: any = await apiServices.getUsers();
		console.log("response", response);

		setUsers(response);
	};

	useEffect(() => {
		listUser();
	}, []);

	const deleteUser = async (id: any) => {
		let response: any = await apiServices.eliminarUser(id);
		if (response.error) {
			alert("Error: " + response.error);
		} else {
			alert("Usuario eliminado correctamente");
			listUser();
		}
		// setUsers(users.filter((user: any) => user.id !== id));
	};

	const addUser = async () => {
		if (user.nombre === "" || user.email === "" || user.edad === "") {
			alert("Todos los campos son obligatorios");
			return;
		}
		let response: any = await apiServices.createUser(user);
		if (response.error) {
			alert("Error al crear el usuario");
		} else {
			alert("Usuario creado correctamente");
			console.log("response", response);
			setUser({ nombre: "", email: "", edad: "" });
			listUser();
		}
	};

	return (
		<div className="container">
			<div className="mt-2 mb-2">
				<h1 className="text-center">PRUEBA JORDAN</h1>
			</div>
			<div className="container">
				<div className="row mb-2">
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
				<div className="row mb-2">
					<div className="form-group">
						<label>email *</label>
						<input
							type="email"
							className="form-control"
							placeholder="Digitar el email"
							name="email"
							value={user.email}
							onChange={(e) => onChangeValue(e)}
						/>
					</div>
				</div>
				<div className="row mb-2">
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
				<div className="row mt-4 mb-4">
					<button
						className="btn btn-success btn-lg btn-block"
						onClick={addUser}
					>
						Guardar
					</button>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="row">
						<h3 className="text-center">Listado de personas</h3>
						<div className="col-lg-12">
							<table className="table table-condensed table-bordered table-compact ">
								<thead>
									<tr>
										<th>Nombre</th>
										<th>Correo</th>
										<th>Edad</th>
									</tr>
								</thead>
								<tbody>
									{users.length > 0 &&
										users.map((user: any) => (
											<tr key={user.id}>
												<td>{user.nombre}</td>
												<td>{user.email}</td>
												<td>{user.edad}</td>
												<td className="text-center">
													<button
														className="btn btn-xs btn-danger"
														onClick={() => deleteUser(user.id)}
													>
														Eliminar
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="container"></div>
		</div>
	);
}

export default AppTest;
