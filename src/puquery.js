function puquery() {
    this.remAll = () => {
        const oldURL = window.location.href
        let index = 0
        let newURL = oldURL
        index = oldURL.indexOf('?')
        if (index === -1) {
            index = oldURL.indexOf('#')
        }
        if (index !== -1) {
            newURL = oldURL.substring(0, index)
        }
        window.location.href = newURL
    }
}

function puquery_h() {
    this.remAll = () => {
        window.location.href = window.location.href.substring(0, window.location.href.indexOf('#'))
    }

    this.rem = (position = 1) => {
        const hashes = window.location.hash.split("#")
        hashes.shift()
        if (hashes.length = 1) {
            this.remAll()
        } else {
            hashes.splice(2 - 1, 1)
        }
        let finalhashes = "";
        for (i in hashes) {
            finalhashes += `#${i}`
        }
        window.location.hash = finalhashes
    }

    this.set = content => {
        if (typeof content === "object") {
            let hashstring = "";
            for (i in content) {
                hashstring += `#${i}`.toString()
                window.location.hash = hashstring
            }
        } else {
            window.location.hash = `#${content.toString()}`
        }
    }

    this.getAll = () => {
        const hashes = window.location.hash.split("#")
        hashes.shift()
        return hashes
    }

    this.get = function(location) {
        return this.getAll()[location]
    }
}

function puquery_q() {
    this.remAll = () => {
        window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'))
    }

    this.set = (key, value) => {
        let uri = window.location.href
        const i = uri.indexOf("#")
        const hash = i === -1 ? "" : uri.substr(i)
        uri = i === -1 ? uri : uri.substr(0, i)

        const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i")
        const separator = uri.includes("?") ? "&" : "?"
        if (uri.match(re)) {
            uri = uri.replace(re, `$1${key}=${value}$2`)
        } else {
            uri = `${uri + separator + key}=${value}`
        }
        window.location.href = uri + hash
    }

    this.getAll = () => {
        const vars = {}
        const parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            (m, key, value) => {
                vars[key] = value
            }
        )
        return vars
    }

    this.get = function(name) {
        return this.getAll()[name]
    }
}

var puquery = new puquery()
var puquery_q = new puquery_q()
var puquery_h = new puquery_h()
