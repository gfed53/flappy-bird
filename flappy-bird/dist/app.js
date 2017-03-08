!function t(i,n,e){function s(c,p){if(!n[c]){if(!i[c]){var h="function"==typeof require&&require;if(!p&&h)return h(c,!0);if(o)return o(c,!0);var r=new Error("Cannot find module '"+c+"'");throw r.code="MODULE_NOT_FOUND",r}var l=n[c]={exports:{}};i[c][0].call(l.exports,function(t){var n=i[c][1][t];return s(n?n:t)},l,l.exports,t,i,n,e)}return n[c].exports}for(var o="function"==typeof require&&require,c=0;c<e.length;c++)s(e[c]);return s}({1:[function(t,i,n){var e=function(t,i){this.entity=t,this.radius=i,this.type="circle"};e.prototype.collidesWith=function(t){return"circle"===t.components.collision.type?this.collideCircle(t):"rect"===t.components.collision.type?this.collideRect2(t):"edge"===t.components.collision.type?this.collideEdge(t):"pipe-edge"===t.components.collision.type?this.collidePipeEdge(t):!1},e.prototype.collideCircle=function(t){var i=this.entity.components.physics.position,n=t.components.physics.position,e=this.radius,s=t.components.collision.radius,o={x:i.x-n.x,y:i.y-n.y},c=o.x*o.x+o.y*o.y,p=e+s;return p*p>c},e.prototype.collideRect2=function(t){var i=function(t,i,n){return i>t?i:t>n?n:t},n=this.entity.components.physics.position,e=t.components.physics.position,s=t.components.collision.size,o={x:i(n.x,e.x,e.x+s.x),y:i(n.y,e.y,e.y+s.y)},c=this.radius,p={x:n.x-o.x,y:n.y-o.y},h=p.x*p.x+p.y*p.y;return c*c>h},e.prototype.collideEdge=function(t){var i=this.entity.components.physics.position.y,n=t.components.physics.position.y;return 1===n?i>n:0===n?n>i:void 0},e.prototype.collidePipeEdge=function(t){var i=t.components.physics.position.x;return.005>i&&i>-.005},n.CircleCollisionComponent=e},{}],2:[function(t,i,n){var e=function(t){this.entity=t,this.type="edge"};e.prototype.collidesWith=function(t){return"circle"===t.components.collision.type?this.collideCircle(t):!1},e.prototype.collideCircle=function(t){return t.components.collision.collideEdge(this.entity)},n.EdgeCollisionComponent=e},{}],3:[function(t,i,n){var e=function(t){this.entity=t,this.type="pipe-edge"};e.prototype.collidesWith=function(t){return"circle"===t.components.collision.type?this.collideCircle(t):!1},e.prototype.collideCircle=function(t){return t.components.collision.collidePipeEdge(this.entity)},n.PipeEdgeCollisionComponent=e},{}],4:[function(t,i,n){var e=function(t,i){this.entity=t,this.size=i,this.type="rect"};e.prototype.collidesWith=function(t){return"circle"===t.components.collision.type?this.collideCircle(t):"rect"===t.components.collision.type?this.collideRect(t):!1},e.prototype.collideCircle=function(t){return t.components.collision.collideRect(this.entity)},e.prototype.collideRect=function(t){var i=this.entity.components.physics.position,n=t.components.physics.position,e=this.size,s=t.components.collision.size,o=i.x-e.x/2,c=i.x+e.x/2,p=i.y-e.y/2,h=i.y+e.y/2,r=n.x-s.x/2,l=n.x+s.x/2,a=n.y-s.y/2,y=n.y+s.y/2;return!(o>l||r>c||p>y||a>h)},n.RectCollisionComponent=e},{}],5:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position,n=document.getElementById("hado");t.save(),t.translate(i.x,i.y),t.beginPath(),t.drawImage(n,0,0,.1,.1),t.fill(),t.closePath(),t.restore()},n.BirdGraphicsComponent=e},{}],6:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position;t.save(),t.translate(i.x,i.y),t.beginPath(),t.lineTo(1,i.y),t.stroke(),t.restore()},n.EdgeGraphicsComponent=e},{}],7:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position;t.save(),t.translate(i.x,i.y),t.beginPath(),t.lineTo(i.x,1),t.stroke(),t.restore()},n.PipeEdgeGraphicsComponent=e},{}],8:[function(t,i,n){var e=function(t){this.entity=t};e.prototype.draw=function(t){var i=this.entity.components.physics.position,n=document.getElementById("wood");t.save(),t.translate(i.x,i.y),t.beginPath(),t.drawImage(n,0,0,.25,1),t.restore()},n.PipeGraphicsComponent=e},{}],9:[function(t,i,n){var e=function(t){this.entity=t,this.position={x:0,y:0},this.velocity={x:0,y:0},this.acceleration={x:0,y:0}};e.prototype.update=function(t){this.velocity.x+=this.acceleration.x*t,this.velocity.y+=this.acceleration.y*t,this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t},n.PhysicsComponent=e},{}],10:[function(t,i,n){var e=t("../components/graphics/bird"),s=t("../components/physics/physics"),o=t("../components/collision/circle"),c=function(){var t=new s.PhysicsComponent(this);t.position.y=.5,t.acceleration.y=0;var i=new e.BirdGraphicsComponent(this),n=new o.CircleCollisionComponent(this,.02);n.onCollision=this.onCollision.bind(this);var c="none",p="in motion",h=!1,r=0;this.components={physics:t,graphics:i,collision:n,status:c,pipes:p,paused:h,count:r}};c.prototype.onCollision=function(t){"pipe-edge"===t.components.collision.type?this.components.status="point":(this.components.physics.position.x=0,this.components.physics.position.y=.5,this.components.physics.velocity.y=0,this.components.status="collide",this.components.pipes="stopped")},c.prototype.counter=function(){this.components.paused===!0?this.components.count=0:this.components.count+=.1},c.prototype.uiCounterDisplay=function(){if(this.components.paused===!0)$("div#obs-countdown").show(),$(".ready").html("Paused");else if(this.components.count<5){var t=parseInt(5-this.components.count);$("div#obs-countdown").show(),$(".ready").html(t)}else $(".ready").html("Go!"),$("div#obs-countdown").hide()},c.prototype.countDown=function(){window.setInterval(this.counter.bind(this),100),window.setInterval(this.uiCounterDisplay.bind(this),100)},n.Bird=c},{"../components/collision/circle":1,"../components/graphics/bird":5,"../components/physics/physics":9}],11:[function(t,i,n){var e=t("../components/graphics/edge"),s=t("../components/physics/physics"),o=t("../components/collision/edge"),c=function(){var t=new s.PhysicsComponent(this);t.position.y=0;var i=new e.EdgeGraphicsComponent(this),n=new o.EdgeCollisionComponent(this);this.components={graphics:i,physics:t,collision:n}};n.BottomEdge=c},{"../components/collision/edge":2,"../components/graphics/edge":6,"../components/physics/physics":9}],12:[function(t,i,n){var e=t("../components/graphics/pipe-edge"),s=t("../components/physics/physics"),o=t("../components/collision/pipe-edge"),c=function(t){var i=new s.PhysicsComponent(this);i.position.x=t,i.position.y=0,i.velocity.x=-.5;var n=new e.PipeEdgeGraphicsComponent(this),c=new o.PipeEdgeCollisionComponent(this);this.components={graphics:n,physics:i,collision:c}};n.PipeEdge=c},{"../components/collision/pipe-edge":3,"../components/graphics/pipe-edge":7,"../components/physics/physics":9}],13:[function(t,i,n){var e=t("../components/graphics/pipe"),s=t("../components/physics/physics"),o=t("../components/collision/rect"),c=function(t,i){var n=new s.PhysicsComponent(this);n.position.x=t,n.position.y=i,n.velocity.x=-.5,this.components={physics:n};var c=function(t){return t>0?1-t:1},p=new e.PipeGraphicsComponent(this),h=new o.RectCollisionComponent(this,{x:.25,y:c(this.components.physics.position.y)});this.components={graphics:p,physics:n,collision:h}};n.Pipe=c},{"../components/collision/rect":4,"../components/graphics/pipe":8,"../components/physics/physics":9}],14:[function(t,i,n){var e=t("../components/graphics/edge"),s=t("../components/physics/physics"),o=t("../components/collision/edge"),c=function(){var t=new s.PhysicsComponent(this);t.position.y=1;var i=new e.EdgeGraphicsComponent(this),n=new o.EdgeCollisionComponent(this);this.components={graphics:i,physics:t,collision:n}};n.TopEdge=c},{"../components/collision/edge":2,"../components/graphics/edge":6,"../components/physics/physics":9}],15:[function(t,i,n){var e=t("./systems/graphics"),s=t("./systems/physics"),o=t("./systems/input"),c=t("./systems/collision"),p=(t("./systems/score"),t("./entities/bird")),h=(t("./entities/pipe"),t("./entities/top-edge")),r=t("./entities/bottom-edge"),l=(t("./entities/pipe-edge"),function(){this.entities=[new p.Bird,new h.TopEdge,new r.BottomEdge],this.graphics=new e.GraphicsSystem(this.entities),this.physics=new s.PhysicsSystem(this.entities),this.input=new o.InputSystem(this.entities),this.collision=new c.CollisionSystem(this.entities),this.html=document.querySelector("html")});l.prototype.run=function(){this.physics.run(),this.graphics.run(),this.graphics.runClear(),this.input.run(),this.entities[0].countDown()},n.FlappyBird=l},{"./entities/bird":10,"./entities/bottom-edge":11,"./entities/pipe":13,"./entities/pipe-edge":12,"./entities/top-edge":14,"./systems/collision":17,"./systems/graphics":18,"./systems/input":19,"./systems/physics":20,"./systems/score":21}],16:[function(t,i,n){var e=t("./flappy_bird");document.addEventListener("DOMContentLoaded",function(){var t=new e.FlappyBird;t.run()})},{"./flappy_bird":15}],17:[function(t,i,n){var e=function(t){this.entities=t};e.prototype.tick=function(){for(var t=0;t<this.entities.length;t++){var i=this.entities[t];if(!(!1 in i.components))for(var n=t+1;n<this.entities.length;n++){var e=this.entities[n];!1 in e.components||i.components.collision.collidesWith(e)&&(i.components.collision.onCollision&&i.components.collision.onCollision(e),e.components.collision.onCollision&&e.components.collision.onCollision(i))}}},n.CollisionSystem=e},{}],18:[function(t,i,n){var e=t("../entities/pipe"),s=t("../entities/pipe-edge"),o=(t("../entities/bird"),[.9,.75,.5,.25,-.25,-.75]),c=function(t){this.entities=t,this.canvas=document.getElementById("main-canvas"),this.context=this.canvas.getContext("2d")};c.prototype.run=function(){window.requestAnimationFrame(this.tick.bind(this)),this.createPipes()},c.prototype.tick=function(){(this.canvas.width!=this.canvas.offsetWidth||this.canvas.height!=this.canvas.offsetHeight)&&(this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight),this.context.clearRect(0,0,this.canvas.width,this.canvas.height);var t=document.getElementById("ryu-stage");this.context.drawImage(t,0,0,this.canvas.width,this.canvas.height),this.context.save(),this.context.translate(this.canvas.width/2,this.canvas.height),this.context.scale(this.canvas.height,-this.canvas.height);for(var i=0;i<this.entities.length;i++){var n=this.entities[i];!1 in n.components||n.components.graphics.draw(this.context)}this.context.restore(),window.requestAnimationFrame(this.tick.bind(this))},c.prototype.runClear=function(){window.setInterval(this.clearAll.bind(this),1)},c.prototype.clearAll=function(){"stopped"===this.entities[0].components.pipes&&(this.entities.splice(3,18),this.entities[0].components.count=0,this.entities[0].components.pipes="in motion")},c.prototype.newPipes=function(){if(this.entities[0].components.count>5){var t=Math.floor(Math.random()*o.length);this.entities.push(new e.Pipe(2,o[t])),this.entities.push(new s.PipeEdge(2)),this.entities.length>20&&this.entities.splice(3,2)}},c.prototype.createPipes=function(){window.setInterval(this.newPipes.bind(this),2e3),window.setInterval(this.drawPipes.bind(this),2e3)},c.prototype.drawPipes=function(){for(var t=0;t<this.entities.length;t++){var i=this.entities[t];!1 in i.components||i.components.graphics.draw(this.context)}},n.GraphicsSystem=c},{"../entities/bird":10,"../entities/pipe":13,"../entities/pipe-edge":12}],19:[function(t,i,n){var e=t("./graphics"),s=t("./physics"),o=function(t){this.entities=t,this.graphics=new e.GraphicsSystem(this.entities),this.physics=new s.PhysicsSystem(this.entities),this.html=document.querySelector("html"),this.canvas=document.getElementById("main-canvas"),this.pauseButton=document.getElementById("btn-pause"),this.paused=!1};o.prototype.run=function(){this.canvas.addEventListener("click",this.onClick.bind(this)),this.canvas.addEventListener("touchstart",this.onClick.bind(this),!1),this.pauseButton.addEventListener("click",this.pauseGame.bind(this),!1),this.html.addEventListener("keydown",this.onShift.bind(this),!1)},o.prototype.onClick=function(t){t.preventDefault();var i=this.entities[0];i.components.count>5&&(i.components.physics.velocity.y=.7)},o.prototype.onShift=function(t){32===t.keyCode&&this.pauseGame()},o.prototype.pauseGame=function(){this.entities[0].components.paused===!1?(this.entities[0].components.paused=!0,this.entities[0].components.physics.acceleration.y=0,this.entities[0].components.physics.velocity.y=0):this.entities[0].components.paused=!1},n.InputSystem=o},{"./graphics":18,"./physics":20}],20:[function(t,i,n){var e=t("./collision"),s=t("./score"),o=function(t){this.entities=t,this.collisionSystem=new e.CollisionSystem(t),this.score=new s.Score(t)};o.prototype.run=function(){window.setInterval(this.tick.bind(this),1e3/60),this.runControl(),this.score.get()},o.prototype.reset=function(){"collide"===this.entities[0].components.status&&(this.entities[0].components.count=0,this.entities[0].components.physics.acceleration.y=0,this.entities[0].components.status="none")},o.prototype.runControl=function(){window.setInterval(this.controlBird.bind(this),1/60),window.setInterval(this.controlPipes.bind(this),1/60)},o.prototype.controlBird=function(){this.entities[0].components.count>5?this.entities[0].components.physics.acceleration.y=-2:(this.entities[0].components.physics.acceleration.y=0,this.entities[0].components.physics.velocity.y=0)},o.prototype.controlPipes=function(){for(var t=3;t<this.entities.length;t++){var i=this.entities[t];entityVeloc=this.entities[t].components.physics.velocity.x,this.entities[0].components.count>35?i.components.physics.velocity.x=-.8:this.entities[0].components.count>5?i.components.physics.velocity.x=-.5:this.entities[0].components.count<=5&&(i.components.physics.velocity.x=0)}},o.prototype.tick=function(){for(var t=0;t<this.entities.length;t++){var i=this.entities[t];!1 in i.components||i.components.physics.update(1/60)}this.collisionSystem.tick(),this.score.update(),this.reset()},n.PhysicsSystem=o},{"./collision":17,"./score":21}],21:[function(t,i,n){var e=function(t){this.entities=t,this.current=parseFloat($("#pipes-flown-through").text()),this.highScore=0};e.prototype.get=function(){localStorage.getItem("high-score")&&(this.highScore=localStorage.getItem("high-score"),this.highScore=parseInt(this.highScore))},e.prototype.high=function(){this.current>this.highScore&&(this.highScore=this.current)},e.prototype.set=function(){localStorage.setItem("high-score",this.highScore)},e.prototype.update=function(){"point"===this.entities[0].components.status?(this.current+=1,this.entities[0].components.status="none"):"collide"===this.entities[0].components.status&&(this.high(),this.current=0),scoreText=String(this.current),$("#pipes-flown-through").text(scoreText),highScoreText=String(this.highScore),$("#high-score").text(highScoreText),this.set()},e.prototype.clearLocalHigh=function(){localStorage.setItem("high-score",0)},n.Score=e},{}]},{},[16]);