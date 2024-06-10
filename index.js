#! /usr/bin/env node
// CLI Adventure Game using javascript:
import inquirer from "inquirer";
import chalk from "chalk";
const enemies = [
    { name: "Zombie", health: 30, attack: 5 },
    { name: "Skeleton", health: 40, attack: 7 },
    { name: "Assassin", health: 50, attack: 10 },
];
let currentEnemyIndex = 0;
let health = 100;
let energyPotions = 1;
let attackPower = 10;
let warriorName = "";
async function displayStatus() {
    console.log(chalk.bold(`\n${warriorName}'s Health: ${chalk.cyan.bold(health)}`));
    console.log(chalk.bold(`Current Enemy: ${chalk.cyan.bold(enemies[currentEnemyIndex].name)}`));
    console.log(chalk.bold(`Enemy Health: ${chalk.cyan.bold(enemies[currentEnemyIndex].health)}`));
    console.log(chalk.bold(`Energy Potions: ${chalk.cyan.bold(energyPotions)}\n`));
}
async function showMenu() {
    const { action } = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: chalk.green.bold("Choose an action:"),
            choices: [
                { name: "Attack enemy", value: "attack" },
                { name: "Use energy potion", value: "usePotion" },
                { name: "Check health status", value: "checkHealth" },
                { name: "Run", value: "run" },
                { name: "Exit", value: "exit" },
            ],
        },
    ]);
    handleInput(action);
}
function handleInput(input) {
    switch (input) {
        case "attack":
            attack();
            break;
        case "usePotion":
            usePotion();
            break;
        case "checkHealth":
            displayStatus().then(showMenu);
            break;
        case "run":
            run();
            break;
        case "exit":
            console.log(chalk.yellow.bold("\nExiting the game. Goodbye!"));
            return;
        default:
            console.log(chalk.red.bold("\nInvalid choice. Please select a valid option.\n"));
            showMenu();
    }
}
function attack() {
    const enemy = enemies[currentEnemyIndex];
    console.log(chalk.cyan.bold(`\nYou attack the ${enemy.name}!`));
    enemy.health -= attackPower;
    if (enemy.health <= 0) {
        console.log(chalk.yellow(`\nYou defeated the ${enemy.name}!\n`));
        currentEnemyIndex++;
        if (currentEnemyIndex >= enemies.length) {
            console.log(chalk.rgb(123, 45, 67)("\n \tCongratulations! You defeated all enemies!\n"));
            console.log(chalk.bold.hex("#3357FF")("\nAs a reward for your bravery, you receive a legendary sword and 100 gold coins!\n"));
            return;
        }
        else {
            console.log(chalk.bold(`\nNext enemy: ${chalk.blue.bold(enemies[currentEnemyIndex].name)}\n`));
        }
    }
    else {
        console.log(chalk.cyan.bold(`\nThe ${enemy.name} attacks you back!`));
        health -= enemy.attack;
        if (health <= 0) {
            console.log(chalk.yellow.bold("You have been defeated. Game over.\n"));
            return;
        }
        else {
            console.log(chalk.bold(`\nYour health is now ${chalk.cyan.bold(health)}.\n`));
        }
    }
    showMenu();
}
function usePotion() {
    if (energyPotions > 0) {
        health += 20;
        energyPotions--;
        console.log(chalk.bold(`\nYou used an energy potion. Health increased to ${chalk.cyan.bold(health)}.\n`));
    }
    else {
        console.log(chalk.blue.bold("\nYou have no energy potions left.\n"));
    }
    showMenu();
}
function run() {
    console.log(chalk.magenta.bold("\nYou ran away from the battle. Recovering some health...\n"));
    health += 10; // Recover some health when running away
    if (currentEnemyIndex > 0) {
        currentEnemyIndex--; // Retreat to the previous enemy
    }
    displayStatus().then(showMenu);
}
async function startGame() {
    console.log(chalk.bold.rgb(123, 45, 67)("\nWelcome, brave warrior, to the ultimate adventure!"));
    console.log(chalk.blue.bold("\nBefore you begin your quest, we need to know your name."));
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: chalk.cyan.bold("What shall we call you?"),
    });
    warriorName = name;
    console.log(chalk.bold(`\nWelcome, ${chalk.magenta.bold(warriorName)}!`));
    console.log(chalk.blue.bold(`\nYour journey begins now. Face the enemies and conquer them all!`));
    console.log(chalk.bold.hex("#3357FF")("You will encounter various enemies, including Zombie, Skeleton, and Assassin."));
    console.log(chalk.bold.hex("#3357FF")("Keep an eye on your health and use energy potions wisely to stay alive."));
    console.log(chalk.bold.hex("#3357FF")(`\nGood luck, ${warriorName}! May your courage and strength prevail\n`));
    console.log(chalk.bold.green("\nYour first enemy awaits...\n"));
    await displayStatus();
    showMenu();
}
startGame();
