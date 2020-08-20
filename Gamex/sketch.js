var friend, alien =[], bullet = [], gclip=0, bOffset=50;

function setup() {
    createCanvas(600,600);
    rectMode(CENTER);
    friend = new player();
    
    bullet[0] = new ammo();

    for(var i=0;i<3;i++){
        alien[i] = new foe();
        alien[i].y = 50;
        alien[i].x = bOffset;
        alien[i].show = true;
        bOffset +=50; 

    }
   
   
}

function draw() {
    background(200);
    friend.display();
 

    for(var i=0; i<bullet.length;i++){ 
        bullet[i].display();
        for(var j=0; j<alien.length;j++){
            alien[j].display();    
            if(bullet[i].x >= alien[j].x-20 && bullet[i].x <= alien[j].x+20 && bullet[i].y <= alien[j].y+10){
                //alien[j].show = false;
                alien.splice(j,1);
                bullet.splice(i,1);
                gclip--;
                console.log('foes left :',alien.length,'size clip :',bullet.length);
            }       
        }
        if(bullet[i].y <= 0){
            bullet.splice(i,1);
            gclip--;
        }
    }
    // for(k of alien){ 
    //     k.display();
    // }
    

}

function mouseClicked(){
    friend.show = true;
    friend.x = mouseX;
    friend.y = mouseY;
}

function keyPressed(){
    if(keyCode === ENTER){
        bullet.push(new ammo()); 
        bullet[gclip].show = true;
        bullet[gclip].path = -5;
        bullet[gclip].x = friend.x;
        bullet[gclip].y = friend.y;
        gclip++;
        
        console.log(bullet);
    }

}

function player(){
    this.x = 0;
    this.y = 0;
    this.show = false;
    this.display = function(){
        if(this.show == true){
            push();
            fill('red');
            rect(this.x,this.y,40,20);
            pop();
        }
    }
}

function foe(){
    this.x = 0;
    this.y = 0;
    this.show = false;
    this.display = function(){
        if(this.show == true){
            push();
            fill('green');
            rect(this.x,this.y,40,20);
            pop();
        }
    }
}

function ammo(){
    this.x = 0;
    this.y = height;
    this.ra = 10;
    this.size = 20;
    this.show = false;
    this.path = 0;
    this.display = function(){
        if(this.show == true){
            push();
            fill('blue');
            line(this.x,this.y,this.x,this.y-10);
            this.y += this.path;
            pop();
        }
    }
}