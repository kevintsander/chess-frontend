import { User } from "../user.model";

export interface UserState {
  user: User | null,
  showLogin: boolean,
  setPlayerOnLogin: number | null
}
