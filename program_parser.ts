import { Program, Instruction } from './Program';
import { Puzzle } from './Puzzle';

import { instructionFcts } from './instructions';

/**
 * Returns new instruction corresponding to the given instruction, condition and type.
 * @param instrStr string
 * @param cdt number
 * @param type number
 * @returns Instruction
 */
export function createInstruction(instrStr: string, cdt: number, type: number): Instruction {
  return {
    fct: instructionFcts[instrStr],
    condition: cdt,
    type: type
  };
}

/**
 * Returns terminal recursive list of program parsed instructions.
 * @param instructions Array<Instuctions>
 * @param program Program
 * @param fctStr Array<string>
 * @param numInst numInst
 * @param indInst number
 * @returns Array<Instructions>
 */
export function parseInstructions(instructions: Array<Instruction>, program: Program, 
  fctStr: Array<string>, numInst: number, indInst: number): Array<Instruction> {
    if (numInst <= 0) {
      return instructions;
    } else {
      const items = fctStr[indInst].split(','); // format: inst,cond OR 'func',cond,numFunc.

      switch (items[0]) {
        case 'func':
          instructions.push(createInstruction('pass', parseInt(items[1]), parseInt(items[2])));
          break;
        default:
          instructions.push(createInstruction(items[0], parseInt(items[1]), -1));
          break;
      }
      
      return parseInstructions(instructions, program, fctStr, --numInst, ++indInst);
    }
}

/**
 * Returns parsed program from program string.
 * @param strProgram string
 * @param puzzle Puzzle
 * @returns Program
 */
export function parseProgram(strProgram: string, puzzle: Puzzle): Program {
  
  /**
   * Returns terminal recursive parsed program from 'strProgram'.
   * @param strProgram string
   * @param program Program
   * @param puzzle Puzzle
   * @param indInst number
   * @param indFct number
   * @returns Program
   */
  function parseProgramRec(strProgram: string, program: Program, puzzle: Puzzle, 
    indInst: number, indFct : number): Program {
      if (indFct > puzzle.subs.length || puzzle.subs[indFct] === 0) {
        // initial function calling first program function.
        program.unshift([createInstruction('pass', -1, 1)]);
        return program;
      } else {
        // fctStr contains each instruction with conditions.
        program.push(parseInstructions([], program, strProgram.split(';'), puzzle.subs[indFct], indInst));
        return parseProgramRec(strProgram, program, puzzle, indInst+puzzle.subs[indFct], ++indFct);
      }
  }

  return parseProgramRec(strProgram, [], puzzle, 0, 0);
}
