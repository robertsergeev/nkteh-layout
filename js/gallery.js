(() => {
	let currentPicturesId = 0;
	let count = 0;
	let overlay;
	let bigImg;
	let galleryTape;
	let rightButton;
	function getSrc(item) {
		return item.src;
	}
	function galleryIni() {
		bigImg = document.querySelector('#big-img');
		bigImg.style.cursor = 'pointer';
		bigImg.addEventListener(UserDevice.firedEvent(), showGallery);
		const picsList = Array.from(document.querySelectorAll('#gallery-thumb-list li img'));
		picsList.forEach((item) => item.addEventListener(UserDevice.firedEvent(), showBig));
		const picsArr = picsList.map(getSrc);

		count = picsArr.length;
		overlay = document.createElement('div');
		overlay.className = 'popup-overlay';
		document.body.appendChild(overlay);

		let closeButton = document.createElement('div');
		closeButton.id = "closeButton";
		closeButton.className = "icon-close";
		closeButton.style.width = "48px";
		closeButton.style.height = "48px";
		closeButton.style.lineHeight = "48px";
		closeButton.style.textAlign = "center";
		closeButton.style.position = "absolute";
		closeButton.style.top = 0;
		closeButton.style.right = 0;
		closeButton.innerHTML = `<svg class="icon"><use xlink: href = "#icon-close" ></use></svg>`;
		closeButton.style.cursor = "pointer";
		closeButton.onclick = closeGallery;

		galleryTape = document.createElement('ul');
		galleryTape.id = "galleryTape";
		galleryTape.onscroll = gallerySet;
		galleryTape.style.height = '100%';
		galleryTape.style.width = '100%';
		galleryTape.style.display = "flex";
		galleryTape.style.alignItems = "center";
		galleryTape.style.justifyContent = "flex-start";
		galleryTape.style.overflowX = 'auto';
		galleryTape.style.scrollSnapType = 'x mandatory';
		galleryTape.style.overflow = '-moz-scrollbars-none';
		galleryTape.style.scrollbarWidth = 'none';
		picsArr.forEach((value) => {
			let listItem = document.createElement('li');
			listItem.style.flexShrink = 0;
			listItem.style.display = "flex";
			listItem.style.alignItems = "center";
			listItem.style.justifyContent = "center";
			listItem.style.width = "100%";
			listItem.style.minWidth = "100%";
			listItem.style.height = "100%";
			listItem.style.minHeight = "100%";
			listItem.style.lineHeight = "100%";
			listItem.style.scrollSnapAlign = "start";
			listItem.style.scrollSnapStop = "always";
			let listImg = document.createElement('img');
			listImg.src = `${value}`;
			listImg.style.maxWidth = "100%";
			listImg.style.maxHeight = "100%";
			listImg.style.userSelect = "none";
			listItem.appendChild(listImg);
			galleryTape.appendChild(listItem);
		});
		overlay.appendChild(galleryTape);
		overlay.appendChild(closeButton);
		if (!UserDevice.isTouch()) {
			rightButton = document.createElement('div');
			rightButton.id = "rightButton";
			rightButton.style.width = "48px";
			rightButton.style.height = "48px";
			rightButton.style.lineHeight = "48px";
			rightButton.style.position = "absolute";
			rightButton.style.top = "50%";
			rightButton.style.right = 0;
			rightButton.innerHTML = `<svg class="icon"><use xlink: href = "#icon-chevron-right"></use></svg>`;
			rightButton.style.cursor = "pointer";
			rightButton.onclick = shiftGallery;
			overlay.appendChild(rightButton);

			leftButton = document.createElement('div');
			leftButton.id = "leftButton";
			leftButton.style.width = "48px";
			leftButton.style.height = "48px";
			leftButton.style.lineHeight = "48px";
			leftButton.style.position = "absolute";
			leftButton.style.top = "50%";
			leftButton.style.left = 0;
			leftButton.innerHTML = `<svg class="icon"><use xlink: href = "#icon-chevron-left"></use></svg>`;
			leftButton.style.cursor = "pointer";
			leftButton.onclick = shiftGallery;
			overlay.appendChild(leftButton);

			resetArrows();
		}
	}

	function showBig(event) {
		console.log(document.querySelector('#big-img').src, event.target.src);
		document.querySelector('#big-img').src = event.target.src;
	}

	function showGallery() {
		resetArrows();
		showShadow();
		resetSize();
		document.body.classList.toggle('menu-opened');
	}

	function closeGallery() {
		closeShadow();
		resetArrows();
		document.body.classList.toggle('menu-opened');
	}
	function showShadow() {
		overlay.style.display = 'flex';
	}
	function closeShadow() {
		overlay.style.display = 'none';
	}
	function scrollGallery(pos) {
		galleryTape.scrollTo({
			top: 0,
			left: overlay.offsetWidth * pos,
			behavior: "smooth"
		});
	}
	function resetSize() {
		scrollGallery(currentPicturesId);
	}
	function gallerySet() {
		currentPicturesId = Math.round(galleryTape.scrollLeft / overlay.offsetWidth);
		gallPic(currentPicturesId);
	}
	function shiftGallery(event) {
		if (event.target.id == "rightButton" || event.target.closest('#rightButton')) {
			currentPicturesId++;
		} else {
			currentPicturesId--;
		}

		resetArrows();
		scrollGallery(currentPicturesId);
	}
	function resetArrows() {
		if (!UserDevice.isTouch()) {
			rightButton.style.display = (currentPicturesId < count - 1) ? "block" : "none";
			leftButton.style.display = (currentPicturesId < 1) ? "none" : "block";
		}
	}
	function gallPic(num) {
		currentPicturesId = num;
		if (document.querySelector('.good_card .media_section .img_holder')) {
			if (picsArr[num]) {
				let pictures_items = document.querySelectorAll('.good_card .media_section .pictures_thumbs .pic_holder');
				for (let i = 0; i < pictures_items.length; i++) {
					if (pictures_items[i].classList.contains("curr")) {
						pictures_items[i].classList.remove("curr");
					}
				}
				pictures_items[num].classList.add("curr");
				document.querySelector('.good_card .media_section .img_holder img').src = "" + uri + "/images/goods/" + picsArr[num];
			}
		}
	}

	/*initiation*/
	galleryIni();

	onresize = function () {
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		resetSize();
	}
})();
