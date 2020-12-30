//Фотографии
const changePhoto = () => {
	const commandPhotos = document.querySelectorAll('.command__photo');

	commandPhotos.forEach(element => {
		const srcDefault = element.src;
		element.addEventListener('mouseenter', () => {
			element.src = element.dataset.img;
		});
		element.addEventListener('mouseleave', () => {
			element.src = srcDefault;
		});
	});
};

export default changePhoto;
