import Cookies from 'universal-cookie'

export async function CreateOrUpdate(question) {

    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    var method = question.id === undefined ? 'POST' : 'PUT'

    const requestOptions = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt,
        },
        body: JSON.stringify(question)
    };
    return await fetch(`${process.env.REACT_APP_QUESTION_DOMAIN}/cud`, requestOptions)
}

export async function remove(question) {

    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "  + jwt,
        },
        body: JSON.stringify(question)
    };
    return await fetch(`${process.env.REACT_APP_QUESTION_DOMAIN}/cud`, requestOptions)
}
