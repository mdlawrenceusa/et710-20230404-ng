import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-n-queens',
  template: `
    <h2>N-Queens Problem Solver</h2>
    <form>
      <label for="n">Enter N:</label>
      <input type="number" name="n" [(ngModel)]="n" required />
      <button type="submit" (click)="solve()">Solve</button>
    </form>
    <div *ngIf="solution">
      <p>Solution:</p>
      <table>
        <tr *ngFor="let row of solution">
          <td *ngFor="let col of row">{{ col === 1 ? 'Q' : '' }}</td>
        </tr>
      </table>
    </div>
  `,
})
export class NQueensComponent implements OnInit {
  n!: number;
  solution!: number[][];

  ngOnInit(): void {}

  solve(): void {
    this.solution = this.solveNQueens(this.n);
  }

  private solveNQueens(n: number): number[][] {
    const board: number[][] = [];
    for (let i = 0; i < n; i++) {
      board.push(Array(n).fill(0));
    }
    const solutions: number[][][] = [];
    this.solveRecursively(board, 0, solutions);
    return solutions[0];
  }

  private solveRecursively(
    board: number[][],
    col: number,
    solutions: number[][][]
  ): void {
    if (col >= board.length) {
      solutions.push(board.map((row) => [...row]));
      return;
    }
    for (let i = 0; i < board.length; i++) {
      if (this.isSafe(board, i, col)) {
        board[i][col] = 1;
        this.solveRecursively(board, col + 1, solutions);
        board[i][col] = 0;
      }
    }
  }

  private isSafe(board: number[][], row: number, col: number): boolean {
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 1) {
        return false;
      }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }
    for (let i = row, j = col; i < board.length && j >= 0; i++, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }
    return true;
  }
}
