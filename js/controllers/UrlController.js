class UrlController {
    constructor(){
        this.container = document.querySelector("#app");
        this.init();
        this.bind();
    }

    async init() {
        let url = "https://api.tinyurl.com/urls/available?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt"
        let request = await fetch(url);
        let json = await request.json();

        let view = new UrlView(json.data);
        this.container.innerHTML = view.render();
    }

    bind() {
        document.querySelector("#new").addEventListener("click", () => {
            this.showForm()
        })
    }

    showForm() {
        let view = new FormView();
        this.container.innerHTML = view.render();
    }
}