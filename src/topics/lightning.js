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
            message += `------\n🏆 Rank: ${i + 1}\n🌐 Country: ${data[i].name.en}, ${
        data[i].name["pt-BR"]
      }, ${data[i].name.es}\n📊 Nodes: ${data[i].count}\n🔄 Share: ${
        data[i].share
      }\n💰 Capacity: ${Math.round(data[i].capacity / 1000000) / 100} BTC\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Capacity and Number of Clearnet Nodes per Country:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Lightning",
                                callback_data: "lightning",
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
//Return the latest Lightning Network Statistics
async function sendNetworkStats(ctx, bot) {
    try {
        //API request
        let res = await axios.get(
            "https://mempool.space/api/v1/lightning/statistics/latest"
        );
        let data = res.data.latest;
        let date = data.added.split("T")[0];
        let message = `\n⚡️ Nodes: ${data.node_count}\n\n😎 Channels: ${
      data.channel_count
    }\n\n💰 Capacity: ${
      Math.round(data.total_capacity / 1000000) / 100
    }BTC\n\n📐 Average Capacity: ${
      data.avg_capacity
    } sat\n\n💸 Average Fee Rate: ${
      data.avg_fee_rate
    } ppm\n\n⚖️ Average Base Fee: ${
      data.avg_base_fee_mtokens
    } ppm\n\n🕦 At the time: ${date}\n`;
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Lastest Network Statistics:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Lightning",
                                callback_data: "lightning",
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
            message += `------\n🏆 Rank: ${i + 1}\n✍️ Alias: ${
        data[i].alias
      }\n💰 Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\n😎 Channels: ${data[i].channels}\n📅 First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\n🕦 Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\n🔑 Public Key: ${data[i].publicKey}\n🌐 Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Lightning",
                                callback_data: "lightning",
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
            message += `------\n🏆 Rank: ${i + 1}\n✍️ Alias: ${
        data[i].alias
      }\n💰 Capacity: ${
        Math.round(data[i].capacity / 1000000) / 100
      }BTC\n😎 Channels: ${data[i].channels}\n📅 First Seen: ${new Date(
        data[i].firstSeen * 1000
      )}\n🕦 Last Update: ${new Date(
        data[i].updatedAt * 1000
      )}\n🔑 Public Key: ${data[i].publicKey}\n🌐 Country: ${
        data[i].country.en
      }, ${data[i].country["pt-BR"]}, ${data[i].country.es}\n`;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Top Nodes by Liquidity:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "🔝 Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "🔙 Back to Lightning",
                                callback_data: "lightning",
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
    sendTopCountry,
    sendNetworkStats,
    sendTopLiquidity,
    sendTopChannel,
};