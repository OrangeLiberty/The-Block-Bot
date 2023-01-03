const axios = require("axios");

//Return recommended Fees
async function showFee(ctx, bot) {
    try {
        //API
        let res = await axios.get("https://mempool.space/api/v1/fees/recommended");
        let data = res.data;
        let message = `Currently suggested fees for new transactions:\n\n😎 Min: ${data.minimumFee} sat/vB\n\n🐌Slow: ${data.hourFee} sat/vB\n\n🏄🏿‍♀️ Medium: ${data.halfHourFee} sat/vB\n\n🚀Fast: ${data.fastestFee} sat/vB\n`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔙 Back to Explorer",
                        callback_data: "explorer",
                    }, ],
                ],
            },
        });
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}

module.exports = { showFee };