const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "field name is required"]
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    bvn: {
      type: String
    },
  },
  {
    timestamps: true
  });

UserSchema.pre("save", async function (next) {
  try {
    const saltRounds = 10;
    let hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  } catch (error) {
    next(error)
  }
  next();
});

module.exports = mongoose.model("Users", UserSchema);
