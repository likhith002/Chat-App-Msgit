const mongoose = require("mongoose");

const connect = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`Mpngo Atlas Connected ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = { connect };
