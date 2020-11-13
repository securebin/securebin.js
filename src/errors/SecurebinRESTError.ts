import { AxiosResponse } from "axios";

class SecurebinRESTError extends Error {
    private code: number;

    constructor(response: AxiosResponse<any>, stack) {
        super();

        this.code = response.status || -1;

        const message = response.data?.error || "Unknown error";

        this.message = message;

        if (stack) {
            this.stack = this.name + ": " + this.message + "\n" + stack;
        } else {
            Error.captureStackTrace(this, SecurebinRESTError);
        }
    }

    get name() {
        return `${this.constructor.name} [${this.code}]`
    }
}

export default SecurebinRESTError;