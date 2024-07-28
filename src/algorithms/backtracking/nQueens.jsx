const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const isSafe = (board, row, col) => {
  const N = board.length;

  // Check this row on left side
  for (let i = 0; i < col; i++)
    if (board[row][i]) return false;

  // Check upper diagonal on left side
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;

  // Check lower diagonal on left side
  for (let i = row, j = col; j >= 0 && i < N; i++, j--)
    if (board[i][j]) return false;

  return true;
};

const nQueens = async (N, setBoard, setCurrentStep, setStepCount, setIsRunning, stopRef, speed) => {
  const solutions = [];
  const board = Array(N).fill().map(() => Array(N).fill(0));

  const solveNQueensUtil = async (col) => {
    if (stopRef.current) return false;

    if (col >= N) {
      solutions.push(board.map(row => [...row]));
      return true;
    }

    for (let i = 0; i < N; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        setBoard([...board]);
        setCurrentStep(`Placing queen at row ${i + 1}, column ${col + 1}`);
        setStepCount(prev => prev + 1);
        await sleep(speed);

        if (await solveNQueensUtil(col + 1)) {
          // If we want to find all solutions, remove this return statement
          // return true;
        }

        board[i][col] = 0;
        setBoard([...board]);
        setCurrentStep(`Backtracking: Removing queen from row ${i + 1}, column ${col + 1}`);
        setStepCount(prev => prev + 1);
        await sleep(speed);
      }
    }

    return false;
  };

  await solveNQueensUtil(0);
  setCurrentStep(`Found ${solutions.length} solution(s)`);
  return solutions;
};

export default nQueens;