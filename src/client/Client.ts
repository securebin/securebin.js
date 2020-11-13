import RequestHandler from "../rest/RequestHandler";
import * as Endpoints from "../rest/Endpoints";
import Structures from "../util/Structures";
import _User from "../structures/User";
import PasteManager from "../managers/PasteManager";

const User = Structures.get("User");

interface ClientOptions {
    auth: {
        username: string;
        password: string;
    }
}

class Client {
    private options: ClientOptions;

    public requestHandler: RequestHandler;

    public user: _User;
    public token: string;

    public pastes: PasteManager;

    /**
     * Represents the Securebin Client
     */
    constructor(options: ClientOptions) {
        const clientOptions: ClientOptions = {
            auth: {
                username: null,
                password: null
            }
        }

        Object.assign(clientOptions, options);

        this.options = clientOptions;

        this.requestHandler = new RequestHandler(this);
        this.pastes = new PasteManager(this);
    }

    /**
     * Authorizes the client
     */
    public async authorize() {
        const response = await this.requestHandler.request("POST", Endpoints.AUTHORIZE, false, {
            ...this.options.auth
        });

        const token = response.data.token;
        const userData = response.data.user;

        this.token = token;

        const user: _User = new User(this, userData);

        await user.pastes.fetchAll();

        this.user = user;
    }

    /**
     * Logs the client out and invalidates the session
     */
    public async logout() {
        await this.requestHandler.request("POST", Endpoints.LOGOUT, true);
    }
}

export default Client;