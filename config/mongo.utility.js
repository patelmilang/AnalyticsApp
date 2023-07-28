var mongoose = require('mongoose');
const DEFAULT = "mongodb://localhost/";

const OPTIONS = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

const connection = () => {
    try {
        mongoose.connect(process.env.DATABASE ?? DEFAULT, OPTIONS);
        const db = mongoose.connection;
        db.on("error", (err) => console.error(err));
        db.once("open", function () {
            console.log("[database] Connected Successfully");
        });
    } catch (err) {
        console.error("[database ERROR] Could Not Connect");
    }
};

const connect = () => {
    try {
        connection();
    } catch (connectionError) {
        console.error("[ERROR] Connection Error");
    }
};

module.exports = { connect };
