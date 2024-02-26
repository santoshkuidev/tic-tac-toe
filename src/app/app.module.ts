import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { gameReducer } from '../store/reducer';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BoardComponent } from './board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ game: gameReducer }) // Add your reducer to the NgRx StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
