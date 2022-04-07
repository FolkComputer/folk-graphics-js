import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
// // import Sketch from 'react-p5'

class Thiing {
  constructor(codeAsString) {
    this.code = codeAsString
    this.folkflake = 0x0000000000000000
    this.position = new Set()
  }
  updateCode(codeAsString) {
    this.code = codeAsString
  }
}

let w, h;
let pathStarted = false;
let g_path;
let paths = [];

function sketch(p5) {
  w = p5.windowWidth || 500;
  h = p5.windowHeigh || 500;
  console.log(p5.windowHeight, p5.windowWidth)
  p5.setup = () => p5.createCanvas(w, h);

  // p5.setup = SETUP()
  p5.draw = () => {
    /* eslint-disable no-eval */
    eval(apps[1].code)
  };
}

let apps = [
  new Thiing(`
  // p5.background(255, 130, 20)
  p5.background(0,0,0, 0.01)
  if (p5.mouseIsPressed) {
    p5.fill(255);
  } else {
    p5.fill(255, 0, 255);
  }
  p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  `),
  new Thiing(`
    p5.background(0)
    if (p5.mouseIsPressed) {
      p5.fill(255);
    } else {
      p5.fill(255, 0, 255);
    }
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  `),
  new Thiing(`
    p5.background(0, 0, 0);
    if (p5.mouseIsPressed) {
        if (!pathStarted) {
            g_path = new Path();
            pathStarted = true;
            p5.paths.push(g_path);
        }
        if (pathStarted) {
          g_path.addPoint(p5.mouseX, p5.mouseY);
        }
    }

    if (!p5.mouseIsPressed) {
        if(pathStarted){
            g_path.completed = true; 
        }
        pathStarted = false;
    }

    paths.forEach((p) => {
        p.drawPath();
    });

    paths.forEach((p) => {
        if(p.completed){
            p.update();

        }
    });
  `)
]

// boot different react component "sketch"
// TODO: figure out how to not have to reference p5 EVERYWHERE
export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}


export default App;
