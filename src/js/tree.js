import leaf_1 from '@/image/leaf-1.png';
import leaf_2 from '@/image/leaf-2.png';

export { BranchCollection, DieBranches, initialBranch, pointsGenerator, drawTree };

/**
 * @description Branch
 * @class
 */
class Branch {
  /**
   * @constructor
   * @param {number} x X coordinate of the center
   * @param {number} y Y coordinate of the cneter
   * @param {number} speed The speed of growth
   * @param {number} radius The radius of circle
   * @param {number} angle The angle of deflection
   * @param {number} generation The generation of the branch
   * @param {number} distance The distance between a new point and an old point
   */
  constructor(x, y, speed, radius = 10, angle = Math.PI / 2, generation = 0, distance = 0) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
    this.angle = angle;
    this.generation = generation;
    this.distance = distance;
  }

  /**
   * @description Main Processing
   * @param {DieBranches} oldBranches
   * @param {BranchCollection} branches
   */
  process(oldBranches, branches) {
    if (this.generation > 0) {
      this.drawPoints(oldBranches);
    }
    this.iterate(oldBranches);
    this.split(branches);
    this.die(branches);
  }

  /**
   * @description Draw one branch point
   * @param {CanvasRenderingContext2D} ctx Canvas Rendering Context 2D
   */
  draw(ctx) {
    ctx.fillStyle = '#946A2C';
    ctx.shadowcolor = '#946A2C';
    ctx.shadowBlur = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * @description Draw a leaf point and record the point
   * @param {DieBranches} oldBranches
   */
  drawPoints(oldBranches) {
    const p = Math.random();
    const theta = Math.PI / 2;
    oldBranches.addX(this.x + 20 * p * Math.cos(theta * p));
    oldBranches.addY(this.y - 20 * p * Math.sin(theta * p));
    oldBranches.addR(4);
    oldBranches.addTag('leaf');
  }

  /**
   * @description Generate new a branch point and record the point
   * @param {DieBranches} oldBranches
   */
  iterate(oldBranches) {
    const deltaX = this.speed * Math.cos(this.angle);
    const deltaY = - this.speed * Math.sin(this.angle);
    this.x += deltaX;
    this.y += deltaY;
    this.radius *= (0.99 - this.generation / 250);
    const deltaDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    this.distance += deltaDistance;
    if (this.speed > this.radius * 2) {
      this.speed = this.radius * 2;
    }
    this.angle += Math.random() / 5 - 1 / 5 / 2;
    oldBranches.addX(this.x);
    oldBranches.addY(this.y);
    oldBranches.addR(this.radius);
    oldBranches.addTag('trunk');
  }

  /**
   * @description Generate a new branch
   * @param {BranchCollection} branches
   */
  split(branches) {
    let splitChance = 0;
    if (this.generation === 1) {
      splitChance = this.distance / window.innerHeight - 0.2;
    } else if (this.generation < 3) {
      splitChance = this.distance / window.innerHeight - 0.1;
    }
    if (Math.random() < splitChance) {
      const n = 2 + Math.round(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const branch = new Branch(this.x, this.y, this.speed, this.radius,
          this.angle, this.generation + 1, this.distance);
        branches.add(branch);
      }
      branches.remove(this);
    }
  }

  /**
   * @description End the growth of the tree
   * @param {BranchCollection} branches
   */
  die(branches) {
    if (this.radius < 0.5) {
      branches.remove(this);
    }
  }
}

/**
 * @description BranchCollection
 * @class
 */
class BranchCollection {
  /**
   * @constructor
   * @param {Branch[]} branches
   */
  constructor(branches = []) {
    this.branches = branches;
  }

  /**
   * @description Add branch to the collection
   * @param {Branch} branch
   */
  add(branch) {
    this.branches.push(branch);
  }

  /**
   * @description Draw every branch in collection
   */
  process(oldBranches, branches) {
    for (const b in this.branches) {
      this.branches[b].process(oldBranches, branches);
    }
  }

  /**
   * @description Remove branch from collection
   * @param {Branch} branch
   */
  remove(branch) {
    for (const b in this.branches) {
      if (this.branches[b] === branch) {
        this.branches.splice(b, 1);
      }
    }
  }
}

/**
 * @description DieBranches
 */
