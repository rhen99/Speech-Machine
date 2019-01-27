//Init SpeechSynth Api

const synth = window.speechSynthesis;
//DOM Elements
const form = document.querySelector('form');
const textInput = document.querySelector('#textInput');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
const rateValue = document.querySelector('#rateValue');
const pitchValue = document.querySelector('#pitchValue');
const selectVoice = document.querySelector('#voice-select');
const speakBtn = document.querySelector('#speak');

//Init voices array
let voices = [];

const getVoices = () => {
	voices = synth.getVoices();
	voices.forEach((voice) => {
		let option = document.createElement('option');
		option.textContent = voice.name + ' (' + voice.lang + ')';
		option.setAttribute('data-name', voice.name);
		option.setAttribute('data-lang', voice.lang);
		selectVoice.appendChild(option);
	});
};

getVoices();

if (!synth.onvoiceschanged) {
	synth.onvoiceschanged = getVoices;
}
const speak = () => {
	if (synth.speaking) {
		console.log('Currently Speaking');
	}
	if (textInput.value !== '') {
		const speakText = new SpeechSynthesisUtterance(textInput.value);

		speakText.onend = (e) => {
			console.log('Done speaking...');
		};
		speakText.onerror = (e) => {
			console.log('Something went wrong.');
		};

		const selected = selectVoice.selectedOptions[0].getAttribute('data-name');

		voices.forEach((voice) => {
			if (selected === voice.name) {
				speakText.voice = voice;
			}
		});
		speakText.rate = rate.value;
		speakText.pitch = pitch.value;
		synth.speak(speakText);
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	speak();
	textInput.blur();
});
rate.addEventListener('change', () => (rateValue.textContent = rate.value));

pitch.addEventListener('change', () => (pitchValue.textContent = pitch.value));

selectVoice.addEventListener('change', (e) => speak());
