import { useState } from "react"
import { useRef, useEffect } from 'react';
import fwd from '../images/forward.svg'
import bwd from '../images/backward.svg'
import play from '../images/play.svg'
import pause from '../images/pause.svg'


const Page = () => {

    const ref2 = useRef();
    const ref1 = useRef();
    const ref4 = useRef();
    const ref3 = useRef();
    const ref = useRef();

    let track_art = document.getElementById("#track-art");
    let track_name = document.getElementById("#track-name");
    let track_artist = document.getElementById("#track-artist");

    // let now_playing = document.querySelector("#now-playing");
    // let next_btn = document.querySelector("#next-track");
    // let prev_btn = document.querySelector("#prev-track");

    // let seek_slider = document.querySelector("#seek_slider");
    // let curr_time = document.querySelector("#current-time");
    // let total_duration = document.querySelector("#total-duration");

    let track_index = 0;
    let isPlaying = false;
    // let updateTimer;

    // // Create the audio element for the player
    // let curr_track = document.createElement('audio');

    // // Define the list of tracks that have to be played
    let track_list = [
        {
            name: "Night Owl",
            artist: "Broke For Free",
            path: "https://www.boomplaymusic.com/share/music/97171066"
        },
        {
            name: "Enthusiast",
            artist: "Tours",
            path: "https://www.boomplaymusic.com/share/music/97171064"
        },
        {
            name: "Shipping Lanes",
            artist: "Chad Crouch",
            path: "https://www.boomplaymusic.com/share/music/97171066",
        },
    ];
    let streamed = []

    function loadTrack(track_index) {
    //     // Clear the previous seek timer
    //     clearInterval(updateTimer);
    //     resetValues();

    //     // Load a new track
    //     curr_track.src = track_list[track_index].path;
    //     curr_track.load();

    //     // Update details of the track
        console.log(track_list[track_index].name)
        ref2.current.textContent = track_list[track_index].name;
        ref4.current.textContent = track_list[track_index].artist;
        ref3.current.textContent =
            "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    //     // Set an interval of 1000 milliseconds
    //     // for updating the seek slider
    //     updateTimer = setInterval(seekUpdate, 1000);

    //     // Move to the next track if the current finishes playing
    //     // using the 'ended' event
    //     curr_track.addEventListener("ended", nextTrack);

    //     // Apply a random background color
    //     random_bg_color();
    }

    // function random_bg_color() {
    //     // Get a random number between 64 to 256
    //     // (for getting lighter colors)
    //     let red = Math.floor(Math.random() * 256) + 64;
    //     let green = Math.floor(Math.random() * 256) + 64;
    //     let blue = Math.floor(Math.random() * 256) + 64;

    //     // Construct a color with the given values
    //     let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    //     // Set the background to the new color
    //     document.body.style.background = bgColor;
    // }

    // // Function to reset all values to their default
    // function resetValues() {
    //     curr_time.textContent = "00:00";
    //     total_duration.textContent = "00:00";
    //     seek_slider.value = 0;
    // }

    // function playpauseTrack() {
    //     // Switch between playing and pausing
    //     // depending on the current state
    //     if (!isPlaying) playTrack();
    //     else pauseTrack();
    // }

    // function playTrack() {
    //     // Play the loaded track
    //     curr_track.play();
    //     isPlaying = true;
    // }

    // function pauseTrack() {
    //     // Pause the loaded track
    //     curr_track.pause();
    //     isPlaying = false;
    // }

    // function nextTrack() {
    //     // Go back to the first track if the
    //     // current one is the last in the track list
    //     if (track_index < track_list.length - 1)
    //         track_index += 1;
    //     else track_index = 0;

    //     // Load and play the new track
    //     loadTrack(track_index);
    //     playTrack();
    // }

    // function prevTrack() {
    //     // Go back to the last track if the
    //     // current one is the first in the track list
    //     if (track_index > 0)
    //         track_index -= 1;
    //     else track_index = track_list.length - 1;

    //     // Load and play the new track
    //     loadTrack(track_index);
    //     playTrack();
    // }

    // // function seekTo() {
    // //     // Calculate the seek position by the
    // //     // percentage of the seek slider
    // //     // and get the relative duration to the track
    // //     seekto = curr_track.duration * (seek_slider.value / 100);

    // //     // Set the current track position to the calculated seek position
    // //     curr_track.currentTime = seekto;
    // // }

    // function seekUpdate() {
    //     let seekPosition = 0;

    //     // Check if the current track duration is a legible number
    //     if (!isNaN(curr_track.duration)) {
    //         seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    //         seek_slider.value = seekPosition;

    //         // Calculate the time left and the total duration
    //         let currentMinutes = Math.floor(curr_track.currentTime / 60);
    //         let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    //         let durationMinutes = Math.floor(curr_track.duration / 60);
    //         let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    //         // Add a zero to the single digit time values
    //         if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    //         if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    //         if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    //         if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    //         // Display the updated duration
    //         curr_time.textContent = currentMinutes + ":" + currentSeconds;
    //         total_duration.textContent = durationMinutes + ":" + durationSeconds;
    //     }
    // }

    // // Load the first track in the tracklist
    loadTrack(track_index);

    
    return(

        <>
            <section id="head">
                <img src="" alt="" />
                Username
            </section>
            <section id="music">
                <div id="streamed" style={{ 'display': streamed.length == 0 ? 'none': 'block'}}>
                    <ol>
                        {
                            streamed.map((e) => (
                                <li>{e.name}</li>
                            ))
                        }
                    </ol>
                </div>
                <div id="recc">
                    <p>You may love these songs</p>
                    <ol>
                        {
                            track_list.map((e) => (
                                <li>{e.name}</li>
                            ))
                        }
                    </ol>
                </div>
            </section>
            <section id="play">
                <div className="player">

                    {/* Define the section for displaying details */}
                    <div class="details">
                        <div ref={ref3} id="now-playing">PLAYING x OF y</div>
                        <div id="track-art"></div>
                        <div ref={ref2}  id="track-name">Track Name</div>
                        <div ref={ref4} id="track-artist">Track Artist</div>
                    </div>

                    {/* Define the section for displaying track buttons */}
                    <div class="buttons">
                        <div ref={ref} id="prev-track" >
                            <img src={bwd}/>
                        </div>
                        <div ref={ref} id="playpause-track" >
                            <img src={isPlaying ? play : pause}/>
                        </div>
                        <div ref={ref} id="next-track" >
                            <img src={fwd}/>
                        </div>
                    </div>

                    {/* Define the section for displaying the seek slider */}
                    <div ref={ref} class="slider_container">
                        <div ref={ref} id="current-time">00:00</div>
                        <input type="range" min="1" max="100"
                            value="0" id="seek_slider"/>
                        <div ref={ref} id="total-duration">00:00</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page