const init = () => {
	document.querySelector('.c-hamburger__input').addEventListener('input', e => {
		if (e.target.checked) document.querySelector('.c-app__sidebar').classList.remove('c-app__sidebar--ishidden');
		else document.querySelector('.c-app__sidebar').classList.add('c-app__sidebar--ishidden');
	});
};

document.addEventListener('DOMContentLoaded', () => {
	init();
});
