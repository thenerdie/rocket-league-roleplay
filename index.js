import 'dotenv/config'

import fs from "fs"
import generateCompletion from "./gpt.js"

import chalk from "chalk"

import inquirer from 'inquirer';

import SaveData from "./saveData.js"
import Game from "./states/inGame.js"

import { getRankForMMR } from "./ranks.js"
import { on } from 'events';

const mainMenuPrompt = fs.readFileSync("./prompts/mainMenu.txt").toString()

const saveData = new SaveData()

const options = {
    "ranked": "Play a ranked match",
    "freeplay": "Head over to freeplay to up your skill!",
    "rank": "Shows your current MMR/rank."
}

async function main() {
    // const completion = await generateCompletion(inGamePrompt, "Generate a list of actions that the user could take from here.")

    const choice = await inquirer.prompt([
        {
            "type": "list",
            "name": "selection",
            "message": "You are at the main menu. What would you like to do?",
            "choices": Object.values(options)
        }
    ])

    switch (choice.selection) {
        case options.ranked:
            const game = new Game(saveData.data)

            await game.initialize()
            await game.renderRoleplay()

            main()

            break
        case options.rank:
            const rank = getRankForMMR(saveData.data.mmr)

            console.log(`Your current MMR is ${saveData.data.mmr}, which is equivalent to a rank of ${rank.name} Division ${rank.division}.`)

            main()

            break
    }
}

function onExit() {
    saveData.save()
}

process.on("exit", onExit)

main()