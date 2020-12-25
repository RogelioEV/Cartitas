let size;
if(window.innerHeight > window.innerWidth) size = window.innerWidth;
else size = window.innerHeight;

let app = new PIXI.Application ({
  backgroundColor: 0x011126,
  width: window.innerWidth,
  height: window.innerHeight
});
var childs = []
var floor = []
var scale = 0
document.getElementById("app").append(app.view);
let setup = ()=>{
  floor.push(PIXI.Sprite.from(app.loader.resources.floor.url), PIXI.Sprite.from(app.loader.resources.floor.url))
  var tree = PIXI.Sprite.from(app.loader.resources.tree.url)
  var bg = PIXI.Sprite.from(app.loader.resources.bg.url)
  var bg1 = PIXI.Sprite.from(app.loader.resources.bg.url)
  childs.push(tree)
  scale = Math.min(1, app.view.width/floor[0].width)
  bg.scale.set(scale)
  bg1.scale.set(scale)
  bg1.x = bg1.width;
  bg1.y = -5
  app.customScale = scale;
  app.stage.addChild(bg, bg1)
  floor.forEach(element =>{
    element.scale.set(scale)
    app.stage.addChild(element)
  })

  floor[0].x = 0
  floor[0].y = app.view.height - floor[0].height 
  floor[1].x = floor[1].width
  floor[1].y = app.view.height - floor[0].height

  childs.forEach(element =>{
    element.scale.set(scale)
    app.stage.addChild(element)
  })
  tree.y = app.view.height - (floor[0].height *2.8)
  tree.x = floor[0].width *0.05
  app.animationNodes = [];
  Snow = new SnowParticles(app);
  app.ticker.add(()=>{
    // console.log('a');
    for(let node of app.animationNodes){
      node.animate();
    }
  })
}
app.loader.add('tree',"images/tree.png")
          .add("floor", "images/floor.png")
          .add("bg", "images/background.png")
          .load(setup)

let txt = document.getElementById("text");
var datos = JSON.parse(document.body.getAttribute("datos"));
console.log(datos);
let n = 0;
document.body.addEventListener("click",onClick)
async function onClick (ev){
  console.log(txt);
  await fadeOut();
  txt.innerText = datos.text[n];
  n++;
  await fadeIn();

}
function fadeOut(){
  return new Promise(resolve => {
    txt.classList.remove("animate__fadeIn")
    txt.classList.add("animate__fadeOut")
    setTimeout(()=>{
      resolve()
    }, 500)
  })
}
function fadeIn(){
  return new Promise(resolve => {
    setTimeout(()=>{
      txt.classList.remove("animate__fadeOut")
      txt.classList.add("animate__fadeIn")
      resolve()
    }, 500)
  })
}
