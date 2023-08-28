import fs from "fs"
import generateCompletion from "../gpt.js"

import chalk from 'chalk';

import inquirer from 'inquirer';

import { getRankForMMR } from "../ranks.js";

const inGamePrompt = fs.readFileSync("./prompts/inGame.txt").toString()

export default function Game(playerData) {
    this.state = {
        score: [0, 0], // 0 is blue, 1 is orange
        clock: "5:00",
        playerName: playerData.name,
        playerNames: [["Player1", "Player2"], ["Player3", "Player4"]],
        actionHistory: [],
        mmr: playerData.mmr,
        winStreak: playerData.winStreak
    }
}

Game.prototype.generateUsernames = async function() {
    const playerNameCompletion = await generateCompletion("You are a username generator. Be creative with usernames, and generate names in varying styles per matchup, including informal and silly usernames such as BOS CHUNGO and imnotsmurfingXD. Usernames can have spaces, too!", `Generate usernames for players in a 2v2 team, with one player being ${this.state.playerName}. Your response must be in JSON format with no other text.` + 
    "It must be a two-dimensional array that follows the format [[Player1, Player2], [Player3, Player4]]. Don't make the other names too similar to the player's name, but MAKE THE NAMES REALISTIC! They should be very random, sometimes silly, sometimes creative, and sometimes just plain weird. They should reflect how most Epic Games players would name themselves.")

    const playerNames = JSON.parse(playerNameCompletion)

    return playerNames
}

Game.prototype.generateRoleplay = async function() {
    const rank = getRankForMMR(this.state.mmr)

    const roleplayCompletion = await generateCompletion(inGamePrompt, `Generate a roleplay completion! Make sure to follow the proper format! The current match state is as follows: ${JSON.stringify(this.state)}. The player's rank is ${rank.name} Division ${rank.division}`)

    // console.log(roleplayCompletion)

    const roleplay = JSON.parse(roleplayCompletion)

    this.state.score = roleplay.state.score
    this.state.clock = roleplay.state.clock

    this.state.actionHistory.push(roleplayCompletion)

    return roleplay
}

Game.prototype.initialize = async function() {
    const names = await this.generateUsernames()

    this.state.playerNames = names
}

Game.prototype.submitPlayerAction = function(action) {
    this.state.actionHistory.push(action)
}

Game.prototype.renderRoleplay = async function() {
    const roleplay = await this.generateRoleplay()

    console.log(chalk.greenBright(`${roleplay.state.clock}`) + " | " + chalk.blue(`[${this.state.score[0]}] ${this.state.playerNames[0].join(", ")}`) + " vs " + chalk.yellow(`${this.state.playerNames[1].join(", ")} [${this.state.score[1]}]`))

    if (!roleplay.isGameOver) {
        const action = await inquirer.prompt([
            {
                type: "list",
                name: "playerAction",
                message: roleplay.story,
                choices: roleplay.actions
            }
        ])

        this.submitPlayerAction(action)

        await this.renderRoleplay(this)
    } else {
        console.log(roleplay.story)
    }
}

Game.prototype.generatePostGameSummary = function() {

}