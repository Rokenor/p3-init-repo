import Phaser from 'phaser'
import { randomSpacedValues } from '../utils'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene'})
    }

    create () {

        this.state = "play"

        this.cameras.main.setBackgroundColor(0xcfc4ae)
        const xPositions = randomSpacedValues(200, 850, 3, 150)
        console.log(xPositions)



        // add pear obstacles
        this.pearGroup = this.physics.add.group({
            bounceX: 0,
            bounceY: 1,
            collideWorldBounds: true,
        })
        
        this.pears = []
        xPositions.forEach((x, i) => {
            let y = Phaser.Math.Between(200, 500)
            let veloY = Phaser.Math.Between(300, 600)
            let scale = Phaser.Math.FloatBetween(0.4, 0.7)
            this.pears[i] = this.pearGroup.create(x, y, 'pear')
            this.pears[i].setVelocityY(veloY)
            this.pears[i].setScale(scale)
            this.pears[i].setCircle(50, 15, 20)
        })


        // add player apple
        this.apple = this.physics.add.image(70, 440, 'apple')
        this.apple.setCollideWorldBounds(true)
        this.apple.setInteractive()
        this.apple.setScale(0.75)
        this.apple.setBounce(0.3)
        this.apple.setCircle(72, 7, 7)

        this.velocity = 0
        // increase apple velocity on tab
        this.input.on('pointerup', (event) => {
            this.velocity += 35
            this.apple.setVelocityX(this.velocity)
        })

        // add collision
        this.physics.add.collider(this.apple, this.pearGroup, () => {

            this.input.off('pointerup')
            this.apple.disableBody(true, true)
            this.cameras.main.shake(100)

            this.winText = this.add.text(512, 369, 'you failed', {
                font: '56px Ultra',
                fill: '#4e678e'
            })           
            this.displayRetry() 

        })

        this.ground = this.physics.add.staticImage(512, 768-100, 'ground')
        //this.ground.setOrigin(0,1)
        
        this.physics.add.collider(this.pears, this.ground)
        this.physics.add.collider(this.apple, this.ground)

    }

    update (time, delta) {

        // gradually reduce apple velocity
        if (this.apple.body) {
            if (this.velocity > 0) {
                this.velocity -= 1.5
                this.apple.setVelocityX(this.velocity)
                this.apple.rotation += this.velocity/4000
            }

        }

        if (this.apple.x > 960) {
            // add welldone text
            if (this.state === "play") 
            {
                this.input.off('pointerup')
                this.winText = this.add.text(512, 369, 'well done', {
                    font: '56px Ultra',
                    fill: '#4e678e'
                })
                this.displayRetry()
            }
        }
    }

    displayRetry() {
        this.retry = this.add.text(512, 469, 'retry?', {
            font: '46px Ultra',
            fill: '#999999'
        }).setInteractive()
        
        this.retry.on('pointerup', (event) => {
            this.scene.restart()
        })
        this.retry.on('pointerover', (event) => {
            this.retry.setFill('#3e577e')
        })
        this.retry.on('pointerout', (event) => {        
            this.retry.setFill('#999999',)
        })    
        this.state = "finished"
    }

}