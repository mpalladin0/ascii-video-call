// import { AsciiConverter } from "./ascii.js";
// import { Video } from "./video.js";

// export class Camera {
//     cameraVideo: Video;
//     renderTimer: NodeJS.Timer | undefined;
//     cameraCanvas: HTMLCanvasElement;
//     cameraContext: CanvasRenderingContext2D | null;
//     ascii: AsciiConverter;
//     asciiContainer: HTMLElement | null = document.getElementById("ascii");

//     private _cameraCapturing: boolean = false;

//     button = document.getElementById("button")
//     toggleTypeButton = document.getElementById("toggleVideoType")
//     fps: number;

//     asciiEnabled: boolean = false;
//     socket: any;
//     socketPre: HTMLElement | null;

//     constructor(width: number, height: number, fps: number, socket: any, socketPre?: any) {
//         this.cameraVideo = new Video(width, height)
//         this.cameraCanvas = document.createElement("canvas");
//         this.cameraCanvas.width = width;
//         this.cameraCanvas.height = height;
//         this.cameraCanvas.setAttribute('width', width.toString());
//         this.cameraCanvas.setAttribute('height', height.toString());

//         this.cameraContext = this.cameraCanvas.getContext("2d");

//         this.cameraContext!.canvas.width = width;
//         this.cameraContext!.canvas.height = height;

//         this.socketPre = socketPre

//         this.cameraContext?.translate(this.cameraCanvas.width, 0);
//         this.cameraContext?.scale(-1, 1);

//         this.ascii = new AsciiConverter(this.cameraCanvas);

//         this.button!.onclick = () => {
//             this.handleButtonClick()
//         }

//         this.fps = fps;

//         this.socket = socket;

//         console.log("Camera websocket", socket)

//     }

//     get cameraCapturing() {
//         return this._cameraCapturing;
//     }

//     set cameraCapturing(boolean) {
//         this._cameraCapturing = boolean;
//     }

//     private handleButtonClick() {
//         if (this.cameraCapturing) {
//             this.pauseCapture();
//             this.button!.innerText = 'resume'

//         }  else {
//             this.startCapture();
//             this.button!.innerText = 'pause';
//         }

//         this.cameraCapturing = !this.cameraCapturing;
//     }

//     public startCapture() {
//         // this.socket.connect();
//         let normalVideo = document.getElementById("normalVideo") as HTMLVideoElement;
//         // navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120 }})
//         //     .then((stream) => {
//         //         normalVideo.srcObject = stream;
//         //         // normalVideo.
//         //         // normalVideo.onloadedmetadata = function (e) {
//         //         //     normalVideo.play();
//         //         // }
//         //     })

//         this.cameraVideo.video.play();
        

//         this.renderTimer = setInterval(() => {
//             try {
//                 this.cameraContext?.drawImage(this.cameraVideo.video, 0, 0, this.cameraVideo.video.width, this.cameraVideo.video.height);
//                 this.onFrame();
//             } catch (err) {
//                 console.log(err);
//             }
//         }, Math.round(1000 / this.fps))  
//     }

//     public stopCapture() {
//         this.cameraVideo.video.srcObject = null;
//     }

//     public pauseCapture() {
//         // this.socket.disconnect();
//         if (this.renderTimer) clearInterval(this.renderTimer)
//         this.cameraVideo.video.pause();
//     }

//     private onFrame() {
//         if (this.asciiContainer === null) { return; }
//         // if (this.socketPre === null) { return; }
//         const asciiFrame = this.ascii.fromCanvas();
//         this.asciiContainer.innerHTML = asciiFrame;
//         this.socket.emit("frame-update", this.socket.id, asciiFrame);
//     }


//     /**
//      * Normal Video Feed Controls
//      */

    
// }


import { AsciiConverter } from "./ascii.js";
import { Video } from "./video.js";

export class Camera {
    cameraVideo: Video;
    renderTimer: NodeJS.Timer | undefined;
    cameraCanvas: HTMLCanvasElement;
    cameraContext: CanvasRenderingContext2D | null;
    ascii: AsciiConverter;
    asciiContainer: HTMLElement | null = document.getElementById("ascii");

    private _cameraCapturing: boolean = false;

    button = document.getElementById("button")
    toggleTypeButton = document.getElementById("toggleVideoType")
    fps: number;

    asciiEnabled: boolean = false;
    socket: any;
    socketPre: HTMLElement | null;

