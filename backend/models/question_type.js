"use strict";
module.exports = (sequelize, DataTypes) => {
	const QuestionType = sequelize.define(
		"QuestionType",
		{
			question_type_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			question_type_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "questiontype",
			timestamps: false,
		},
	);

	return QuestionType;
};
