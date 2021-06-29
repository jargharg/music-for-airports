import './style.css';
import App from './components/App';

(function () {
	let startButton = document.querySelector('#startButton');
	startButton.addEventListener('click', () => {
		startButton.remove();
		App.init();
	});
})();
