//Axios Modul
const axios = require("axios");

//Return the Difficulty
async function showDifficulty(ctx, bot) {
    try {
        //API
        let res = await axios.get(
            "https://mempool.space/api/v1/difficulty-adjustment"
        );
        let data = res.data;
        let message = `Difficulty Adjustment:\n\n📊 Current Period: ${
      Math.round(data.progressPercent * 100) / 100
    } %\n\n📦 Remaining Blocks: ${
      data.remainingBlocks
    }\n\n🗒 Estimate Adjustment: ${
      Math.round(data.difficultyChange * 100) / 100
    } %\n\n🏁 Previous Retarget: ${
      Math.round(data.previousRetarget * 100) / 100
    } %\n`;
        await bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔙 Back to Total Overview", callback_data: "explorer" }],
                ],
            },
        });
        await ctx.answerCbQuery();
    } catch (error) {
        console.log(error);
        await ctx.reply("Something went wrong 🚧");
    }
}
module.exports = {
    showDifficulty,
};