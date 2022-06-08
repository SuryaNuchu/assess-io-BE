const express = require("express");
const cors = require("cors");

const Queue = require("bull");
const QueueMQ = require("bullmq").Queue;
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();

const { runCode } = require("./app/services/glotio");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const io = new Server(server, {
  cors: {
    // origin: "http://54.175.169.26:80",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// bull queue UI
const JobRunnerQueue = new Queue("job-runner-queue", {
  redis: { port: 6379, host: "127.0.0.1" },
});

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(JobRunnerQueue)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath("/admin/queues");
app.use("/admin/queues", serverAdapter.getRouter());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
// connect to DB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//routes
// require("./app/routes/job.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/answers.routes")(app);
require("./app/routes/studentService.routes")(app);
require("./app/routes/exam.routes")(app);

// socket
const SOCKET_PORT = process.env.SOCKET_PORT || 8085;
io.on("connection", (socket) => {
  socket.on("code", async (req) => {
    const { fileName, content, langSelected, input } = JSON.parse(req);
    const result = await runCode(
      fileName,
      JSON.stringify(content),
      langSelected,
      input
    );
    socket.emit("result", result);
  });
});

server.listen(SOCKET_PORT, () => {
  console.log(`Socket is running on port ${SOCKET_PORT}.`);
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Http Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "teacher",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
