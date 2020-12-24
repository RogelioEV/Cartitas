let size;
if(window.innerHeight > window.innerWidth) size = window.innerWidth;
else size = window.innerHeight;

let app = new PIXI.Application ({
  backgroundColor: 0x011126,
  width: size,
  height: size
});
var childs = []
var floor = []
var scale = 0
document.getElementById("app").append(app.view);
let setup = ()=>{
  floor.push(PIXI.Sprite.from(app.loader.resources.floor.url), PIXI.Sprite.from(app.loader.resources.floor.url))
  var tree = PIXI.Sprite.from(app.loader.resources.tree.url)
  var bg = PIXI.Sprite.from(app.loader.resources.bg.url)
  childs.push(tree)
  scale = app.view.width/floor[0].width
  bg.scale.set(scale)
  app.customScale = scale;
  app.stage.addChild(bg)
  floor.forEach(element =>{
    element.scale.set(scale)
    app.stage.addChild(element)
  })

  floor[0].x = 0
  floor[0].y = app.view.height - floor[0].height
  floor[1].x = app.view.width
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

