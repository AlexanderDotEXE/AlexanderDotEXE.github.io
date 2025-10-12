export class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.fCost = 0;
        this.gCost = 0;
        this.hCost = 0;
        this.parent = null;
        this.key = -1;
    }
}