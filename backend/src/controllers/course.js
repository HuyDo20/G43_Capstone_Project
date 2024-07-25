const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const {
	Course,
	Week,
	Day,
	Vocabulary,
	Kanji,
	KanjiWord,
	Video,
	VideoOption,
	VideoQuestion,
	Grammar,
	GrammarExample,
	VocabularyProgress,
	KanjiProgress,
	GrammarProgress,
	VideoProgress
} = require("../../models");
const {
	COURSE_GET_FAILED,
	COURSE_CREATED,
	COURSE_CREATED_FAILED,
	COURSE_UPDATED,
	COURSE_UPDATED_FAILED,
	COURSE_DELETED,
} = require("../messages/course");
const { transformCourseData } = require("../helper/course");
const { Op, where } = require("sequelize");

const getAllCourse = async (req, res) => {
	try {
		const course = await Course.findAll({
			where: { [Op.or]: [{ course_status_id: 2 }, { course_status_id: 1 }] },
			order: [["course_id", "asc"]]
		});
		if (course) {
			return responseWithData(res, 200, course);
		} else {
			return badRequest(res, COURSE_GET_FAILED);
		}
	} catch (e) {
		console.log("getAllCourse", e);
		return error(res);
	}
};

const getAllCourseExtend = async (req, res) => {
	try {
		const { accountId } = req.body;

		const courses = await Course.findAll({
			where: {
				[Op.or]: [
					{ course_status_id: 1 },
					{ course_status_id: 2 }
				]
			},
			include: {
				model: Week,
				include: {
					model: Day,
					include: ['Vocabularies', 'Kanjis', 'Grammars', 'Videos']
				}
			},
			order: [["course_id", "asc"]],
		});

		if (courses.length > 0) {
			const coursesWithProgress = await Promise.all(courses.map(async (course) => {
				let totalItems = 0;
				let learnedItems = {
					vocabulary: 0,
					kanji: 0,
					grammar: 0,
					video: 0,
				};

				for (const week of course.Weeks) {
					for (const day of week.Days) {
						// Filter items based on their respective status_id
						const vocabularies = day.Vocabularies.filter(v => v.vocab_status_id === 1);
						const kanjis = day.Kanjis.filter(k => k.kanji_status_id === 1);
						const grammars = day.Grammars.filter(g => g.grammar_status_id === 1); 
						const videos = day.Videos.filter(v => v.video_status_id === 1); 

						totalItems += vocabularies.length + kanjis.length + grammars.length + videos.length;

						// Calculate progress for each category
						learnedItems.vocabulary += await VocabularyProgress.count({
							where: {
								account_id: accountId,
								learned: true,
								vocabulary_id: vocabularies.map(v => v.vocab_id),
							}
						});

						learnedItems.kanji += await KanjiProgress.count({
							where: {
								account_id: accountId,
								learned: true,
								kanji_id: kanjis.map(k => k.kanji_id),
							}
						});

						learnedItems.grammar += await GrammarProgress.count({
							where: {
								account_id: accountId,
								learned: true,
								grammar_id: grammars.map(g => g.grammar_id),
							}
						});

						learnedItems.video += await VideoProgress.count({
							where: {
								account_id: accountId,
								watched: true,
								video_id: videos.map(v => v.video_id),
							}
						});
					}
				}

				const totalProgress = Object.values(learnedItems).reduce((a, b) => a + b, 0);
				const progressPercentage = totalItems > 0 ? (totalProgress / totalItems) * 100 : 0;
		
				return {
					...course.toJSON(), 
					progress: {
						totalItems,
						totalProgress,
						learnedItems,
						progressPercentage,
					},
					totalProgress:progressPercentage				
				};
			}));

			return responseWithData(res, 200, coursesWithProgress);
		} else {
			return badRequest(res, 'COURSE_GET_FAILED');
		}
	} catch (e) {
		console.error("getAllCourse", e);
		return error(res);
	}
}

