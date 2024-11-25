# 🧂 salt
 🧂Salt is a Discord autmod library for the new Discord automod creation feature!

## Docs
https://salt.antibot.xyz
```js
const { Salt } = require("@antibot/salt");
const salted = new Salt("Discord Bot Token");
const util = require("util");

const main = async () => {
  console.log(await salted.automod.getRules("GuildID")).then((data) => {
    console.log(util.inspect(data, false, null, true));
  });
};

main().catch((e) => {
  console.log(util.inspect(e, false, null, true));
});
```
