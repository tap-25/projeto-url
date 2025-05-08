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
                <button class="btn btn-light">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        ` 
    }
}