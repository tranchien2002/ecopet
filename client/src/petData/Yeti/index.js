import WhiteYeti from './WhiteYeti';
import PinkYeti from './PinkYeti';
const Yeti = {
  size: [
    {
      scale: 1,
      milestone: 0
    },
    {
      scale: 1.25,
      milestone: 25
    },
    {
      scale: 1.5,
      milestone: 50
    },
    {
      scale: 1.75,
      milestone: 75
    },
    {
      scale: 2,
      milestone: 100
    }
  ],
  progress: [
    {
      index: 0,
      item: WhiteYeti,
      milestone: 0,
      src: ''
    },
    {
      index: 1,
      item: PinkYeti,
      milestone: 25,
      src: ''
    },
    {
      index: 2,
      item: PinkYeti,
      milestone: 50,
      src: ''
    },
    {
      index: 3,
      item: PinkYeti,
      milestone: 75,
      src: ''
    },
    {
      index: 4,
      item: PinkYeti,
      milestone: 100,
      src: ''
    }
  ]
};
export default Yeti;
