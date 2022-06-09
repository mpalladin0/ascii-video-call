export class Video {
    
	constructor(width: number, height: number) {
        this._video.width = width;
        this._video.height = height;

		this._video.playsInline = true;
        this._video.setAttribute('playsinline', 'true');
        this._video.setAttribute('webkit-playsinline', 'true');

        this.constraints = { 
            audio: false, 
            video: { 
                width: {
                    max: width,
                }, 
                height: {
                    max: width,
                } 
            } 
        };

	}

    private _video = document.createElement("video")
    private constraints: MediaStreamConstraints

    get video() {
        return this._video;
    }

    get srcObject() {
        return this._video.srcObject;
    }

    set srcObject(src: MediaProvider | null) {
        this.video.srcObject = src;
    }

            
    async getMedia() {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(this.constraints);
            /* use the stream */

            this.srcObject = stream;
            return stream;
        } catch(err) {}
    }

    async getDisplayMedia() {        
        let stream = null
        try {
            stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })

            // console.log(stream);
            this.srcObject = stream;
            return stream;
        } catch (err) {}
    }
}