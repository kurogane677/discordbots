const firebase = require("../credentials/firebaseConfig");

const listPerms = (callback) => {
  firebase.ref(`permissions`).once(
    "value",
    (snapshot) => {
      callback(snapshot.val());
    },
    (err) => {
      console.log("Error ", err.name);
    }
  );
};

const addPerms = (id_guild, wordss, callback) => {
  firebase.ref(`permissions/${id_guild}/`).set({
    id_guild,
  });
  firebase.ref(`permissions/${id_guild}/denied`).set({
    links: "",
  });
  firebase.ref(`permissions/${id_guild}/allowed`).set({
    links: "",
  });

  firebase.ref(`permissions/${id_guild}/words/`).set(
    {
      wordss,
    },
    callback(`Added to blacklist words!`)
  );
};

const addLinks = (id_guild, links, relink, callback) => {
  firebase.ref(`permissions/${id_guild}/denied`).set({
    links,
  });
  firebase.ref(`permissions/${id_guild}/allowed`).set({
    links: relink,
  });
  callback(`Permission Link approved!`);
};

const links = (callback) => {
  firebase.ref(`permissions`).once(
    "value",
    (snapshot) => {
      callback(snapshot.val());
    },
    (err) => {
      console.log("Error ", err.name);
    }
  );
};

module.exports = { listPerms, addPerms, addLinks, links };
