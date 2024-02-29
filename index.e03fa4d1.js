!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var i={};function s(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(e,t,i){t&&s(e.prototype,t);i&&s(e,i);return e};var h=function(){"use strict";function s(i){e(t)(this,s),this.game=i,this.width=100,this.height=100,this.x=.5*this.game.width-.5*this.width,this.y=this.game.height-this.height,this.speed=5,this.lives=3}return e(i)(s,[{key:"draw",value:function(e){e.fillRect(this.x,this.y,this.width,this.height)}},{key:"update",value:function(){this.game.keys.indexOf("ArrowLeft")>-1&&(this.x-=this.speed),this.game.keys.indexOf("ArrowRight")>-1&&(this.x+=this.speed),this.x<.5*-this.width?this.x=.5*-this.width:this.x>this.game.width-.5*this.width&&(this.x=this.game.width-.5*this.width)}},{key:"shoot",value:function(){var e=this.game.getProjectile();e&&e.start(this.x+.5*this.width,this.y)}},{key:"restart",value:function(){this.x=.5*this.game.width-.5*this.width,this.y=this.game.height-this.height,this.lives=3}}]),s}(),n=function(){"use strict";function s(){e(t)(this,s),this.width=30,this.height=20,this.x=0,this.y=0,this.speed=20,this.free=!0}return e(i)(s,[{key:"draw",value:function(e){this.free||e.fillRect(this.x,this.y,this.width,this.height)}},{key:"update",value:function(){this.free||(this.y-=this.speed),this.y<-this.height&&this.reset()}},{key:"start",value:function(e,t){this.x=e-.5*this.width,this.y=t,this.free=!1}},{key:"reset",value:function(){this.free=!0}}]),s}(),r=function(){"use strict";function s(i,h,n){e(t)(this,s),this.game=i,this.width=this.game.enemySize,this.height=this.game.enemySize,this.x=0,this.y=0,this.positionX=h,this.positionY=n,this.markedForDeletion=!1}return e(i)(s,[{key:"draw",value:function(e){e.strokeRect(this.x,this.y,this.width,this.height)}},{key:"update",value:function(e,t){var i=this;this.x=e+this.positionX,this.y=t+this.positionY,this.game.projectilesPool.forEach((function(e){!e.free&&i.game.checkCollision(i,e)&&(i.markedForDeletion=!0,e.reset(),i.game.gameOver||i.game.score++)})),this.game.checkCollision(this,this.game.player)&&(this.markedForDeletion=!0,!this.game.gameOver&&this.game.score>0&&this.game.score--,this.game.player.lives--,this.game.player.lives<1&&(this.game.gameOver=!0)),this.y+this.height>this.game.height&&(this.game.gameOver=!0,this.markedForDeletion=!0)}}]),s}(),a=function(){"use strict";function s(i){e(t)(this,s),this.game=i,this.width=this.game.columns*this.game.enemySize,this.height=this.game.rows*this.game.enemySize,this.x=0,this.y=-this.height,this.speedX=3,this.speedY=0,this.enemies=[],this.nextWaveTrigger=!1,this.create()}return e(i)(s,[{key:"render",value:function(e){var t=this;this.y<0&&(this.y+=5),this.speedY=0,(this.x<0||this.x>this.game.width-this.width)&&(this.speedX*=-1,this.speedY=this.game.enemySize),this.x+=this.speedX,this.y+=this.speedY,this.enemies.forEach((function(i){i.update(t.x,t.y),i.draw(e)})),this.enemies=this.enemies.filter((function(e){return!e.markedForDeletion}))}},{key:"create",value:function(){for(var e=0;e<this.game.rows;e++)for(var t=0;t<this.game.columns;t++){var i=t*this.game.enemySize,s=e*this.game.enemySize;this.enemies.push(new r(this.game,i,s))}}}]),s}(),o=function(){"use strict";function s(i){var n=this;e(t)(this,s),this.canvas=i,this.width=this.canvas.width,this.height=this.canvas.height,this.keys=[],this.player=new h(this),this.projectilesPool=[],this.numberOfProjectiles=10,this.createProjectiles(),this.fired=!1,this.columns=2,this.rows=2,this.enemySize=60,this.waves=[],this.waves.push(new a(this)),this.waveCount=1,this.score=0,this.gameOver=!1,window.addEventListener("keydown",(function(e){"1"!==e.key||n.fired||n.player.shoot(),n.fired=!0,-1===n.keys.indexOf(e.key)&&n.keys.push(e.key),"r"===e.key&&n.gameOver&&n.restart()})),window.addEventListener("keyup",(function(e){n.fired=!1;var t=n.keys.indexOf(e.key);t>-1&&n.keys.splice(t,1)}))}return e(i)(s,[{key:"render",value:function(e){var t=this;this.drawStatusText(e),this.player.draw(e),this.player.update(),this.projectilesPool.forEach((function(t){t.update(),t.draw(e)})),this.waves.forEach((function(i){i.render(e),i.enemies.length<1&&!i.nextWaveTrigger&&!t.gameOver&&(t.newWave(),t.waveCount++,i.nextWaveTrigger=!0,t.player.lives++)}))}},{key:"createProjectiles",value:function(){for(var e=0;e<this.numberOfProjectiles;e++)this.projectilesPool.push(new n)}},{key:"getProjectile",value:function(){for(var e=0;e<this.projectilesPool.length;e++)if(this.projectilesPool[e].free)return this.projectilesPool[e]}},{key:"checkCollision",value:function(e,t){return e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.y+e.height>t.y}},{key:"drawStatusText",value:function(e){e.save(),e.shadowOffsetX=2,e.shadowOffsetY=2,e.shadowColor="violet",e.fillText("Score: "+this.score,20,40),e.fillText("Wave: "+this.waveCount,20,80);for(var t=0;t<this.player.lives;t++)e.fillRect(20+10*t,100,5,20);this.gameOver&&(e.textAlign="center",e.font="100px Impact",e.fillText("GAME OVER",.5*this.width,.5*this.height),e.font="20px Impact",e.fillText("Press R to restart!",.5*this.width,.5*this.height+30)),e.restore()}},{key:"newWave",value:function(){Math.random()<.5&&this.columns*this.enemySize<.8*this.width?this.columns++:this.rows*this.enemySize<.6*this.width&&this.rows++,this.waves.push(new a(this))}},{key:"restart",value:function(){this.player.restart(),this.columns=2,this.rows=2,this.waves=[],this.waves.push(new a(this)),this.waveCount=1,this.score=0,this.gameOver=!1}}]),s}();window.addEventListener("load",(function(){var e=document.getElementById("canvas1"),t=e.getContext("2d");e.width=600,e.height=800,t.fillStyle="white",t.strokeStyle="white",t.lineWidth=5,t.font="30px impact";var i=new o(e);!function s(){t.clearRect(0,0,e.width,e.height),i.render(t),requestAnimationFrame(s)}()}))}();
//# sourceMappingURL=index.e03fa4d1.js.map
