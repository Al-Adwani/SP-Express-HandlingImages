const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../db/models/User");


exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
    /*  const user = await User.findOne({ username: username });
    let passwordsMatch;
    if (user) {
      passwordsMatch = await bcrypt.compare(password, user.password);
      // TODO: compare password to authenticate user
    } else{
      passwordsMatch = false; 
    } */
  } catch (error) {
    done(error);
  }
});
