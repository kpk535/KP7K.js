<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Video Player</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .video-player-container {
            background-color: #333;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            width: 640px;
            text-align: center;
        }

        .video-display {
            border-radius: 10px;
        }

        .upload-button {
            margin-top: 10px;
            padding: 5px;
        }

        .progress-bar-container {
            margin-top: 10px;
            width: 100%;
        }

        #progress-bar {
            width: 100%;
            height: 10px;
            border-radius: 5px;
        }

        .controls {
            margin-top: 10px;
        }

        .controls button {
            padding: 10px 15px;
            margin: 5px;
            background-color: #444;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .controls button:hover {
            background-color: #555;
        }
    </style>
</head>
<body>
    <div class="video-player-container">
        <video id="video" class="video-display" width="600" height="340" controls>
            <source src="your-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <input type="file" id="upload-button" class="upload-button" accept="video/*" onchange="loadVideo(event)" />
        
        <div class="progress-bar-container">
            <progress id="progress-bar" value="0" max="100"></progress>
        </div>
        
        <div class="controls">
            <button onclick="playPause()">Play/Pause</button>
            <button onclick="skip(-10)">Rewind 10s</button>
            <button onclick="skip(10)">Forward 10s</button>
            <button onclick="loopVideo()">Loop</button>
            <button onclick="togglePIP()">PIP Mode</button>
        </div>
    </div>

    <script>
        const video = document.getElementById('video');
        const progressBar = document.getElementById('progress-bar');

        function playPause() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        function skip(seconds) {
            video.currentTime += seconds;
        }

        function loopVideo() {
            video.loop = !video.loop;
            alert(video.loop ? 'Loop enabled' : 'Loop disabled');
        }

        function togglePIP() {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                video.requestPictureInPicture().catch(error => {
                    console.error('PIP mode error:', error);
                });
            }
        }

        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.value = progress;
        });

        function loadVideo(event) {
            const file = event.target.files[0];
            const videoURL = URL.createObjectURL(file);
            video.src = videoURL;
        }
    </script>
</body>
</html>
