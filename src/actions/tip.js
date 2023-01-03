const template = require("../topics/template");

module.exports = (bot) => {
    //Handle the Donation callback from total overview
    bot.action("tip", async(ctx) => {
        let message = `LNURL1DP68GURN8GHJ7MRW9E6XJURN9UH8WETVDSKKKMN0WAHZ7MRWW4EXCUP0X9URVCEEX4JX2CTRVY6RQDECX43KVVS5LKZ\n\nIf you 🧡 the bot, please consider supporting this project with a donation.\n\nLightning Adress: ⚡️stacksats@getalby.com\n\nThank you, very much appreciated!`;
        await bot.telegram.sendPhoto(ctx.chat.id, "https://imgur.com/a/p0J2Z0V", {
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