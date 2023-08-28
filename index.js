import 'dotenv/config'

import fs from "fs"
import generateCompletion from "./gpt.js"

import Game from "./states/inGame.js"

const mainMenuPrompt = fs.readFileSync("./prompts/mainMenu.txt").toString()

const gameState = {
    mmr: 600,
    winStreak: 0
}

async function main() {
    // const completion = await generateCompletion(inGamePrompt, "Generate a list of actions that the user could take from here.")

    const game = new Game("kispywispyUWU")

    await game.initialize()

    await game.renderRoleplay()
}

main()