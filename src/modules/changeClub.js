const changeClub = () => {
	const clubsList = document.querySelector('.clubs-list');
	const headMain = document.querySelector('.head-main');

	headMain.addEventListener('click', event => {
		const target = event.target.closest('.clubs-list');
		if (target) {
			clubsList.children[1].style.display = 'block';
		} else {
			clubsList.children[1].style.display = '';
		}
	});
};

export default changeClub;
