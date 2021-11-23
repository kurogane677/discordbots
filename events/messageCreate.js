const { Prefix } = require("../models/prefixModel");
const commands = require("../config/commandHandler");
const { globalPrefix } = require("../config/config.json");
const { listPerms, links } = require("../models/permissionsModel");

// Note untuk Saya :
// Hindari pemakaian double function di folder commands
// Jangan buat function atau variable dengan nama absurd atau aneh
// Yang pertama di execute messageCreate.js baru commands yang di eksekusi

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    let args = "";
    let pemisah = "";
    let prefix = globalPrefix;

    //Check banned link dalam database fireabse
    links((data) => {
      Object.keys(data).map((key) => {
        if (`${message.guild.id}` == data[key].id_guild) {
          if(!data[key].denied.links) return;

          if (!message.content.startsWith(prefix)){

            let link = data[key].denied.links.split(" ");
            let allowed = data[key].allowed.links.split(" ");
            // console.log(`if true ${link}`);
            const linkdenied = link.findIndex(arguments => `${message.content}`.toLowerCase().includes(arguments));
            const allow = allowed.findIndex(arguments => `${message.content}`.toLowerCase().includes(arguments));
            // Mengcompare datanya jika True maka akan di delete pesannya
            if (message.author.id == message.guild.ownerId) return;
            
            if(link[linkdenied] && !allowed[allow]) message.delete();
            if(link[linkdenied] && allowed[allow]) console.log(`${message.author.tag} Send link at ${message.channel.name}`);
          }
              
            // }else{
                //  console.log(`${message.author.username} Send link at ${message.channel.name}}`)
          // }return
        }
      });
    });

    //Check prefix dalam database firebase
    Prefix((data) => {
      Object.keys(data).map((key) => {
        if (`${message.guild.id}` == data[key].id_guild) {
          prefix = data[key].prefix;
          // console.log(`if true ${prefix}`);
          return newpref();
        } else {
          return oldpref();
        }
      });
    });

    //function jika sudah punya prefix baru
    const newpref = () => {
      if (message.content.startsWith(prefix)) {
        // console.log(`Args ${prefix}`);
        args = message.content
          .toLowerCase()
          .substring(prefix.length)
          .split(" ");
      }
      if (!message.content.startsWith(prefix)) return listPerms;

      if (args == "") return;
      if (commands.has(args[0])) {
        return commands.get(args[0]).execute(message, args, client, prefix);
        // console.log(prefix);
      }
    };
    //
    //function jika belum di set prefixnya
    const oldpref = () => {
      if (message.content.startsWith(prefix)) {
        // console.log(`Args ${prefix}`);
        args = message.content
          .toLowerCase()
          .substring(prefix.length)
          .split(" ");
      }
      if (!message.content.startsWith(prefix)) return;

      if (args == "") return;
      if (commands.has(args[0])) {
        return commands.get(args[0]).execute(message, args, client, prefix);
        // console.log(prefix);
      }
    };
    //

    //Mencari kata kata badword yang dilarang dalam firebase
    listPerms((data) => {
      Object.keys(data).map((key) => {
        if (data[key].id_guild == message.guild.id) {
          if (!message.content.startsWith(prefix)) {
            // Mengambil data dari firebase
            pemisah = data[key].words.wordss.split(" ");
            // Membuat index untuk mencari array dan mencocokkan dengan pesan
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
            const index = pemisah.findIndex(arguments => arguments == `${message.content}`);
            // Mengcompare datanya jika True maka akan di delete pesannya
            if (message.author.id == message.guild.ownerId) return;
            
            if(pemisah[index])  message.delete();
          }
        }
      });
    });
  },
};
