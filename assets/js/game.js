/*
*Pseudocode comments

**Game states
"WIN" - Player robot has defeated all enemy-robots
    * Fight all enemy-robots
    * Defeat each enemy-robot
"LOSE" - Player robot's health is zero or less
*/

//fight or skip function prompts player for fight or skip response and checks for valid input, else re-prompts player
var fightOrSkip = function(){
    //prompt the user if they want to fight robots, display input to console
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);

    //user input verification, check for null/"", then convert input to lower case, check if player wants to skip(confirm), fight, or check for other invalid input (words other than fight)
    switch(promptFight){
        case "":
        case null:
            //no valid input presented by player, alert player of invalid input then recursively call fightOrSkip again
            window.alert("The player has entered and invalid response. Please proceed with a valid option...");
            return fightOrSkip();
            break;
        default:
            promptFight = promptFight.toLowerCase();

            //check if player wants to skip fight
            switch(promptFight){
                case "skip":
                    //confirm player wants to skip
                    var confirmSkip = window.confirm("Are you sure you really want to quit this battle?");

                    if(confirmSkip){
                        //if player skips, deduct player money, leave fight with a minimum credit value of zero
                        playerInfo.money = Math.max(0, playerInfo.money - 10);
                        window.alert(playerInfo.name + " has chosen to skip the fight!");
                        console.log("playerInfo.money", playerInfo.money);
            
                        //return true if player wants to leave the fight
                        return true;
                    }
                    break;
                case "fight":
                    //return false if the player wants to continue fighting
                    return false;
                    break;
                default:
                    //no valid input presented by player, alert player of invalid input then recursively call fightOrSkip again
                    window.alert("The player has entered and invalid response. Please proceed with a valid option...");
                    return fightOrSkip();
                    break;
            }
            break;
    }
}

//create "fight" function
var fight = function(enemy){
    //variable to keep track of fight 'turns'
    var isPlayerTurn = true;
    //variable keeps track of player round skip choice
    var skip = false;

    //uses math.random() to simulate a coin-flip to determine robot fighter 'turn'
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }

    //repeat fight sequence as long as enemy-robot and player are alive + player has not chose to skip round
    while(enemy.health > 0 && playerInfo.health > 0 && !skip){
        //prompt player if they want to fight or skip
        switch(isPlayerTurn){
            case true:
                if(fightOrSkip()){
                    //breaks if player wants to leave fight->returned boolean from fightOrSkip
                    skip = true;
                    break;
                }
                var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
                enemy.health = Math.max(0, enemy.health - damage);
                console.log(playerInfo.name + " attacked! " + enemy.name + " health is now: " + enemy.health);

                //check enemy's health
                if(enemy.health <= 0){
                    window.alert(enemy.name + " has died!");
                    break;
                } else {
                    window.alert(enemy.name + " still has " + enemy.health + " health left.");
                }
            break;
            case false:
                //enemy-robot attacks player-robot, then log playerInfo.health with a max value of zero
                var damage = randomNumber(enemy.attack - 3, enemy.attack);
                playerInfo.health = Math.max(0, playerInfo.health - damage);
                console.log(enemy.name + " attacked! " + playerInfo.name + "'s health is now: " + playerInfo.health);

                //check player health
                if(playerInfo.health <= 0){
                    window.alert(playerInfo.name + " has died");
                    break;
                } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
                }
            break;
            default:
            break;
        }
        //switch fighter turn
        isPlayerTurn = !isPlayerTurn;
    }
};

//declare function as expression to start a new game
var startGame = function(){

    //reset player stats
    playerInfo.reset();

    //iterate across array of enemy objects to enable fighting multiple robots feature
    for(var i =0; i < enemyInfo.length; i++){
        if(playerInfo.health > 0){
            //inform player of a new round
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick enemy-robot
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy health to a random number between 40 - 60, each time a new robot is faught, this statment creates a new 'health' property within an object in the enemyInfo array of objects
            pickedEnemyObj.health = randomNumber(40, 60);

            //initiate fight with new enemy robot name passed to fight function assuming the pickedEnemyObj parameter value
            fight(pickedEnemyObj);

            //if there are stil more enemy-robots to fight AND player health is non-zero allow player to enter the shop if desired
            if(playerInfo.health > 0 && i < enemyInfo.length - 1){
                //ask player if they want to enter the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if player confirms shop entry, call shop function
                if(storeConfirm){
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! GAME OVER!");
            break;
        }
    }
    //play again
    endGame();
};

//declare function as expression to end the game
var endGame = function() {
    //if the player is still alive, player wins
    if(playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    //ask the player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm){
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

//shop function expression declaration- allow players to enter the shop as part of a game feature
var shop = function() {
    //ask player to choose between refilling health, upgrading attack, or leaving the shop
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one of the following numbers (1-3): 1 = REFILL, 2 = UPGRADE, or 3 = LEAVE to make a choice.");
    //convert
    shopOptionPrompt = parseInt(shopOptionPrompt);
    //implement switch to handle user choice
    switch(shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            //leave code
            window.alert("Leaving the shop.");
            break;
        default:
            //if user does not select a vaild choice call shop function again
            window.alert("You did not pick a valid option. Try again.");

            //call shop function again to allow player to pick a valid option
            shop();
            break;
    }
};

//random number generator function expression that returns whole number values between parameters min - max
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//prompt for player's robot name, and re-prompt until input is not null or empty string
var getPlayerName = function(){
    var name = "";
    name = window.prompt("Welcome to Robot Gladiators! What is your robot's name?");

    //loop until a valid robot name is entered by player, i.e. not "null" or ""
    while(name === "" || name === null){
        window.alert("You have not entered a valid name. Please enter a valid name and continue.")
        name = window.prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

//player info object to initialize player name and robot properties
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function(){
        if(this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 credits.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough credits!");
        }
    },
    upgradeAttack: function(){
        if(this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 credits.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough credits!");
        } 
    }
};

//initalize  an array of enemy-robot objects
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

//start the game when the page loads
startGame();
