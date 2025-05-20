const express = require("express");
const router = express.Router();


// course controller import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");


// Category controller import 
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// section controller import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// sub-section controllers import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating controllers import
const {
  createRating,
  getAverageRating,
  getAllRatingReview,
} = require("../controllers/RatingAndReview");


// course Progress Controllers
const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../controllers/CourseProgress");



// importing middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// ****************************************************************************************************
//                                                   Course Routes
// ****************************************************************************************************


// Course can Only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Edit a Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
// Add a Section  to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Edit/Update section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit/Update Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub-Section  to a specific section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Course
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// 
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
// Delete a course
router.delete("/deleteCourse", deleteCourse);


// ********************************************************************************************
//                             Category Routes (Only By Admin)
// *******************************************************************************************
// Category can only be created Admin
router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);


router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);

module.exports = router;