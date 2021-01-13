const changeClub = () => {
	const clubsList = document.querySelector('.clubs-list');

	clubsList.addEventListener('click', () => {
		if (clubsList.children[1].style.display === 'none') {
			clubsList.children[1].style.display = 'block';
		} else {
			clubsList.children[1].style.display = 'none';
		}
	});
};

export default changeClub;
