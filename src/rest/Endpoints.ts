import { REST_VERSION } from "../util/Constants"

export const BASE_URL = "/api/v" + REST_VERSION;
export const CLIENT_URL = "http://localhost:5000";

export const AUTHORIZE = "/auth/login";
export const LOGOUT = "/auth/logout";

export const PASTES = "/pastes";