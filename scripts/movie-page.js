window.onload = function() {
    var video = document.getElementById("myVideo");
    var placeholderImage = document.getElementById("placeholder-image");

    setTimeout(function() {
        placeholderImage.style.opacity = '0';
        video.style.opacity = '1';
        video.play().catch(function(error) {
            console.error("Error attempting to play the video:", error);
        });
    }, 7000);
};