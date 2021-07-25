/*
*Pseudocode comments

**Game states
"WIN" - Player robot has defeated all enemy-robots
    * Fight all enemy-robots
    * Defeat each enemy-robot
"LOSE" - Player robot's health is zero or less
*/

//initalize player-robot game variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//initalize enemy-robot game variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//log to console to check variable content
console.log(playerName, playerHealth, playerAttack);

//create "fight" function
var fight = function(enemyName){

    //repeat fight sequence as long as enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0){
        //prompt the user if they want to fight robots, display input to console
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        //check if player wants to skip fight
        if(promptFight === "SKIP" || promptFight === 'skip'){
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you really want to quit this battle?");

            if(confirmSkip){
                //if player skips, deduct player money, leave fight
                playerMoney = playerMoney - 10;
                window.alert(playerName + " has chosen to skip the fight!");
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        //check if the player chooses 'FIGHT' or 'fight
        if(promptFight === "FIGHT" || promptFight === "fight"){
            //player-robot attacks enemy-robot, then log enemyHealth
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked! " + enemyName + " health is now: " + enemyHealth);

            //check enemy's health
            if(enemyHealth <= 0){
                window.alert(enemyName + " has died!");
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //enemy-robot attacks player-robot, then log playerHealth
            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + " attacked! " + playerName + "'s health is now: " + playerHealth);

            //check player health
            if(playerHealth <= 0){
                window.alert(playerName + " has died");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else {
            //else, no valid input presented by player, alert player of invalid input
            window.alert("The player has entered and invalid response. Please proceed with a valid option...");
        }
    }
};

//declare function as expression to start a new game
var startGame = function(){

    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    //iterate across enemyNames array to enable fighting multiple robots feature
    for(var i =0; i < enemyNames.length; i++){
        if(playerHealth > 0){
            //inform player of a new round
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick enemy-robot
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth each time a new robot is faught
            enemyHealth = 50;

            //initiate fight with new enemy robot name passed to fight function assuming the enemyName parameter value
            fight(pickedEnemyName);

            //if there are stil more enemy-robots to fight AND player health is non-zero allow player to enter the shop if desired
            if(playerHealth > 0 && i < enemyNames.length - 1){
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
    if(playerHealth > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //implement switch to handle user choice
    switch(shopOptionPrompt){
        case "REFILL":
        case "refill":
            //refill code, checks to see if player has sufficient credits
            if(playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 credits.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            
            break;
        case "UPGRADE":
        case "upgrade":
            //upgrade code, checks to see if player has sufficient credits
            if(playerMoney >= 7){
                window.alert("Upgrading player's attack by 6 for 7 credits.");

                //increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money");
            }
            
            break;
        case "LEAVE":
        case "leave":
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

//start the game when the page loads
startGame();
