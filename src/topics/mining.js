//Axios Modul
const axios = require("axios");

//Return Hashrates
async function showHashrate(ctx, bot) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/hashrate/3d"
        );
        let data = res.data;
        let message = `\n🧮 Real time Hashrate: ${
      Math.round(data.currentHashrate / 1000000000000) / 100
    } Terahash/sec\n📊 Real time Difficulty: ${data.currentDifficulty}\n`;
        for (let i = 0; i < 3; i++) {
            message += `\n📐 Average Hashrate: ${
        Math.round(data.hashrates[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\n📅 Timestamp: ${new Date(
        data.hashrates[i].timestamp * 1000
      )}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Network-wide Hashrate:\n(Over the last 3 days)\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Return the Mining reward stats
async function showRewardStats(ctx, bot) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/reward-stats/144"
        );
        let data = res.data;
        let message = `\n🚩 Blocktime Start: ${
      data.startBlock
    }\n🏁 Blocktime End: ${data.endBlock}\n\n📝 Total Transactions: ${
      data.totalTx
    }\n💰 Total Reward: ${data.totalReward / 100000000} BTC\n💸 Total Fees: ${
      data.totalFee / 100000000
    } BTC\n`;

        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Rewards past 144 Blocks:\n(~1 day)\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Return the Pool Hashrates
async function showPoolHashrate(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/mining/hashrate/pools/1m"
        );
        let data = res.data;
        let timeStamp = data[0].timestamp * 1000;
        let time = new Date(timeStamp);
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\n✍️ Name: ${data[i].poolName}\n🔄 Share: ${
        Math.round(data[i].share * 10000) / 100
      }%\n🧮 Hashrate: ${
        Math.round(data[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\n📅 Timestamp: ${time}\n `;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Average Hashrates and share of total hashrate of Mining Pools for 1 Month:\n(In descending order of hashrate)\n" +
            message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}

//Return the BlocksFound by Pools
async function showPoolBlocks(ctx, bot) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/mining/pools/1w");
        let data = res.data.pools;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\n🏆 Rank: ${data[i].rank}\n✍️ Name: ${data[i].name}\n📦 Blocks found: ${data[i].blockCount}\n🗑 Empty Blocks: ${data[i].emptyBlocks}\n🔗 Link: ${data[i].link}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Pools ordered by blocks found in the last week:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
//Return the Poolslug Details
async function showPool(ctx, bot) {
    try {
        let pool = ctx.match[0];
        let res = await axios.get(
            `https://mempool.space/api/v1/mining/pool/${pool}`
        );
        let data = res.data;
        console.log(data);
        let message = `✍️ Name: ${data.pool.name}\n🔗 Link: ${data.pool.link}\n📦 Block Count:\nAll: ${data.blockCount.all} 1W: ${data.blockCount["1w"]} 24h: ${data.blockCount["24h"]}\n🧮 Hashrate: ${data.estimatedHashrate} Hashes/sec\n`;
        let adresses = ``;
        let i = 0;
        for (const item of data.pool.addresses) {
            adresses += `${item}\n`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Pool Information:\n\n" + message + "Known Adresses:\n" + adresses, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Pools",
                                callback_data: "poolDetail",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}

module.exports = {
    showHashrate,
    showRewardStats,
    showPoolHashrate,
    showPoolBlocks,
    showPool,
};