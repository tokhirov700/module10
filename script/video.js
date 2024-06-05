const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');

fetch('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json')
    .then(response => response.json())
    .then(data => {
        const video = data.find(v => v.id === videoId);
        if (video) {
            displayVideoDetails(video);
        } else {
            document.getElementById('video-container').innerText = 'Video not found';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('video-container').innerText = 'Error loading video details';
    });

function displayVideoDetails(video) {
    document.getElementById('video-title').innerText = video.title;
    document.getElementById('video-author').innerText = video.author;
    document.getElementById('video-description').innerText = video.description;
    document.getElementById('video-player').src = video.videoUrl;
    document.getElementById('video-views').innerText = `Views: ${video.views}`;
    document.getElementById('video-upload-time').innerText = `Uploaded: ${video.uploadTime}`;
    document.getElementById('video-subscriber').innerText = `Subscribers: ${video.subscriber}`;
}
