import {jwtDecode} from "jwt-decode";

export const isTokenValid = (token) => {
    try {
        if (!token) return false;

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if (decoded.exp && decoded.exp < currentTime) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Invalid Token:", error);
        return false;
    }
};
