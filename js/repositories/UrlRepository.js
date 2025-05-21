class UrlRepository {
    getAll() {
        return new Promise(async (resolve) => {
            let url = "https://api.tinyurl.com/urls/available?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0"
            let request = await fetch(url);
            let json = await request.json();
            resolve(json.data);
        });
    }

    get(domain, alias) {
        return new Promise(async (resolve) => {
            let requestUrl = `https://api.tinyurl.com/alias/${domain}/${alias}?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0`
            let response = await fetch(requestUrl);
            let json = await response.json();
            resolve(json.data);
        })
    }

    criar(url) {
        return new Promise(async (resolve) => {
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
            resolve();
        })
    }

    atualiza(domain, alias, url) {
        return new Promise(async (resolve) => {
            let body = {
                url: url,
                alias: alias,
                domain: domain
            };
        
            let requestUrl = "https://api.tinyurl.com/update?api_token=xr8jNjp1wMk9WhvxqJs0oEaTceECDlTgbSFUdqaO1x4oVC31h4Nkc0F9aaD0"
            await fetch(requestUrl, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            resolve()
        })
    }

    deleta(domain, alias) {
        return new Promise(async (resolve) => {
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
            resolve();
        })
    }
}