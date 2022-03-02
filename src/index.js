import '@/styles/main.scss';
import { createCanvas } from '@/js/canvas';
import {
  BranchCollection,
  DieBranches,
  initialBranch,
  pointsGenerator,
  drawTree,
  drawTreeWithoutAnimation
} from '@/js/tree';

import { animation } from './js/config';

// Branches
const branches = new BranchCollection();
const oldBranches = new DieBranches();

// Canvases
let trunkCanvas, leafCanvas;

window.addEventListener('load', init);

/**
 * @description Initiate the Application
 */
function init() {
  const app = document.getElementById('app');

  // Create Canvases
  trunkCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'trunk-canvas');
  leafCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'leaf-canvas');

  // Initiate tree points
  initialBranch(branches, trunkCanvas);
  pointsGenerator(oldBranches, branches);

  // Draw the tree
  const ctxTrunk = trunkCanvas.getContext('2d');
  const ctxLeaf = leafCanvas.getContext('2d');
  if (animation) {
    drawTree(0, 0, oldBranches, ctxTrunk, ctxLeaf);
  } else {
    drawTreeWithoutAnimation(0, 0, oldBranches, ctxTrunk, ctxLeaf);
  }
}
