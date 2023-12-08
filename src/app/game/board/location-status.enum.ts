export enum LocationStatus {
  None,
  Selected, // unit selected, unit selected & hover action // is the current selected unit
  SelectedAction,
  Selectable, // nothing selected, unit selected, unit selected & hover action // is a unit with allowed actions, but not current selected unit
  Movable, // unit selected, unit selected & hover action // the selected unit can move here
  Attackable, // unit selected, unit selected & hover action // the selected unit can attack here
  EnPassantable, // unit selected & hover action // this unit will be captured by the hovered attack location
  Promotable, // promotable unit // this unit is promotable
  OtherCastleLocation // unit selected & hover action
}
