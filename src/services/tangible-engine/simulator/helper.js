// triangleChecker.js

/**
 * Determines if three points are collinear (on a straight line) or not.
 * Uses the area method where if the area is 0, points are collinear.
 *
 * @param {number[]} pointA - The first point [x, y]
 * @param {number[]} pointB - The second point [x, y]
 * @param {number[]} pointC - The third point [x, y]
 * @returns {boolean} - Returns true if points are NOT collinear
 */
function arePointsNonCollinear(pointA, pointB, pointC) {
  const [x1, y1] = pointA;
  const [x2, y2] = pointB;
  const [x3, y3] = pointC;

  // Calculate the area of the triangle using the determinant method
  let area = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);

  // Check if the area is zero
  return area !== 0;
}

/**
 * Calculates the Euclidean distance between two points.
 *
 * @param {number[]} point1 - The first point [x, y].
 * @param {number[]} point2 - The second point [x, y].
 * @returns {number} - The Euclidean distance.
 */
function calculateDistance(point1, point2) {
  return Math.hypot(point2[0] - point1[0], point2[1] - point1[1]);
}

/**
 * Compares two triangles based on the lengths of their sides.
 *
 * @param {number[][]} triangle1 - Array of points [[x, y], [x, y], [x, y]] for the first triangle.
 * @param {number[][]} triangle2 - Array of points [[x, y], [x, y], [x, y]] for the second triangle.
 * @returns {boolean} - Returns true if the triangles are similar (within a tolerance).
 */
function compareTriangles(triangle1, triangle2) {
  const sides1 = triangle1
    .map((_, i, arr) => calculateDistance(arr[i], arr[(i + 1) % arr.length]))
    .sort();
  const sides2 = triangle2
    .map((_, i, arr) => calculateDistance(arr[i], arr[(i + 1) % arr.length]))
    .sort();
  const tolerance = 0.1;
  return sides1.every((side, i) => Math.abs(side - sides2[i]) <= tolerance);
}

/**
 * Compares a given triangle with a list of known triangles.
 *
 * @param {number[][]} givenTriangle - The given triangle points [[x, y], [x, y], [x, y]].
 * @param {number[][][]} knownTriangles - A list of known triangles, each represented as an array of points.
 * @returns {boolean} - Returns true if a matching triangle is found.
 */
function isTriangleInKnownList(givenTriangle, knownTriangles) {
  return knownTriangles.some((knownTriangle) => compareTriangles(givenTriangle, knownTriangle));
}

/**
 * Calculates the centroid (geographic center) of a triangle defined by three points.
 *
 * @param {number[]} pointA - The first point [latitude, longitude]
 * @param {number[]} pointB - The second point [latitude, longitude]
 * @param {number[]} pointC - The third point [latitude, longitude]
 * @returns {number[]} - The centroid [latitude, longitude]
 */
function calculateCentroid(pointA, pointB, pointC) {
  const x1 = pointA[0],
    y1 = pointA[1];
  const x2 = pointB[0],
    y2 = pointB[1];
  const x3 = pointC[0],
    y3 = pointC[1];

  const centroidX = (x1 + x2 + x3) / 3;
  const centroidY = (y1 + y2 + y3) / 3;

  return [centroidX, centroidY];
}

// rotationCalculator.js

/**
 * Calculates the angle in radians between two vectors.
 *
 * @param {number[]} vector1 - The first vector [x, y].
 * @param {number[]} vector2 - The second vector [x, y].
 * @returns {number} - The angle in radians.
 */
function calculateAngle(vector1, vector2) {
  const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
  const magnitude1 = Math.hypot(vector1[0], vector1[1]);
  const magnitude2 = Math.hypot(vector2[0], vector2[1]);
  const cosineOfAngle = dotProduct / (magnitude1 * magnitude2);
  return Math.acos(cosineOfAngle);
}

/**
 * Computes the rotation angle needed to align the initial triangle configuration to the new one.
 *
 * @param {number[][]} initialPoints - Array of points for the initial triangle configuration [[x, y], [x, y], [x, y]].
 * @param {number[][]} newPoints - Array of points for the new triangle configuration [[x, y], [x, y], [x, y]].
 * @returns {number} - The rotation angle in degrees.
 */
function calculateRotation(initialPoints, newPoints) {
  const initialVector = [
    initialPoints[1][0] - initialPoints[0][0],
    initialPoints[1][1] - initialPoints[0][1],
  ];
  const newVector = [newPoints[1][0] - newPoints[0][0], newPoints[1][1] - newPoints[0][1]];

  const angleRadians = calculateAngle(initialVector, newVector);
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

// triangleMatcher.js

/**
 * Calculates all angles of a triangle given its three points.
 * Uses the Law of Cosines.
 *
 * @param {number[][]} points - Three points of the triangle [[x, y], [x, y], [x, y]].
 * @returns {number[]} - Array of angles in degrees.
 */
function calculateTriangleAngles(points) {
  const a = calculateDistance(points[1], points[2]);
  const b = calculateDistance(points[0], points[2]);
  const c = calculateDistance(points[0], points[1]);
  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
  return [angleA, angleB, angleC].sort();
}

/**
 * Checks if two triangles are similar.
 *
 * @param {number[][]} triangle1 - Points of the first triangle [[x, y], [x, y], [x, y]].
 * @param {number[][]} triangle2 - Points of the second triangle [[x, y], [x, y], [x, y]].
 * @returns {boolean} - Returns true if triangles are similar.
 */
function areTrianglesSimilar(triangle1, triangle2) {
  const angles1 = calculateTriangleAngles(triangle1);
  const angles2 = calculateTriangleAngles(triangle2);

  // Compare angles for similarity (consider a small tolerance)
  const angleTolerance = 1.0; // degrees
  for (let i = 0; i < 3; i++) {
    if (Math.abs(angles1[i] - angles2[i]) > angleTolerance) {
      return false;
    }
  }
  return true;
}

module.exports = {
  arePointsNonCollinear,
  compareTriangles,
  isTriangleInKnownList,
  calculateCentroid,
  calculateRotation,
  areTrianglesSimilar,
};
