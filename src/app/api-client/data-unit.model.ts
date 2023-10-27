import { DataPlayer } from "./data-player.model";

export interface DataUnit {
  location: string;
  player: DataPlayer;
  id: string;
  symbol: string;
  initial_location: string;
  captured: boolean;
  promoted: boolean;
}
