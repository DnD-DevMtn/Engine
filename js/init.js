
// STUFF THAT WILL BE PUT IN THE GAME

let monster = {
    name: "Goblin"
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
}

// DEFINING GAME PARAMETERS

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

// DEFINING GAME PARAMETERS



// MAIN INITS

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
    loadEnvironment(stuff);
    loadTraps(traps);
    loadMonsters(monsters);
    loadPlayers(players);
    loadItems(items);

    printBoard(Game.board);
}

function loadEnvironment(stuff){
    for(let i = 0; i < stuff.length; i++){
        let x = stuff[i].location[0];
        let y = stuff[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "environmental";
        Game.board[x][y].name = stuff[i].name;
    }
}

function loadTraps(traps){
    for(let i = 0; i < traps.length; i++){
        let x = traps[i].location[0];
        let y = traps[i].location[1];
        Game.board[x][y].type = "trap";
        Game.board[x][y].name = traps[i].name
    }
}

function loadMonsters(monsters){
    for(let i = 0; i < monsters.length; i++){
        let x = monsters[i].location[0];
        let y = monsters[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "monster";
        Game.board[x][y].name = monsters[i].mon.name;
    }
}

function loadPlayers(players){
    for(let i = 0; i < players.length; i++){
        let x = players[i].location[0];
        let y = players[i].location[1];
        Game.board[x][y].free = false;
        Game.board[x][y].type = "player";
        Game.board[x][y].name = players[i].char.name;
    }
}

function loadItems(items){
    for(let i = 0; i < items.length; i++){
        let x = items[i].location[0];
        let y = items[i].location[1];
        Game.board[x][y].items.push(items[i].item);
    }
}

// MAIN INITS



Game.height = 10;
Game.width = 10;
boardInit(Game.height, Game.width, Game.players, Game.monsters, Game.traps, Game.environment, Game.items);
console.log(Game.board);





// PRINTBOARD

function printBoard(game){
    for(let row = 0; row < Game.width; row++){
        let line = "";
        for(let col = 0; col < Game.height; col++){
            if(Game.board[row][col].items.length > 0){
                line += " I";
            } else if(Game.board[row][col].traps){
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
