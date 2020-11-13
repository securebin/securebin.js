import CryptoJS, { AES } from "crypto-js";
import Base from "./Base";
import _User from "./User";
import Client from "../client/Client";
import Structures from "../util/Structures";

interface PasteData {
    id: string;
    title: string;
    content: string;
    encryptedContent: string;
    decrypted: boolean;
    user: _User;
    createdAt: string;
}

class Paste extends Base {
    public id: PasteData["id"];
    public title: PasteData["title"];
    public content?: PasteData["content"];
    public encryptedContent: PasteData["encryptedContent"];
    public decrypted: PasteData["decrypted"] = false;
    public user: PasteData["user"];
    public createdAt: PasteData["createdAt"];

    constructor(client: Client, data: PasteData) {
        super(client);

        const User = Structures.get("User");

        this.id = data.id;
        this.title = data.title;
        this.encryptedContent = data.content;
        this.user = new User(client, data.user);
        this.createdAt = data.createdAt;
    }

    get createdTimestamp(): Date {
        return new Date(this.createdAt);
    }

    public decrypt(key: string): string | boolean {
        try {
            const decrypted = AES.decrypt(this.encryptedContent, key).toString(CryptoJS.enc.Utf8);

            this.content = decrypted;
            this.decrypted = true;

            return decrypted;
        } catch (error) {
            return false;
        }
    }
}

export default Paste;