class DieBranches {
  /**
   * @constructor
   * @param {number[]} oldBranchesX An array of the x-coordinate of the branch points
   * @param {number[]} oldBranchesY An array of the y-coordinate of the branch points
   * @param {number[]} oldBranchesR An array of the radius of the branch points
   * @param {string[]} oldBranchesTag An array of the category of the branch points
   */
  constructor(oldBranchesX = [], oldBranchesY = [], oldBranchesR = [], oldBranchesTag = []) {
    this.oldBranchesX = oldBranchesX;
    this.oldBranchesY = oldBranchesY;
    this.oldBranchesR = oldBranchesR;
    this.oldBranchesTag = oldBranchesTag;
  }

  /**
   * @description Add x-coordinate
   * @param {number} x
   */
  addX(x) {
    this.oldBranchesX.push(x);
  }

  /**
   * @description Add y-coordinate
   * @param {number} y
   */
  addY(y) {
    this.oldBranchesY.push(y);
  }

  /**
   * @description Add radius
   * @param {number} radius
   */
  addR(radius) {
    this.oldBranchesR.push(radius);
  }

  /**
   * @description Add tag
   * @param {string} tag
   */
  addTag(tag) {
    this.oldBranchesTag.push(tag);
  }

  /**
   * @description Get branches
   * @return {DieBranches}
   */
  getBranches() {
    return this;
  }
}

/**
 * @description Initialize the first points
 * @param {BranchCollection} branches
 * @param {HTMLCanvasElement} canvas
 */
function initialBranch(branches, canvas) {
  // the number of circles
  const n = 2 + Math.random() * 3;
  // the radius of the first n circles
  const initialRadius = window.innerWidth / 50;
  let branch = new Branch(canvas.width / 2, canvas.height, canvas.width / 500);
  for (let i = 0; i < n; i++) {
    branch.x = window.innerWidth / 2 - initialRadius + i * 2 * initialRadius / n;
    branch.radius = initialRadius;
    branches.add(branch);
  }
}

/**
 * @description Generate all points.
 * @param {DieBranches} oldBranches
 * @param {BranchCollection} branches
 */
function pointsGenerator(oldBranches, branches) {
  let timer = setInterval(() => {
    branches.process(oldBranches, branches);
    if (branches.branches.length === 0) {
      clearInterval(timer);
    }
  }, 10);
}

/**
 * Draw the tree.
 * @function
 * @param {number} progress The number of points that have been painted
 * @param {number} cnt The number of leaf points
 * @param {number} growspeed The speed of growth
 */
function drawTree(progress, cnt, growspeed, oldBranches, ctx) {
  const dead = 5;
  let timer = setInterval(() => {
    if (progress === oldBranches.oldBranchesX.length) {
      clearInterval(timer);
    }
    if (oldBranches.oldBranchesTag[progress] === 'trunk') {
      drawTrunk(progress, oldBranches, ctx);
    } else if (oldBranches.oldBranchesTag[progress] === 'leaf') {
      drawLeaf(cnt, progress, dead, oldBranches, ctx);
      cnt++;
    }
    progress = progress + 1;
  }, growspeed);
}

/**
 * @description Draw a trunk point
 * @param {number} progress
 * @param {DieBranches} oldBranches
 * @param {CanvasRenderingContext2D} ctx
 */
function drawTrunk(progress, oldBranches, ctx) {
  ctx.fillStyle = '#946A2C';
  ctx.beginPath();
  ctx.moveTo(oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress]);
  ctx.arc(
    oldBranches.oldBranchesX[progress],
    oldBranches.oldBranchesY[progress],
    oldBranches.oldBranchesR[progress],
    0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

/**
 * @description Draw a leaf
 * @param {number} cnt
 * @param {number} progress
 * @param {number} dead Draw a leaf every 'dead' points
 * @param {DieBranches} oldBranches
 * @param {CanvasRenderingContext2D} ctx
 */
function drawLeaf(cnt, progress, dead, oldBranches, ctx) {
  if (cnt % dead === 0 && cnt > 200) {
    let leaf = new Image();
    const p = Math.random() * 3;
    let k = 0;
    if (p < 1) {
      leaf.src = leaf_1;
      k = 1;
    } else if (p < 2) {
      oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 20;
      leaf.src = leaf_2;
      k = 2;
    } else if (p < 3) {
      oldBranches.oldBranchesX[progress] = oldBranches.oldBranchesX[progress] - 10;
      leaf.src = leaf_1;
      k = 2;
    }
    leaf.onload = () => {
      ctx.drawImage(leaf, oldBranches.oldBranchesX[progress], oldBranches.oldBranchesY[progress], 10 * k, 10 * k);
    };
  }
}
