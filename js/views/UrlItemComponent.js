class UrlItemComponent {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
        <tr>
            <th scope="row">${this.item.alias}</th>
            <td>${this.item.tiny_url}</td>
            <td>
                <button data-domain="${this.item.domain}" data-alias="${this.item.alias}" class="btn-edit btn btn-light">Edit</button>
                <button data-domain="${this.item.domain}" data-alias="${this.item.alias}" class="btn-delete btn btn-danger">Delete</button>
            </td>
        </tr>
        ` 
    }
}