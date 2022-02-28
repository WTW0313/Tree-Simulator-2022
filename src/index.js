import '@/styles/main.scss';
import { BranchCollection, DieBranches, initialBranch, pointsGenerator, drawTree } from '@/js/tree';

// Branches
const branches = new BranchCollection();
const oldBranches = new DieBranches();

window.addEventListener('load', init);

/**
 * @description Initiate the Application
 */
function init() {
  const app = document.getElementById('root');
  app.className = 'app';
  const canvas = createCanvas(window.innerWidth, window.innerHeight, app, 'tree-canvas');
  initialBranch(branches, canvas);
  pointsGenerator(oldBranches, branches);
  console.log(branches);
  console.log(oldBranches);
  const ctx = canvas.getContext('2d');
  drawTree(0, 0, 10, oldBranches, ctx);
}


/**
 * @description Create a new Canvas
 * @param {number} width width of canvas
 * @param {number} height height of canvas
 * @param {HTMLElement} parent the element that canvas
 * @param {string} className
 */
function createCanvas(width, height, parent, className) {
  const canvas = document.createElement('canvas');
  canvas.className = className;
  canvas.width = width;
  canvas.height = height;
  parent.appendChild(canvas);
  return canvas;
}
