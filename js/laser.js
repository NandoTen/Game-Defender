class Laser { 

    constructor(ctx, gameWith, gameHeight, posX, posY, radius, velocity) { 

        this.ctx = ctx
        this.laserPos = { x: posX, y: posY }
        this.radius = radius
        this.velocity = velocity
        this.gameSize = {w: gameWith, h:gameHeight}
        
    }


    draw() {

        
        this.ctx.fillStyle = 'red'
        this.ctx.beginPath()
        this.ctx.arc(this.gameSize.w / 2 , this.gameSize.h/ 2 , 4, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()

    }
    
    move() { 

        const angle = Math.atan2(mouseY - this.gameSize.h / 2, mousex - this.gameSize.w / 2)
        
        const velocity = {

            x: Math.cos(angle),
            y: Math.sin(angle)

        }



        this.posX += this.velocity.x
        this.posY += this.velocity.y


        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false)


    }













}