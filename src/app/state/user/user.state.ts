import { User } from "../../user/user.model";

export interface UserState {
    user: User | null,
    showLogin: boolean,
    showSignUp: boolean,
    setPlayerOnLogin: number | null
}
