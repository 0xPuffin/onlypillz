
import { ipfs, ipfsLinkFromHash } from "./helpers";
export default function pillSketch(p) {
  let canvas;
  let width = 480;
  let height = 530;
  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noLoop();
  }

  p.draw = () => {
    // Fill in the background
    const backgroundColor ='#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    p.background(backgroundColor);

    // Get center of page
    const x = width / 2;
    const y = height / 2;

    // Find smallest dimension and scale it down
    const diameter = p.min(width, height) * 0.5;

    // Set drawing style
    const color1 = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    p.fill(color1);
    //fill(`#${Math.floor(random(1,9))}#${Math.floor(random(1,9))}#${Math.floor(random(1,9))}#${Math.floor(random(1,9))}#${Math.floor(random(1,9))}#${Math.floor(random(1,9))}`);

    p.noStroke();

    // Draw a circle
    p.circle(x, y - 100, diameter);
    p.rect(x - 120, y - 100, diameter, diameter / 2);
    const color2 = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    
    var solidColor = Math.random() > 0.33;
    if (!solidColor) {
      p.fill(color2);
    }
    p.rect(x - 120, y + 10, diameter, diameter / 2);
    p.circle(x, y + 135, diameter);

    var hasPlus = Math.random() > 0.5;
    if (hasPlus) {
      p.fill(color2);
      p.rect(x - 10, y - 150, diameter / 10, diameter / 2);
      p.rect(x - 60, y - 100, diameter / 2, diameter / 10);
    }

    var hasMinus = Math.random() > 0.3;
    if (hasMinus) {
      p.fill(color1);
      p.rect(x - 60, y + 100, diameter / 2, diameter / 10);
    }
console.log("p is ");
console.log(p);
console.log("canvas is ");
console.log(canvas.canvas.toDataURL());
var data = JSON.stringify(canvas.canvas.toDataURL());

var count = localStorage.getItem("pillCount");
if (count == null) {
  count = 0;
}

localStorage.setItem("pillCount", parseInt(count)+1);
localStorage.setItem(`pill-${count}`, data);
const pillAttributes = {
  hasPlus,
  hasMinus,
  solidColor,
  primaryColor: color1,
  secondayColor: color2,
  backgroundColor
};
localStorage.setItem(`pill-${count}-attr`, JSON.stringify(pillAttributes));


  /*   var imageDatas = localStorage.getItem("imageDatas");
    console.log(`imageDatas is ${imageDatas}`); 
    if (imageDatas == null) {
      imageDatas = [canvas.canvas.toDataURL()];
    }  else {
      imageDatas = JSON.parse(imageDatas);
      console.log("parsed existing imageDatas");
      console.log(typeof(imageDatas));
      console.log("parsed existing imageDatas2");
      console.log(typeof(JSON.parse(imageDatas)));
      imageDatas = imageDatas.concat(canvas.canvas.toDataURL());
    } 
    localStorage.setItem("imageDatas", JSON.stringify(imageDatas)); */
  }
}


