import { useState } from "react"
import { useRef, useEffect } from 'react';
import fwd from '../images/forward.svg'
import bwd from '../images/backward.svg'
import play from '../images/play.svg'
import pause from '../images/pause.svg'
import ms from '../images/ms.jpg'
import bur from '../assets/10 Burna Boy - 23 (NetNaija.com) (1).mp3'
import bur1 from '../assets/Adekunle Gold - High (feat. Davido) (NetNaija.com).mp3'
import bur2 from '../assets/CKay_Love_Nwantiti_Remix_Ft_Joeboy_And_Kuami_Eugene_9jaflaver.com_.mp3'
import bur3 from '../assets/Fireboy-DML-Peru-Peru-(TrendyBeatz.com).mp3'
import bur4 from '../assets/AV - Big Thug Boys (LIVE)  _   _GlitchTakeoff(MP3_320K).mp3'
import bur5 from '../assets/Ayra-Starr-Bloody-Samaritan-(TrendyBeatz.com).mp3'


const Page = () => {

    const ref = useRef()

    let total_duration;
    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create the audio element for the player
    let curr_track = document.createElement('audio');

    // Define the list of tracks that have to be played
    let track_list = [
        {
            name: "10",
            artist: "Buna Boy",
            path: bur
        },
        {
            name: "High",
            artist: "AG Baby ft Davido",
            path: bur1
        },
        {
            name: "Love Nwantiti - Remix",
            artist: "Ckay Ft Joeboy And Kuami Eugene",
            path: bur2
        },
    ];
    let streamed = [
        {
            name: "Common person",
            artist: "Burna Boy",
            path: bur3
        },
        {
            name: "Love Damini",
            artist: "Burna Boy",
            path: bur4
        },
        {
            name: "Terminator",
            artist: "Asake",
            path: bur5
        },
    ]
    function loadTrack(track_index) {
        // Clear the previous seek timer
        clearInterval(updateTimer);
        // resetValues();

        // Load a new track
        curr_track.src = track_list[track_index].path;
        curr_track.load();
        updateTimer = setInterval(seekUpdate, 1000)
        curr_track.addEventListener('ended', nextTrack)
    }

    // Function to reset all values to their default
    // function resetValues() {

    //     let curr_time = document.getElementById('current-time');
    //     let total_duration = document.getElementById('"total-duration');
        
    // }

    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
    }

    function playTrack() {
        // Play the loaded track
        let pp = document.getElementById('playpause')
        curr_track.play();
        isPlaying = true;
        pp.src = pause
    }

    function pauseTrack() {
        // Pause the loaded track
        let pp = document.getElementById('playpause')
        curr_track.pause();
        isPlaying = false;
        pp.src = play
    }

    function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        let track_name = document.getElementById('trackname')
        let track_artist = document.getElementById('track-artist')
        let now_playing = document.getElementById('now-playing')
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        track_name.textContent = track_list[track_index].name;
        track_artist.textContent = track_list[track_index].artist;
        now_playing.textContent = `Now Paying ${track_index + 1} of ${track_list.length}`;

        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }

    function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        let track_name = document.getElementById('trackname')
        let track_artist = document.getElementById('track-artist')
        let now_playing = document.getElementById('now-playing')
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        track_name.textContent = track_list[track_index].name;
        now_playing.textContent = `Now Paying ${track_index + 1} of ${track_list.length}`;
        track_artist.textContent = track_list[track_index].artist;

        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }
    function click(e) {
        let track_name = document.getElementById('trackname')
        let track_artist = document.getElementById('track-artist')
        let now_playing = document.getElementById('now-playing')
        for (let i of track_list){
            if (i.name === e.target.textContent){
                track_index = track_list.indexOf(i)
                track_name.textContent = i.name;
                now_playing.textContent = `Now Paying ${track_index + 1} of ${track_list.length}`;
                track_artist.textContent = i.artist;
                loadTrack(track_index)
                playTrack();
                break;
            } else{
                continue;
            }
        }
    }
    function click2(e) {
        let track_name = document.getElementById('trackname')
        let track_artist = document.getElementById('track-artist')
        let now_playing = document.getElementById('now-playing')
        for (let i of streamed) {
            if (i.name === e.target.textContent) {
                track_index = streamed.indexOf(i)
                track_name.textContent = i.name;
                now_playing.textContent = `Now Paying ${track_index + 1} of ${streamed.length}`;
                track_artist.textContent = i.artist;
                loadTrack(track_index)
                playTrack();
                break;
            } else {
                continue;
            }
        }
    }

    function seekUpdate() {
        let seekPosition = 0;
        let seek_slider = document.getElementById('seek_slider');
        

        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            // Display the updated duration
            let curr_time = document.getElementById('current-time');
            let total_duration = document.getElementById('total-duration');
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    // Load the first track in the tracklist
    loadTrack(track_index)


    
    return(

        <>
            <section id="head">
                <img src="" alt="" />
                Username
            </section>
            <section id="music">
                <div id="streamed" style={{ 'display': streamed.length == 0 ? 'none': 'block'}}>
                    <p style={{ 'text-align': 'center' }}>Your streamed songs</p>
                    <ol>
                        {
                            streamed.map((e) => (
                                <div style={{'height': '40px', 'display': 'flex', 'alignItems': 'center', 'margin': '3px' }}
                                    ref={ref} onClick={click2}>
                                        <li>{e.name}</li>
                                </div>
                            ))
                        }
                    </ol>
                </div>
                <div id="recc">
                    <p style={{'text-align': 'center'}}>You may love these songs</p>
                    <ol>
                        {
                            track_list.map((e) => (
                                <div style={{'height': '40px', 'display': 'flex', 'alignItems': 'center', 'margin': '3px' }}
                                    ref={ref} onClick={click}>
                                        <li>
                                            {e.name}
                                        </li>
                                </div>
                                
                            ))
                        }
                    </ol>
                </div>
            </section>
            <section onLoad={loadTrack(track_index)} id="play" style={{'backgroundImage': ms, 'backgroundSize': 'cover', 'backgroundPosition': 'center'}}>
                {/* Define the section for displaying details */}
                <div id="details">
                    <div ref={ref}  id="now-playing">Now playing 1 of {track_list.length}</div>
                    <div id="track-art"></div>
                    <div ref={ref} id="trackname">{track_list[0].name}</div>
                    <div ref={ref} id="track-artist">{track_list[0].artist}</div>
                </div>

                {/* Define the section for displaying track buttons */}
                <div id="buttons">
                    <div id="prev-track" onClick={prevTrack}>
                        <img src={bwd}/>
                    </div>
                    <div id="playpause-track" onClick={playpauseTrack}>
                        <img id='playpause' src={play}/>
                    </div>
                    <div id="next-track" onClick={nextTrack}>
                        <img src={fwd}/>
                    </div>
                </div>

                {/* Define the section for displaying the seek slider */}
                <div id="slider_container" >
                    <div ref={ref} id="current-time">00:00</div>
                    <input type="range" min="1" max="100"
                        value="0" id="seek_slider"/>
                    <div ref={ref} id="total-duration">00:00</div>
                </div>
            </section>
        </>
    )
}

export default Page