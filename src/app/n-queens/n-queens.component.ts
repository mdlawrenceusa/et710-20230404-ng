import { Component } from '@angular/core';

@Component({
  selector: 'app-n-queens',
  templateUrl: './n-queens.component.html',
  styleUrls: ['./n-queens.component.css'],
})
export class NQueensComponent {
  n: number = 8; // Default to 8 queens
  board: number[][] = []; // The N x N chess board
  solutions: number[][][] = []; // Array to hold all valid solutions

  solve(): void {
    this.board = []; // Clear the board
    this.solutions = []; // Clear the solutions array
    this.placeQueens(0, []); // Start placing queens at row 0
  }

  placeQueens(row: number, positions: number[]): void {
    if (row === this.n) {
      // If all queens are placed, add the solution to the solutions array
      this.solutions.push(this.copyBoard());
      return;
    }

    // Try to place a queen in each column of the current row
    for (let col = 0; col < this.n; col++) {
      if (this.isSafe(row, col, positions)) {
        // If the position is safe, place the queen and recurse
        positions.push(col);
        this.placeQueens(row + 1, positions);
        positions.pop(); // Backtrack by removing the queen from the last position
      }
    }
  }

  isSafe(row: number, col: number, positions: number[]): boolean {
    // Check if the current position is safe from attack by previously placed queens
    for (let i = 0; i < positions.length; i++) {
      const queenRow = i;
      const queenCol = positions[i];
      if (
        col === queenCol ||
        row - col === queenRow - queenCol ||
        row + col === queenRow + queenCol
      ) {
        return false;
      }
    }
    return true;
  }

  copyBoard(): number[][] {
    // Helper method to copy the current board state
    const copy = [];
    for (let i = 0; i < this.n; i++) {
      copy[i] = this.board[i].slice();
    }
    return copy;
  }
}
