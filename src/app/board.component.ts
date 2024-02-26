// board.component.ts
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState, initialState } from '../store/reducer';
import { markO, markX, resetGame } from '../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  template: `
    <div class="board">
      <div class="row" *ngFor="let row of gameState.board; let i = index">
        <div class="square" *ngFor="let value of row; let j = index" (click)="onSquareClick(i, j)">
          {{ value }}
        </div>
      </div>
    </div>
    <div *ngIf="gameState.winner !== ''">
      <h2>Winner: {{ gameState.winner }}</h2>
      
    </div>
    <button (click)="onResetClick()">New Game</button>
  `,
  styles: [`
  :host{
        width: auto;
        display: flex;
        flex-direction: column;
        max-width: fit-content;

        button {
            margin: 1rem
        }
  }
        
    .board {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: flex;
    }
    .square {
      width: 50px;
      height: 50px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `]
})
export class BoardComponent {
  @Input() gameState: GameState = initialState;

  constructor(private store: Store) {}

  onSquareClick(row: number, col: number) {
    // Dispatch appropriate action based on the current player
    const cellValue = this.gameState.board[row][col];
    if (!cellValue && !this.gameState.gameOver) {
      if (this.gameState.currentPlayer === 'X') {
        this.store.dispatch(markX({ row, col }));
      } else {
        this.store.dispatch(markO({ row, col }));
      }
    }
  }
  
  onResetClick() {
    this.store.dispatch(resetGame());
  }
}
