// import { Injectable, OnInit } from '@angular/core';
// import { DataAction } from '../../api-client/action.model';
// import { DataGameState } from '../../api-client/data-game-state.model';
// import { TurnStateService } from '../../turn-state.service';
// import { DataUnit } from '../../api-client/data-unit.model';
// import { map } from './board-map.const';
// import { GameStateService } from 'src/app/game-state/game-state.service';
// import { DataBoard } from '../../api-client/data-board.model';
// import { UIUnitState } from './ui-unit-state.model';
// import { UILocationState } from './ui-location-state.model';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BoardMapService implements OnInit {

//   boardMapSubject!: Subject<Record<string, UILocationState>>;

//   constructor(private gameStateService: GameStateService, private turnStateService: TurnStateService) { }

//   ngOnInit() {

//   }

//   private fromGameState(gameState: DataGameState) {
//     this.mapUnits(gameState);
//     this.mapActionable(gameState);
//     // attackable is only available on enemy units if a unit is selected
//     // promotable is only available depending on gamestate
//     // set all units
//     // add actions to units
//   }



//   //// THIS IS THE TRANSLATION LAYER BETWEEN API AND THIS APP - HERE IS WHERE WE SHOULD IMPLEMENT GET, AND SUBSCRIBE TO THE ACITONCABLE
//   // Do other obejcts neeed to subscribe to this or can we just use the map directly with change detection?

//   private mapUnits(gameState: DataGameState) {
//     for (const location in map) {
//       const locState = map[location];
//       const unit = this.gameStateService.unitAt(gameState, location);
//       if (unit) {
//         locState.unitState.player = unit.player;
//         locState.unitState.symbol = unit.symbol;
//         locState.unitState.canSelect = this.gameStateService.canSelect(gameState, location);
//       }
//     }
//   }

//   private mapActionable(gameState: DataGameState) {
//     const selectedUnit = this.turnStateService.selectedUnit;
//     const selectedUnitActions = selectedUnit ? this.gameStateService.getAllowedActions(gameState, selectedUnit.location) ?? [] : [];
//     for (const location in map) {
//       let isActionable = false;
//       if (selectedUnitActions.some(a => a.moves.some(m => m.location === location))) {
//         isActionable = true;
//       }
//       map[location].isActionable = isActionable;
//     }
//   }
// }

// // subscribe to gamestate
// // when gamestate is updated, build board map
// //  if can promote unit, automatically select promotable unit
// // when turnstate is updated, alter board map
// //  if unit is selected, update actionable?

// // board subscribes to boardmap - or does it HAVE a boardmap that gets updated by the service with change detection used?
