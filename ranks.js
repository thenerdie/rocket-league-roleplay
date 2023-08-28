const mmrMap = [
    { name: "Supersonic Legend", minRating: 1861 },
    { name: "Grand Champion III", minRating: 1715 },
    { name: "Grand Champion II", minRating: 1575 },
    { name: "Grand Champion I", minRating: 1424 },
    { name: "Champion III", minRating: 1302 },
    { name: "Champion II", minRating: 1181 },
    { name: "Champion I", minRating: 1061 },
    { name: "Diamond III", minRating: 981 },
    { name: "Diamond II", minRating: 901 },
    { name: "Diamond I", minRating: 821 },
    { name: "Platinum III", minRating: 761 },
    { name: "Platinum II", minRating: 701 },
    { name: "Platinum I", minRating: 641 },
    { name: "Gold III", minRating: 581 },
    { name: "Gold II", minRating: 521 },
    { name: "Gold I", minRating: 461 },
    { name: "Silver III", minRating: 401 },
    { name: "Silver II", minRating: 342 },
    { name: "Silver I", minRating: 288 },
    { name: "Bronze III", minRating: 226 },
    { name: "Bronze II", minRating: 163 },
    { name: "Bronze I", minRating: 0 }
]

function lerp(a, b, alpha) {
    return a + (b - a) * alpha
}

export function getRankForMMR(mmr) {
    let rankIndex = 0

    for (let rank of mmrMap) {
        if (mmr < rank.minRating) {
            rankIndex++
            continue
        }

        let division = 1

        if (rank.name !== "Supersonic Legend") {
            const percentageIncrease = 25
            let percentageToNextRank = percentageIncrease

            let prevThreshold

            while (percentageToNextRank <= 75) {
                let divisionThreshold = lerp(prevThreshold || rank.minRating, mmrMap[rankIndex - 1].minRating, percentageToNextRank / 100)

                if (mmr >= divisionThreshold) {
                    division++
                    percentageToNextRank += percentageIncrease
                    prevThreshold = divisionThreshold
                } else {
                    break
                }
            }
        }

        return {
            name: rank.name,
            division: division
        }
    }
}