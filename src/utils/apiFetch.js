export async function filterFetch(url, options) { 
    return await fetch(url, options).then(response => {
        return response.json()
    }).then(json => {
        return json.message
    })
}