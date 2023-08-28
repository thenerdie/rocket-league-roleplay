import fs from "fs"
import chalk from "chalk"

export default function SaveData() {
    this.data = {
        friends: [],
        mmr: 600,
        winStreak: 0,
        name: "kisperal"
    }

    this.constructor()
}

SaveData.prototype.save = function() {

}

SaveData.prototype.constructor = function() {
    let data

    try {
        data = fs.readFileSync("./data.json").toString()
        data = JSON.parse(data)
    } catch {
        console.log(chalk.yellow("Saved game data could not be loaded. Starting from a blank save..."))
    }

    data?.keys().forEach(key => {
        this.data[key] = data[key]
    })
}