export function createGird(height, width) {
    const newGrid = {
        width: width,
        value: new Array(height * width).fill(false)
    };
    return newGrid;
}
export function setCellAsAlive(grid, row, column){
    let newGrid = structuredClone(grid);
    newGrid.value[newGrid.width * row + column] = true;
    return newGrid;
}
export function setCellAsDead(grid, row, column){
    let newGrid = structuredClone(grid);
    newGrid.value[newGrid.width * row + column] = false;
    return newGrid;
}
export function isAlive(grid, row, column){
    return grid.value[grid.width * row + column];
}
export function checkUnderpopulated(grid, row, column){
    if(isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) < 2){
        return true;
    }
    return false;
}
function countAliveNeighbors(grid, row, column){
    const getIndexFromOffset = (offset) => offset + grid.width * row + column;
    const neighborUp = [-grid.width - 1, -grid.width, -grid.width + 1].map(getIndexFromOffset);
    const neighborMiddel = [ -1, 1].map(getIndexFromOffset);
    const neighborBottom = [grid.width - 1, grid.width, grid.width + 1].map(getIndexFromOffset);

    const aliveNeighborUp = neighborUp.filter((cellIndex) => Math.floor(cellIndex/grid.width) === row - 1);
    const aliveNeighborMiddel = neighborMiddel.filter((cellIndex) => Math.floor(cellIndex/grid.width) === row);
    const aliveNeighborBottom = neighborBottom.filter((cellIndex) => Math.floor(cellIndex/grid.width) === row + 1);

    const neighbors = aliveNeighborUp.concat(aliveNeighborMiddel, aliveNeighborBottom);

    const aliveNeighbors = neighbors.filter((neighbor) => isAlive(grid, Math.floor(neighbor/grid.width), neighbor%grid.width));
    return aliveNeighbors.length;
}
export function checkOvercrowding(grid, row, column){
    if(isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) > 3){
        return true;
    }
    return false;
}
export function checkLivesNextGeneration(grid, row, column){
    const aliveNeighbors = countAliveNeighbors(grid, row, column);
    if(isAlive(grid, row, column) && (aliveNeighbors == 2 || aliveNeighbors == 3)){
        return true;
    }
    return false;
}
export function checkDeadCellLives(grid, row, column){
    if(!isAlive(grid, row, column) && countAliveNeighbors(grid, row, column) === 3){
        return true;
    }
    return false;
}
export function calculateNextGeneration(grid){
    const width = grid.width;
    const height = grid.value.length/grid.width;
    let newGrid = createGird(height, width);
    grid.value.forEach((cell, index) => {
        newGrid = selectCase(grid, Math.floor(index/width), index%width, newGrid);
    });
    return newGrid;
    
}
function selectCase(grid, row, column, newGrid){
    if(checkLivesNextGeneration(grid, row, column) || checkDeadCellLives(grid, row, column)){
        return setCellAsAlive(newGrid, row, column);
    }
    return newGrid;
}