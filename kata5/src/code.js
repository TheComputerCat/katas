function calculateNewOrientation(side, currentDirection) {
  return getPossiblesTurningDirection(currentDirection)[side];
}

function getPossiblesTurningDirection(currentDirection) {
  for (index of [0, 1, 2, 3]) {
    if (getCoordinateInPosition(index) === currentDirection)
      return {
        "L": getCoordinateInPosition(index - 1), 
        "R": getCoordinateInPosition(index + 1)
      };
  }
}

function getCoordinateInPosition(index) {
  return ['N', 'E', 'S', 'W'][((index % 4) + 4) % 4];
}

function turnRoverTo(side, rover) {
  return {x: rover.x, y: rover.y, direction: calculateNewOrientation(side, rover.direction)};
}

function moveRoverForward(rover){
  if(rover.direction === "E" || rover.direction === "W"){
    return {
      x: rover.x + calculateMovementOffset(rover.direction), 
      y: rover.y,
      direction: rover.direction
    };
  }
  
  return {
    x: rover.x, 
    y: rover.y + calculateMovementOffset(rover.direction), 
    direction: rover.direction
  };
}

function calculateMovementOffset(direction){
  if(direction === "W" || direction === "S")
    return -1
  return 1
}

function performRoverRoutine(instructions, initialRoverConf){
  return Array.from(instructions).reduce((rover, currentInstruction) => {
      if(currentInstruction === "M"){
        return moveRoverForward(rover);
      }
      return  turnRoverTo(currentInstruction, rover);
    }
    ,initialRoverConf);
}

module.exports = {
  turnRoverTo,
  moveRoverForward,
  performRoverRoutine,
}
