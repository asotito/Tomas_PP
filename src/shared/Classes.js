export class Classes{
    constructor(scene){
        this.scene = scene
    }

    scaleImage(image, multiplierX, multiplierY, center, interactive, originX, originY){

        const cam = this.scene.cameras.main;

        image.setOrigin(originX, originY);

        if(interactive){
            image.setInteractive();
        }
        
        const imageX = cam.width / image.width;
        const imageY = cam.height / image.height;

            // Use the smaller scale to maintain aspect ratio (fit inside)
        const imageScale = Math.min(imageX/multiplierX, imageY/multiplierY);

        image.setScale(imageScale);

        // Optionally center it if you want it centered
        if (center){
            image.x = (cam.width - image.displayWidth) / 2;
            image.y = (cam.height - image.displayHeight) / 2;
        }

        return image;
    }
}