class Player {

    constructor(ctx, gameWith, gameHeight) {

        this.ctx = ctx
        this.gameSize = { w: gameWith, h: gameHeight }
        this.playerSize = { w: 40, h: 40 }
        this.setEventListeners()
        this.laser = []
        
    }

//this.laser.collition
    draw() {
        
        this.ctx.fillStyle = 'black'
    
        this.ctx.fillRect(this.gameSize.w / 2 - this.playerSize.w / 2, this.gameSize.h / 2 - this.playerSize.h / 2, this.playerSize.w, this.playerSize.h)
        
        this.laser.forEach(eachLaser => eachLaser.draw())
        //console.log(this.laser)
     

    }

    setEventListeners() {

        window.addEventListener('click', event => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
            this.createLaser()

            //console.log('click')
            
        })

    }

        createLaser() {
           
        this.laser.push(new Laser(this.ctx, this.gameSize.w, this.gameSize.h, this.mouseX, this.mouseY))
        //this.laser.draw()
            //console.log('laser',this.laser)

        }
    
       
}