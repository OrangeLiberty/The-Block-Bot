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
        let message = `\nš§® Real time Hashrate: ${
      Math.round(data.currentHashrate / 1000000000000) / 100
    } Terahash/sec\nš Real time Difficulty: ${data.currentDifficulty}\n`;
        for (let i = 0; i < 3; i++) {
            message += `\nš Average Hashrate: ${
        Math.round(data.hashrates[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\nš Timestamp: ${new Date(
        data.hashrates[i].timestamp * 1000
      )}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Network-wide Hashrate:\n(Over the last 3 days)\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
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
        let message = `\nš© Blocktime Start: ${
      data.startBlock
    }\nš Blocktime End: ${data.endBlock}\n\nš Total Transactions: ${
      data.totalTx
    }\nš° Total Reward: ${data.totalReward / 100000000} BTC\nšø Total Fees: ${
      data.totalFee / 100000000
    } BTC\n`;

        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Rewards past 144 Blocks:\n(~1 day)\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
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
            message += `------\nāļø Name: ${data[i].poolName}\nš Share: ${
        Math.round(data[i].share * 10000) / 100
      }%\nš§® Hashrate: ${
        Math.round(data[i].avgHashrate / 1000000000000) / 100
      } Terahash/sec\nš Timestamp: ${time}\n `;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Average Hashrates and share of total hashrate of Mining Pools for 1 Month:\n(In descending order of hashrate)\n" +
            message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
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
            message += `------\nš Rank: ${data[i].rank}\nāļø Name: ${data[i].name}\nš¦ Blocks found: ${data[i].blockCount}\nš Empty Blocks: ${data[i].emptyBlocks}\nš Link: ${data[i].link}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Mining Pools ordered by blocks found in the last week:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Mining",
                                callback_data: "mining",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
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
        let message = `āļø Name: ${data.pool.name}\nš Link: ${data.pool.link}\nš¦ Block Count:\nAll: ${data.blockCount.all} 1W: ${data.blockCount["1w"]} 24h: ${data.blockCount["24h"]}\nš§® Hashrate: ${data.estimatedHashrate} Hashes/sec\n`;
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
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Pools",
                                callback_data: "poolDetail",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
    }
}

module.exports = {
    showHashrate,
    showRewardStats,
    showPoolHashrate,
    showPoolBlocks,
    showPool,
};