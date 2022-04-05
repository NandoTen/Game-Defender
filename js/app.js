const gameDefender = {
    name: 'Defender App',
    description: 'Canvas app for Game',
    version: '1.0.0',
    author: 'Iñigo & Fernando',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },
    player: undefined,
    asteroid: [],
    numberAsteroid: 20,
    indexFrame: 0,
    mouseX: 0,
    mouseY: 0,
    lifes: 3,
    intervaldID: 0,
  
 // this.player.collition

    init(canvasID) {
  
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()

        this.start()

    },

      setDimensions() {
        this.gameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
          this.canvasNode.setAttribute('height', this.gameSize.h)
          this.canvasNode.style.backgroundColor = 'Gray'
    },
      
    createPlayer() { 

    this.player = new Player(this.ctx, this.gameSize.w, this.gameSize.h, 10)
    },

    createAsteroid() {

        for (let i = 0; i < this.numberAsteroid; i++) { 
        this.asteroid.push( new Asteroid (this.ctx, this.gameSize.w, this.gameSize.h))

        }

      this.asteroidSpeed()  

    },
    

    asteroidSpeed() { 


         this.asteroid.forEach(earchAsteroid=>{ 

             if (Math.abs(earchAsteroid.asteroidPos.x-this.gameSize.w/2) <=100) { earchAsteroid.speed= 0.05}
           
         //console.log('asteroid= ',earchAsteroid.asteroidPos.x, earchAsteroid.speed ) 
             
        })

    },


     
    start() { 
        console.log('start')
        this.createAsteroid()

        this.createPlayer()

        this.intervalID = setInterval(() => {
            
            this.clearAll()
            this.drawAll()

            this.colisionPlayer()
            this.collitionsLaser()
            this.deleteLaser()
            
            
        },30)


    }, 

    clearAll() { this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h) },
            
    
    drawAll() {
        this.player.draw()
        this.asteroid.forEach(eachAsteroid => { 

            eachAsteroid.draw()
            eachAsteroid.move()
        })
        
        // if (this.laser? ) { 
        //     this.laser.draw()
        //     this.laser.move()
        // }
    },

    colisionPlayer() { 

        this.asteroid.forEach(eachAsteroid => { 


            if ((this.gameSize.w / 2 - this.player.playerSize.w / 2) < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith/ 2) + eachAsteroid.asteroidWith &&
                (this.gameSize.w / 2 - this.player.playerSize.w / 2) + this.player.playerSize.w > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
                (this.gameSize.h / 2 - this.player.playerSize.h / 2) < (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith/ 2 ) + eachAsteroid.asteroidWith &&
                this.player.playerSize.h + (this.gameSize.h / 2 - this.player.playerSize.h / 2) > (eachAsteroid.asteroidPos.y-eachAsteroid.asteroidWith/2)
            
            ) {
                this.lifes --
                clearInterval(this.intervalID)
                this.asteroid = []
                this.player.laser = []
                this.resetGame()

                
            

            }

            // if ((this.gameSize.w / 2 - this.player.playerSize.w / 2) < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith/ 2) + eachAsteroid.asteroidWith &&
            //     this.gameSize.w / 2 - this.player.playerSize.w / 2 + eachAsteroid.asteroidWith > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
            //     this.gameSize.h / 2 - this.player.playerSize.h / 2 < eachAsteroid.asteroidPos.y + eachAsteroid.asteroidWith &&
            //     this.player.playerSize.h + this.gameSize.h / 2 - this.player.playerSize.h / 2 > eachAsteroid.asteroidPos.y-eachAsteroid.asteroidWith/2
            
            // ) {//console.log('GAME OVER') 
            // }
            
    
        

//     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
//     // ¡colision detectada!
// }
            
        })


    },

     collitionsLaser() {
    //this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth)
            
 this.player.laser.forEach((eachLaser, indexLaser)=> {

                this.asteroid.forEach((eachAsteroid, indexAsteroid) => { 


if (eachLaser.laserPos.x < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith/ 2) + eachAsteroid.asteroidWith &&
eachLaser.laserPos.x + eachLaser.blastSize*2 > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
eachLaser.laserPos.y < (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith/ 2 ) + eachAsteroid.asteroidWith &&
    eachLaser.blastSize * 2 + eachLaser.laserPos.y > (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2))
{
 
    eachLaser.blastCollition = 1
    
    
    this.asteroid.splice(indexAsteroid, 1)


            }

                }) 

             })
            

            
            //     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
//     // ¡colision detectada!
// }
        
    },
     
    deleteLaser() { 

        //console.log('deleteMe')

        this.player.laser.forEach((eachLaser, indexLaser) => { 


         

            if (eachLaser.deleteMe == true) { 

                    this.player.laser.splice(indexLaser, 1)

            }



        })



    },

    resetGame() {
        console.log('resetGame')
  
        this.clearAll()
        this.start()


     }





     }





    

             


