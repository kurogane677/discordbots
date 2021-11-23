const firebase = require("../credentials/firebaseConfig");

//Function mengambil prefix
const Prefix = (callback) => {
  firebase.ref(`guild`).once(
    "value",
    (snapshot) => {
      callback(snapshot.val());
    },
    (err) => {
      console.log("Error ", err.name);
    }
  );
};

//Function untuk menambahkan prefix
const addPrefix = (id_guild, prefix, callback) => {
  //Check data prefix
  firebase.ref(`guild/${id_guild}`).set({
    id_guild,
    prefix,
  });
  callback(`Prefix changed, this prefix server is [ **${prefix}** ]`);
  console.log(`executed!`);
};

module.exports = { Prefix, addPrefix };
