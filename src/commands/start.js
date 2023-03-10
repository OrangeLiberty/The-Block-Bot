module.exports = (bot) => {
    //Start Command
    bot.command("start", async(ctx) => {
        let userName = ctx.message.from.first_name;
        let startMessage = `๐<b>Welcome ${userName}!</b>\n\n๐This Block Explorer provides you with Information about the Bitcoin Blockchain.\n\n
๐ซต <b>You can check:</b>\n\n๐ฆ <i>The current transaction traffic.</i>\n๐งฎ <i>How high is the hashrate?</i>\n๐คท๐ฝโโ๏ธ <i>What is the recommended fee?</i>\nโณ <i>What Blocktime is it?</i>\n๐ <i>Is your transaction already confirmed?</i>\n๐ <i>And much more...</i>\n\nโ๏ธ <b><u>Commands:</u></b>\n/start ๐ Start from the beginning.\n/explorer ๐ญ Discover the Bitcoin Blockchain.\n/help ๐ Read this help.\n/tip ๐งก Support the work.\n\n๐ฅ <b><u>Inline Commands:</u></b>\n<pre>@the_blockbot</pre>\n<b>... blocktime</b> - โณ Send current blocktime to chat.\n<b>... difficulty</b> - โ๏ธ Send Difficulty Adjustment to a chat.\n<b>... backlog</b> - ๐ Send current Mempool Backlog to a chat.\n<b>... fee</b> - ๐ธ Send recommended fee to a chat.\n<b>... &lt;Node PubKey&gt;</b> - ๐ Send node details to a chat.\n<b>... &lt;18 digit Channel-ID&gt;</b> - ๐ Send LN Channel details to a chat.\n<b>... halving</b> - โฐ Send Halving Informations to a chat.\n\nโ๏ธ<u>Note:</u> You can use inline commands in every chat, even in private conversations. Just, wait a second after entering an inline command. Click the result afterwards, don't press enter!\n\n<i>Join us for feedback on https://t.me/+RKtnoB4n1ys0ZWNi</i>`;
        await bot.telegram.sendMessage(ctx.chat.id, startMessage, {
            parse_mode: "HTML",
        });
        console.log(
            ctx.message.from.first_name + " from " + ctx.message.from.language_code
        );
    });
};