const { Permissions, MessageEmbed } = require("discord.js");
const { addPerms, listPerms } = require("../models/permissionsModel");

module.exports = {
  name: "words",
  aliases: "w",
  description: "Untuk memblacklist kata kata yang kurang sopan atau badword",
  execute(message, args, client) {
    if (message.author.bot) return;

    let section = args.slice(2).join(" ");

    if (!args[1]) {
      message.reply(
        "Use [ **Add** ] to add Blacklist Words \n" +
          "Use [ **List** ] to see Banned Wordlist here \n" +
          "Try use **Help commands** for more informations!"
      );
    }

    if (args[1]) {
      if (args[1].toLowerCase() == "add") {
        if (!args[2]) {
          message.reply(
            `Insert words you want to blacklist \nExample : fck, btch, nibba, etc`
          );
        } else {
          if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            addPerms(message.guild.id, section, (callback) => {
              message.channel.send(`${section} \n${callback}`);
            });
            console.log(
              `${message.author.tag} menambahkan ${section} ke dalam blacklist`
            );
          } else {
            message.reply(`No Access Granted!`);
          }
        }
        return;
      }

      if (args[1].toLowerCase() == "list") {
        listPerms((data) => {
          Object.keys(data).map((key) => {
            if (data[key].id_guild == message.guild.id) {
              wordlist = data[key].words.wordss;

              const permlist = new MessageEmbed()
                .setColor("#F0F0F0")
                .setTitle("Permissions Informations")
                .setDescription("List Words Which Banned In This Server...")
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .addField("Banned Words", wordlist, true)
                .setTimestamp()
                .setFooter(`${client.user.username}`);

              message.channel.send({ embeds: [permlist] });
            }
          });
        });
      }
      return;
    }
  },
};
