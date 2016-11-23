import HTTPListener from './http/listener'

const result = new HTTPListener()

result.on('internal.echo', msg => {
	const { payload } = msg
	if (!payload)
		throw { message: 'Did not contain a payload', code: 2000 }
	return payload
})

result.start()
