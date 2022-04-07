class Player {

    constructor(ctx, gameWith, gameHeight) {

        this.ctx = ctx
        this.gameSize = { w: gameWith, h: gameHeight }
        this.playerSize = { w: 40, h: 40 }
        
        this.laser = []
        this.imageInstance = new Image();
        this.imageInstance.src = `./images/player2.png`

     
        this.setEventListeners()

        this.audioLaser = new Audio('./sound/LaserSFX.mp3')

       

        
       
    }







    draw() {

        //console.log(this.imageInstance)
        
        //this.ctx.fillStyle = 'white'
    
        //this.ctx.fillRect(this.gameSize.w / 2 - this.playerSize.w / 2, this.gameSize.h / 2 - this.playerSize.h / 2, this.playerSize.w, this.playerSize.h)
        this.ctx.shadowColor = 'white';
        this.ctx.shadowBlur = 15;
        
        this.ctx.drawImage(this.imageInstance, this.gameSize.w / 2 - this.playerSize.w / 2, this.gameSize.h / 2 - this.playerSize.h / 2, this.playerSize.w, this.playerSize.h)
       



        


        this.laser.forEach(eachLaser => eachLaser.draw())
        //console.log(this.laser)
     

    }

    setEventListeners() {

        window.addEventListener('click', event => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
            this.createLaser()
            this.audioLaser.play();
            this.audioLaser.loop = false
            this.audioLaser.volume = 1

            //console.log('click')
            
        })

    }

        createLaser() {
           
        this.laser.push(new Laser(this.ctx, this.gameSize.w, this.gameSize.h, this.mouseX, this.mouseY))
        //this.laser.draw()
            //console.log('laser',this.laser)

        }
    
       
}