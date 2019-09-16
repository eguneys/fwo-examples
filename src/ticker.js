export default function Ticker() {

  let tick = 0;

  this.value = (scale = 1) => tick * scale;

  this.update = delta => {
    tick += delta * 0.01;
  };
  
}
