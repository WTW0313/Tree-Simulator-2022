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

import * as config from './js/config';

// Branches
const branches = new BranchCollection();
const oldBranches = new DieBranches();

// Canvases
let trunkCanvas, leafCanvas, progressBarCanvas;

window.addEventListener('load', init);

/**
 * @description Initiate the Application
 */
function init() {
  const app = document.getElementById('app');

  // Create Canvases
  trunkCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'trunk-canvas');
  leafCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'leaf-canvas');
  progressBarCanvas = createCanvas(window.innerWidth, window.innerHeight, app, 'progress-bar-canvas');

  // Initiate tree points
  initialBranch(branches, trunkCanvas);
  pointsGenerator(oldBranches, branches);

  // Draw the tree
  const ctxTrunk = trunkCanvas.getContext('2d');
  const ctxLeaf = leafCanvas.getContext('2d');
  const ctxProgressBar = progressBarCanvas.getContext('2d');
  if (config.animation) {
    drawTree(0, 0, oldBranches, ctxTrunk, ctxLeaf, ctxProgressBar);
  } else {
    drawTreeWithoutAnimation(0, 0, oldBranches, ctxTrunk, ctxLeaf);
  }
}
