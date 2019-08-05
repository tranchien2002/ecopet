export const walk = {
  images: [require('assets/sprites/whiteYeti/walk.png')],
  frames: [
    [1, 1, 104, 111, 0, 0, 0],
    [107, 1, 100, 107, 0, 0, 0],
    [209, 1, 121, 104, 0, 0, 0],
    [332, 1, 112, 104, 0, 0, 0]
  ],

  animations: {
    'walk(1)': { frames: [0] },
    'walk(2)': { frames: [1] },
    'walk(3)': { frames: [3] },
    'walk(4)': { frames: [2] }
  }
};
export const idle = {
  images: [require('assets/sprites/whiteYeti/idle.png')],
  frames: [[0, 0, 100, 107, 0, 0, 0], [100, 0, 100, 107, 0, 0, 0], [200, 0, 100, 107, 0, 0, 0]],

  animations: {
    'idle(1)': { frames: [0] },
    'idle(2)': { frames: [1] },
    'idle(3)': { frames: [2] }
  }
};
export const dead = {
  images: [require('assets/sprites/whiteYeti/dead.png')],

  framerate: 20,
  frames: [
    [0, 0, 100, 107, 0, 0, 0],
    [174, 0, 113, 93, 0, 0, 0],
    [348, 0, 115, 93, 0, 0, 0],
    [522, 0, 174, 64, 0, 0, 0],
    [696, 0, 172, 63, 0, 0, 0],
    [870, 0, 170, 63, 0, 0, 0],
    [1044, 0, 170, 63, 0, 0, 0]
  ],

  animations: {
    'dead[1]': { frames: [0] },
    'dead[2]': { frames: [1] },
    'dead[3]': { frames: [2] },
    'dead[4]': { frames: [3] },
    'dead[5]': { frames: [4] },
    'dead[6]': { frames: [5] },
    'dead[7]': { frames: [6] }
  }
};
export const attack = {
  images: [require('assets/sprites/whiteYeti/attack.png')],

  frames: [
    [1, 1, 132, 187, 0, 0, 0],
    [135, 1, 105, 187, 0, 0, 0],
    [242, 1, 210, 108, 0, 0, 0],
    [242, 111, 189, 96, 0, 0, 0],
    [433, 111, 176, 96, 0, 0, 0],
    [454, 1, 175, 96, 0, 0, 0],
    [611, 99, 175, 96, 0, 0, 0]
  ],

  animations: {
    'attack(1)': { frames: [0] },
    'attack(2)': { frames: [1] },
    'attack(3)': { frames: [2] },
    'attack(4)': { frames: [3] },
    'attack(5)': { frames: [4] },
    'attack(6)': { frames: [5] },
    'attack(7)': { frames: [6] }
  }
};
const WhiteYeti = {
  walk,
  idle,
  dead,
  attack
};
export default WhiteYeti;
