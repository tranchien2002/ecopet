import alista1 from './alista1';
import alista2 from './alista2';

const Alista = {
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
  ]
};
export default Alista;
