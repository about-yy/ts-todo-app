const keys = {
    port: process.env.PORT || '3000',
    SECRET_KEY: process.env.SECRET_KEY || 'secret_key',
    EXPIRES_IN: process.env.EXPIRES_IN || 60*10,
}
export default keys;