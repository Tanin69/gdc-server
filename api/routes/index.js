/**
 *
 * This is the main route index.
 * Each endpoint delegates his code to a controller (with a few exceptions for very simple endpoints).
 * render delegated to a controller code must be called like that :
 * router.get|post|etc ("/api/.../...", controllerName.controllerFunction).
 *
 */

// External modules imports
const express = require("express");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
//Controllers imports
const missionListController = require("../controllers/missionListController");
const missionAddController = require("../controllers/missionAddController");
const missionCheckController = require("../controllers/missionCheckController");
const missionShowController = require("../controllers/missionShowController");
const missionUpdateController = require("../controllers/missionUpdateController");

/* Authentication */
//Create middleware for checking the JWT
const checkJwt = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const router = express.Router();

//Returns list of missions in listMission view.
router.get("/api/mission/list", missionListController.listMissions);

//Returns complete mission json
router.get("/api/mission/show/:missionPbo", missionShowController.showMission);

//Checks a mission
router.post("/api/mission/check/", missionCheckController.checkMission);

//Publishes a mission
router.post(
	"/api/mission/add/",
	checkJwt,
	requiredScopes("add:mission"),
	missionAddController.addMission
);

//Updates a mission
router.put(
	"/api/mission/update/:missionPbo",
	checkJwt,
	requiredScopes("update:mission"),
	missionUpdateController.updateMission
);

module.exports = router;
