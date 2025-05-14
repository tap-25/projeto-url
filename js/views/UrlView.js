class UrlView {
    constructor(listaLinks) {
        this.listaLinks = listaLinks;
    }

    render() {
        let components = [];
        for(let i = 0; i < this.listaLinks.length; i ++) {
            let item = this.listaLinks[i];
            components.push(new UrlItemComponent(item).render());
        }

        //let components = this.listaLinks.map((item) => {
        //    return new UrlItemComponent(item).render();
        //})

        return `
            <h1>Meus links</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Alias</th>
                    <th scope="col">Short url</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                 ${components.join('')}
                </tbody>
            </table>
        `
    }
}