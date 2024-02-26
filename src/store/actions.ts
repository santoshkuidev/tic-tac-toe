// game.actions.ts
import { createAction, props } from '@ngrx/store';

export const markX = createAction('[Game] Mark X', props<{ row: number, col: number }>());
export const markO = createAction('[Game] Mark O', props<{ row: number, col: number }>());
export const resetGame = createAction('[Game] Reset Game');
