document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // canvas.width = canvas.parentElement.clientWidth;
    // canvas.height = canvas.parentElement.clientHeight;

    canvas.width = 360;
    canvas.height = 640;
    
    const titleDiv = document.getElementById('titleDiv');
    const contentDiv = document.getElementById('contentDiv');

    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const titleFontSizeInput = document.getElementById('titleFontSizeInput');
    const contentFontSizeInput = document.getElementById('contentFontSizeInput');
    const speedInput = document.getElementById('speedInput');
    const startButton = document.getElementById('startAnimation');

    startButton.addEventListener('click', () => {
        const titleText = titleInput.value;
        const contentText = contentInput.value;
        const titleFontSize = titleFontSizeInput.value + 'px';
        const contentFontSize = contentFontSizeInput.value + 'px';
        const speed = parseInt(speedInput.value);

        titleDiv.style.fontSize = titleFontSize;
        contentDiv.style.fontSize = contentFontSize;

        // Clear previous content
        titleDiv.innerHTML = '';
        contentDiv.innerHTML = '';

        let titleIndex = 0;
        let contentIndex = 0;

        function typeTitle() {
            if (titleIndex < titleText.length) {
                titleDiv.innerHTML += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, speed);
            } else {
                // Title animation complete, start content animation
                typeContent();
            }
        }

        function typeContent() {
            if (contentIndex < contentText.length) {
                contentDiv.innerHTML += contentText.charAt(contentIndex);
                contentIndex++;
                setTimeout(typeContent, speed);
            }
        }

        // Start typing animation for title
        typeTitle();
    });
});
