
/**
 * Http methods allowed.
 */
const enum Method {
    Get = "GET",
    Post = "POST",
    Patch = "PATCH",
    Delete = "DELETE",
};

/**
 * Base function that forms and launches requests to the backend
 * @param url string that represents an endpoint.
 * @param method GET by default. Represents the HTTP method needed on request. 
 * @param payload JSON content or null. 
 * @returns 
 */
async function callService(url: string, method: Method = Method.Get, payload: any | null = null) {

    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'api': process.env.REACT_APP_API_KEY || '',
	        'Access-Control-Allow-Origin': '*',
        	
        },
        body: payload !== null ? JSON.stringify(payload) : null,
    })
    .then((response) => {
        if(response.status == 200 || response.status == 201) {
            return response.json();
        }
        return null
    });

    return response;
}

export { callService, Method };
