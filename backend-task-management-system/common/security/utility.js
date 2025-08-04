const { use } = require("chai");

/**
 *  It will find and return the entity id from the requested url
 *
 * @param {Object} entities entities object with entityName and entityId
 * @param {String} entityInfo
 */
exports.getEntity = (entities = {}, entityInfo = "") => {
  if (!entityInfo) return [""];
  return entities[entityInfo] || [""];
};

/**
 * It will process the user details and return the userId, organisationId and roleIds.
 *
 * @param {Object} users Users list
 */
exports.processUser = (users = []) => {
  if (!Array.isArray(users) || !users.length) return null;
  const user = users[0];
  return {
    vendorId: user.vendorId,
    isActive: user.isActive === "Y",
    email: user.email,
  };
};
