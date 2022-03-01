import '@/styles/main.scss';
import { createCanvas } from '@/js/canvas';
import { BranchCollection, DieBranches, initialBranch, pointsGenerator, drawTree } from '@/js/tree';

// Branches
const branches = new BranchCollection();
const oldBranches = new DieBranches();

// Canvases
let treeCanvas;

window.addEventListener('load', init);

/**
 * @description Initiate the Application
 */
function init() {
  const app = document.getElementById('root');
  app.className = 'app';
  // Create Canvas
  treeCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'tree-canvas');

  // Initiate tree points
  initialBranch(branches, treeCanvas);
  pointsGenerator(oldBranches, branches);

  // Draw the tree
  const ctx = treeCanvas.getContext('2d');
  drawTree(0, 0, 10, oldBranches, ctx);
}
