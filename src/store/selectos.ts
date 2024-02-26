import { createFeatureSelector } from '@ngrx/store';
import { GameState } from './reducer';

// Selector to get the game state
export const selectGameState = createFeatureSelector<GameState>('game');
