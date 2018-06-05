module.exports = function () {

  const CryptoJS = require("crypto-js");
  const UserDAO = require('../DAO/UserDAO');

  return {

    checkCredentials : async function(username, userPass, callback){
      console.log(username);
      try {
        const user = await UserDAO.connection().findOne({username: username});

        if(user.password === userPass) {

          return callback(user);
        } else {
          return callback(new Error('userOrPasswordNotFound'));
        }
      }
      catch (er){
        return callback(new Error('userOrPasswordNotFound'));

      }
    }
  }
};

