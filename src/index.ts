import { findWordsWithoutCrossing } from "./finder";
import { Grid, grid } from "./consts/grid";
import { dictionary2 } from "./consts/dictionary";
import { factorial, getPermutationByRange } from "./perMut";
const displayWordGrid = (grid: string[][]): void => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i]!.join(" "));
  }
};

const coverage = (strings: string[], grid: Grid): number =>
  (strings.reduce((sum, str) => sum + str.length, 0) /
    (grid.length * grid[0]!.length)) *100;

const rangedSearch = (dictionary: string[], grid: Grid, start: number, end: number ): [number, string[], Grid] =>{
  const exampleTask = getPermutationByRange(dictionary, start, end);
  let maxCoverage = 0
  let bestWords: string[] = []
  let bestGrid: Grid = [];

  exampleTask?.forEach((permutation) => {
    let [foundGrid, foundWords] = findWordsWithoutCrossing(grid, permutation);
    const curCoverage = coverage(foundWords, grid)
    if (curCoverage > maxCoverage) {
      maxCoverage = curCoverage
      bestWords = foundWords
      bestGrid = foundGrid
    }
  })
  return [maxCoverage, bestWords, bestGrid]
}
const prettyOut = (coverage: number, words: string[], grid: Grid) => {
  console.log(`found: ${words}`)
  console.log(`coverage: ${coverage}%`)
  displayWordGrid(grid)
}

console.log('-------example-task----------')
//console.log(`max mutations: ${factorial(dictionary2.length)}`)
const [resCoverage, resWords, resGrid] = rangedSearch(dictionary2, grid, 100, 500)

prettyOut(resCoverage, resWords, resGrid)