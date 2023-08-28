import 'dotenv/config'

import fs from "fs"
import generateCompletion from "./gpt.js"

import Game from "./states/inGame.js"

const mainMenuPrompt = fs.readFileSync("./prompts/mainMenu.txt").toString()

const playerData = {
    mmr: 800,
    winStreak: 0,
    name: "kisperal"
}

async function main() {
    // const completion = await generateCompletion(inGamePrompt, "Generate a list of actions that the user could take from here.")

    const game = new Game(playerData)

    await game.initialize()

    await game.renderRoleplay()
}

main()