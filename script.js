let turn = 0;
let cellNumber = 0
let boxNumber = 0
let currentCell = 81
let boxFlag = 9
// if boxflag == 9, you can go in any cell, otherwise you can only go in the one cell
// e.g. boxFlag 0 is top left only, boxFlag 8 is bottom right etc
let fullboard = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
let globalWin = ["", "", "", "", "", "", "", "", ""]
function regionMatch(cur) {
    for (i = 0; i < 9; i++) {
        if ((cur >= (9 * i)) && (cur < ((9 * i) + 9))) {
            return boxFlag == i
        }
    }
}
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
class Cell {
    constructor(row, pushToBox, box) {
        this.x = null;
        this.o = null;
        this.row = row;
        this.pushToBox = pushToBox
        this.box = box
    }
    test() {
        console.log('This is coming from the parent!!!')
    }
    fill(cell) {
        console.log(cell, this)
        cell ? cell.innerHTML = turn % 2 ? 'X' : 'O' : this.box.innerHTML = turn % 2 ? 'X' : 'O'
    }
    draw() {
        console.log(this)
        let td = document.createElement('td');
        td.setAttribute('id', cellNumber);
        cellNumber++;
        td.onclick = (e) => {
            currentCell = e.target.id
            if (((boxFlag == 9) || regionMatch(currentCell)) && (fullboard[currentCell] == "")) {
                // e.target.innerHTML = turn % 2 ? 'X' : 'O'
                fullboard[currentCell] = turn % 2 ? 'X' : 'O'
                // parent.arr.push(X or O) totally would work too 
                boxFlag = (currentCell % 9)
                this.pushToBox()
                this.fill(e.target)
                turn++
            } else {
                alert("wrong!")
            }
        };
        this.row.append(td);
        // console.log(e.target.id)
    }
}
class Box extends Cell {
    constructor(num) {
        super();
        this.x = null;
        this.o = null;
        this.pointerEvents = false;
        this.boxId = num;
        this.win = 0
        this.arr = ["", "", "", "", "", "", "", "", ""]
        this.box = null;
        this.num = num
    }
    callTest() {
        super.test()
    }
    checkWin() {
        let tie = true;
        for (let i = 0; i < 8; i++) {
            if ((this.arr[winCombo[i][0]] == this.arr[winCombo[i][1]]) && (this.arr[winCombo[i][1]] == this.arr[winCombo[i][2]])) {
                if ((this.arr[winCombo[i][0]] !== "") && (this.arr[winCombo[i][1]] !== "") && (this.arr[winCombo[i][2]] !== "")) {
                    return true
                }
            }
            if (this.arr[i] === "") { //Checks if a tie
                tie = false
            }
        }
        return false
    }
    checkGlobalWin() {
        let tie = true;
        for (let i = 0; i < 8; i++) {
            if ((globalWin[winCombo[i][0]] == globalWin[winCombo[i][1]]) && (globalWin[winCombo[i][1]] == globalWin[winCombo[i][2]])) {
                if ((globalWin[winCombo[i][0]] !== "") && (globalWin[winCombo[i][1]] !== "") && (globalWin[winCombo[i][2]] !== "")) {
                    return true
                }
            }
            if (globalWin[i] === "") { //Checks if a tie
                tie = false
            }
        }
        return false
    }
    pushParent(row, column) {
        this.arr[row * 3 + column] = turn % 2 ? 'X' : 'O'
        console.log("Did i win? ", this.checkWin())
        if (this.checkWin()) {
            this.win = 1
            super.fill()
            console.log(this.boxId - 100)
            globalWin[this.boxId] = turn % 2 ? 'X' : 'O'
            console.log("DID I WIN!! LIKE FOR REALL!!!? ", this.checkGlobalWin())
        }
    }
    draw(x) {
        // console.log(this);
        // super.draw();
        // this.pushParent()
        let div = document.createElement('div');
        this.box = div
        div.setAttribute("id", this.boxId - 1 + 100)
        div.classList.add('small-box');
        document.body.querySelector('.game-box').append(div);
        let table = document.createElement('table');
        div.append(table);
        // document.querySelector(".small-box").setAttribute("id", boxNumber);
        // boxNumber++;
        for (let i = 0; i < 3; i++) {
            let tr = document.createElement('tr');
            table.append(tr);
            for (let j = 0; j < 3; j++) {
                new Cell(tr, () => this.pushParent(i, j), div).draw();
            }
        }
    }
}
for (i = 1; i < 10; i++) {
    new Box(i).draw(i);
}
if (boxFlag < 9) {
    // target smallbox (id=boxflag) add css (fancy)
    document.getElementById('#101').style.color = "black"
    console.log("hello")
}
document.querySelector(".small-box").onclick = function (e) {
    console.log(e.target)
    if (boxFlag < 9) {
        console.log("hello")
        // target smallbox (id=boxflag) add css (fancy)
        document.getElementById(`10${boxFlag}`).style.backgroundColor = "black"
    }
}