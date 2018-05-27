const databaseName = 'words'
export const mongoDbAddress = `mongodb://mongodb-stitch-words-ipzpo:7a7p5zvbbz@cluster0-shard-00-00-5mnmx.mongodb.net:27017,
cluster0-shard-00-01-5mnmx.mongodb.net:27017,
cluster0-shard-00-02-5mnmx.mongodb.net:27017/${databaseName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`

export const appSecret = 'words'

export const getJWTPath = '/getjwt'
export const registerPath = '/register'