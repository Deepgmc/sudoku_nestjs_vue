export default () => ({
    type    : process.env.BD_TYPE,
    database: process.env.BD_NAME,
    host    : process.env.BD_HOST,
    port    : process.env.BD_PORT,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
})

/**
LISTEN_PORT=3050
BD_TYPE=mysql
BD_HOST=localhost
BD_NAME=corp
BD_USERNAME=root
BD_PASSWORD=Qwe12345678qwE-===
}
 */