import { parsePuzzles } from "./puzzle_parser";
import { robozzlePuzzles } from "./robozzle_puzzles";
import { Puzzle, Params } from "./Puzzle";
import { Program, Instruction} from "./Program";

const puzzles: Array<Puzzle> = parsePuzzles(robozzlePuzzles);


function collectAll(param: Params): boolean{
  return false;
}

const win: any = {
  "collectAll": collectAll
};

//function input_program(puzzle : object) : object;
function f(puzzle: Puzzle, program: Program, finished: boolean): boolean{
  console.log("move forward");
  puzzle.robot.column++;
  return finished;
}

const moveForward: Instruction = {
  "function" : f,
  "condition" : 2,
  "type": -1
};



function conditionIsTrue(instruction: Instruction, puzzle: Puzzle): boolean{
  const col = puzzle.robot.column;
  const row = puzzle.robot.row;
  return instruction.condition === puzzle.board[row][col].indColor ||
         instruction.condition === 0;
}

function robotIsOutOfBounds(puzzle: Puzzle){
  const col = puzzle.robot.column;
  const row = puzzle.robot.row;
  return puzzle.board[row][col].indColor === 0;
}

function callFunction(instruction: Instruction,puzzle: Puzzle, finished: boolean, program: Program, tab: Array<Puzzle>, calledFunctions: number, calledInstructions: number){
  const list = program[instruction.type];
  list.forEach(element => {
    [finished,calledFunctions,calledInstructions] = evaluateInstruction(element, puzzle, finished, program, tab, calledFunctions, calledInstructions);
  });
}

function instructionIsNotSimple(instruction: Instruction): boolean{
  return instruction.type >= 0;
}

function evaluateInstruction(instruction: Instruction,puzzle: Puzzle, finished: boolean, program: Program, tab: Array<Puzzle>, calledFunctions: number, calledInstructions: number): Array<any>
{
  if (finished || calledFunctions > 50 || calledInstructions > 1000)
    return [true, calledFunctions, calledInstructions];
  if ( robotIsOutOfBounds(puzzle))
    throw new Error("Robot is out of bounds");

  if ( conditionIsTrue(instruction, puzzle) ){
    if ( instructionIsNotSimple(instruction) ){
      callFunction(instruction, puzzle, finished, program, tab, calledFunctions, calledInstructions);
      calledFunctions ++;
    }
    else{
      instruction.function(puzzle,program,finished);
      calledInstructions ++;
    }
    tab.push(puzzle);
    if( win[puzzle.objectives[0].win](puzzle.objectives[0].params) ){
      console.log("YOU WON");
      return [true, calledFunctions, calledInstructions];
    }
  }
  return [false, calledFunctions, calledInstructions];
}

// function passFunction(puzzle: Puzzle, program: Program, finished: boolean): any{
//   console.log("pass");
// }

// const pass = {
//   "function" : passFunction,
//   "condition" : 0
// };

// function createInstruction(f : (puzzle: Puzzle, program: Program, finished: boolean) => boolean, condition : number, type: number): Instruction{
//   const instruction: Instruction = {
//     "function" : f,
//     "condition" : condition,
//     "type": type
//   };
//   return instruction;
// }
//Récursivité terminale
/*
function function1(puzzle: Puzzle, program: Program, finished: boolean, tab: Array<Puzzle>){
  console.log("function 1");
  finished = evaluateInstruction(moveForward, puzzle, finished, tab);
  let f2 = createInstruction(program[1], 0);
  finished = evaluateInstruction(f2, puzzle, finished, tab);
  console.log("cc");
  finished = evaluateInstruction(pass, puzzle, finished, tab);
}

function function2(puzzle: Puzzle, program: Program, finished: boolean, tab: Array<Puzzle>){
  console.log("function 2");
  finished = evaluateInstruction(moveForward, puzzle, finished, tab);
  finished = evaluateInstruction(pass, puzzle, finished, tab);
  console.log("cc");
}*/
// [moveForward, function2, pass, pass, pass];

//const function2 = [moveForward, pass, pass, pass, pass];

const f1 : Array<Instruction> = [moveForward];
const f2 : Array<Instruction> = [moveForward];
const program: Program = [f1,f2];


function evaluate(program: Program, puzzle: Puzzle)
{
  // FAUT INCREMENTER CALLED_FUNCTIONS & CALLED_INSTRUCTIONS
  const tab : Array<Puzzle> = [puzzle];
  const calledFunctions = 0;
  const calledInstructions = 0;
  console.log(typeof tab);
  const finished = false;
//  let f1: Instruction = createInstruction(program[0], 0);
  evaluateInstruction(program[0][0], puzzle, finished, program, tab, calledFunctions, calledInstructions);
  return tab;
}



//console.log(puzzles[0]);
evaluate(program,puzzles[1]);
