/**
 * @description Create a new Canvas
 * @param {number} width width of canvas
 * @param {number} height height of canvas
 * @param {HTMLElement} parent the element that canvas
 * @param {string} className
 */
export function createCanvas(width, height, parent, className) {
  const canvas = document.createElement('canvas');
  canvas.className = className;
  canvas.width = width;
  canvas.height = height;
  parent.appendChild(canvas);
  return canvas;
}
