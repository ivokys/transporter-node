import fetch from 'isomorphic-fetch'
import Emitter from '../emitter'

export default class HTTPEmitter extends Emitter {
    constructor(config) {
        super()
        this._config = {
            default: 'localhost',
            ...config
        }
        this._router = channel => {
            const url = this._config[channel] || this._config.default
            return url
        }
    }

    _send(msg) {
        const url = this._router(msg.channel)
        return fetch('http://' + url, {
            method: 'post',
            body: JSON.stringify(msg),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

    router(f) {
        this._router=f
    }
}
