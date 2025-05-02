import { Api } from "./generated";

export const api = new Api({baseUrl: process.env.API_BASE_URL}).api;
