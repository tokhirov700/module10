const dataUrl = 'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';

document.addEventListener('DOMContentLoaded', () => {
    fetchVideos(dataUrl);
    setupButtons();
});

function fetchVideos(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data);
            setupBackgroundChange(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function setupButtons() {
    const playButton = document.querySelector('.btn-primary');
    const trailerButton = document.querySelector('.btn-secondary');
    const backgroundVideo = document.querySelector('.video-style');

    playButton.addEventListener('click', () => {
        backgroundVideo.play();
    });

    trailerButton.addEventListener('click', () => {
        backgroundVideo.pause();
    });
}

function displayVideos(videos) {
    const videoGrid = document.getElementById('video-grid');
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-thumbnail');
        videoElement.innerHTML = `
            <a class="video-link" href="../pages/videoespages.html?id=${video.id}">
                <img class="thumbnail-image" src="${video.thumbnailUrl}" alt="${video.title}">
                <h3 class="title">${video.title}</h3>
                <p>${video.author}</p>
            </a>
        `;
        videoGrid.appendChild(videoElement);
    });
}

function setupBackgroundChange(videos) {
    let backgroundIndex = 0;
    const videoElement = document.querySelector('.video-style source');

    function changeBackground() {
        const video = videos[backgroundIndex];
        videoElement.src = video.videoUrl;
        const videoContainer = videoElement.parentElement;
        videoContainer.load(); 

        backgroundIndex = (backgroundIndex + 1) % videos.length;
    }

    setInterval(changeBackground, 10000);
    changeBackground();
}





