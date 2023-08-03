import { Player } from "../player/player.model";

export interface Unit {
  location: string;
  player: Player;
  id: string;
  symbol: string;
  initial_location: string;
  captured: boolean;
  promoted: boolean;
}
