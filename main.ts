import { parsePuzzles } from "./puzzle_parser";
import { puzzlesAreCorrect } from "./puzzle_checker";
import { robozzlePuzzles } from "./robozzle_puzzles";
// import { evaluateProgram } from "./evaluator";
import { Puzzle } from "./Puzzle";
// import { ResultProgram } from "./ResultProgram";

function generatePuzzles(): Array<Puzzle> {
  const puzzles = parsePuzzles(robozzlePuzzles);

  if (!puzzlesAreCorrect(puzzles)) {
    throw new Error("Incorrect world error");
  }

  return puzzles;
}

export function getRandomPuzzle(): Puzzle {
  const puzzles: Array<Puzzle> = generatePuzzles();
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

// export function executeProgram(puzzle: Puzzle, strProgram: string): ResultProgram {
//   return evaluateProgram(parseProgram(strProgram), puzzle);
// }