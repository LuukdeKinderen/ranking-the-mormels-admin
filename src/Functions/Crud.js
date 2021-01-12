import Cookies from 'universal-cookie'
import { formatedUrl } from './Formatter'

export async function Cud(question, method) {

    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    const requestOptions = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt,
        },
        body: JSON.stringify(question)
    };
    return await fetch(formatedUrl('/cud'), requestOptions)
}
