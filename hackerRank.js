// check value in object and return object
function stripProperty(obj, prop) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key !== prop) {
      result[key] = value;
    }
  }

  return result;
}

function weekdayText(weekdays) {
  return function getText(target) {
    return (
      weekdays[target] ||
      (function () {
        throw new Error(`Invalid weekday number`);
      })()
    );
  };
}
