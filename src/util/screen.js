const dipToScreenPoint = (x, y, sourceWidth, sourceHeight, targetWidth, targetHeight) => {
  /**
   * DIP – Density Independent Pixel, is a measurement unit,
   * mainly used in Android, that hides the real screen scale.
   * 160 dips is roughly 1 inch on all devices. Different devices
   * have screens with different scales. The definition of scale
   * in B4A is <number of pixels per inch> / 160.
   *
   * @param {*} x
   * @param {*} y
   * @returns {object} { newX, newY }
   */
  // Calculate the ratio of the new dimension to the old dimension
  const xRatio = targetWidth / sourceWidth;
  const yRatio = targetHeight / sourceHeight;

  // Calculate new x and y based on the dimension ratios
  const newX = x * xRatio;
  const newY = y * yRatio;

  // Return the new coordinates
  return { newX, newY };
};

module.exports = { dipToScreenPoint };
