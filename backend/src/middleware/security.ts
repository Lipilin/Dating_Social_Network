import helmet from 'helmet'

export const securityMiddlewareAdmin = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [ '\'self\'' ],
            scriptSrc: [ '\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'' ],
            styleSrc: [ '\'self\'', 'https:', '\'unsafe-inline\'' ],
            fontSrc: [ '\'self\'', 'https:', 'data:' ],
            imgSrc: [ '\'self\'', 'data:', 'https:' ],
            baseUri: [ '\'self\'' ]
        }
    }
})

export const securityMiddlewareDefault = helmet()
