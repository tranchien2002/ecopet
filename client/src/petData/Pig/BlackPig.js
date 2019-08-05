const idle = {
  images: [require('assets/sprites/blackPig/idle.png')],
  frames: [
    [0, 0, 55, 36, 0, 0, 0],
    [0, 36, 54, 35, 0, 0, 0],
    [54, 36, 54, 35, 0, 0, 0],
    [55, 0, 54, 36, 0, 0, 0],
    [108, 36, 54, 35, 0, 0, 0],
    [162, 0, 54, 36, 0, 0, 0],
    [162, 36, 54, 35, 0, 0, 0],
    [162, 36, 54, 35, 0, 0, 0],
    [109, 0, 53, 35, 0, 0, 0]
  ],

  animations: {
    '0': { frames: [1] },
    '1': { frames: [2] },
    '2': { frames: [4] },
    '16': { frames: [3] },
    '17': { frames: [5] },
    '18': { frames: [0] },
    '19': { frames: [8] },
    '20': { frames: [6] },
    '21': { frames: [7] }
  }
};
const BlackPig = {
  idle
};
export default BlackPig;
