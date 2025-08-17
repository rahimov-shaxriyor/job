import { url } from "./url.js";

export async function getData() {
    try {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error('Xatolik bor!')
        }
        let data = await res.json()
        return data
    } catch(err) {
        console.log(err.message, + ' ' + err.status);
        
    }
}

