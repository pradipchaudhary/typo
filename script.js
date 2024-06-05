const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSizeInput');
const speedInput = document.getElementById('speedInput');
const downloadBtn = document.getElementById('downloadBtn');

let text = "Your Animated Text Here";
let fontSize = 30;
let speed = 2;
let textX = 0;
let mediaRecorder;
let chunks = [];

textInput.addEventListener('input', (e) => {
    text = e.target.value;
});

fontSizeInput.addEventListener('input', (e) => {
    fontSize = parseInt(e.target.value) || 30;
});

speedInput.addEventListener('input', (e) => {
    speed = parseInt(e.target.value) || 2;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(text, textX, canvas.height / 2);
    textX += speed;
    if (textX > canvas.width) {
        textX = -ctx.measureText(text).width;
    }
    requestAnimationFrame(animate);
}

animate();

function startRecording() {
    let stream = canvas.captureStream(60); // 60 FPS
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };

    mediaRecorder.onstop = function() {
        let blob = new Blob(chunks, { type: 'video/webm' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'animation.webm';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop();
}

downloadBtn.addEventListener('mousedown', startRecording);
downloadBtn.addEventListener('mouseup', stopRecording);
