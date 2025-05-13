class FormView {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
        <form>
            <div class="mb-3">
            <label for="url" class="form-label">URL para encurtar</label>
            <input type="text" value="${this.item ? this.item.description : ""}" class="form-control" id="url" aria-describedby="urlHelp">
            <div id="urlHelp" class="form-text">Aquela URL muito grande</div>
            </div>
            <button id="salvar" type="submit" class="btn btn-primary">Salvar</button>
        </form>
        `
    }
}