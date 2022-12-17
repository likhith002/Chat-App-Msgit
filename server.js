const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("./Backend/Config/dbconnection");
const userRoutes = require("./Backend/Routes/userRoutes");
const chatRoutes = require("./Backend/Routes/chatRoutes");
const messageRoutes = require("./Backend/Routes/messageRoutes");
const {
  notFound,
  errorHandler,
} = require("./Backend/Middlewares/errorMiddleware");
const path = require("path");
//for .env file

app.use(cors());
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Start the express server

// app.get("/api/chat/:id", (req, res) => {});

// app.get("/", (req, res) => {
//   res.send("backend runnung");
// });
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//Deploy the app

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  return console.log(`server started at port ${PORT}`);
});

//Initiate connection with Database

connect();

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connection");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined a room", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("users are not there in chat");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("disconnected ...");
    socket.leave(userData._id);
  });
});
