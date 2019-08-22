import dodo1 from './dodo1';
import dodo2 from './dodo2';
import dodo3 from './dodo3';

const Dodo = {
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
    }
  ],
  progress: [
    {
      index: 0,
      item: dodo2,
      milestone: 0,
      src: ''
    },
    {
      index: 1,
      item: dodo1,
      milestone: 50,
      src: ''
    },
    {
      index: 2,
      item: dodo3,
      milestone: 100,
      src: ''
    }
  ],
  background: {
    src: require('assets/img/background.png'),
    scaleX: 0.25,
    scaleY: 0.25
  }
};
export default Dodo;
