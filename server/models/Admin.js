const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);



const Admin = model("Admin", adminSchema);

module.exports = Admin;
