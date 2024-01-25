function menus(){
    if(menu ==0){
        background(bg);
    }

    else if(menu == 1){
        resizeCanvas(1440, 810);
        background(bg);
        translate(width/2, height/2);
        game();
    }

    else if(menu == 2){
		background(0);
		resizeCanvas(windowWidth, windowHeight); //resizes canvas to full screen
		
		fill(255);
		textSize(150);
		text('You Win!', width/2-300, height/2); //win text
    }

    else if(menu == 3){
		background(0);
		resizeCanvas(windowWidth, windowHeight); //resizes canvas to full screen
		
		fill(255);
		textSize(140);
		text('You Lose!', width/2-350, height/2); //lose text
    }
}

function setMenu(){
    b1.hide();
    menu = 1;
}