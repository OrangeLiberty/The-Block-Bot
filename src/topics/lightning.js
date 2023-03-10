//Axios Modul
const axios = require("axios");
//Returns aggregate capacity and number of clearnet nodes per country. Capacity figures are in satoshis.
async function sendTopCountry(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/countries"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\nš Rank: ${i + 1}\nš Country: ${data[i].name.en}, ${
        data[i].name["pt-BR"]
      }, ${data[i].name.es}\nš Nodes: ${data[i].count}\nš Share: ${
        data[i].share
      }\nš° Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Capacity and Number of Clearnet Nodes per Country:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Lightning",
                                callback_data: "lightning",
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
//Return the latest Lightning Network Statistics
async function sendNetworkStats(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/statistics/latest"
        );
        let data = res.data.latest;
        let date = data.added.split("T")[0];
        let message = `\nā”ļø Nodes: ${data.node_count}\n\nš Channels: ${
      data.channel_count
    }\n\nš° Capacity: ${
      Math.round(data.total_capacity / 1000000) / 100
    }BTC\n\nš Average Capacity: ${
      data.avg_capacity
    } sat\n\nšø Average Fee Rate: ${
      data.avg_fee_rate
    } ppm\n\nāļø Average Base Fee: ${
      data.avg_base_fee_mtokens
    } ppm\n\nš¦ At the time: ${date}\n`;
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Lastest Network Statistics:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Lightning",
                                callback_data: "lightning",
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

//Return the TopLiquidityNodes
async function sendTopLiquidity(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/rankings/liquidity"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\nš Rank: ${i + 1}\nāļø Alias: ${
        data[i].alias
      }\nš° Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\nš Channels: ${data[i].channels}\nš First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\nš¦ Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\nš Public Key: ${data[i].publicKey}\nš Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Lightning",
                                callback_data: "lightning",
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
//Return the Top Channel Nodes
async function sendTopChannel(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/nodes/rankings/connectivity"
        );
        let data = res.data;
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\nš Rank: ${i + 1}\nāļø Alias: ${
        data[i].alias
      }\nš° Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\nš Channels: ${data[i].channels}\nš First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\nš¦ Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\nš Public Key: ${data[i].publicKey}\nš Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Lightning",
                                callback_data: "lightning",
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
    sendTopCountry,
    sendNetworkStats,
    sendTopLiquidity,
    sendTopChannel,
};