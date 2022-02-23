const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
    { // the mongo collection will hold all userIds for any admins inserted into
        // the collection. This is how we differentiate regular users from admins.
        // If your ID is not in this collection -> then you are not admin.
        userId: { 
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            // allows us to use virtual, "functions", but we are not currently using them
            virtuals: true
        }
    }
);

const Admin = model("Admin", adminSchema);
module.exports = Admin;
