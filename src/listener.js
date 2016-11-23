import Debug from 'debug'

const debug = Debug('transporter:listener')

export default class Listener {
    constructor() {
        this._subs = {}
        if (!this._start)
            throw new Error('this._start() not defined for ${this.constructor.name}')
    }

    async _process(msg) {
        debug('Input', msg)
        const callbacks = this._subs[msg.channel]
        if (!callbacks) {
            debug('No callbacks for', msg.channel)
            return {
                error: 'Invalid channel',
                code: 1000,
            }
        }
        const context = {}
        let result
        try {
            for (let n of callbacks) {
                result = await n(msg, context)
            }
        } catch (ex) {
            debug('Error while processing', msg.channel, ex)
            const error = ex instanceof Error ? {message: String(ex), code: ex.code | 50000}: ex
            return {
                error,
                success:false
            }
        }
        debug ('Output', result)
        return {success: true, result}
    }

    on(channel, ...callbacks) {
        if (this._subs[channel])
            throw new Error('Handler already registered for ${channel}')
            this._subs[channel] = callbacks
            if(this._onRegister)
                this._onRegister(channel, callbacks)
    }

    onRegister(func) {
        this._onRegister = func
    }

    start() {
        return this._start()
    }
}
