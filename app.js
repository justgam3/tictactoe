let isPlayerX = true;
let checkboard =
    [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

const addBtn = document.getElementById('add');

function checkResult(player) {
    return ((checkboard[0][0] === player && checkboard[0][1] === player && checkboard[0][2] === player) ||
        (checkboard[0][0] === player && checkboard[1][0] === player && checkboard[2][0] === player) ||
        (checkboard[0][0] === player && checkboard[1][1] === player && checkboard[2][2] === player) ||
        (checkboard[0][1] === player && checkboard[1][1] === player && checkboard[2][1] === player) ||
        (checkboard[0][2] === player && checkboard[1][1] === player && checkboard[2][0] === player) ||
        (checkboard[0][2] === player && checkboard[1][2] === player && checkboard[2][2] === player) ||
        (checkboard[1][0] === player && checkboard[1][1] === player && checkboard[1][2] === player) ||
        (checkboard[2][0] === player && checkboard[2][1] === player && checkboard[2][2] === player));
}

function resetGame() {
    checkboard = checkboard.map((element) => {
        return [null, null, null];
    });

    //Debug checkboard pattern
    console.log(checkboard);
    const boxes = document.querySelectorAll('.box');

    for (let box of boxes) {
        box.innerHTML = '';
    }

    isPlayerX = true;
    addBtn.disabled = false;
}

document.getElementById('reset').addEventListener("click", function () {
    resetGame();
});

addBtn.addEventListener("click", function () {
    const userInput = document.querySelector('input');

    let choice = parseInt(userInput.value);

    if (isNaN(choice)) {
        alert('Not a number!');
        return;
    }
    if (choice < 1 || choice > 9) {
        alert('Out of range!');
        return;
    }

    //reset to index value
    choice -= 1;

    const selectedBox = document.querySelectorAll(`.box`)[choice];

    if (selectedBox.children.length > 0) {
        alert('the box has been chosen!');
        return;
    }

    const imageNode = document.createElement('img');

    const player = isPlayerX ? 'x' : 'o';

    imageNode.src = `${player}_image.png`;
    imageNode.classList.add('class', 'xo-image');

    selectedBox.appendChild(imageNode);

    checkboard[Math.floor(choice / 3)][choice % 3] = isPlayerX ? 'x' : 'o';

    //Debug checkboard pattern
    console.log(checkboard);

    const result = checkResult(player);

    const isTie = document.querySelectorAll(`.xo-image`).length >= 9;

    setTimeout(() => {
        if (result || isTie) {
            if (result) {
                alert(`${player} has won the game!`);
            } else {
                alert("Tie game!");
            }
            addBtn.disabled = true;
        }
    }, 100);

    isPlayerX = !isPlayerX;
});