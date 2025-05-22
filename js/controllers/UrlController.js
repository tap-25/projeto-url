class UrlController {
    constructor(){
        this.repository = new URLRepository();
        this.container = document.querySelector("#app");
        this.init();
        this.bind();
    }

    callbackGetAll(dados) {
        
    }


    async init() {
        let dados = await this.repository.getAllPromessa();

        let view = new UrlView(dados, this.deleteURL);
        this.container.innerHTML = view.render();
    
        let btnsDelete = document.querySelectorAll(".btn-delete");
        for(let i = 0; i < btnsDelete.length; i ++) {
            let btnDelete = btnsDelete[i];
            btnDelete.addEventListener("click", (e) => {
                this.deleteURL(e.target.dataset.alias, e.target.dataset.domain);
            })
        }
    
        let btnsEdit = document.querySelectorAll(".btn-edit");
        for(let i = 0; i < btnsEdit.length; i ++) {
            let btnEdit = btnsEdit[i];
            btnEdit.addEventListener("click", (e) => {
                this.editURL(e.target.dataset.alias, e.target.dataset.domain);
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
        let requestUrl = `https://api.tinyurl.com/archive?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0`
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

    async editURL(alias, domain) {
        let requestUrl = `https://api.tinyurl.com/alias/${domain}/${alias}?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0`
        let response = await fetch(requestUrl);
        let url = await response.json();
        
        let view = new FormView(url.data);
        this.container.innerHTML = view.render();
        document.querySelector("#salvar").addEventListener("click", async (e) => {
            e.preventDefault();
            let url = document.querySelector("#url").value;
            this.repository.update(domain, alias, url);
            this.init();
        })
    }

    async criarUrl() {
        let url = document.querySelector("#url").value;
        let body = {
            url: url
        };
    
        let requestUrl = "https://api.tinyurl.com/create?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0"
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