    constructor(width: number, height: number, fps: number, socket: any, socketPre?: any) {
        this.cameraVideo = new Video(width, height)
        this.cameraCanvas = document.createElement("canvas");
        this.cameraCanvas.width = width;
        this.cameraCanvas.height = height;
        this.cameraCanvas.setAttribute('width', width.toString());
        this.cameraCanvas.setAttribute('height', height.toString());

        this.cameraContext = this.cameraCanvas.getContext("2d");

        this.cameraContext!.canvas.width = width;
        this.cameraContext!.canvas.height = height;

        this.socketPre = socketPre

        this.cameraContext?.translate(this.cameraCanvas.width, 0);
        this.cameraContext?.scale(-1, 1);

        this.ascii = new AsciiConverter(this.cameraCanvas);

        this.button!.onclick = () => {
            this.handleButtonClick()
        }

        this.fps = fps;

        this.socket = socket;

        // console.log("Camera websocket", socket)

        // this.asciiContainer?.setAttribute("font-size", "1px")

    }

    get cameraCapturing() {
        return this._cameraCapturing;
    }

    set cameraCapturing(boolean) {
        this._cameraCapturing = boolean;
    }

    private handleButtonClick() {
        if (this.cameraCapturing) {
            this.pauseCapture();
            this.button!.innerText = 'resume'

        }  else {
            this.startCapture();
            this.button!.innerText = 'pause';
        }

        this.cameraCapturing = !this.cameraCapturing;
    }

    public startCapture() {
        // this.socket.connect();
        let normalVideo = document.getElementById("normalVideo") as HTMLVideoElement;
        // navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120 }})
        //     .then((stream) => {
        //         normalVideo.srcObject = stream;
        //         // normalVideo.
        //         // normalVideo.onloadedmetadata = function (e) {
        //         //     normalVideo.play();
        //         // }
        //     })

        this.cameraVideo.video.play();
        

        this.renderTimer = setInterval(() => {
            try {
                this.cameraContext?.drawImage(this.cameraVideo.video, 0, 0, this.cameraVideo.video.width, this.cameraVideo.video.height);
                this.onFrame();
            } catch (err) {
                throw err
                // console.log(err);
            }
        }, Math.round(1000 / this.fps))  
    }

    public stopCapture() {
        this.cameraVideo.video.srcObject = null;
    }

    public pauseCapture() {
        // this.socket.disconnect();
        if (this.renderTimer) clearInterval(this.renderTimer)
        this.cameraVideo.video.pause();
    }

    private onFrame() {
        if (this.asciiContainer === null) { return; }
        // if (this.socketPre === null) { return; }
        const asciiFrame = this.ascii.fromCanvas();
        this.asciiContainer.innerHTML = asciiFrame;
        this.socket.emit("frame-update", this.socket.id, asciiFrame);
    }


    /**
     * Normal Video Feed Controls
     */

    
}

// import { Canvas } from "canvas";

// export class Camera {
//     canvas: HTMLCanvasElement;
//     context: CanvasRenderingContext2D | null;
//     fps: number;

//     constructor(width: number, height: number, fps: number, asciiContainer) {
//         this.canvas = document.createElement("canvas");
// 		this.canvas.width = width
// 		this.canvas.height = height;

//         this.context = this.canvas.getContext("2d");
//         // this.context.transform(width, 0);
//         this.context!.scale(-1, 1);

//         this.fps = fps;

//         this.renderTimer;
//         this.videoElement = new Video(width, height)

//         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// 		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;		

//         this.ascii = new Ascii(this.canvas, this.context, 128);
//         this.asciiContainer = asciiContainer;

// 		this.capturing = false
//     }

// 	// set isCapturing (state) return this._isCapturing = state;

//     startCapture() {
// 		// this.isCapturing = true;
//         this.videoElement.video.play()

// 		this.renderTimer = setInterval(() => {
// 			try {
// 				console.log("Rendering ASCII")
// 				this.context.drawImage(this.videoElement.video, 0, 0, this.videoElement.video.width, this.videoElement.video.height);
//                 this.asciiContainer.innerHTML = this.ascii.asciiCharacters
// 				//  = this.ascii.asciiCharacters
// 			} catch (e) {}

// 		}, Math.round(1000 / this.fps));
//     }

//     stopCapture() {
// 		this.pauseCapture();
// 		if (this.videoElement.video.mozSrcObject !== undefined) this.videoElement.video.mozSrcObject = null;
// 		else this.videoElement.video.srcObject = null;
	
//     }x

//     pauseCapture() {
// 		// this.isCapturing = false;
// 		if (this.renderTimer) clearInterval(this.renderTimer);
// 		this.videoElement.video.pause();
// 	}

//     initAscii() {
//         return new Ascii(this.canvas, this.context, 0);
//     }
// }