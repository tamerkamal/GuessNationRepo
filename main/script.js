//#region constants

const mainCanvas = document.getElementById('mainCanvas');
const scoreCanvas = document.getElementById('scoreCanvas');

const mainCtx = mainCanvas.getContext('2d');
const scoreCtx = scoreCanvas.getContext('2d');

// nationalities
const japanese = 'Japanese';
const chinese = 'Chinese';
const korean = 'Korean';
const thai = 'Thai';

//#endregion

//#region set canvas dimensions

mainCanvas.width = 1000;
mainCanvas.height = 600;

scoreCanvas.width = 1000;
scoreCanvas.height = 50;

//#endregion

//#region declarations and initialization

let boxes = [];
let photos = [];

let boxWidth = 150, boxHeight = 150;
let boxPadding = 20;

let currentX = mainCanvas.width / 2;
let currentY = 0;

let totalScore = 0;
let timeInterval = 3;

let countClicks = 0;

//#endregion

//#region main methods

window.onload = function () {
    $('#infoModal').modal('show');

    $('#infoModal').on('hidden.bs.modal', function () {
        populateBoxesArray(boxes);
        drawBoxes(boxes);
        // fillBoxesWithText(boxes);
        fillScoreText(totalScore);
        populatePhotosArray(photos);
        drawPhotos();
    });
}

function drawBoxes(boxes) {
    // rectangles background color;
    mainCtx.fillStyle = 'yellow';

    for (let i = 0; i < boxes.length; i++) {
        mainCtx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    }
    fillBoxesWithText(boxes);
}

function drawPhotos() {

    countClicks = 0;

    if (photos.length > 0 == false) {
        return;
    }

    photoIndex = 0;

    let interval = setInterval(function () {

        return function () {

            if (photoIndex >= photos.length) {
                return;
            }

            let currentImage = new Image();

            currentImage.src = photos[photoIndex].source;

            mainCtx.clearRect(mainCanvas.width / 2 - currentImage.width / 2, currentY, currentImage.width, currentImage.height);

            currentY += 1;

            mainCtx.drawImage(currentImage, mainCanvas.width / 2 - currentImage.width / 2, currentY);

            if (currentY > mainCanvas.height) {

                resetMouseClicks();

                currentY = 0;

                if (photoIndex == photos.length - 1) {
                    //debugger;
                    clearPhotos();

                    document.getElementById("finalScore").textContent = "Your final score is " + totalScore.toString() + ", do you want to play again ?";

                    $('#resultModal').modal('show');
                }

                else if (photoIndex < photos.length) {
                    //debugger;
                    photoIndex++;
                }
            }
        };
    }(), timeInterval);
}

function fillScoreText(totalScore) {
    clearScoreText();
    scoreCtx.font = '25px Georgia';
    scoreCtx.fillStyle = "white";
    scoreCtx.fillText('Total Score: ' + totalScore.toString(), scoreCanvas.width / 2 - 70, scoreCanvas.height / 2);
}

function playAgain() {
    $('#resultModal').modal('hide');
    clearPhotos();
    clearScoreText();
    populatePhotosArray(photos);
    fillScoreText(0);
    timeInterval *= 10;
    drawPhotos();
    resetMouseClicks();
}

//#endregion

//#region events

