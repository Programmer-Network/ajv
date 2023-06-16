import articleSchemas from "./article.js";
import commentSchemas from "./comment.js";
import courseLectureSchemas from "./course-lecture.js";
import courseSectionSchemas from "./course-section.js";
import courseSchemas from "./course.js";
import ratingSchemas from "./rating.js";

export const schemas = [
    article: articleSchemas.article,
    comment: commentSchemas.comment,
    course: courseSchemas.course,
    courseLecture: courseLectureSchemas.courseLecture,
    courseSection: courseSectionSchemas.courseSection,
    rating: ratingSchemas.rating,
];
