const { Permissions } = require("discord.js");

module.exports = {
  name: "clear",
  aliases: "c",
  cooldown: "5",
  description: "purge chat max 10 chat",
  execute(message, args) {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      if (args[1] < 11) {
        message.channel.bulkDelete(args[1]).then(() => {
          message.channel.send(`Deleted ${args[1]} messages.`).then((msg) => {
            setTimeout(() => msg.delete(), 2000);
          });
          console.log(`sucess delete ${args[1]} message`);
        });
      } else {
        return message.channel
          .send(`Masukkan jumlahnya, Max :10`)
          .then((msg) => {
            setTimeout(() => msg.delete(), 2000);
          });
      }
    } else {
      message.channel.send("This commands can used by **Moderators** only");
    }
  },
};
