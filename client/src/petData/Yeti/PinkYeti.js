export const walk = {
  images: [require('assets/sprites/pinkYeti/walk.png')],

  framerate: 20,
  frames: [
    [0, 0, 104, 111, 0, 0, 0],
    [104, 0, 100, 107, 0, 0, 0],
    [204, 0, 121, 104, 0, 0, 0],
    [325, 0, 112, 104, 0, 0, 0]
  ],

  animations: {
    'walk(1)': { frames: [0] },
    'walk(2)': { frames: [1] },
    'walk(3)': { frames: [3] },
    'walk(4)': { frames: [2] }
  }
};
export const idle = {
  images: [require('assets/sprites/pinkYeti/idle.png')],
  frames: [[0, 0, 100, 107, 0, 0, 0], [100, 0, 100, 107, 0, 0, 0], [200, 0, 100, 107, 0, 0, 0]],

  animations: {
    'idle(0)': { frames: [0] },
    'idle(1)': { frames: [1] },
    'idle(2)': { frames: [2] }
  }
};
const PinkYeti = {
  walk,
  idle
};
export default PinkYeti;
