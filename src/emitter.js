import Debug from 'debug'

const debug = Debug('transporter:emitter')

export default class Emitter {
    _pre
    _post
    constructor() {
        this._pre = []
        this._post = []
    }
    async send(channel, payload, meta = {}) {
        const context = {}
        const msg = {
            channel,
            payload,
            meta
        }
        for (let hook of this._pre) {
            await hook(msg, context)
        }
        debug('Sending', channel)
        const resp = await this._send(msg)
        for (let hook of this._post) {
            await hook(resp, msg, context)
        }
        if (!resp.success) {
            throw resp.error
        }
        return resp.result
    }
    pre(callback) {
        this._pre.push(callback)
    }
    post(callback) {
        this._post.push(callback)
    }
}
