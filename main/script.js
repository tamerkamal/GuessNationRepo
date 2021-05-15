const mainCanvas = document.getElementById('mainCanvas');
const scoreCanvas = document.getElementById('scoreCanvas');
const ctx = mainCanvas.getContext('2d');

//#region set canvas dimensions
mainCanvas.width = 1000;
mainCanvas.height = 600;

scoreCanvas.width = 1000;
scoreCanvas.height = 50;
//#endregion

//#region  nationalities
const japanese = 'Japanese';
const chinese = 'Chinese';
const korean = 'Korean';
const thai = 'Thai';
//#endregion

let boxes = [];
let photos = [];

let boxWidth = 150, boxHeight = 150;
let boxPadding = 20;

let currentX = mainCanvas.width / 2;
let currentY = 0;

let totalScore = 0;

window.onload = function () {
    populateBoxesArray(boxes);
    drawBoxes(boxes);
    fillBoxesWithText(boxes);
    populatePhotosArray(photos);
    drawPhotos();
}

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
        nationality: korean,
        source: '../assets/photos/korean_1.jpg'
    });
    photos.push({
        nationality: japanese,
        source: '../assets/photos/japanese_1.jpg'
    });
    photos.push({
        nationality: korean,
        source: '../assets/photos/korean_2.jpg'
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
        nationality: chinese,
        source: '../assets/photos/chinese_1.jpg'
    });
    photos.push({
        nationality: thai,
        source: '../assets/photos/thai_2.jpg'
    });
}

function drawBoxes(boxes) {
    // rectangles background color;
    ctx.fillStyle = 'yellow';

    for (let i = 0; i < boxes.length; i++) {
        ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    }
}

function fillBoxesWithText(boxes) {

    ctx.font = '20px Arial';

    for (let i = 0; i < boxes.length; i++) {
        ctx.strokeText(boxes[i].nationality, boxes[i].textXPostion, boxes[i].textYPosition);
    }
}

function drawPhotos() {

    // currentPhoto.addEventListener('load', function () {
    photoIndex = 0;

    let timeInterval = 3;

    interval = setInterval(function () {

        return function () {

            if (photoIndex >= photos.length) {
                return;
            }

            let currentPhoto = new Image();

            currentPhoto.src = photos[photoIndex].source;

            ctx.clearRect(mainCanvas.width / 2 - currentPhoto.width / 2, currentY, currentPhoto.width, currentPhoto.height);

            currentY += 1;
            //console.log('currentPhoto currentY', currentY);
            ctx.drawImage(currentPhoto, mainCanvas.width / 2 - currentPhoto.width / 2, currentY);

            if (currentY > mainCanvas.height) {
                currentY = 0;

                if (photoIndex < photos.length) {
                    //debugger;
                    photoIndex++;
                }
            }

        };
    }(), timeInterval);
    //});
}

//#region mouse events
mainCanvas.onmouseup = function (e) {

    if (!photos[photoIndex]) {
        return;
    }

    console.log('current Photo nationality: ', photos[photoIndex].nationality);

    if (e.offsetX >= 0 && e.offsetX <= boxWidth && e.offsetY >= 0 && e.offsetY <= boxHeight) {
        console.log('chosen nationality', japanese);

        if (photos[photoIndex].nationality == japanese) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
        //console.log('mouse offsetY', e.offsetY);
    }
    else if (e.offsetX >= 0 && e.offsetX <= boxWidth && e.offsetY <= mainCanvas.height && e.offsetY >= mainCanvas.height - boxHeight) {
        console.log('chosen nationality: ', korean);

        if (photos[photoIndex].nationality == korean) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    else if (e.offsetX <= mainCanvas.width && e.offsetX >= mainCanvas.width - boxWidth && e.offsetY >= 0 && e.offsetY <= boxHeight) {
        console.log('chosen nationality: ', chinese);

        if (photos[photoIndex].nationality == chinese) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }
    else if (e.offsetX <= mainCanvas.width && e.offsetX >= mainCanvas.width - boxWidth && e.offsetY <= mainCanvas.height && e.offsetY >= mainCanvas.height - boxHeight) {
        console.log('chosen nationality: ', thai);

        if (photos[photoIndex].nationality == thai) {
            totalScore += 20;
        }
        else {
            totalScore -= 5
        }
    }

    console.log('total score: ', totalScore);

    //if
}
//#endregion

//function _MouseEvents() {
    // mainCanvas.onmousedown = function (e) {

    //     //debugger;
    //     //debugger;

    //     var mouseX = e.pageX - this.offsetLeft;
    //     var mouseY = e.pageY - this.offsetTop;


    //     if (mouseX >= (currentX - currentPhoto.width) &&
    //         mouseX <= (currentX + currentPhoto.width) &&
    //         mouseY >= (currentY - currentPhoto.height) &&
    //         mouseY <= (currentY + currentPhoto.height)) {
    //         isDraggable = true;


    //         //currentX = mouseX;
    //         //currentY = mouseY;
    //     }
    // };
    // mainCanvas.onmousemove = function (e) {

    //     if (isDraggable) {
    //         currentX = e.pageX - this.offsetLeft;
    //         currentY = e.pageY - this.offsetTop;



    //        // drawPhotos();

    //         //console.log('currentX', currentX)
    //         //console.log('currentY', currentX)
    //     }
    // };

    // mainCanvas.onmouseout = function (e) {
    //     //isDraggable = false;
    // };
//}





