import whiteYeti from './whiteYeti';
import pinkYeti from './pinkYeti';
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
      item: pinkYeti,
      milestone: 25,
      src: 'https://image.flaticon.com/icons/svg/1994/1994987.svg'
    },
    {
      index: 2,
      item: pinkYeti,
      milestone: 50,
      src: 'https://image.flaticon.com/icons/svg/1994/1994999.svg'
    },
    {
      index: 3,
      item: pinkYeti,
      milestone: 75,
      src: 'https://image.flaticon.com/icons/svg/1995/1995005.svg'
    },
    {
      index: 4,
      item: pinkYeti,
      milestone: 100,
      src: 'https://image.flaticon.com/icons/svg/1995/1995018.svg'
    }
  ]
};
export default Yeti;
