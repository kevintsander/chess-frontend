import { createFeatureSelector } from "@ngrx/store";
import { BoardUserState } from "./board-user.state";

export const selectUserBoard = createFeatureSelector<BoardUserState>('boardUser');
