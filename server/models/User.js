const { Schema, model, ObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const { ticketSchema } = require("./Ticket");

const userSchema = new Schema(
  {
    unit: { // the unit number acts as a username. It identifies the user and there unit number
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: { // a hash of the password
      type: String,
      required: true,
      minlength: 5,
    },
    tickets: [ObjectId] // anh array of ticket IDs associated with this single user
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

// Compare the incoming password with the hashes password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;
