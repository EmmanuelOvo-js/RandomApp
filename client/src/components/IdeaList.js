import Idea from "../../../models/Idea";
import IdeasApi from "../services/IdeasApi";

class IdeaList {
	constructor() {
		this._ideaList = document.querySelector("#idea-list");
		this._ideas = []; //Fetching data from backend through IdeasApi.js
		this.getIdeas();

		this._validTags = new Set();
		this._validTags.add("technology");
		this._validTags.add("software");
		this._validTags.add("business");
		this._validTags.add("education");
		this._validTags.add("health");
		this._validTags.add("inventions");
	}

	addEventListeners() {
		this._ideaList.addEventListener("click", (e) => {
			if (e.target.classList.contains("fa-times")) {
				e.stopImmediatePropagation();
				const ideaId = e.target.parentElement.parentElement.dataset.id;
				this.deleteIdea(ideaId);
			}
		});
	}

	async getIdeas() {
		try {
			const res = await IdeasApi.getIdeas(); // from IdeasApi.js
			this._ideas = res.data.data; //second data from route-ides.js api
			this.render();
		} catch (error) {
			console.log(error);
		}
	}

	async deleteIdea(ideaId) {
		try {
			// Delete from server
			const res = await IdeasApi.deleteIdea(ideaId);
			this._ideas.filter((idea) => idea._id !== ideaId);
			this.getIdeas();
		} catch (error) {
			alert("You can not delete this resource");
		}
	}

	//Pushing data to array to fetch on IdeaForm.js
	addToIdeaList(idea) {
		this._ideas.push(idea);
		this.render();
	}

	getTagClass(tag) {
		tag = tag.toLowerCase();
		let tagClass = "";
		if (this._validTags.has(tag)) {
			tagClass = `tag-${tag}`;
		} else {
			tagClass = "";
		}
		return tagClass;
	}

	render() {
		this._ideaList.innerHTML = this._ideas
			.map((idea) => {
				const tagclass = this.getTagClass(idea.tag);
				const deleteBtn =
					idea.username === localStorage.getItem("username")
						? `<button class="delete"><i class="fas fa-times"></i></button>`
						: "";
				return `
            <div class="card" data-id='${idea._id}'>
                ${deleteBtn}
                <h3>
                    ${idea.text}
                </h3>
                <p class="tag ${tagclass}">${idea.tag}</p>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
            </div>`;
			})
			.join("");
		this.addEventListeners();
	}
}

export default IdeaList;
