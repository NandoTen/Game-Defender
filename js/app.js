const gameDefender = {
    name: 'Defender App',
    description: 'Canvas app for Game',
    version: '1.0.0',
    author: 'Iñigo & Fernando',
    license: undefined,
    canvasNode: undefined,
    buttonStart: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },
    player: undefined,
    asteroid: [],
    numberAsteroid: 10,
    indexFrame: 0,
    mouseX: 0,
    mouseY: 0,
    lifes: 2,
    intervaldID: 0,
    timeoutID: 0,
    level: 1,
    checkLife: true,
    framesCounter: 0,
  
    // this.player.collition

    init(canvasID) {
  
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.buttonStart = document.querySelector(`.start`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()
        this.intro()
        setTimeout(() => { this.start() }, 3000);

    },

    background() {

        const imageInstance = new Image()
        imageInstance.src = `images/${night-stars.jpg}`
        imageInstance.onload = () => this.ctx.drawImage(imageInstance, 0, 0, this.gameSize.w, this.gameSize.h)


     },

    setDimensions() {
        this.gameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
        //this.canvasNode.style.backgroundColor = 'Gray'
        
    },
      
    createPlayer() {
    this.player = new Player(this.ctx, this.gameSize.w, this.gameSize.h, 10)
    },

    createAsteroid() {

        for (let i = 0; i < this.numberAsteroid; i++) {
            this.asteroid.push(new Asteroid(this.ctx, this.gameSize.w, this.gameSize.h))
        }
        this.asteroidSpeed()
    },
    

    asteroidSpeed() {
        this.asteroid.forEach(earchAsteroid => {
            if (Math.abs(earchAsteroid.asteroidPos.x - this.gameSize.w / 2) <= 100) { earchAsteroid.speed = 0.05 }    
        })
    },

 
    start() {
        console.log('Start', this.checkLife)
        this.createPlayer()
        this.createAsteroid()

        this.intervalID = setInterval(() => {

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            
            this.clearAll()
            this.drawAll()
            //this.collitionsLaser()
            this.collitionsLaser2()
            this.colisionPlayer()
            
            this.deleteLaser()    
        }, 30)


    },

    clearAll() { this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h) },
            
    drawAll() {
        this.player.draw()
        this.asteroid.forEach(eachAsteroid => {

            eachAsteroid.draw((this.framesCounter))
            eachAsteroid.move()
        })
        
    },

    colisionPlayer() {

        this.asteroid.forEach(eachAsteroid => {


            if ((this.gameSize.w / 2 - this.player.playerSize.w / 2) < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                (this.gameSize.w / 2 - this.player.playerSize.w / 2) + this.player.playerSize.w > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
                (this.gameSize.h / 2 - this.player.playerSize.h / 2) < (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                this.player.playerSize.h + (this.gameSize.h / 2 - this.player.playerSize.h / 2) > (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2)
            
            ) {
                
                clearInterval(this.intervalID)
                this.checkLife = false
                console.log('ColisionPlayer', this.checkLife)
                console.log('ColisionPlayer',this.lifes)
                this.lifes --
                this.asteroid = []
                this.player.laser = []
                
                if (this.lifes > 0) { this.resetGame() }
                else { this.gameOver()}

                


            }

            //     if (rect1.x < rect2.x + rect2.width &&
            //    rect1.x + rect1.width > rect2.x &&
            //    rect1.y < rect2.y + rect2.height &&
            //    rect1.height + rect1.y > rect2.y) {
            //     // ¡colision detectada!
            // }
            
        })
    },

    collitionsLaser() {

        console.log('asteroids', this.asteroid.length)
    
        if (this.asteroid.length === 0 && this.checkLife) {

            console.log('asteroids CERO')
            clearInterval(this.intervalID)
           
            this.nextLevel()
        } else { 
            
        this.player.laser.forEach((eachLaser, indexLaser) => {

            this.asteroid.forEach((eachAsteroid, indexAsteroid) => {


                if (eachLaser.laserPos.x < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                    eachLaser.laserPos.x + eachLaser.blastSize * 2 > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
                    eachLaser.laserPos.y < (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                    eachLaser.blastSize * 2 + eachLaser.laserPos.y > (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2)) {
 
                    eachLaser.blastCollition = 1
    
    
                    this.asteroid.splice(indexAsteroid, 1)


                }

            })

        })
            
    }
    },
    
     collitionsLaser2() {

    
        if (this.asteroid.length === 0 && this.checkLife) {

            clearInterval(this.intervalID)
           
            this.nextLevel()
        } else { 
            
            this.player.laser.forEach((eachLaser, indexLaser) => {
            
                if (eachLaser.blastSize <= 9) { 

                this.asteroid.forEach((eachAsteroid, indexAsteroid) => {


                    if (eachLaser.laserPos.x < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                        eachLaser.laserPos.x + eachLaser.blastSize * 2 > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
                        eachLaser.laserPos.y < (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2) + eachAsteroid.asteroidWith &&
                        eachLaser.blastSize * 2 + eachLaser.laserPos.y > (eachAsteroid.asteroidPos.y - eachAsteroid.asteroidWith / 2)) {
 
                        eachLaser.blastCollition = 1
                    
                        if (eachAsteroid.asteroidLife === 3) {
                        
                            //console.log('asteroid = ',eachAsteroid.asteroidWith)
                        
                            eachAsteroid.asteroidWith = 30
                            eachAsteroid.asteroidLife--


                        } else if (eachAsteroid.asteroidWith === 30 && eachAsteroid.asteroidLife === 2) {
                            eachAsteroid.asteroidLife--
                        }
                        else if (eachAsteroid.asteroidWith === 30 && eachAsteroid.asteroidLife === 1) {
                            this.asteroid.splice(indexAsteroid, 1)
                        }
    
    
                    


                    }

                })
            }

        })
            
    }
},
            
            //     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
//     // ¡colision detectada!
// }
        
   
     
    deleteLaser() { 

        this.player.laser.forEach((eachLaser, indexLaser) => { 

            if (eachLaser.deleteMe == true) { 

                    this.player.laser.splice(indexLaser, 1)

            }
        })
    },

    resetGame() {
        
        this.clearAll()

        
            
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'White'
            this.ctx.font = "Bold 60px Arial";
            this.ctx.fillText(`${this.lifes} LIFE REMAIN`, this.gameSize.w / 2, this.gameSize.h / 2);
            this.ctx.fillStyle = 'White'

            this.checkLife = true
            console.log('NLife checekLife', this.checkLife)
            this.timeoutID = setTimeout(() => { this.start() }, 3000);

    

    },

    gameOver() {
        this.clearAll()
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'White'
        this.ctx.font = "Bold 60px Arial";
        this.ctx.fillText("GAME OVER", this.gameSize.w / 2, this.gameSize.h / 2);
        this.setEventListernet() 
        
       
        console.log('GO checekLife',this.checkLife)

    },
    
    
    
    nextLevel() { 
        console.log('NLevel checekLife',this.checkLife)
        this.level ++
        this.clearAll()
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'White'
        this.ctx.font = "Bold 60px Arial";
        this.ctx.fillText(`NEXT LEVEL ${this.level}`, this.gameSize.w / 2, this.gameSize.h / 2);
        this.numberAsteroid += 10
        setTimeout(() => { this.start() }, 3000);
      

    },

    setEventListernet() { 

 
            let test = document.addEventListener('keydown', event => {

                if (this.lifes === 0) {
                    this.lifes = 2
                    event.code === 'Space' ? this.start() : null
                    
                } 
           
        
            })
        
    },


    intro() {

        this.clearAll()
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'White'
        this.ctx.font = "Bold 95px Arial";
        this.ctx.fillText("SPACE ", this.gameSize.w / 2, this.gameSize.h / 2);
        this.ctx.font = "Bold 60px Arial";
        this.ctx.fillText("DEFENDER", this.gameSize.w / 2, this.gameSize.h / 2 + 50);



     }


     }


    

             


