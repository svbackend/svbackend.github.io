class GameOfLife {
    constructor() {

        this.cell_size = 10;
        this.dead_color = `#181818`;
        this.alive_color = `#FF756B`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.neighbors_to_survive = [];
        this.neighbors_to_reborn = [];

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                this.active_array[i] = [];
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array;

        };

        this.arrayRandomize = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = (Math.random() > 0.8) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    if (this.active_array[i][j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.getCellValueHelper = (row, col) => {
            try {
                return this.active_array[row][col];
            } catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.getCellValueHelper(row - 1, col - 1);
            total_neighbours += this.getCellValueHelper(row - 1, col);
            total_neighbours += this.getCellValueHelper(row - 1, col + 1);
            total_neighbours += this.getCellValueHelper(row, col - 1);
            total_neighbours += this.getCellValueHelper(row, col + 1);
            total_neighbours += this.getCellValueHelper(row + 1, col - 1);
            total_neighbours += this.getCellValueHelper(row + 1, col);
            total_neighbours += this.getCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {
            const total = this.countNeighbours(row, col);

            if (this.getCellValueHelper(row, col) === 1) {
                if (this.neighbors_to_survive.includes(total)) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (this.neighbors_to_reborn.includes(total)) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };

        this.updateLifeCycle = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.inactive_array[i][j] = this.updateCellValue(i, j);
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };

        this.updateRules = (alive_survive, dead_reborn) => {
            this.neighbors_to_survive = alive_survive.split(",").map(nb => Number.parseInt(nb));
            this.neighbors_to_reborn = dead_reborn.split(",").map(nb => Number.parseInt(nb));
        }

    }
}
