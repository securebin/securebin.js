import Client from "../client/Client";

class Base {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }
}

export default Base;