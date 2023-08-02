import { getCookie } from 'cookies-next';


const theCookie = getCookie("accessToken");
console.log("global = " + theCookie);
export const globalData = {
    cookie: theCookie,
}