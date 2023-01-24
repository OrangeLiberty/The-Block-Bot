module.exports = (bot) => {
    //Start Command
    bot.command("start", async(ctx) => {
        let userName = ctx.message.from.first_name;
        let startMessage = `👋<b>Welcome ${userName}!</b>\n\n🔍This Block Explorer provides you with Information about the Bitcoin Blockchain.\n\n
🫵 <b>You can check:</b>\n\n🚦 <i>The current transaction traffic.</i>\n🧮 <i>How high is the hashrate?</i>\n🤷🏽‍♂️ <i>What is the recommended fee?</i>\n⏳ <i>What Blocktime is it?</i>\n👀 <i>Is your transaction already confirmed?</i>\n🚀 <i>And much more...</i>\n\n⚙️ <b><u>Commands:</u></b>\n/start 📚 Start from the beginning.\n/explorer 🔭 Discover the Bitcoin Blockchain.\n/help 📖 Read this help.\n/tip 🧡 Support the work.\n\n🔥 <b><u>Inline Commands:</u></b>\n<pre>@the_blockbot blocktime</pre> - ⏳ Send current blocktime to chat.\n<pre>@the_blockbot difficulty</pre> - ⚙️ Send Difficulty Adjustment to a chat.\n<pre>@the_blockbot backlog</pre> - 📝 Send current Mempool Backlog to a chat.\n<pre>@the_blockbot fee</pre> - 💸 Send recommended fee to a chat.\n<pre>@the_blockbot &lt;Node PubKey&gt;</pre> - 🔎 Send node details to a chat.\n<pre>@the_blockbot &lt;18 digit Channel-ID&gt;</pre> - 📊 Send LN Channel details to a chat.\n\n❗️<u>Note:</u> You can use inline commands in every chat, even in private conversations. Just, wait a second after entering an inline command. Click the result afterwards, don't press enter!\n\n<i>Join us for feedback on https://t.me/+RKtnoB4n1ys0ZWNi</i>`;
        await bot.telegram.sendMessage(ctx.chat.id, startMessage, {
            parse_mode: "HTML",
        });
        console.log(
            ctx.message.from.first_name + " from " + ctx.message.from.language_code
        );
    });
};