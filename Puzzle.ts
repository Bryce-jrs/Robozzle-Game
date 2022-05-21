/**
 * Corresponds to robot structure.
 */
export type Robot = {
  row: number;
  column: number;
  direction: number;
};

/**
 * Corresponds to parameter structure.
 */
export type Parameters = {
  target: number; // objective to reach.
  current: number; // current objective state.
  ref: string; // item or color for objective
};

/**
 * Corresponds to objective structure.
 */
export type Objective = {
  win: string; // win function name.
  change: string; // win function name.
  params: Parameters;
};

/**
 * Corresponds to cell structure.
 */
export type Cell = {
  indColor: number; // color index.
  indItem: number; // item index.
};

/**
 * Corresponds to puzzle format.
 */
export type Puzzle = {
  name: string;
  id: number;
  help: string;
  robot: Robot;
  subs: Array<number>; // contains number of instructions for each function.
  objectives: Array<Objective>;
  colors: Array<string>;
  items: Array<string>;
  board: Array<Array<Cell>>;
};
