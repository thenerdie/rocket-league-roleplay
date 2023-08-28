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
    const serialized = JSON.stringify(this.data)

    fs.writeFileSync("./data.json", serialized, {
        encoding: "utf-8"
    })
}

SaveData.prototype.constructor = function() {
    let data

    try {
        data = fs.readFileSync("./data.json").toString()
        data = JSON.parse(data)
    } catch {
        console.log(chalk.yellow("Saved game data could not be loaded. Starting from a blank save..."))
    }

    if (data)
        Object.keys(data).forEach(key => {
            this.data[key] = data[key]
        })
}