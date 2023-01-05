const template = require("../topics/template");

module.exports = (bot) => {
    //Handle the Donation callback from total overview
    bot.action("tip", async(ctx) => {
        let message = `LNURL1DP68GURN8GHJ7MR9VAJKUEPWD3HXY6T5WVHXXMMD9AKXUATJD3CZ7CTSDYHHVVF0D3H82UNV9UMNSDFHX5JDJKDM\n\nIf you 🧡 the bot, please consider supporting this project with a donation.\n\nLightning Adress: ⚡️stacksats@getalby.com\n\nThank you, very much appreciated!`;
        await bot.telegram.sendPhoto(ctx.chat.id, "https://imgur.com/fQDUS0N", {
            caption: { text: message },
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔙 Back to Total Overview",
                        callback_data: "explorer",
                    }, ],
                ],
            },
        });
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
    });
};