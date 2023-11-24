import { createFeatureSelector } from "@ngrx/store";
import { BoardUserState } from "./board-user.state";

export const selectBoardUser = createFeatureSelector<BoardUserState>('boardUser');
