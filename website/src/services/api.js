const { URL_API } = require("../utils/constants");

const apiServices = {

    async getUsers() {
        let url = `${URL_API}/listar.php`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.json();
    },

    async createUser(data) {
        let url = `${URL_API}/insert.php`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async eliminarUser(id) {
        let url = `${URL_API}/eliminar.php`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        });
        return response.json();
    }
}

export default apiServices;