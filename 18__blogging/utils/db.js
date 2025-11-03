import mongoose from "mongoose";

function connectToDB(dbUrl) {
  return mongoose.connect(dbUrl);
}

export { connectToDB };
