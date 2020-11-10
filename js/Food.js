class Food{

    constructor(){
       this.foodStock = 0;
       this.lastFed;
       this.image = loadImage("images/virtual pet images/Milk.png");
    
    }


        

    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    deductFood(){
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock-1;
          }
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    
    display(){
        var x= 80, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 50, 50);

        if (this.foodStock !== 0) {
            for (var i = 0; i<this.foodStock; i++) {
                if (i%10 ==0) {
                    x=80; 
                    y=y+50;
                }
                image(this.image, x, y, 50, 50);
                x=x+30;
                
            }
        }
    }

    bedRoom(){
        imageMode(CENTER)
        image(bedRoomImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight)
    }

    garden(){
        imageMode(CENTER)
        image(gardenImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight)
    }

    washRoom(){
        imageMode(CENTER)
        image(restRoomImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight)
    }

    vaccine(){
        imageMode(CENTER)
        image(vacImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight)
    }
}