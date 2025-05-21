class UrlController {
    constructor(){
        this.container = document.querySelector("#app");
        this.repository = new UrlRepository();
        this.init();
        this.bind();
    }

    async init() {
        let urls = await this.repository.getAll();

        let view = new UrlView(urls);
        this.container.innerHTML = view.render();

        let btnsDelete = document.querySelectorAll(".btn-delete");
        for(let i = 0; i < btnsDelete.length; i ++) {
            let btnDelete = btnsDelete[i];
            btnDelete.addEventListener("click", async (e) => {
                await this.repository.deleta(e.target.dataset.alias, e.target.dataset.domain);
                this.init();
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
        document.querySelector("#salvar").addEventListener("click", async (e) => {
            e.preventDefault();
            let url = document.querySelector("#url").value;
            await this.repository.criar(url);
            this.init();
        })
    }

    async editURL(alias, domain) {
        let url = await this.repository.get(domain, alias);
        
        let view = new FormView(url);
        this.container.innerHTML = view.render();
        document.querySelector("#salvar").addEventListener("click", async (e) => {
            e.preventDefault();
            let url = document.querySelector("#url").value;
            await this.repository.atualiza(domain, alias, url);
            this.init();
        })
    }
}