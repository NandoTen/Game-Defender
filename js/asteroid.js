class Asteroid { 

    constructor(ctx, gameWith, gameHeight) { 

        this.ctx = ctx
        this.asteroidWith = 100 // tamaño asteroide
        this.gameSize = { w: gameWith, h: gameHeight }
        this.asteroidPos = { x: 0, y: 0 }
        this.side = 90
        this.initialPos = { x: 0, y: 0 }
        this.vector = 1
        this.speed = 1
        this.asteroidLife = 3
        this.imageAsteroid1 = new Image();
        this.imageAsteroid1.src = `./images/asteroid-sptite.png`
        this.imageAsteroid1.frames = 4;
        this.imageAsteroid1.framesIndex = 0;
        //this.imageAsteroid2 = new Image();
        //this.imageAsteroid12src = `../images/asteroid4.png`
        this.init() 
        
        

    }


    init() {

        
        this.size()
        this.randomPosition()
        this.vectorTrack()
        

    }


    size() {
        this.asteroidWith = Math.floor(Math.random() * 10) // 0 and 1  
        if (this.asteroidWith < 5) {
            this.asteroidWith = 30
            this.asteroidLife = 1
        } else {
            this.asteroidWith = 50
            this.asteroidLife = 3
        } // calcula tamaño asteroide
    }

    randomPosition() {
        
        this.asteroidPos.x = Math.floor(Math.random() * this.gameSize.w*1.5)
        this.asteroidPos.y = Math.floor(Math.random() * this.gameSize.w*1.5)
        this.side = Math.floor(Math.random()*100)
        if (this.side < 25) { this.asteroidPos.x = 0 } else if (this.side > 25 && this.side < 50) { this.asteroidPos.x = this.gameSize.w-20 }
        else if (this.side > 50 && this.side < 75) { this.asteroidPos.y = 0 } else { this.asteroidPos.y = this.gameSize.h - 20 }
        this.initialPos = { x: this.asteroidPos.x, y: this.asteroidPos.y }

        //if (Math.abs(this.asteroidPos.x-this.gameSize.w/2 <= 10)) {this.speed = 0.1 }
        
        
    }

    vectorTrack() {  if (this.initialPos.x > this.gameSize.w / 2) { this.vector = -1 }}
    

    draw(framesCounter) { 

        //console.log('framesCounter',framesCounter)
      
        this.ctx.drawImage(
            this.imageAsteroid1,
            this.imageAsteroid1.framesIndex * (this.imageAsteroid1.width / this.imageAsteroid1.frames),
            0,
           this.imageAsteroid1.width / this.imageAsteroid1.frames,
           this.imageAsteroid1.height,
            
            this.asteroidPos.x - this.asteroidWith / 2,
            this.asteroidPos.y - this.asteroidWith / 2,
            this.asteroidWith,
            this.asteroidWith)
        
        this.animate(framesCounter)

       // this.ctx.drawImage(this.imageAsteroid1,this.asteroidPos.x - this.asteroidWith / 2, this.asteroidPos.y - this.asteroidWith / 2, this.asteroidWith, this.asteroidWith)

        
    }
    
    animate(framesCounter) {
    if (framesCounter % 4 == 0) {
      this.imageAsteroid1.framesIndex++;
    }
    if (this.imageAsteroid1.framesIndex >= this.imageAsteroid1.frames) {
      this.imageAsteroid1.framesIndex = 0;
    }
  }
    
    move() { 

    

        this.asteroidPos.x += (this.vector*500/(this.gameSize.w/2))*this.speed

        //this.asteroidPos.x += (this.vector*(this.gameSize.h/2)/this.gameSize.w*2)*this.speed

        this.asteroidPos.y = ((this.gameSize.h/2-this.initialPos.y)/(this.gameSize.w/2-this.initialPos.x))*(this.asteroidPos.x - this.initialPos.x) + this.initialPos.y

 


    }



}