mainCanvas.onmouseup = function (e) {

    if (photos.length > 0 == false || !photos[photoIndex]) { return; }

    console.log('current Photo nationality: ', photos[photoIndex].nationality);

    if (e.offsetX >= 0 && e.offsetX <= boxWidth && e.offsetY >= 0 && e.offsetY <= boxHeight) {

        if (countClicks > 0) {
            return;
        }

        countClicks++;

        console.log('chosen nationality', japanese);

        if (photos[photoIndex].nationality == japanese) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    else if (e.offsetX >= 0 && e.offsetX <= boxWidth && e.offsetY <= mainCanvas.height && e.offsetY >= mainCanvas.height - boxHeight) {

        if (countClicks > 0) {
            return;
        }

        countClicks++;

        console.log('chosen nationality: ', korean);

        if (photos[photoIndex].nationality == korean) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    else if (e.offsetX <= mainCanvas.width && e.offsetX >= mainCanvas.width - boxWidth && e.offsetY >= 0 && e.offsetY <= boxHeight) {

        if (countClicks > 0) {
            return;
        }

        countClicks++;

        console.log('chosen nationality: ', chinese);

        if (photos[photoIndex].nationality == chinese) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    else if (e.offsetX <= mainCanvas.width && e.offsetX >= mainCanvas.width - boxWidth && e.offsetY <= mainCanvas.height && e.offsetY >= mainCanvas.height - boxHeight) {

        if (countClicks > 0) {
            return;
        }

        countClicks++;

        console.log('chosen nationality: ', thai);

        if (photos[photoIndex].nationality == thai) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    console.log('total score: ', totalScore);
    fillScoreText(totalScore);
}
//#endregion

//#region helper methods

function populateBoxesArray(boxes) {
    boxes.push({
        description: 'topLeftBox',
        x: 0,
        y: 0,
        width: boxWidth,
        height: boxHeight,
        nationality: japanese,
        textXPostion: boxPadding,
        textYPosition: 4 * boxPadding
    });

    boxes.push({
        description: 'topRighttBox',
        x: mainCanvas.width - boxWidth,
        y: 0,
        width: boxWidth,
        height: boxHeight,
        nationality: chinese,
        textXPostion: mainCanvas.width - 100 - boxPadding,
        textYPosition: 4 * boxPadding
    });

    boxes.push({
        description: 'bottomLeftBox',
        x: 0,
        y: mainCanvas.height - boxWidth,
        width: boxWidth,
        height: boxHeight,
        nationality: korean,
        textXPostion: boxPadding,
        textYPosition: mainCanvas.height - 100 + boxPadding
    });

    boxes.push({
        description: 'bottomRightBox',
        x: mainCanvas.width - boxWidth,
        y: mainCanvas.height - boxHeight,
        width: boxWidth,
        height: boxHeight,
        nationality: thai,
        textXPostion: mainCanvas.width - 100,
        textYPosition: mainCanvas.height - 100 + boxPadding
    });
}

function populatePhotosArray(photos) {
    photos.push({
        nationality: japanese,
        source: '../assets/photos/japanese_1.jpg'
    });
    photos.push({
        nationality: korean,
        source: '../assets/photos/korean_2.jpg'
    });
    photos.push({
        nationality: korean,
        source: '../assets/photos/korean_1.jpg'
    });
    photos.push({
        nationality: japanese,
        source: '../assets/photos/japanese_2.jpg'
    });
    photos.push({
        nationality: thai,
        source: '../assets/photos/thai_1.jpg'
    });
    photos.push({
        nationality: chinese,
        source: '../assets/photos/chinese_2.jpg'
    });
    photos.push({
        nationality: japanese,
        source: '../assets/photos/japanese_4.jpg'
    });
    photos.push({
        nationality: korean,
        source: '../assets/photos/korean_4.jpg'
    });

    photos.push({
        nationality: chinese,
        source: '../assets/photos/chinese_1.jpg'
    });
    photos.push({
        nationality: thai,
        source: '../assets/photos/thai_2.jpg'
    });
    photos.push({
        nationality: thai,
        source: '../assets/photos/thai_3.jpg'
    });
    photos.push({
        nationality: japanese,
        source: '../assets/photos/japanese_3.jpg'
    });
    photos.push({
        nationality: korean,
        source: '../assets/photos/korean_3.jpg'
    });
}

function fillBoxesWithText(boxes) {

    mainCtx.font = '25px Arial';

    for (let i = 0; i < boxes.length; i++) {
        mainCtx.strokeText(boxes[i].nationality, boxes[i].textXPostion, boxes[i].textYPosition);
    }
}

function clearScoreText() {
    scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
}

function clearPhotos() {
    photos = [];
    resetMouseClicks();
}

function resetMouseClicks() {
    countClicks = 0;
}

//#endregion