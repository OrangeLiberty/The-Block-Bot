//Axios Modul
const axios = require("axios");

//Return the current  Backlog
async function sendBacklog(ctx, bot) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/mempool");
        let data = res.data;

        let weight = Math.round(data.vsize / 1000000) / 100;
        let fees = Math.round(data.total_fee / 1000000) / 10000;
        let message = `Current Backlog Statistics:\n\nš¦ Waiting Transactions: ${data.count}\n\nāļø Total size: ${weight} MWU\n\nšø Total fees: ${fees} BTC`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: "š Back to Top",
                            callback_data: "explorer",
                        },
                        {
                            text: "š Back to Mempool",
                            callback_data: "mempool",
                        },
                    ],
                ],
            },
        });
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
    }
}
//Returns upcoming blocks
async function sendProjectedBlocks(ctx, bot) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/fees/mempool-blocks"
        );
        let data = res.data;
        let message = ``;
        let i = 1;
        for (const item of data) {
            message += `------\nš¦ Block: ${i}\nš Size: ${
        Math.round(item.blockSize / 10000) / 100
      } MB\nāļø Weight: ${
        Math.round(item.blockVSize / 10000) / 100
      } MWU\nš Tx-count: ${item.nTx}\nš Total fees: ${
        Math.round(item.totalFees / 1000000) / 10000
      } BTC\nš° Median fee: ${Math.round(item.medianFee * 100) / 100} sat/vB\n`;
            i++;
        }
        await bot.telegram.sendMessage(
            ctx.chat.id,
            `Tick Tock next Block:\n${message}`, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: "š Back to Top",
                                callback_data: "explorer",
                            },
                            {
                                text: "š Back to Mempool",
                                callback_data: "mempool",
                            },
                        ],
                    ],
                },
            }
        );
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong š§");
    }
}

module.exports = {
    sendBacklog,
    sendProjectedBlocks,
};