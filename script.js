
const Data = {
    title: "Flower",
    level: 1,
    size : 5,
    pixel: ["10101", "11111", "01110", "10101", "11111"]
};


window.onload = function(){

    let level = document.querySelector("#level");
    level.innerHTML = Data.level;

    let board = document.getElementById("board");
    

    


    // 문제 보드
    let numRow = document.getElementById("num-row");
    let numCol = document.getElementById("num-col");
    


    for(let i = 0; i<Data.size; i++){
        let numRowBlock = document.createElement("div");
        let numColBlock = document.createElement("div");
        let rowQ = document.createElement("p");
        let colQ = document.createElement("p");

        numRowBlock.appendChild(rowQ);
        numColBlock.appendChild(colQ);
        numRowBlock.classList.add("numBlock");
        numColBlock.classList.add("numBlock");

        numRow.appendChild(numRowBlock);
        numCol.appendChild(numColBlock);

    }


    // 보드
    for(let i = 0; i<Data.size; i++){
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        board.appendChild(rowDiv);

        for(let j = 0; j<Data.size; j++){
            let blockDiv = document.createElement("div");
            blockDiv.classList.add("block");
            blockDiv.dataset.row = i;
            blockDiv.dataset.col = j;
            blockDiv.dataset.visited = false;
            rowDiv.appendChild(blockDiv);
        }
    }


    let blocks = document.querySelectorAll(".block");


    // 문제 번호
    let num = 0;
    let rb = document.querySelectorAll("#num-row > .numBlock > p");
    

    for(let r = 0; r<Data.size; r++){
        for(let c = 0; c<Data.size; c++){
            if(Data.pixel[r][c] == '1'){
                num++;
            }else{
                if(num != '0'){
                    rb[r].innerHTML += num+" ";
                    num = 0;
                }
            }
        }
        if(num != '0'){
            rb[r].innerHTML += num+" ";
        }
        num = 0;
    }

    let cb = document.querySelectorAll("#num-col > .numBlock");
    for(let c = 0; c<Data.size; c++){
        for(let r = 0; r<Data.size; r++){
            if(Data.pixel[r][c] == '1'){
                num++;
            }else{
                if(num != '0'){
                    cb[c].innerHTML += num+"<br>";
                    num = 0;
                }
            }
        }
        if(num != '0'){
            cb[c].innerHTML += num+" ";
        }
        num = 0;
    }


    
    // life
    let life = 5;

    let hearts = document.querySelectorAll(".heart > img");
    

    blocks.forEach(b => {
        b.addEventListener("mousedown", function(){
            let row = b.dataset.row;
            let col = b.dataset.col;
            let visited = b.dataset.visited;
            
            if(Data.pixel[row][col] == '1' && visited === "false"){            // 맞음
                this.style.backgroundColor = "#ffff00";
                b.dataset.visited = "true";
            }else if(Data.pixel[row][col] == '0' && visited === "false"){
                this.classList.add("wrong");
                life --;
                hearts[life].style.display = "none";
                b.dataset.visited = "true";
            }
            if(life == 0){
                GameOver();
            }
        });
    });



    function GameOver() {
        let gameOver = document.getElementById("game-over");
        gameOver.style.display = "block";
    }


}