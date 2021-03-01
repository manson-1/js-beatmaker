class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad"); // all rectangles
        this.playBtn = document.querySelector(".play"); // grab the play button
        this.kickAudio = document.querySelector(".kick-sound"); // the actual audio tracks
        this.snareAudio = document.querySelector(".snare-sound"); // the actual audio tracks
        this.hihatAudio = document.querySelector(".hihat-sound"); // the actual audio tracks
        this.index = 0; 
        this.bpm = 150; 
        this.isPlaying = null; 
    }

    activePad(){
        this.classList.toggle("active"); // toggle the class "active" on and off to apply css-effect of different class
    }

    repeat(){
        let step = this.index % 8; // if we are on position 8 (index = 8), step will go to 0
        const activeBar = document.querySelectorAll(`.b${step}`); // need to use backticks for the string template literal to work. we grab all 3 tracks on the current position with this selector
        
        activeBar.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2` // add the animation to each bar-row of pads. alternate = run anim back and forth. Run anim 2 times, to run 1x forth and 1x back
            
            if(bar.classList.contains("active")){ // if the pad is active (clicked)
                if(bar.classList.contains("kick-pad")){ // if pad is kick-pad, play sound
                    this.kickAudio.currentTime = 0; // set back play-time so to avoid that the sound is not played because the last sound is not finished yet
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){ // if pad is kick-pad, play sound
                    this.snareAudio.currentTime = 0; // set back play-time so to avoid that the sound is not played because the last sound is not finished yet
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){ // if pad is kick-pad, play sound
                    this.hihatAudio.currentTime = 0; // set back play-time so to avoid that the sound is not played because the last sound is not finished yet
                    this.hihatAudio.play();
                }
            }
        })

        this.index++; // increment index by 1 to move to the next bar
        console.log(step);
    }

    start_or_stop(){
        const interval = 60 / this.bpm * 1000; // convert bpm to interval measured in miliseconds
        // check if its playing
        if(!this.isPlaying) // not playing yet, isPlaying is set to "null" by default
        {
            this.isPlaying = setInterval(() => { // this.isPlaying will get assigned a random number, that is returned from setInterval() as soon as it is called
                this.repeat(); // start repeating
            }, interval); // interval in ms
        }
        else {
            clearInterval(this.isPlaying); // stop the interval
            this.isPlaying = null;
        }
    }

    updateBtn(){
        if(!this.isPlaying){ // track is currently playing
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = "Start";
            this.playBtn.classList.remove("active");
        }
    }
}

const drumKit = new DrumKit(); // initialize

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad); // on click on a pad, it should toggle active/deactive mode
    pad.addEventListener("animationend", () => {
        pad.style.animation = ""; // after the animation is finished for each pad, reset the animation to nothing, so the next time when the pad is active, its again gets the animation added and therefore plays back the animation
    });
});

drumKit.playBtn.addEventListener("click", () => 
{
    drumKit.updateBtn(); // toggle between "Start" and "Stop" button
    drumKit.start_or_stop(); // start the drumkit on click on play button. Arrow function is needed, so the correct "this" is used in the methods
});