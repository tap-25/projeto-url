class UrlController {
    constructor(){
        this.container = document.querySelector("#app");
        this.init();
        this.bind();
    }

    get(id) {
        return document.querySelector(id);
    }

    async init() {
        let url = "https://api.tinyurl.com/urls/available?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt"
        let request = await fetch(url);
        let json = await request.json();

        let view = new UrlView(json.data);
        this.container.innerHTML = view.render();
    }

    bind() {
        this.get("#new").addEventListener("click", () => {
            this.showForm();
        })
    }

    showForm() {
        let view = new FormView();
        this.container.innerHTML = view.render();
        this.get("#salvar").addEventListener("click", (e) => {
            e.preventDefault();
            this.salvarUrl();
        });
    }

    async salvarUrl() {
        let urlValue = this.get("#url").value;

        let url = "https://api.tinyurl.com/create?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt"
        let body = {
            url: urlValue
        };
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        });
        this.init();    
    }
}