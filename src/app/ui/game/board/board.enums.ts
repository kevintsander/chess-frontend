export enum LocationStatus {
  None = "none",
  Selected = "selected", // unit selected, unit selected & hover action // is the current selected unit
  SelectedAction = "selected-action",
  Selectable = "selectable", // nothing selected, unit selected, unit selected & hover action // is a unit with allowed actions, but not current selected unit
  Movable = "movable", // unit selected, unit selected & hover action // the selected unit can move here
  Attackable = "attackable", // unit selected, unit selected & hover action // the selected unit can attack here
  EnPassantable = "enpassantable", // unit selected & hover action // this unit will be captured by the hovered attack location
  Promotable = "promotable", // promotable unit // this unit is promotable
  OtherCastleLocation = "other-castle-unit" // unit selected & hover action
}
