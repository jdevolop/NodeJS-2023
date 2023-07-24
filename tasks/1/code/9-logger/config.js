module.exports = {
    main: {
        serverPort: 8001,
        serverPath: './ws.js',

        staticServerPort: 8000,
        staticServerPath: "./static.js",
        staticFilesPath: "./static",

        APIPath: "./api",
        
        executableFileExtension: ".js",
    },
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'marcus',
        password: 'marcus',
    },

    hash: {
        decodeTo: "base64",
        randomByteSize: 16,
        keyLength: 64,
    },
 
    log: {
        path: './log',
    },

    
}