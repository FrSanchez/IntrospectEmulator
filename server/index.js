const app = require("./app");
const log4js = require("log4js");
const PORT = process.env.PORT || 8080
const logger = log4js.getLogger();
logger.level = 'debug';

app.listen(PORT, () => {
    logger.info(`Fake introspector app listening at port ${PORT}`)
});
