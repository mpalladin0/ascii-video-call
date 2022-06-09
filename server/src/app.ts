// import { Camera } from "./camera.js";

// // @ts-ignore
// import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
// const SERVER_TUNNEL_URL = "https://ascii.michaelpalladino.io/";
// const socket = io.connect(SERVER_TUNNEL_URL)


// socket.on("connect", () => {
//     console.log("Connected to server:", socket.connected)
//     const camera = new Camera(320, 240, 60, socket)

//     try {    
//         camera.cameraVideo.getMedia()
        
//     } catch (err) {
//         console.log(err)
//     }

//     socket.on("frame update from server", (socketId: string, frame: string) => {
//         if (socket.id === socketId) { return; }

//         let clientFeedPre = document.getElementById(socketId);
//         if (clientFeedPre === null) {
//             clientFeedPre = document.createElement("pre")
//             clientFeedPre.setAttribute("id", socketId);
//             clientFeedPre.setAttribute("width", "160")
//             clientFeedPre.setAttribute("height", "120")
//             clientFeedPre.style.fontSize = "5px"
        
//             document.body.appendChild(clientFeedPre);
//             clientFeedPre.innerHTML = frame;
//         } else {
//             clientFeedPre.innerHTML = frame;
//             clientFeedPre.style.fontSize = "5px"
//             // clientFeedPre.setAttribute("font-size", "1px")
//         }

//     });

//     socket.on("disconnect event", (socketId: string) => {
//         console.log("Socket disconnected! ", socketId )
//         let clientFeedPre = document.getElementById(socketId)
//         if (clientFeedPre === null) {}
//         else document.body.removeChild(clientFeedPre);
//     });

//     const engine = socket.io.engine;
//     engine.on("close", () => {
//         socket.disconnect()
//       });

// });

// socket.on("disconnect event", (socketId: string) => {
//     console.log("Socket disconnected! ", socketId )

//     let clientFeedPre = document.getElementById(socketId)
//     if (clientFeedPre === null) {}
//     else document.body.removeChild(clientFeedPre);
// });

// socket.on("disconnect", (socketId: string) => {
//     console.log("Socket disconnected! ", socketId )

//     let clientFeedPre = document.getElementById(socketId)
//     if (clientFeedPre === null) {}
//     else document.body.removeChild(clientFeedPre);
// });

import { Camera } from "./camera.js";
import { Pixel, pixelToAscii } from "./pixelToAscii.js";
import { Video } from "./video.js"; 

// @ts-ignore
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const SERVER_TUNNEL_URL = "https://ascii.michaelpalladino.io/";
const socket = io.connect(SERVER_TUNNEL_URL)


socket.on("connect", () => {
    // console.log("Connected to server:", socket.connected)
    const camera = new Camera(160, 120, 30, socket)

    try {    
        camera.cameraVideo.getMedia()
        
    } catch (err) {
        throw err
        // console.log(err)
    }

    socket.on("frame update from server", (socketId: string, frame: string) => {
        if (socket.id === socketId) { return; }

        let clientFeedPre = document.getElementById(socketId);
        if (clientFeedPre === null) {
            clientFeedPre = document.createElement("pre")
            clientFeedPre.setAttribute("id", socketId);
            clientFeedPre.setAttribute("width", "160")
            clientFeedPre.setAttribute("height", "120")
            clientFeedPre.style.fontSize = "5px"
        
            document.body.appendChild(clientFeedPre);
            clientFeedPre.innerHTML = frame;
        } else {
            clientFeedPre.innerHTML = frame;
            clientFeedPre.style.fontSize = "5px"

        }

    });

    socket.on("disconnect event", (socketId: string) => {
        // console.log("Socket disconnected! ", socketId )
        let clientFeedPre = document.getElementById(socketId)
        if (clientFeedPre === null) {}
        else document.body.removeChild(clientFeedPre);
    });

    const engine = socket.io.engine;
    engine.on("close", () => {
        socket.disconnect()
      });

});

socket.on("disconnect event", (socketId: string) => {
    // console.log("Socket disconnected! ", socketId )

    let clientFeedPre = document.getElementById(socketId)
    if (clientFeedPre === null) {}
    else document.body.removeChild(clientFeedPre);
});

socket.on("disconnect", (socketId: string) => {
    // console.log("Socket disconnected! ", socketId )

    let clientFeedPre = document.getElementById(socketId)
    if (clientFeedPre === null) {}
    else document.body.removeChild(clientFeedPre);
});

