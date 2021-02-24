class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad"); // all rectangles
        this.playBtn = document.querySelector(".play"); // grab the play button
        this.kickAudio = document.querySelector(".kick-sound"); // the actual audio tracks
        this.snareAudio = document.querySelector(".snare-sound"); // the actual audio tracks
        this.hihatAudio = document.querySelector(".hihat-sound"); // the actual audio tracks
        this.index = 0; 
        this.bpm = 150; 
    }

    activePad(){
        this.classList.toggle("active"); // toggle the class "active" on and off to apply css-effect of different class
    }

    repeat(){
        let step = this.index % 8; // if we are on position 8 (index = 8), step will go to 0
        const activeBar = document.querySelector(`.b${step}`); // need to use backticks for the string template literal to work. we grab all 3 tracks on the current position with this selector
        this.index++; // increment index by 1 to move to the next bar
        console.log(step);
    }

    start(){
        const interval = 60 / this.bpm * 1000; // convert bpm to interval measured in miliseconds
        setInterval(() => {
            this.repeat(); // start repeating
        }, interval); // interval in ms
    }
}

const drumKit = new DrumKit(); // initialize

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad); // on click on a pad, it should toggle active/deactive mode
});

drumKit.playBtn.addEventListener("click", () => drumKit.start()); // start the drumkit on click on play button. Arrow function is needed, so the correct "this" is used in the methods