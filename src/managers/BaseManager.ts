import Client from "../client/Client";
import Structure from "../interfaces/Structure";
import Structures from "../util/Structures";

class BaseManager {
    public client: Client;
    public holds: string;
    public cache: Map<string, Structure>;

    constructor(client: Client, holds: string) {
        this.client = client;
        this.holds = holds;
        this.cache = new Map();
    }

    add(data: object, cache = true, { id, extras = [] }): object | Structure {
        const holds = Structures.get(this.holds);
        const entry = holds ? new holds(this.client, data, ...extras) : data;

        if (cache) this.cache.set(id, entry);

        return entry;
    }
}

export default BaseManager;