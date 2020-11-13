import { AES } from "crypto-js";
import SHA256 from "crypto-js/sha256";
import BaseManager from "./BaseManager";
import * as Endpoints from "../rest/Endpoints";
import Structures from "../util/Structures";
import _Paste from "../structures/Paste";

class PasteManager extends BaseManager {
    constructor(client) {
        super(client, "Paste");
    }

    public async fetchAll(): Promise<void> {
        const response = await this.client.requestHandler.request("GET", Endpoints.PASTES, true);
        const pastes: _Paste[] = response.data.pastes;

        this.cache.clear();

        pastes.forEach((paste) => {
            this.cache.set(paste.id, paste);
        });
    }

    public async create({
        content,
        key,
        title = null
    }: {
        content: string,
        key: string,
        title?: string
    }): Promise<_Paste> {
        const Paste = Structures.get("Paste");

        const cipher = AES.encrypt(content, key).toString();
        const keyHash = SHA256(key).toString();

        const response = await this.client.requestHandler.request("POST", Endpoints.PASTES, true, {
            content: cipher,
            title,
            keyHash
        });

        const paste = new Paste(this.client, response.data.paste);

        this.cache.set(paste.id, paste);

        return paste;
    }
}

export default PasteManager;