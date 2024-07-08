"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { NODE_ENV } = require("../variables/global");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config.js");
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[NODE_ENV], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db["Course"].hasMany(db["Week"], { foreignKey: "course_id" });
db["Week"].belongsTo(db["Course"], { foreignKey: "course_id" });

db["Week"].hasMany(db["Day"], { foreignKey: "week_id" });
db["Day"].belongsTo(db["Week"], { foreignKey: "week_id" });

db["Day"].hasMany(db["Grammar"], { foreignKey: "day_id" });
db["Grammar"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Grammar"].hasMany(db["GrammarExample"], { foreignKey: "grammar_id" });
db["GrammarExample"].belongsTo(db["Grammar"], { foreignKey: "grammar_id" });

db["Day"].hasMany(db["Kanji"], { foreignKey: "day_id" });
db["Kanji"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Kanji"].hasMany(db["KanjiWord"], { foreignKey: "kanji_id" });
db["KanjiWord"].belongsTo(db["Kanji"], { foreignKey: "kanji_id" });

db["Day"].hasMany(db["Video"], { foreignKey: "day_id" });
db["Video"].belongsTo(db["Day"], { foreignKey: "day_id" });

db["Video"].hasMany(db["VideoQuestion"], { foreignKey: "video_id" });
db["VideoQuestion"].belongsTo(db["Video"], { foreignKey: "video_id" });

db["VideoQuestion"].hasMany(db["VideoOption"], { foreignKey: "video_question_id" });
db["VideoOption"].belongsTo(db["VideoQuestion"], { foreignKey: "video_question_id" });

db["Day"].hasMany(db["Vocabulary"], { foreignKey: "day_id" });
db["Vocabulary"].belongsTo(db["Day"], { foreignKey: "day_id" });

module.exports = db;
