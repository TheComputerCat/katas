var { assert } = require('chai');
let { turnRoverTo, moveRoverForward, performRoverRoutine } = require('../src/code');

describe("Kata Rover with limitations", function() {
  describe("Perform Basic movements", function(){
    describe("With a single Rover in", function(){

      describe("position 0,0", function(){
        describe("and facing north", function(){

          describe("test rotations", function(){
            it('turning left', function() {
              assert.deepEqual(
                turnRoverTo("L",{
                    x: 0,
                    y: 0,
                    direction: "N"
                  }),
                  {
                    x: 0,
                    y: 0,
                    direction: "W"
                  }
                );
            });

            it('turning right', function() {
              assert.deepEqual(
                turnRoverTo("R",{
                  x: 0,
                  y: 0,
                  direction: "N"
                }),
                {
                  x: 0,
                  y: 0,
                  direction: "E"
                }
              );
            });
          });

          describe("test movement", function(){
            it('forward', function() {
              assert.deepEqual(
                moveRoverForward({
                    x: 0,
                    y: 0,
                    direction: "N"
                  }),
                  {
                    x: 0,
                    y: 1,
                    direction: "N"
                  }
              );
            });
          });
        });

        describe("and facing east", function(){
          describe("test rotations", function(){
            it('turning right', function() {
              assert.deepEqual(
                turnRoverTo("R",{
                    x: 0,
                    y: 0,
                    direction: "E"
                  }),
                  {
                    x: 0,
                    y: 0,
                    direction: "S"
                  }
                );
            });
          });

          describe("test movement", function(){
            it('forward', function() {
              assert.deepEqual(
                moveRoverForward({
                    x: 0,
                    y: 0,
                    direction: "E"
                  }),
                  {
                    x: 1,
                    y: 0,
                    direction: "E"
                  }
                );
            });
          });
        });
      });
    });
  });

  describe("Perform a routine of movements", function() {
    describe("With a single Rover in", function(){

      describe("position 0,0", function(){
        describe("and facing north", function(){
          it("with steps 'RM'", function(){
            assert.deepEqual(
              performRoverRoutine("RM",{
                x: 0,
                y: 0,
                direction: "N"
              }),
              {
                x: 1,
                y: 0,
                direction: "E"
              }
            );
          });

          it("with steps 'MRM'", function(){
            assert.deepEqual(
              performRoverRoutine("MRM",{
                x: 0,
                y: 0,
                direction: "N"
              }),
              {
                x: 1,
                y: 1,
                direction: "E"
              }
            );
        });
        });
      });

      describe("position 1,2", function(){
        describe("and facing north", function(){
          it("with steps 'LMLMLMLMM'", function(){
            assert.deepEqual(
              performRoverRoutine("LMLMLMLMM",{
                x: 1,
                y: 2,
                direction: "N"
              }),
              {
                x: 1,
                y: 3,
                direction: "N"
              }
            );
          });
        });

      });

      describe("position 3,3", function(){
        describe("and facing east", function(){
          it("with steps 'MMRMMRMRRM'", function(){
            assert.deepEqual(
              performRoverRoutine("MMRMMRMRRM",{
                x: 3,
                y: 3,
                direction: "E"
              }),
              {
                x: 5,
                y: 1,
                direction: "E"
              }
            );
          });
        });
      });
    });
  });
});
