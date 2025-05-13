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
            this.showForm();
        })
    }

    showForm() {
        let view = new FormView();
        this.container.innerHTML = view.render();
        document.querySelector("#salvar").addEventListener("click", (e) => {
            e.preventDefault();
            this.criarUrl();
        })
    }

    async deleteURL(item) {
        let requestUrl = `https://api.tinyurl.com/alias/${item.domain}/${item.alias}?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt`
        await fetch(requestUrl, {
            method: "DELETE",
        });
        this.init();
    }

    async criarUrl() {
        let url = document.querySelector("#url").value;
        let body = {
            url: url
        };
    
        let requestUrl = "https://api.tinyurl.com/create?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt"
        await fetch(requestUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
        this.init();
    }
}