const getCourseById = async (req, res) => {
	try {
		const { course_id } = req.params;

		const course = await Course.findOne({
			where: {
				course_id,
			},
		});
		if (course) {
			return responseWithData(res, 200, course);
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("getCourseById", e);
		return error(res);
	}
};

const getCourseDetailById = async (req, res) => {
	try {
		const { course_id } = req.params;

		const courseDetails = await Course.findOne({
			where: { course_id: course_id, course_status_id: { [Op.or]: [1, 2] } },
			include: [
				{
					model: Week,
					include: [
						{
							model: Day,
							include: [
								{
									model: Grammar,
									include: [
										{
											model: GrammarExample,
										},
									],
								},
								{
									model: Kanji,
									include: [
										{
											model: KanjiWord,
										},
									],
								},
								{
									model: Video,
									include: [
										{
											model: VideoQuestion,
											include: [
												{
													model: VideoOption,
												},
											],
										},
									],
								},
								{
									model: Vocabulary,
								},
							],
						},
					],
				},
			],
		});

		if (courseDetails) {
			const data = transformCourseData(courseDetails);
			return responseWithData(res, 200, data);
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("getCourseDetailById", e);
		return error(res);
	}
};

const updateCourseDetail = async (req, res) => {
	const { courseData, weeksData } = req.body;
	const {
		course_id,
		course_name,
		description,
		course_image,
		course_status_id = 1,
		week,
	} = courseData;

	try {
		await Course.upsert({
			course_id,
			course_name,
			description,
			course_image,
			course_status_id,
			week,
		});

		for (const week of weeksData) {
			const { week_id, week_name, week_topic, week_status_id = 1, days } = week;
			const [weekRecord, weekCreated] = await Week.upsert(
				{ week_id, week_name, week_topic, week_status_id, course_id },
				{ returning: true },
			);

			for (const day of days) {
				const { day_id, day_name, day_status_id = 1, lessons, repeat_lesson } = day;
				const [dayRecord, dayCreated] = await Day.upsert(
					{
						day_id,
						day_name,
						day_status_id,
						week_id: weekRecord.week_id,
						repeat_lesson:
							typeof repeat_lesson === "object"
								? JSON.stringify(repeat_lesson)
								: repeat_lesson,
					},
					{ returning: true },
				);

				for (const lesson of lessons) {
					const lessonDefaults = {
						vocab_status_id: 1,
						kanji_status_id: 1,
						grammar_status_id: 1,
						video_status_id: 1,
					};

					switch (lesson.type) {
						case "vocab":
							await Vocabulary.upsert({
								vocab_id: lesson.vocab_id,
								...lesson,
								vocab_status_id: lesson.vocab_status_id || lessonDefaults.vocab_status_id,
								day_id: dayRecord.day_id,
							});
							break;
						case "kanji":
							const [kanjiRecord, kanjiCreated] = await Kanji.upsert(
								{
									kanji_id: lesson.kanji_id,
									...lesson,
									kanji_status_id:
										lesson.kanji_status_id || lessonDefaults.kanji_status_id,
									day_id: dayRecord.day_id,
								},
								{ returning: true },
							);
							lesson.kanji_words?.forEach(async (word) => {
								await KanjiWord.upsert({
									kanji_word_id: word.kanji_word_id,
									...word,
									kanji_word_status_id:
										word.kanji_word_status_id || lessonDefaults.kanji_status_id,
									kanji_id: kanjiRecord.kanji_id,
								});
							});
							break;
						case "grammar":
							const [grammarRecord, grammarCreated] = await Grammar.upsert(
								{
									grammar_id: lesson.grammar_id,
									...lesson,
									grammar_status_id:
										lesson.grammar_status_id || lessonDefaults.grammar_status_id,
									day_id: dayRecord.day_id,
								},
								{ returning: true },
							);
							lesson.grammar_examples?.forEach(async (example) => {
								await GrammarExample.upsert({
									grammar_example_id: example.grammar_example_id,
									...example,
									grammar_example_status_id:
										example.grammar_example_status_id || lessonDefaults.grammar_status_id,
									grammar_id: grammarRecord.grammar_id,
								});
							});
							break;
						case "video":
							const [videoRecord, videoCreated] = await Video.upsert(
								{
									video_id: lesson.video_id,
									...lesson,
									video_status_id:
										lesson.video_status_id || lessonDefaults.video_status_id,
									day_id: dayRecord.day_id,
								},
								{ returning: true },
							);
							lesson.questions?.forEach(async (question) => {
								const [questionRecord, questionCreated] = await VideoQuestion.upsert(
									{
										video_question_id: question.video_question_id,
										...question,
										video_question_status_id:
											question.video_question_status_id ||
											lessonDefaults.video_status_id,
										video_id: videoRecord.video_id,
									},
									{ returning: true },
								);
								question.options?.forEach(async (option) => {
									await VideoOption.upsert({
										option_id: option.option_id,
										...option,
										video_option_status_id:
											option.video_option_status_id || lessonDefaults.video_status_id,
										video_question_id: questionRecord.video_question_id,
									});
								});
							});
							break;
						default:
							console.error("Unknown lesson type:", lesson.type);
							break;
					}
				}
			}
		}

		return ok(res, COURSE_UPDATED);
	} catch (e) {
		console.error(e);
		return error(res);
	}
};

const createNewCourse = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const course = await Course.create(req.body);
		if (course) {
			return responseWithData(res, 201, {
				data: course,
				message: COURSE_CREATED,
			});
		} else {
			return badRequest(res, COURSE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewCourse", e);
		return error(res);
	}
};

const updateCourseById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, course_status_id } = req.body;
		const { course_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const course = await Course.findOne({
			where: {
				course_id,
			},
		});
		if (course) {
			const [update] = await Course.update({
				where: {
					course_id,
				},
			});
			if (update) {
				return ok(res, COURSE_UPDATED);
			} else {
				return badRequest(res, COURSE_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateCourseById", e);
		return error(res);
	}
};

async function deleteCourseById(req, res) {
	try {
		const { course_id } = req.params;
		const course = await Course.findOne({ where: { course_id } });
		if (!course) {
			return notfound(res);
		}
		course.course_status_id = 3;
		await course.save();
		return ok(res, COURSE_DELETED);
	} catch (err) {
		console.error("Error deactivating course:", err);
		return error(res);
	}
}

module.exports = {
	getAllCourse,
	createNewCourse,
	updateCourseById,
	getCourseById,
	getCourseDetailById,
	deleteCourseById,
	updateCourseDetail,
	getAllCourseExtend
};
