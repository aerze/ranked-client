import axios, { AxiosResponse } from "axios";
import { Match } from "../entities/Match";
import { Player } from "../entities/Player";

axios.defaults.baseURL = `https://ping-pong-rank.glitch.me/api`;

export function getPlayers() {
  console.log("getPlayers");
  return axios.get("/player");
}

export function getTopPlayers() {
  console.log("getTopPlayers");
  return axios.get("/player/top");
}

export function createPlayer(player) {
  console.log("createPlayer");
  return axios.post("/player", player);
}

export function updatePlayer(player) {
  console.log("updatePlayer");
  return axios.patch(`/player/${player._id}`, player);
}

export function deletePlayer(player) {
  console.log("deletePlayer");
  return axios.delete(`/player/${player._id}`);
}

export function getMatches() {
  console.log("getMatches");
  return axios.get("/match");
}

export function predictMatch({ id1, id2 }) {
  console.log("predictMatch");
  return axios.post("/match/predict", { id1, id2 });
}

export interface ResultBody {
  winner: string;
  loser: string;
}

export interface ResultResponse {
  match: Match;
  winner: Player;
  loser: Player;
}
export function submitMatch({ winner, loser }: ResultBody) {
  console.log("submitMatch");
  return axios.post<ResultBody, AxiosResponse<ResultResponse>>(
    "/match/submit",
    { winner, loser }
  );
}
