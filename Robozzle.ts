// Corresponds to robozzle puzzle format.
export type Robozzle = {
  id: number,
  title: string,
  about: string,
  robotCol: number,
  robotRow: number,
  robotDir: number,
  subs: Array<number>,
  allowedCommands: number,
  board: string 
}
