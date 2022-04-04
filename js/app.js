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
    laser: undefined,



    init(canvasID) {

        
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
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
    

    createLaser() {


            this.laser = new Laser(this.ctx, this.gameSize.w, this.gameSize.h, this.mouseX ,this.mouseY)
            //console.log('laser',this.laser)


     },

    asteroidSpeed() { 


         this.asteroid.forEach(earchAsteroid=>{ 

             if (Math.abs(earchAsteroid.asteroidPos.x-this.gameSize.w/2) <=100) { earchAsteroid.speed= 0.05}
           
         console.log('asteroid= ',earchAsteroid.asteroidPos.x, earchAsteroid.speed ) 
             
        })



    },
     
    start() { 

        this.createAsteroid()
        

        this.createPlayer()
        this.createLaser()
        

        console.log(this.asteroid)

        setInterval(() => {
            
            this.clearAll()
            this.drawAll()

           this.colisionPlayer()
            
            
        },30)


    }, 

    clearAll() { this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h) },
            
    
    drawAll() {  this.player.draw()
        this.asteroid.forEach(eachAsteroid => { 

            eachAsteroid.draw()
            eachAsteroid.move()
        })
        this.laser.draw()
    },

    colisionPlayer() { 

        

        this.asteroid.forEach(eachAsteroid => { 



       
            if ((this.gameSize.w / 2 - this.player.playerSize.w / 2) < (eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith/ 2) + eachAsteroid.asteroidWith &&
                this.gameSize.w / 2 - this.player.playerSize.w / 2 + eachAsteroid.asteroidWith > eachAsteroid.asteroidPos.x - eachAsteroid.asteroidWith / 2 &&
                this.gameSize.h / 2 - this.player.playerSize.h / 2 < eachAsteroid.asteroidPos.y + eachAsteroid.asteroidWith &&
                this.player.playerSize.h + this.gameSize.h / 2 - this.player.playerSize.h / 2 > eachAsteroid.asteroidPos.y-eachAsteroid.asteroidWith/2
            
            ) {console.log('GAME OVER') }
            
    
        

//     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
//     // ¡colision detectada!
// }
            
        })


    },

    setEventListeners() {


        window.addEventListener('click', (event) => {
            this.mouseX = event.clientX
            this.mouseYT = event.clientY 
})



     }





    

             


}