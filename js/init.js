
// * * * STUFF THAT WILL BE PUT IN THE GAME

let monster = {
    name: "Goblin"
    , fileName: ""
    , id: ""
    , hp: 10
    , ac: 15
    , attack: 2
    , move: 5
    , damage: {
        diceType: 6
        , diceNum: 1
        , mod: 2
    }
    , init: 5
}

let character = {
    name: "Voldemort"
    , hp: 15
    , ac: 16
    , attack: 4
    , move: 6
    , damage: {
        diceType: 6
        , diceNum: 2
        , mod: 4
    }
    , ref: 3
    , init: 2
}

let trap = {
    name: "Spikes"
    , triggered: false
    , passable: true
    , dc: 15
    , damage: {
        diceType: 10
        , diceNum: 1
        , mod: 1
    }
}

let gold = {
    name: "gold"
    , amt: 1000
}

const Game = {
    board: []
    , players: []
    , monsters: []
    , items: []
    , traps: []
    , environment: []
    , exploreOrder: []
    , combatOrder: []
}

// STUFF THAT WILL BE PUT IN THE GAME * * *



// * * * DEFINING GAME PARAMETERS

Game.players = [{
    location: [0, 0]
    , char: character
}];
Game.monsters = [{
    location: [9, 9]
    , mon: monster
}];
Game.traps = [{
    location: [0, 1]
    , trap: trap
}]
Game.environment = [
    {location: [4, 5], name: "rock"}
    , {location: [5, 4], name: "bigger rock"}
    , {location: [4, 4], name: "tree"}
    , {location: [5, 5], name: "ditch"}
]
Game.items = [
    {
        location:[9, 8]
        , item: gold
    }
]

// DEFINING GAME PARAMETERS * * *





// * * * PRIMARY GAME FUNCTIONS

Game.explore = function(){

}



// PRIMARY GAME FUNCTIONS * * *



// * * * MAIN INITS

function boardInit(height, width, players, monsters, traps, stuff, items){
    for(let y = 0; y < height; y++){
        Game.board.push([]);
        for(let x = 0; x < width; x++){
            let square = {
                free: true
                , type: ""
                , name: ""
                , items: []
                , light: 0
                , trap: {}
            }
            Game.board[y].push(square);
        }
    }
    loadEnvironment();
    loadTraps();
    loadMonsters();
    loadPlayers();
    loadItems();

    defineExploreOrder();
    printBoard();
    Game.explore();
}

function loadEnvironment(){
    for(let i = 0; i < Game.environment.length; i++){
        let x = Game.environment[i].location[0];
        let y = Game.environment[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "environmental";
        Game.board[x][y].name = Game.environment[i].name;
    }
}

function loadTraps(){
    for(let i = 0; i < Game.traps.length; i++){
        let x = Game.traps[i].location[0];
        let y = Game.traps[i].location[1];
        Game.board[x][y].trap = Game.traps[i].trap
    }
}

function loadMonsters(){
    for(let i = 0; i < Game.monsters.length; i++){
        let x = Game.monsters[i].location[0];
        let y = Game.monsters[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "monster";
        Game.board[x][y].name = Game.monsters[i].mon.name;
    }
}

function loadPlayers(){
    for(let i = 0; i < Game.players.length; i++){
        let x = Game.players[i].location[0];
        let y = Game.players[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "player";
        Game.board[x][y].name = Game.players[i].char.name;
    }
}

function loadItems(){
    for(let i = 0; i < Game.items.length; i++){
        let x = Game.items[i].location[0];
        let y = Game.items[i].location[1];
        Game.board[x][y].items.push(Game.items[i].item);
    }
}

function defineExploreOrder(){
    if(Game.players.length > 1){
        Game.exploreOrder = Game.players.sort((a, b) => {
            return a.init - b.init;
        });
    } else {
        Game.exploreOrder.push(Game.players[0].name);
    }
    if(Game.monsters.length > 1){
        Game.exploreOrder.concat(Game.monsters.sort((a, b) => {
            return a.init - b.init;
        }));
    } else {
        Game.exploreOrder.concat(Game.monsters[0].name);
    }
}

function defineCombatOrder(){

}

// MAIN INITS * * *



Game.height = 10;
Game.width = 10;
boardInit(Game.height, Game.width, Game.players, Game.monsters, Game.traps, Game.environment, Game.items);
console.log(Game.board);
console.log(Game.explorOrder);





// * * * PRINTBOARD

function printBoard(){
    for(let row = 0; row < Game.width; row++){
        let line = "";
        for(let col = 0; col < Game.height; col++){
            if(Game.board[row][col].items.length > 0){
                line += " I";
            } else if(Game.board[row][col].trap.name){
                line += " T";
            } else if(Game.board[row][col].type === "player"){
                line += " P";
            } else if(Game.board[row][col].type === "monster"){
                line += " M";
            } else if(Game.board[row][col].type === "environmental"){
                line += " E";
            } else {
                line += " ."
            }
        }
        console.log(line);
    }
}
