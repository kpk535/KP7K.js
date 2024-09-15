class VideoPlayer {
    constructor(containerId, videoTitle = "Untitled Video") {
        this.container = document.getElementById(containerId);
        this.videoTitle = videoTitle;
        this.loop = false;

        // List of 40 supported formats
        this.supportedFormats = [
            'mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv',
            'm4v', 'f4v', '3gp', 'mpeg', 'mpg', 'ts', 'vob', 'asf',
            'divx', 'rm', 'swf', 'm2ts', 'hevc', 'avchd', 'xvid', 
            'dvr-ms', 'rmvb', 'ogv', 'mxf', 'mts', '3g2', 'qt', 
            'dat', 'dv', 'vro', 'mp2', 'mpv', 'vp6', 'viv', 
            'nsv', 'rmf', 'braw'
        ];

        this.initPlayer();
        this.addEventListeners();
    }

    initPlayer() {
        // Create video element
        this.videoElement = document.createElement('video');
        this.videoElement.controls = true;
        this.container.appendChild(this.videoElement);

        // Create buttons for skip and loop
        this.skipButton = this.createButton('Skip 10s');
        this.loopButton = this.createButton('Loop: Off');

        // Create upload input for video file
        this.uploadInput = document.createElement('input');
        this.uploadInput.type = 'file';
        this.uploadInput.accept = this.supportedFormats.map(ext => `video/${ext}`).join(', ');
        this.container.appendChild(this.uploadInput);

        // Create progress bar
        this.progressBar = document.createElement('div');
        this.progressBar.style.height = '5px';
        this.progressBar.style.background = '#ddd';
        this.container.appendChild(this.progressBar);

        this.progress = document.createElement('div');
        this.progress.style.height = '5px';
        this.progress.style.background = '#3498db';
        this.progress.style.width = '0%';
        this.progressBar.appendChild(this.progress);

        // Create upload status
        this.uploadStatus = document.createElement('p');
        this.container.appendChild(this.uploadStatus);

        // Create comment section
        this.commentSection = document.createElement('div');
        this.commentList = document.createElement('div');
        this.commentSection.appendChild(this.commentList);

        this.usernameInput = this.createInput('text', 'Your name');
        this.commentInput = this.createInput('text', 'Your comment');
        this.commentButton = this.createButton('Post Comment');

        this.container.appendChild(this.commentSection);
    }

    createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        this.container.appendChild(button);
        return button;
    }

    createInput(type, placeholder) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        this.container.appendChild(input);
        return input;
    }

    addEventListeners() {
        // Skip 10 seconds
        this.skipButton.addEventListener('click', () => {
            this.videoElement.currentTime += 10;
        });

        // Toggle loop
        this.loopButton.addEventListener('click', () => {
            this.loop = !this.loop;
            this.videoElement.loop = this.loop;
            this.loopButton.textContent = `Loop: ${this.loop ? 'On' : 'Off'}`;
        });

        // Video upload and progress
        this.uploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (this.isSupportedFormat(fileExtension)) {
                const url = URL.createObjectURL(file);
                this.videoElement.src = url;
                this.videoTitle = file.name;
                this.uploadStatus.textContent = 'Upload started...';

                const reader = new FileReader();
                reader.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percentLoaded = Math.round((e.loaded / e.total) * 100);
                        this.progress.style.width = percentLoaded + '%';
                        this.uploadStatus.textContent = `Upload ${percentLoaded}% complete`;
                    }
                };

                reader.onloadend = () => {
                    this.uploadStatus.textContent = 'Upload complete';
                };

                reader.readAsDataURL(file);
            } else {
                this.uploadStatus.textContent = 'Unsupported file format!';
            }
        });

        // Post comments
        this.commentButton.addEventListener('click', () => {
            const username = this.usernameInput.value.trim();
            const comment = this.commentInput.value.trim();

            if (username && comment) {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `<strong>${username}:</strong> ${comment}`;
                this.commentList.appendChild(commentElement);

                // Clear input fields
                this.usernameInput.value = '';
                this.commentInput.value = '';
            } else {
                alert('Please enter both name and comment.');
            }
        });

        // Track video playback progress
        this.videoElement.addEventListener('timeupdate', () => {
            const percentPlayed = (this.videoElement.currentTime / this.videoElement.duration) * 100;
            this.progress.style.width = `${percentPlayed}%`;
        });
    }

    isSupportedFormat(extension) {
        return this.supportedFormats.includes(extension);
    }
}

// Usage
// Make sure the container with the id 'playerContainer' exists in your HTML
const videoPlayer = new VideoPlayer('playerContainer', 'My Custom Video');
