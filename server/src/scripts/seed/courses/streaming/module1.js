const seedStreamingCourse = require('./catalog');

module.exports = seedStreamingCourse.buildCatalog().courseDefinitions[0];
