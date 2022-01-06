export function setCookie(name: string, value: string, httpOnly: boolean = false, duration: number = 0) {
    const date = new Date();

    date.setTime(duration > 0 ? duration : date.getTime() + (7 * 24 * 60 * 60 * 1000));

    const a = `${name}=${value}; expires=${date.toUTCString()}; path=/; ${httpOnly ? 'Secure; HttpOnly' : ''}`;
    document.cookie = a;
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift();
    }
}

export function deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}