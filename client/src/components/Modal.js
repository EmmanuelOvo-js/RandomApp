class Modal {
	constructor() {
		this._modal = document.querySelector("#modal");
		this._modalBtn = document.querySelector("#modal-btn");
		this.addEventListeners();
	}

	addEventListeners() {
		this._modalBtn.addEventListener("click", this.open.bind(this));
		window.addEventListener("click", this.outsideModal.bind(this));
		//closeModal event called from IdeaForm.js
		document.addEventListener("closeModal", this.close.bind(this));
	}

	open() {
		this._modal.style.display = "block";
	}

	close() {
		this._modal.style.display = "none";
	}

	outsideModal(e) {
		if (e.target === this._modal) {
			this.close();
		}
	}
}

export default Modal;
