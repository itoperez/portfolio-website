const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
    });
});

function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;

    function enableHover() {
        if (new Date() - lastTouchTime < 500) return;
        document.body.classList.add("hasHover");
    }

    function disableHover() {
        document.body.classList.remove("hasHover");
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener("touchstart", updateLastTouchTime, true);
    document.addEventListener("touchstart", disableHover, true);
    document.addEventListener("mousemove", enableHover, true);

    enableHover();
}

watchForHover();

document.querySelectorAll(".portfolio__videos video").forEach((vid) => {
    vid.onclick = () => {
        document.querySelector(".portfolio__popup_video").style.display = "block";
        document.querySelector(".portfolio__popup_video video").src = vid.getAttribute("src");
    };

    function startPreview() {
        vid.muted = true;
        vid.currentTime = 0;
        vid.playbackRate = 2;
        vid.play();
    }

    function stopPreview() {
        vid.currentTime = 0;
        vid.playbackRate = 1;
        vid.pause();
    }

    let previewTimeout = null;

    vid.addEventListener("mouseenter", () => {
        startPreview();
        previewTimeout = setTimeout(stopPreview, 5000);
    });

    vid.addEventListener("mouseleave", () => {
        clearTimeout(previewTimeout);
        previewTimeout = null;
        stopPreview();
    });
});

document.querySelector(".portfolio__popup_video span").onclick = () => {
    document.querySelector(".portfolio__popup_video video").currentTime = 0;
    document.querySelector(".portfolio__popup_video video").playbackRate = 1;
    document.querySelector(".portfolio__popup_video video").pause();
    document.querySelector(".portfolio__popup_video").style.display = "none";
};
