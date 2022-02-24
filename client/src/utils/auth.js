import decode from "jwt-decode";

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();

        // Use type coersion to check if token 
        // is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // Retrieve token from localStorage
    getToken() {
        return localStorage.getItem("id_token");
    }

    // Save user token to localStorage and reload page to homepage
    login(idToken) {
        localStorage.setItem("id_token", idToken);

        window.location.assign("/develop");
    }

    // clear token from localStorage and force logout with reload
    logout() {
        localStorage.removeItem("id_token");
        window.location.assign("/");
    }
}

export default new AuthService();
