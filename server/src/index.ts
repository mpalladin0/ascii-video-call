// /**
//  * WORKING CODE
//  */
// import express from 'express';
// import path from "path";

// const app = express()
// const port = 3001;

// app.use('/', express.static(path.join(__dirname, 'public')))
// app.use('/static', express.static(path.join(path.resolve("../dist"))))
// console.log(path.resolve("../dist"));


// app.listen(port, () => {
//     console.log(`Client listening on ${port} `)
// })

import { Server } from 'socket.io';
import { createServer } from "http";
import express from 'express';
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://ascii.michaelpalladino.io"],
    credentials: false
  }
});

server.listen(443, () => {
  console.log("Listening on port ", 443)
})

io.listen(server);

app.use('/', express.static(path.join(__dirname, 'public')))

// app.use('/', express.static(path.join(path.resolve("../dist"))))
app.use('/static', express.static(path.join(path.resolve("../dist"))))


io.on("connection", (socket) => {
  // console.log("Socket connected!", socket.id)  
  socket.join("feed")

  socket.on("frame-update", (socketId: string, frame: string) => {
    // console.log("frame update", socketId);
    // socket.to("feed").emit("frame update", socketId, frame);
    socket.broadcast.emit("frame update from user");

    io.emit("frame update from server", socketId, frame)
  })

  socket.on("disconnect", () => {
    // console.log("disconnect event")
    socket.broadcast.emit("disconnect event", socket.id);
  })
});

// io.on("connection", (socket) => {
//   console.log("Socket connected!", socket.id)  
//   socket.join("feed")

//   socket.on("frame-update", (socketId: string, frame: string) => {
//     // console.log("frame update", socketId);
//     // socket.to("feed").emit("frame update", socketId, frame);
//     socket.broadcast.emit("frame update from user");

//     io.emit("frame update from server", socketId, frame)
//   })

//   socket.on("disconnect", () => {
//     // console.log("disconnect event")
//     socket.broadcast.emit("disconnect event", socket.id);
//   })
// });


// io.on("frame-update", () => {
//   console.log("frame update")
// })




