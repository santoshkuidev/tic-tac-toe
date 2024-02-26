import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { GameState, gameReducer, initialState } from '../store/reducer';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule, select } from '@ngrx/store';
import { resetGame } from '../store/actions';
import { selectGameState } from '../store/selectos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  gameState:GameState;

  constructor(private store:Store){
    this.gameState = {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentPlayer: 'X',
      winner: '',
      gameOver: false
    };
  }

  ngOnInit(): void {
    this.store.dispatch(resetGame()); // Dispatch resetGame action with initial state
    this.store.pipe(select(selectGameState)).subscribe((state) => {
      this.gameState = state;
    });
  
  }
}
