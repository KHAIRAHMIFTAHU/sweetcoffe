/* =========================================================
   ELEMENT
   ========================================================= */

const opening =
    document.getElementById("opening");

const website =
    document.getElementById("website");

const enterButton =
    document.getElementById("enterButton");


const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

const musicText =
    document.getElementById("musicText");


const slides =
    document.querySelectorAll(".slide");


const nextButton =
    document.getElementById("nextButton");

const prevButton =
    document.getElementById("prevButton");


const currentPage =
    document.getElementById("currentPage");


const progressBar =
    document.getElementById("progressBar");


const dots =
    document.querySelectorAll(".dot");


let currentSlide = 0;


/* =========================================================
   MUSIC
   ========================================================= */

let musicPlaying = false;


/*
   Browser biasanya melarang autoplay.

   Karena musik dijalankan setelah user menekan
   tombol MASUK, browser mengizinkannya.
*/


function startMusic() {

    music.volume = 0.45;


    const playPromise =
        music.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* =========================================================
   UPDATE MUSIC BUTTON
   ========================================================= */

function updateMusicButton() {

    if (musicPlaying) {

        musicButton.classList.add("playing");

        musicIcon.textContent = "♫";

        musicText.textContent = "SOUND ON";

    } else {

        musicButton.classList.remove("playing");

        musicIcon.textContent = "♪";

        musicText.textContent = "SOUND OFF";

    }

}


/* =========================================================
   TOGGLE MUSIC
   ========================================================= */

function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    } else {

        music.volume = 0.45;

        music.play()
            .then(() => {

                musicPlaying = true;

            })
            .catch(() => {

                musicPlaying = false;

            });

    }


    updateMusicButton();

}


musicButton.addEventListener(
    "click",
    toggleMusic
);


/* =========================================================
   MASUK WEBSITE
   ========================================================= */

enterButton.addEventListener(
    "click",
    () => {

        /*
           MULAI MUSIK
        */

        startMusic();


        /*
           HILANGKAN OPENING
        */

        opening.classList.add("hide");


        /*
           TAMPILKAN WEBSITE
        */

        setTimeout(() => {

            website.classList.add("show");

            showSlide(0);

        }, 500);

    }
);


/* =========================================================
   SHOW SLIDE
   ========================================================= */

function showSlide(index) {


    /*
       BATAS BAWAH
    */

    if (index < 0) {

        index = 0;

    }


    /*
       BATAS ATAS
    */

    if (index >= slides.length) {

        index = slides.length - 1;

    }


    currentSlide = index;



    /*
       AKTIFKAN SLIDE
    */

    slides.forEach(
        (slide, i) => {

            slide.classList.remove("active");


            if (i === currentSlide) {

                slide.classList.add("active");

            }

        }
    );



    /*
       NOMOR HALAMAN
    */

    const pageNumber =
        String(currentSlide + 1)
            .padStart(2, "0");


    currentPage.textContent =
        pageNumber;



    /*
       PROGRESS
    */

    const progress =
        ((currentSlide + 1) / slides.length) * 100;


    progressBar.style.width =
        `${progress}%`;



    /*
       DOT
    */

    dots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );



    /*
       BUTTON
    */

    prevButton.disabled =
        currentSlide === 0;


    nextButton.disabled =
        currentSlide === slides.length - 1;

}


/* =========================================================
   NEXT
   ========================================================= */

function nextSlide() {

    if (
        currentSlide <
        slides.length - 1
    ) {

        showSlide(
            currentSlide + 1
        );

    }

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousSlide() {

    if (currentSlide > 0) {

        showSlide(
            currentSlide - 1
        );

    }

}


/* =========================================================
   BUTTON
   ========================================================= */

nextButton.addEventListener(
    "click",
    nextSlide
);


prevButton.addEventListener(
    "click",
    previousSlide
);


/* =========================================================
   DOT NAVIGATION
   ========================================================= */

dots.forEach(
    (dot) => {

        dot.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        dot.dataset.index
                    );


                showSlide(index);

            }
        );

    }
);


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {


        /*
           Jangan jalankan keyboard
           kalau website belum dibuka.
        */

        if (
            !website.classList.contains("show")
        ) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);


/* =========================================================
   SWIPE MOBILE
   ========================================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        handleSwipe();

    }
);


function handleSwipe() {


    const difference =
        touchStartX - touchEndX;


    /*
       Abaikan swipe terlalu kecil
    */

    if (
        Math.abs(difference) < 50
    ) {

        return;

    }


    /*
       Geser kiri
       = next
    */

    if (difference > 0) {

        nextSlide();

    }


    /*
       Geser kanan
       = previous
    */

    else {

        previousSlide();

    }

}


/* =========================================================
   INITIAL
   ========================================================= */

showSlide(0);

updateMusicButton();