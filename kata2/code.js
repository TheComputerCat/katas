export function createGird(height, width) {
    return {
        width: width,
        value: new Array(height * width).fill(false)
    };
}
export function setCellAsAlive(grid, row, column){
    let newGrid = structuredClone(grid);
    newGrid.value[newGrid.width * row + column] = true;
    return newGrid;
}
export function isAlive(grid, row, column){
    return grid.value[grid.width * row + column];
}
export function checkUnderpopulated(grid, row, column){
    return isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) < 2;
}
function getCoordinatesFromIndex(grid, index){
    return [Math.floor(index/grid.width), index%grid.width];
}
function countAliveNeighbors(grid, row, column){
    return getRowAliveNeighbours(grid, row, column,[-grid.width - 1, -grid.width, -grid.width + 1], row - 1)
        + getRowAliveNeighbours(grid, row, column,[ -1, 1], row) +
        getRowAliveNeighbours(grid, row, column,[grid.width - 1, grid.width, grid.width + 1], row + 1);
}
function getRowAliveNeighbours(grid, row, column, offsetsArray, expectedOffsetsRow){
    const neighbors = offsetsArray.map((offset) => offset + grid.width * row + column);
    const correctNeighbours = neighbors.filter((cellIndex) => Math.floor(cellIndex/grid.width) === expectedOffsetsRow);
    const aliveNeighbors = correctNeighbours.filter((cellIndex) => isAlive(grid, ...getCoordinatesFromIndex(grid, cellIndex)))
    return aliveNeighbors.length;
}
export function checkOvercrowding(grid, row, column){
    return isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) > 3;
}
export function checkLivesNextGeneration(grid, row, column){
    const aliveNeighbors = countAliveNeighbors(grid, row, column);
    return isAlive(grid, row, column) && (aliveNeighbors === 2 || aliveNeighbors === 3);
}
export function checkDeadCellLives(grid, row, column){
    return !isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) === 3;
}
export function calculateNextGeneration(grid){
    const width = grid.width;
    const height = grid.value.length/grid.width;
    let newGrid = createGird(height, width);
    grid.value.forEach((cell, index) => {
        newGrid = selectCase(grid, ...getCoordinatesFromIndex(grid, index), newGrid);
    });
    return newGrid;
    
}
function selectCase(grid, row, column, newGrid){
    if(checkLivesNextGeneration(grid, row, column) || checkDeadCellLives(grid, row, column)){
        return setCellAsAlive(newGrid, row, column);
    }
    return newGrid;
}