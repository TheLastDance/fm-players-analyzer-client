import { PositionsEnum } from "../types";

const { Max, ST, CD, GK, CM, WA, DM, AM, WM, FB, WB } = PositionsEnum;

export const titles = {
  [Max]: "Best position rating",
  [ST]: "Center Forward",
  [CD]: "Central Defender",
  [GK]: "Goalkeeper",
  [CM]: "Central Midfielder",
  [WA]: "Winger (Attack)",
  [DM]: "Defensive Midfielder",
  [AM]: "Attacking Midfielder",
  [WM]: "Wing Midfielder",
  [FB]: "Full-Back (Lateral)",
  [WB]: "Wing-Back (Wing Defender)",
}

export const wings = [WA, WM, FB, WB];

export const centers = [ST, CD, GK, CM, DM, AM];