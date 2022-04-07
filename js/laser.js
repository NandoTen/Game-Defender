class Laser { 

    constructor(ctx, gameWith, gameHeight, mouseX, mouseY) { 

        this.ctx = ctx
        this.mousePos = { x: mouseX, y: mouseY }
        this.gameSize = { w: gameWith, h: gameHeight }
        this.laserPos = { x: gameWith / 2, y: gameHeight / 2 }
        this.blastSize = 4
        this.blastCollition = 0
        this.deleteMe = false
        this.blastSound = new Audio('./sound/blast.mp3')
        
         
    }


    draw() {

        //this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.ctx.fillStyle = 'red'
        this.ctx.beginPath()
        this.ctx.arc(this.laserPos.x , this.laserPos.y , this.blastSize, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()

        //console.log('draw laser ')
        this.move()
    }
    
    move() { 
            
        const angle = Math.atan2(this.mousePos.y - this.laserPos.y, this.mousePos.x - this.laserPos.x)
        
   

        if (this.blastCollition === 0) {

            this.laserPos.x += Math.cos(angle) * 5
            this.laserPos.y += Math.sin(angle) * 5
            
            if (Math.abs(this.mousePos.x - this.laserPos.x) < 5 && this.blastSize <= 30) {
                this.blastSize += 2
                
            
            }
        } else {

            if (this.blastSize <= 30) {this.blastSize += 2 }
               

         }
        
        if (this.blastSize > 30) {
            this.deleteMe = true
            this.blastSound.play()
            this.blastSound.volume = 1
        }
        
        
    }













}