const faker = require("faker");

const db = require("../config/connection");
const { Ticket, User, Admin } = require("../models");

db.once("open", async () => {
  await Ticket.deleteMany({});
  await User.deleteMany({});
  await Admin.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const unit = ""+i
    console.log(`unit ${unit}`)
    const email = faker.internet.email(unit);
    const password = faker.internet.password();

    userData.push({ unit, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  // create ticket
  let createdTickets = [];
  for (let i = 0; i < 100; i += 1) {
    const message = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const title = faker.lorem.words(Math.round(Math.random() * 10) + 1);
    const isPrivate = Math.random() > 0.5 ? true : false; // (max - min +1) + min
    console.log(`isPrivate ${isPrivate}`);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { unit, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdTicket = await Ticket.create({
      message,
      unit,
      title,
      isPrivate,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { tickets: createdTicket._id } }
    );

    createdTickets.push(createdTicket);
  }

  console.log("all done!");
  process.exit(0);
});
