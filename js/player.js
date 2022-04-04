class Player{ 

constructor(ctx, gameWith, gameHeight){ 

    this.ctx = ctx
    this.gameSize = {w: gameWith, h: gameHeight}
    this.playerSize = {w: 40, h: 40}
}






    draw() { 
        
        this.ctx.fillStyle = 'black'
    
        this.ctx.fillRect(this.gameSize.w / 2 - this.playerSize.w / 2, this.gameSize.h / 2 - this.playerSize.h / 2, this.playerSize.w, this.playerSize.h)
        
      
    //     this.ctx.lineWidth = 10
    //     this.ctx.strokeStyle = 'white'

    //     this.ctx.beginPath()
    //     this.ctx.arc(this.gameSize.w / 2 , this.gameSize.h/ 2 , this.playerSize, 0, Math.PI * 2)
    //     this.ctx.fill()
    //     this.ctx.stroke()
    //     this.ctx.closePath()

    }





}