export function deepCopy(subject) {
  let copy;

  if (Array.isArray(subject)) {
    copy = [];
  } else if (typeof subject === "object") {
    copy = {};
  } else {
    return subject;
  }

  for (const key in subject) {
    copy[key] = deepCopy(subject[key]);
  }

  return copy;
}
