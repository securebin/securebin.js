import urljoin from "url-join";
import axios, { Method, AxiosRequestConfig } from "axios";
import Client from "../client/Client";
import * as Endpoints from "./Endpoints";
import SecurebinRESTError from "../errors/SecurebinRESTError";

class RequestHandler {
    private client: Client;
    private baseUrl: string;
    private clientUrl: string;

    constructor(client: Client) {
        this.client = client;
        this.baseUrl = Endpoints.BASE_URL;
        this.clientUrl = Endpoints.CLIENT_URL;
    }

    public async request(method: Method, path: string, auth: boolean, body: object = {}) {
        const _stackHolder: { stack?: any } = {};

        Error.captureStackTrace(_stackHolder);

        const requestUrl = urljoin(this.baseUrl, path);

        const options: AxiosRequestConfig = {
            method: method,
            baseURL: this.clientUrl,
            headers: {},
            url: requestUrl,
            data: body
        }

        if (auth) {
            options.headers["Authorization"] = `Bearer ${this.client.token}`;
        }

        try {
            const response = await axios.request(options);

            return response;
        } catch (error) {
            const { stack } = _stackHolder;

            let err;

            if (error.response) {
                err = new SecurebinRESTError(error.response, stack);
            } else {
                err = error;
            }

            throw err;
        }
    }
}

export default RequestHandler;