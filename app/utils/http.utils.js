/**
 * This would be wrapper over Fetch.
 * We can be modify it for better implementation of our business logics
 */

export default class HttpService {

    static async communicate({ url, method, headers, body, resolve = http.defaultResolve,reject = http.defaultReject }) {

        const postDict = {
            headers, method
        };

        if (body) {
            postDict.body = body;
        }

        return fetch(url, { headers, body, method })
            .then((response) =>
                response.json())

            .then((response) => resolve(response))
            .catch((error) => reject(error));
    }

    /**
     * default method to pass through on each success api call
     * @param  {object} response
     */
    defaultResolve(response) {
        return response;
    }

    /**
     * default method to pass through on each failure api call
     * @param  {object} response
     */
    defaultReject(response) {
        return response;
    }
}

// constructor to use methods declared inside class
const http = new HttpService();