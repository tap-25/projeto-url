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

        let view = new UrlView(json.data, this.deleteURL);
        this.container.innerHTML = view.render();

        let btnsDelete = document.querySelectorAll(".btn-delete");
        for(let i = 0; i < btnsDelete.length; i ++) {
            let btnDelete = btnsDelete[i];
            btnDelete.addEventListener("click", (e) => {
                this.deleteURL(e.target.dataset.alias, e.target.dataset.domain);
            })
        }
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

    async deleteURL(alias, domain) {
        let requestUrl = `https://api.tinyurl.com/archive?api_token=AQwCV1uSA08NxL4Zt31wVZCwD0Sivk9wMUk4l4sP8mZJQtsK0A0IXDGyfKZt`
        let body = {
            domain: domain,
            alias: alias
        };
        await fetch(requestUrl, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body),

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