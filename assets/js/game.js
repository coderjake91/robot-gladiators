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

//iterate across enemyNames array to enable fighting multiple robots feature
for(var i =0; i < enemyNames.length; i++){
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}