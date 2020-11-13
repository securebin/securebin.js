import Base from "./Base";
import Client from "../client/Client";
import PasteManager from "../managers/PasteManager";

interface UserData {
    id: string;
    username: string;
    createdAt: string;
    pastes: PasteManager;
}

class User extends Base {
    public id: UserData["id"];
    public username: UserData["username"];
    public createdAt: UserData["createdAt"];
    public pastes: UserData["pastes"];

    constructor(client: Client, data: UserData) {
        super(client);

        this.id = data.id;
        this.username = data.username;
        this.createdAt = data.createdAt;

        this.pastes = new PasteManager(client);
    }

    get createdTimestamp(): Date {
        return new Date(this.createdAt);
    }
}

export default User;