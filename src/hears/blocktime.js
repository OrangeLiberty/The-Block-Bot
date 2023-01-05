const axios = require("axios");

module.exports = (bot) => {
    //Enter Blocktime to get BlockHash
    bot.hears(/^[1-9][0-9]{0,5}$/gm, async(ctx) => {
        try {
            let blockTime = ctx.match[0];
            //API
            let res = await axios.get(
                `https://mempool.space/api/block-height/${blockTime}`
            );
            let data = res.data;
            let message = `⏳ Blocktime: ${blockTime}\n\n🧮Hash: ${data}`;
            await bot.telegram.sendMessage(ctx.chat.id, message, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔙 Back to Block Infomation",
                            callback_data: "blocks",
                        }, ],
                    ],
                },
            });
        } catch (error) {
            console.log(error);
            await ctx.reply("Something went wrong 🚧");
        }
    });
};