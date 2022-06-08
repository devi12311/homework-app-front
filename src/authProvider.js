import { AuthProvider } from 'react-admin';
import jwt_decode from "jwt-decode";
import { BASE_URL, SIGN_IN } from "./config";

const authProvider = {
    login: (data) => {

        const request = new Request(`${BASE_URL}${SIGN_IN}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((auth) => {
            localStorage.setItem("accessToken", auth.accessToken);
            return Promise.resolve();
        }).catch((error) => {
            throw new Error("There has been an error at login")
        });

    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("accessToken");
            return Promise.reject({ redirectTo: '/login' });
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("accessToken") ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("accessToken");
        return Promise.resolve();
    },
    getIdentity: () => {
        let decode = jwt_decode(`${localStorage.getItem("accessToken")}`);
        const username = decode['username'];
        const id = decode['id'];
        return Promise.resolve({
            id,
            fullName: username
        })
    },
    getPermissions: () => {
        let decode = jwt_decode(`${localStorage.getItem("accessToken")}`);
        const id = decode['id'];
        return id ? Promise.resolve(id) : Promise.reject();
    }
};

export default authProvider;