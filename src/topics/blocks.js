const axios = require("axios");

//Send the Blocktime
async function showBlocktime(ctx, bot) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/blocks/tip/height");
        let data = res.data;
        await bot.telegram.sendMessage(
            ctx.chat.id,
            "โณCurrent Blocktime: " + data, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "๐ Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "๐ Back to Block Details",
                                callback_data: "blocks",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong ๐ง");
    }
}
//Return the latest confirmed Blocks
async function showLatestBlocks(ctx, bot) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/blocks/");
        let data = res.data;
        let date = Date.now();
        let message = ``;
        for (let i = 0; i < 10; i++) {
            message += `------\n๐ฆ Block: ${data[i].height}
๐งฎ Hash: ${data[i].id}
๐ Transactions: ${data[i].tx_count}
๐ธ Median Fee: ${data[i].extras.medianFee} sat
๐ Size: ${Math.round(data[i].size / 10000) / 100} MB
โ๏ธ Weight: ${Math.round(data[i].weight / 10000) / 100} MWU
๐ Timestamp: ${new Date(data[i].timestamp * 1000)} (~ ${Math.round(
        (date - data[i].timestamp * 1000) / 1000 / 60
      )} min ago)\n
๐ Total Fees: ${data[i].extras.totalFees} sat
๐ฐ Total Reward: ${
        (data[i].extras.reward + data[i].extras.totalFees) / 100000000
      }  BTC
โ Miner: ${data[i].extras.pool.name}\n
`;
        }

        await bot.telegram.sendMessage(
            ctx.chat.id,
            "Latest confirmed Blocks:\n" + message, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "๐ Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "๐ Back to Block Details",
                                callback_data: "blocks",
                            },
                        ],
                    ],
                },
            }
        );
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong ๐ง");
    }
}
module.exports = {
    showBlocktime,
    showLatestBlocks,
};