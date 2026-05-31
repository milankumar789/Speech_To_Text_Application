export const saveToken = (token) => {
    localStorage.setItem(
        "token",
        token
    );
};

export const getToken = () => {
    return localStorage.getItem(
        "token"
    );
};

export const removeToken = () => {
    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "email"
    );
};

export const saveEmail = (email) => {
    localStorage.setItem(
        "email",
        email
    );
};

export const getEmail = () => {
    return localStorage.getItem(
        "email"
    );
};