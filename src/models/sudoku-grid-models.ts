// Imports.

export type IInputMode = "setup" | "solve" | "pencil";

export type IBackgroundColor = "bg-white"
  | "bg-sky-200"
  | "bg-rose-200"
  | "bg-lime-200"
  | "bg-amber-200"
  | "bg-violet-200"
  | "bg-cyan-200"
  | "bg-slate-300";

export interface IDigitCount {
  count: number;
  problem: boolean;
}
