const mongoose = require("mongoose");

const URI =
  "mongodb+srv://Saumil123:Saumil123@cluster0.8e0yq.mongodb.net/Splitwise?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const mongoConnection = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

module.exports = mongoConnection;
