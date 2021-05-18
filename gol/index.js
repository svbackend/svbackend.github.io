const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new GameOfLife()
game.gameSetUp()

function changeRules() {
    let alive_survive = document.getElementById("alive-survive").value;
    let dead_reborn = document.getElementById("dead-reborn").value;
    game.updateRules(alive_survive, dead_reborn)
}

window.onload = () => {
    changeRules()

    document.querySelector("#start-random").addEventListener("click", () => {
        game.arrayRandomize();
        game.fillArray();
        window.setInterval(() => {
            game.runGame();
        }, 300)
    })

    document.querySelector("#stop").addEventListener("click", () => {
        game.gameSetUp();
    })

    document.querySelector("#change-rules-btn").addEventListener("click", (e) => {
        e.preventDefault();
        changeRules()
    })

}


