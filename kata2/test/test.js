import * as gameOfLifeFunctions from '../code.js';
import { assert } from 'chai'
describe('Game of life simulation', function () {
  describe('Game Logic', function () {
    describe('Create grid of size nxj represented as an array of size nxj', function () {
      it('Grid 2x2', function () {
        const expected = {
          width: 2,
          value: [false, false, false, false]
        };
        const result = gameOfLifeFunctions.createGird(2, 2);
        assert.deepEqual(result, expected, "It is not [false, false, false, false]")
      });
      it('Grid 2x1', function () {
        const expected = {
          width: 1,
          value: [false, false]
        };
        const result = gameOfLifeFunctions.createGird(2, 1);
        assert.deepEqual(result, expected, "It is not [false, false]")
      });
      it('Grid 2x3', function () {
        const expected = {
          width: 3,
          value: [false, false, false, false, false, false]
        };
        const result = gameOfLifeFunctions.createGird(2, 3);
        assert.deepEqual(result, expected, "It is not [false, false, false, false]")
      });
    });
    describe('Given a coordinate(row, column) set cell as alive', function (){
      it('In a 2x2 grid, set cell (0,1) as alive', function (){
        const expected = {
          width: 2,
          value: [false, true, false, false]
        };
        let grid = gameOfLifeFunctions.createGird(2,2);
        const result = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        assert.deepEqual(result, expected, 'Cell in coordinate(0, 1) not set as alive');
      });

      it('In a 2x2 grid, set cell (1,0) as alive', function (){
        const expected = {
          width: 2,
          value: [false, false, true, false]
        };
        let grid = gameOfLifeFunctions.createGird(2,2);
        const result = gameOfLifeFunctions.setCellAsAlive(grid, 1, 0);
        assert.deepEqual(result, expected, 'Cell in coordinate(1, 0) not set as alive');
      });

      it('In a 1x2 grid, set cell (0,1) as alive', function (){
        const expected = {
          width: 2,
          value: [false, true]
        };
        let grid = gameOfLifeFunctions.createGird(1,2);
        const result = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        assert.deepEqual(result, expected, 'Cell in coordinate(0, 1) not set as alive');
      });

      it('In a 2x1 grid, set cell (1,0) as alive', function (){
        const expected = {
          width: 1,
          value: [false, true]
        };
        let grid = gameOfLifeFunctions.createGird(2,1);
        const result = gameOfLifeFunctions.setCellAsAlive(grid, 1, 0);
        assert.deepEqual(result, expected, 'Cell in coordinate(1, 0) not set as alive');
      });
    });

    describe('Given a coordinate(row, column) check whether cell is alive or not', function(){
      it('In a initial 2x2 grid check cell (1,1)', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(2,2);
        const result = gameOfLifeFunctions.isAlive(grid, 1,1);
        assert.equal(result, expected, 'Cell in coordinate(1,1) is not alive');
      });
      it('In 2x2 grid check that a live cell (1,1) is alive', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(2,2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid,1,1);
        const result = gameOfLifeFunctions.isAlive(grid, 1,1);
        assert.equal(result, expected, 'Cell in coordinate(1,1) is not alive');
      });

      it('In 4x4 grid check that a live cell (2,3) is alive', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(4,4);
        grid = gameOfLifeFunctions.setCellAsAlive(grid,2,3);
        const result = gameOfLifeFunctions.isAlive(grid, 2,3);
        assert.equal(result, expected, 'Cell in coordinate(2,3) is not alive');
      });
    });

    describe('Check first rule: any live cell with fewer than two live neighbors dies, as if caused by underpopulated', function (){
      it('A 5x5 grid with the only the cell in (2,2) alive', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 2, 2);
        assert.equal(result, expected, 'First rule applies, 0 live neighbors');
      });

      it('A 5x5 grid where cell (2,2) is alive and has two live neighbors in same row', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 2, 2);
        assert.equal(result, expected, 'First rule not applies, 2 neighbors');
      });

      it('A 5x5 grid where cell (2,2) is alive and has two live neighbors in same colum', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 2);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 2, 2);
        assert.equal(result, expected,  'First rule not applies, 2 neighbors');
      });

      it('A 5x5 grid where cell (2,2) is alive and has two live neighbors in diagonal', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 3);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 2, 2);
        assert.equal(result, expected,  'First rule not applies, 2 neighbors');
      });

      it('A 5x5 grid where cell (2,2) is alive and has two live neighbors, one diagonal and other in row', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 2, 2);
        assert.equal(result, expected,  'First rule not applies, 2 neighbors');
      });


      it('A 5x5 grid where cell (0,1) is the only one alive', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 0, 1);
        assert.equal(result, expected,  'First rule applies,  0 live neighbors');
      });

      it('A 5x5 grid where cell (1,0) is alive and has two live neighbors, one diagonal and other in row', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 0);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 0);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 1, 0);
        assert.equal(result, expected,  'First rule not applies, 2 neighbors');
      });  
      
      it('A 5x5 grid with the only the cell in (3,4) alive', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 4);
        const result = gameOfLifeFunctions.checkUnderpopulated(grid, 3, 4);
        assert.equal(result, expected, 'First rule applies, 0 live neighbors');
      });
    });

    describe('Check second rule: any live cell with more than three live neighbors dies, as if by overcrowding', function (){
      it('A 5x5 grid where cell (2,2) is alive and has 4 live neighbors', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 2);
        const result = gameOfLifeFunctions.checkOvercrowding(grid, 2, 2);
        assert.equal(result, expected, 'Second rule applies, 4 neighbors');
      });

      it('A 5x5 grid where cell (2,2) is alive and has 3 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);

        const result = gameOfLifeFunctions.checkOvercrowding(grid, 2, 2);
        assert.equal(result, expected, 'Second rule not applies, 3 neighbors');
      });

      it('A 5x5 grid where cell (0,0) is alive and has 3 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 0);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 0);

        const result = gameOfLifeFunctions.checkOvercrowding(grid, 2, 2);
        assert.equal(result, expected, 'Second rule not applies, 3 neighbors');
      });

      it('A 5x5 grid where cell (1,1) is dead and has 4 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 0);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 0, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 0);

        const result = gameOfLifeFunctions.checkOvercrowding(grid, 2, 2);
        assert.equal(result, expected, 'Second rule not applies, cell dead');
      });
    });

    describe('Check third rule: any live cell with two or three live neighbors lives on to the next generation', function (){
      it('A 5x5 grid where cell (2,2) has 3 live neighbors', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        const result = gameOfLifeFunctions.checkLivesNextGeneration(grid, 2, 2);
        assert.equal(result, expected, 'Third rule applies, 3 live neighbors');
      });

      it('A 5x5 grid where cell (2,2) has 2 live neighbors', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        const result = gameOfLifeFunctions.checkLivesNextGeneration(grid, 2, 2);
        assert.equal(result, expected, 'Third rule applies, 2 live neighbors');
      });

      it('A 5x5 grid where cell (2,2) has 1 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        const result = gameOfLifeFunctions.checkLivesNextGeneration(grid, 2, 2);
        assert.equal(result, expected, 'Third rule not applies, 1 live neighbors');
      });

      it('A 5x5 grid where cell (2,2) has 4 neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 2);
        const result = gameOfLifeFunctions.checkLivesNextGeneration(grid, 2, 2);
        assert.equal(result, expected, 'Third rule not applies, 4 live neighbors');
      });

      it('A 5x5 grid where cell (2,2) is dead and has 2 neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        const result = gameOfLifeFunctions.checkLivesNextGeneration(grid, 2, 2);
        assert.equal(result, expected, 'Third rule not applies, cell dead');
      });
    });

    describe('Check fourth rule: any dead cell with exactly three live neighbors becomes a live cell', function (){
      it('A 5x5 grid where cell (2,2) is dead and has 3 live neighbors', function(){
        const expected = true;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        const result = gameOfLifeFunctions.checkDeadCellLives(grid, 2, 2);
        assert.equal(result, expected, 'Fourth rule applies, 3 live neighbors');
      });
      
      it('A 5x5 grid where cell (2,2) is dead and has 2 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);

        const result = gameOfLifeFunctions.checkDeadCellLives(grid, 2, 2);
        assert.equal(result, expected, 'Fourth rule not applies, 2 live neighbors');
      }); 

      it('A 5x5 grid where cell (2,2) is alive and has 3 live neighbors', function(){
        const expected = false;
        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);

        const result = gameOfLifeFunctions.checkDeadCellLives(grid, 2, 2);
        assert.equal(result, expected, 'Fourth rule not applies, cell alive');
      });
    });

    describe('Calculate next generation given a initial grid', function (){
      it('A 5x5 grid where cell (2,2) is alive', function(){
        let expectedGrid = gameOfLifeFunctions.createGird(5,5);

        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        const result = gameOfLifeFunctions.calculateNextGeneration(grid);
        assert.deepEqual(expectedGrid, result, 'Only one alive cell, next generation must be all cells dead');
      });

      it('A 5x5 grid where cell (2,2) is alive and has 2 live neighbouts', function(){
        let expectedGrid = gameOfLifeFunctions.createGird(5,5);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 2);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 1, 2);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 3, 2);

        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);

        const result = gameOfLifeFunctions.calculateNextGeneration(grid);
        assert.deepEqual(result, expectedGrid);
      });

      it('A 5x5 grid where cell (2,2) is alive and has 2 live neighbouts', function(){
        let expectedGrid = gameOfLifeFunctions.createGird(5,5);

        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 2);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 1);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 3);

        let grid = gameOfLifeFunctions.createGird(5, 5);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 3, 2);

        const result = gameOfLifeFunctions.calculateNextGeneration(grid);
        assert.deepEqual(result, expectedGrid);
      });

      it('A 4x8 grid with 3 live cells', function(){
        let expectedGrid = gameOfLifeFunctions.createGird(4,8);

        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 1, 3);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 1, 4);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 3);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 4);

        let grid = gameOfLifeFunctions.createGird(4, 8);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 4);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 3);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 4);

        const result = gameOfLifeFunctions.calculateNextGeneration(grid);

        assert.deepEqual(result, expectedGrid);
      });

      it('A 8x4 grid with 3 live cells', function(){
        let expectedGrid = gameOfLifeFunctions.createGird(8,4);

        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 1, 1);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 1, 2);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 1);
        expectedGrid = gameOfLifeFunctions.setCellAsAlive(expectedGrid, 2, 2);

        let grid = gameOfLifeFunctions.createGird(8, 4);

        grid = gameOfLifeFunctions.setCellAsAlive(grid, 1, 2);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 1);
        grid = gameOfLifeFunctions.setCellAsAlive(grid, 2, 2);

        const result = gameOfLifeFunctions.calculateNextGeneration(grid);

        assert.deepEqual(result, expectedGrid);
      });
    });
  });
});
