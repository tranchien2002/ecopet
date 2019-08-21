import whiteYeti from './whiteYeti';
import pinkYeti from './pinkYeti';
import goldYeti from './goldYeti';
const Yeti = {
  size: [
    {
      scale: 0.5,
      milestone: 0
    },
    {
      scale: 0.75,
      milestone: 25
    },
    {
      scale: 1,
      milestone: 50
    },
    {
      scale: 1.25,
      milestone: 75
    },
    {
      scale: 1.5,
      milestone: 100
    }
  ],
  progress: [
    {
      index: 0,
      item: whiteYeti,
      milestone: 0,
      src: 'https://image.flaticon.com/icons/svg/1994/1994980.svg'
    },
    {
      index: 1,
      item: goldYeti,
      milestone: 50,
      src: 'https://image.flaticon.com/icons/svg/1994/1994987.svg'
    },
    {
      index: 2,
      item: pinkYeti,
      milestone: 100,
      src: 'https://image.flaticon.com/icons/svg/1994/1994999.svg'
    }
  ],
  background: {
    src: require('assets/img/background1.png'),
    scaleX: 0.7,
    scaleY: 0.75
  }
};
export default Yeti;
