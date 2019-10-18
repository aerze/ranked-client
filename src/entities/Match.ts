import { Player } from "./Player";

export interface Match {
  _id: string;
  type: "SINGLE";
  status: "PENDING" | "FINAL";
  date: Date | string;
  players: Player[];
  winner: Player;
  loser: Player;
}
