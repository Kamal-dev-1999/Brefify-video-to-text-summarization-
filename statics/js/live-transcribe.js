// live-transcribe.js
(function() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        .transcript-container {
    position: fixed;
    bottom: 20px;
    left: 50%; /* Changed from right: 20px */
    transform: translateX(-50%); /* Center horizontally */
    width: 400px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    transition: transform 0.3s ease;
}

.transcript-container.collapsed {
    transform: translate(-50%, calc(100% - 60px)); /* Added X-axis translation */
}
        .transcript-header {
            background: #622ac2;
            color: white;
            padding: 15px;
            border-radius: 15px 15px 0 0;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .transcript-body {
            height: 400px;
            overflow-y: auto;
            padding: 15px;
        }
        .transcript-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .transcript-item {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        .transcript-time {
            color: #666;
            font-size: 0.8em;
            min-width: 50px;
        }
        .transcript-content {
            flex-grow: 1;
        }
        .interim-text {
            color: #999;
            font-style: italic;
            opacity: 0.7;
        }
        .transcript-controls {
            padding: 15px;
            background: white;
            border-top: 1px solid #dee2e6;
            display: flex;
            gap: 10px;
        }
        .transcript-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            background: #622ac2;
            color: white;
            transition: opacity 0.3s;
        }
        .transcript-btn:hover {
            opacity: 0.8;
        }
        .recording {
            background: #ff4444;
        }
    `;
    document.head.appendChild(style);

    // Create container
    const container = document.createElement('div');
    container.className = 'transcript-container';
    
    // Build HTML structure
    container.innerHTML = `
        <div class="transcript-header">
            <h3 style="margin: 0;">Live Transcript</h3>
            <span class="toggle-icon">▼</span>
        </div>
        <div class="transcript-body">
            <ul class="transcript-list"></ul>
            <div class="interim-text"></div>
        </div>
        <div class="transcript-controls">
            <button class="transcript-btn" id="startBtn">Start</button>
            <button class="transcript-btn" id="saveBtn" style="display: none;">Save</button>
        </div>
    `;
    document.body.appendChild(container);

    // Script functionality
    const transcriptContainer = document.querySelector('.transcript-container');
    const toggleIcon = container.querySelector('.toggle-icon');
    const startBtn = container.querySelector('#startBtn');
    const saveBtn = container.querySelector('#saveBtn');
    const transcriptList = container.querySelector('.transcript-list');
    const interimContainer = container.querySelector('.interim-text');
    
    let isOpen = true;
    let recognition = null;
    let finalTranscripts = [];

    // Toggle functionality
    container.querySelector('.transcript-header').addEventListener('click', toggleTranscript);

    function toggleTranscript() {
        isOpen = !isOpen;
        transcriptContainer.classList.toggle('collapsed');
        toggleIcon.textContent = isOpen ? '▼' : '▲';
    }

    // Speech recognition setup
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => addStatusMessage('Listening...');
        recognition.onerror = (event) => addStatusMessage(`Error: ${event.error}`, true);
        recognition.onend = () => addStatusMessage('Click Start to begin transcription');
        recognition.onresult = handleRecognitionResult;

        startBtn.addEventListener('click', toggleRecording);
        saveBtn.addEventListener('click', saveTranscript);
    } else {
        startBtn.disabled = true;
        addStatusMessage("Speech recognition not supported. Please use Chrome.");
    }

    function handleRecognitionResult(event) {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                addTranscriptItem(transcript);
                finalTranscripts.push(transcript);
            } else {
                interim += transcript;
            }
        }
        interimContainer.textContent = interim || '';
        if (finalTranscripts.length > 0) saveBtn.style.display = 'inline-block';
        transcriptContainer.querySelector('.transcript-body').scrollTop = 
            transcriptContainer.querySelector('.transcript-body').scrollHeight;
    }

    function toggleRecording() {
        if (startBtn.textContent === 'Start') {
            recognition.start();
            startBtn.textContent = 'Stop';
            startBtn.classList.add('recording');
        } else {
            recognition.stop();
            startBtn.textContent = 'Start';
            startBtn.classList.remove('recording');
        }
    }

    function saveTranscript() {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
        const fullTranscript = finalTranscripts.join('. ');
        
        fetch(window.location.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: 'transcript=' + encodeURIComponent(fullTranscript)
        }).then(response => {
            if (response.ok) {
                addStatusMessage('Transcript saved successfully!');
                finalTranscripts = [];
                transcriptList.innerHTML = '';
                saveBtn.style.display = 'none';
            }
        });
    }

    function addTranscriptItem(text) {
        const li = document.createElement('li');
        li.className = 'transcript-item';
        li.innerHTML = `
            <span class="transcript-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="transcript-content">${text}</span>
        `;
        transcriptList.appendChild(li);
    }

    function addStatusMessage(text, isError = false) {
        const li = document.createElement('li');
        li.className = 'transcript-item';
        li.innerHTML = `
            <span class="transcript-time">${new Date().toLocaleTimeString()}</span>
            <span class="transcript-content" style="color: ${isError ? 'red' : '#666'}; font-style: italic">
                ${text}
            </span>
        `;
        transcriptList.appendChild(li);
    }

    // Initial message
    addStatusMessage('Click Start to begin transcription');
})();