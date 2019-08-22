import alista1 from './alista1';
import alista2 from './alista2';

const Alista = {
  size: [
    {
      scale: 0.5,
      milestone: 0
    },
    {
      scale: 1,
      milestone: 25
    },
    {
      scale: 1.5,
      milestone: 50
    }
  ],
  progress: [
    {
      index: 0,
      item: alista2,
      milestone: 0,
      src: ''
    },
    {
      index: 1,
      item: alista1,
      milestone: 50,
      src: ''
    }
  ],
  background: {
    src: require('assets/img/background4.png'),
    scaleX: 0.7,
    scaleY: 0.5
  }
};
export default Alista;
