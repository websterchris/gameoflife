const canvas = {
  background: "#264653",
  height: 750,
  width: 750,
};

const speed = 5;

let prevCells = [];

let cells = [];

const drawGrid = () => {
  stroke("#457b9d");
  const lines = canvas.width / 10;
  for (let i = 1; i < lines; i++) {
    const x = i * 10;
    line(x, canvas.height, x, 0);
  }

  for (let i = 1; i < lines; i++) {
    const y = i * 10;
    line(0, y, canvas.width, y);
  }
};

const drawCells = () => {
  stroke("#fffff");

  for (let y = 0; y < cells.length; y++) {
    for (x = 0; x < cells[y].length; x++) {
      if (cells[y][x]) {
        square(x * 10, y * 10, 10);
      }
    }
  }
};

const calculateNext = () => {
  prevCells = cells;
  const newCells = [];
  const maxCells = cells.length - 1;
  for (let y = 0; y < cells.length; y++) {
    newCells.push([]);
    for (x = 0; x < cells[y].length; x++) {
      // false && neighbours === 3 then true
      // true && neighbours < 2 || neighbours > 3 then false
      // else current value
      const currentCell = prevCells[y][x];
      let neighbours = 0;
      // top left (x-1, y-1)
      if (x > 0 && y > 0 && prevCells[y - 1][x - 1]) {
        neighbours += 1;
      }
      // top (x, y-1)
      if (y > 0 && prevCells[y - 1][x]) {
        neighbours += 1;
      }
      // top right (x + 1, y-1)
      if (y > 0 && x < maxCells && prevCells[y - 1][x + 1]) {
        neighbours += 1;
      }
      //right (x + 1, y)
      if (x < maxCells && prevCells[y][x + 1]) {
        neighbours += 1;
      }
      //bottom right (x + 1, y +1)
      if (x < maxCells && y < maxCells && prevCells[y + 1][x + 1]) {
        neighbours += 1;
      }
      //bottom (x, y +1)
      if (y < maxCells && prevCells[y + 1][x]) {
        neighbours += 1;
      }
      //bottom left (x -1, y +1)
      if (x > 0 && y < maxCells && prevCells[y + 1][x - 1]) {
        neighbours += 1;
      }
      //left (x-1, y)
      if (x > 0 && prevCells[y][x - 1]) {
        neighbours += 1;
      }

      if (currentCell && (neighbours < 2 || neighbours > 3)) {
        newCells[y].push(false);
      } else if (!currentCell && neighbours === 3) {
        newCells[y].push(true);
      } else if (currentCell && (neighbours === 2 || neighbours === 3)) {
        newCells[y].push(true);
      } else {
        newCells[y].push(false);
      }
    }
  }

  cells = newCells;
  //   noLoop();
};

function setup() {
  const { height, width } = canvas;
  createCanvas(width, height);
  frameRate(speed);
  strokeWeight(1);

  for (let y = 0; y < canvas.width / 10; y++) {
    cells.push([]);
    for (x = 0; x < canvas.width / 10; x++) {
      //   if ((x === 3 && y === 3) || (x === 3 && y === 4) || (x == 3 && y === 5)) {
      //     cells[y].push(true);
      //   } else {
      //     cells[y].push(false);
      //   }
      cells[y].push(!!Math.round(Math.random()));
    }
  }
  //   noLoop();
}

function draw() {
  background(canvas.background);
  frameRate(speed);
  drawGrid();
  drawCells();
  calculateNext();
}

function keyPressed() {
  if (keyCode === 13) {
    loop();
  }
}
