const App = require('./app');

const main = async () => {
    await (new App()).bootstrap();
}

main();