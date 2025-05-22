class URLRepository {
    constructor() {
        this.baseUrl = "https://api.tinyurl.com/";
        this.token = "xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0";
    }

    getAction(endpoint) {
        return `${this.baseUrl}${endpoint}?api_token=${this.token}`
    }

    getAll() {
        return new Promise(async (resolve) => {
            let request = await fetch(this.getAction("urls/available"));
            let json = await request.json();
            resolve(json.data);
        })
    }

   

    get(id) {
       
    }

    update(domain, alias, url) {
        return new Promise(async (resolve) => {
             let body = {
                url: url,
                domain: domain,
                alias: alias
             }
             await fetch(this.getAction("update", {
                method: "PATCH",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(body)
             }));
             resolve();
        })
        
    }

    create() {

    } 

    deletar() {

    }
}