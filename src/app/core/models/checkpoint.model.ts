export type Challenge =
  | { type: 'quiz'; question: string; answers: string[]; caseInsensitive?: boolean }
  | { type: 'code'; hint: string; pattern: string };


export interface Checkpoint {
  id: string;
  title: string;
  points: number;
  requires: string[];
  challenge: Challenge;
}


export interface GameConfig {
  gameId: string;
  checkpoints: Checkpoint[];
  final?: { id: string; requires: string[] };
}
