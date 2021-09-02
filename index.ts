/* eslint-disable no-restricted-syntax */
class Sudoku {
  static blockSize = 3

  static gridSize = 9

  static gridLength = Sudoku.gridSize ** 2

  solution: number[] = []

  constructor() {
    this.create()
  }

  create() {
    this.fill()
  }

  print(arr: number[] = this.solution) {
    const { gridSize, blockSize } = Sudoku
    const N = 23
    const str = '─'.repeat(N / blockSize)

    console.log(`┌${str}┬${str}┬${str}┐`)

    for (let i = 0; i < gridSize; i += 1) {
      const n = i * gridSize

      console.log(
        [
          '│',
          ...arr.slice(0 + n, 3 + n),
          '│',
          ...arr.slice(3 + n, 6 + n),
          '│',
          ...arr.slice(6 + n, 9 + n),
          '│',
        ].join(' '),
      )

      if (i === 2 || i === 5) {
        console.log(`├${str}┼${str}┼${str}┤`)
      }
    }

    console.log(`└${str}┴${str}┴${str}┘`)
  }

  /* ---------------------------------- utils --------------------------------- */
  private static randomNums(): number[] {
    return [5, 4, 3, 8, 9, 7, 2, 1, 6]
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
  }

  private static getIndex(row: number, col: number): number {
    return row * Sudoku.gridSize + col
  }

  private static getRowIdxs(i: number): number[] {
    const { gridSize } = Sudoku
    const row = Math.floor(i / gridSize)

    const idxs = []
    for (let col = 0; col < gridSize; col += 1) {
      idxs.push(Sudoku.getIndex(row, col))
    }

    return idxs
  }

  private static getColIdxs(i: number): number[] {
    const { gridSize } = Sudoku
    const col = i % gridSize

    const idxs = []
    for (let row = 0; row < gridSize; row += 1) {
      idxs.push(Sudoku.getIndex(row, col))
    }

    return idxs
  }

  private static getBlockIdxs(i: number): number[] {
    const { gridSize, blockSize } = Sudoku
    const rowI = Math.floor(i / gridSize)
    const colI = i % gridSize
    const rowStart = Math.floor(rowI / blockSize) * blockSize
    const colStart = Math.floor(colI / blockSize) * blockSize
    const rowEnd = rowStart + blockSize
    const colEnd = colStart + blockSize

    const idxs = []
    for (let row = rowStart; row < rowEnd; row += 1) {
      for (let col = colStart; col < colEnd; col += 1) {
        idxs.push(Sudoku.getIndex(row, col))
      }
    }

    return idxs
  }

  private getValidValues(i: number): number[] {
    const nums = []

    for (let n = 1; n <= Sudoku.gridSize; n += 1) {
      if (this.isValid(i, n)) {
        nums.push(n)
      }
    }

    return nums
  }

  /* -------------------------------- valiation ------------------------------- */
  private isValidRow(i: number, n: number): boolean {
    for (const rI of Sudoku.getRowIdxs(i)) {
      if (this.solution[rI] === n) {
        return false
      }
    }

    return true
  }

  private isValidCol(i: number, n: number): boolean {
    for (const cI of Sudoku.getColIdxs(i)) {
      if (this.solution[cI] === n) {
        return false
      }
    }

    return true
  }

  private isValidBlock(i: number, n: number): boolean {
    for (const bI of Sudoku.getBlockIdxs(i)) {
      if (this.solution[bI] === n) {
        return false
      }
    }

    return true
  }

  private isValid(i: number, n: number): boolean {
    return (
      this.isValidRow(i, n) && this.isValidCol(i, n) && this.isValidBlock(i, n)
    )
  }

  /* ---------------------------------- fill ---------------------------------- */
  private fillDiagonal() {
    const blocks = [0, 30, 60].map(Sudoku.getBlockIdxs)

    for (const block of blocks) {
      const nums = Sudoku.randomNums()

      for (const i of block) {
        this.solution[i] = nums.pop()!
      }
    }
  }

  private fillBlanks(start: number = 0): boolean {
    const i = this.solution.indexOf(0, start)

    // end of the grid
    if (i === -1) {
      return true
    }

    for (const n of this.getValidValues(i)) {
      this.solution[i] = n

      if (this.fillBlanks(i + 1)) {
        return true
      }
    }

    this.solution[i] = 0
    return false
  }

  private fill() {
    this.solution = Array(Sudoku.gridLength).fill(0)
    this.fillDiagonal()
    this.fillBlanks()
  }

  /* ---------------------------------- clean --------------------------------- */
  /*
   * TODO: Try to solve, and each iteration say to next if is the same value as the
   * first solve, if all backtracking it's the same as the first and the current
   * iteration is the same as the removed value then ignore the current value and
   * continue to the next number, then return if there are another solution
   */
  private clean() {
    console.log(this.solution)
  }
}

console.time('time')
const s = new Sudoku()

// s.print()

for (let i = 0; i < 10000; i += 1) {
  s.create()
}
console.timeEnd('time')
