exports.toPlainObjectForJwt = function (doc) {
  let obj;

  // If the document is a Mongoose document
  if (doc && typeof doc.toObject === "function") {
    obj = doc.toObject();
  } else {
    // Attempt to clone the document as a plain object
    obj = { ...doc };
  }

  // Ensure the object is JSON serializable
  const jsonSerializable = JSON.parse(JSON.stringify(obj));

  return jsonSerializable;
};
