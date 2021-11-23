const { Permissions, MessageEmbed } = require("discord.js");
const { Prefix, addPrefix } = require("../models/prefixModel");
const { globalPrefix } = require("../config/config.json");

module.exports = {
  name: "prefix",
  aliases: "sp",
  description: "test doang",
  execute(message, args, client) {
    // return console.log(client);
    if (message.author.bot) return;

    //Memasukkan data ke dalam database Firebase
    if (args[1]) {
      if (args[1].length > 3) return message.reply(`Max 3 Character`);
      if (args[1].length < 4) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          addPrefix(`${message.guild.id}`, args[1], (callback) =>
            message.reply(callback)
          );
        } else {
          return message.reply(`No Access granted!`);
        }
      }
    }
    //Check prefix dalam database firebase
    let prefix = globalPrefix;
    if (!args[1]) {
      Prefix((data) => {
        Object.keys(data).map((key) => {
          if (data[key].id_guild === `${message.guild.id}`) {
            prefix = data[key].prefix;
            // console.log(`true ${prefix}`);

            // Embed Messages Setup
            const msgembed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Prefix Help")
              .setDescription("Checking Prefix in this server...")
              .setThumbnail(client.user.displayAvatarURL())
              .addFields(
                {
                  name: "Default Prefix",
                  value: `**${globalPrefix}**`,
                  inline: true,
                },
                { name: "Server Prefix", value: `**${prefix}**`, inline: true }
              )
              .setTimestamp()
              .setFooter(`${client.user.username}`);
            message.channel.send({ embeds: [msgembed] });
          }
        });
      });
    }

    //Cek ketika belum punya prefix server
    if (!args[1]) {
      message.reply(`Bot prefix is [ **${prefix}** ]`).then((msg) => {
        setTimeout(() => msg.delete(), 2000);
      });
    }
  },
};
