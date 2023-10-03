import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
	constructor() {
		this._formModal = document.querySelector("#form-modal");
		this._IdeaList = new IdeaList();
	}

	render() {
		this._formModal.innerHTML = `
       <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username"
				id="username"
				value='${
					localStorage.getItem("username")
						? localStorage.getItem("username")
						: ""
				}' />
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>
        `;
		this._form = document.querySelector("#idea-form");
		this.evenlisteners();
	}

	evenlisteners() {
		this._form.addEventListener("submit", this.handleSubmit.bind(this));
	}

	async handleSubmit(e) {
		e.preventDefault();

		if (
			!this._form.elements.username.value ||
			!this._form.elements.text.value ||
			!this._form.elements.tag.value
		) {
			alert("Please fill in the empty fileds");
			return;
		}

		const idea = {
			username: this._form.elements.username.value,
			text: this._form.elements.text.value,
			tag: this._form.elements.tag.value,
		};

		// console.log(idea);

		//Add idea to Server
		const newIdea = await IdeasApi.createIdea(idea);

		//Add idea to List DOM
		this._IdeaList.addToIdeaList(newIdea.data.data);

		//Local Storage to save form fileds values
		localStorage.setItem("username", this._form.elements.username.value);

		//clear form fields
		this._form.elements.username.value = "";
		this._form.elements.text.value = "";
		this._form.elements.tag.value = "";

		this.render();

		//Used dispatchEvent method to close form Modal. Event is called in Modal.js
		document.dispatchEvent(new Event("closeModal"));
	}
}

export default IdeaForm;
