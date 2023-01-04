module.exports = (bot) => {
    //Start Command
    bot.command("start", async(ctx) => {
        let userName = ctx.message.from.first_name;
        let startMessage = `👋Welcome ${userName}!\n\n🔍This Block Explorer provides you with Information about the Bitcoin Blockchain.\n\n
🫵 You can check:\n\n🚦 The current transaction traffic\n🧮 How high is the hashrate?\n🤷🏽‍♂️ What is the recommended fee?\n⏳ What Blocktime is it?\n👀 Is your transaction already confirmed?\n🚀 And much more...\n\n⚙️ Commands:\n\n/start 📚 Start from the beginning.\n/explorer 🔭 Discover the Mempool.\n/help 📖 Read this help.\n/tip 🧡 Support the work.\n\n👋 Join us for feedback on https://t.me/+RKtnoB4n1ys0ZWNi
`;
        await ctx.reply(startMessage);
        console.log(
            ctx.message.from.first_name + " from " + ctx.message.from.language_code
        );
    });
};