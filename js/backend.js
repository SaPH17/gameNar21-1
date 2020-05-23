

//memanggil canvas di tag HTML    
    // var canvas = document.getElementById("surface");

function game(){


    var canvas = document.getElementById("surface");
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas.getContext('2d');
    var ctx3 = canvas.getContext('2d');

    var indexImage = 0
    var pathPlayer = ["../Assets/sprites/1.png"
                    ,"../Assets/sprites/2.png"
                    ,"../Assets/sprites/3.png"
                    ,"../Assets/sprites/4.png"
                    ,"../Assets/sprites/5.png"
                    ,"../Assets/sprites/6.png"
                    ,"../Assets/sprites/7.png"
                    ,"../Assets/sprites/8.png"
                    ,"../Assets/sprites/9.png"
                    ,"../Assets/sprites/10.png"
                    ,"../Assets/sprites/11.png"
                    ,"../Assets/sprites/12.png"
                    ,"../Assets/sprites/13.png"]

    var isPressed = false

    document.addEventListener("keydown",ControlDown);
    document.addEventListener("keyup",ControlUp);
    var totalCoin = 5
    var arrCoin = 0
    var maxY = 80
    var minY = 470
    var linearXCoin = []
    var linearYCoin = []
    var totalCoinAbs = 5

    var coinCollision = []

    var linearXCart = []
    var linearYCart = (0.5*canvas.height) - 85

    var framesCoin = 0
    var framesObstacle = 0
    var arrObstacle = []

    var framesMissile = 0
    var linearXMissile = []
    var linearYMissile = []
    var totalMissile = 0

    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0'


    var totalFramesCounter = 0
    var acc = 5


    var cartSpeed = -200
    var cartAcc = 6


    var gravity = 9
    var spriteBack = new Image() // background
    var spriteRoad = new Image()
    var posX = 100 , posY = 500; // posisi player
    var speedY = 0; // speed Y atasbawah
    // var player = GIF()
    // player.load("hero.gif")

    var paralaxX = 0 // untuk background
    var roadX = 0 // untuk efek road
    
    var isHit = false;
    var opacity = 1;


    function clear()
    {
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(0,0,600000,20000)

        
    

        spriteBack.src = '../Assets/bgParallax.png'
        ctx.drawImage(spriteBack,paralaxX,0,2*canvas.width,canvas.height)
        

        var x3 = new Image()
        x3.src = '../Assets/bgAssets/jembatanAsset.png'
        ctx.drawImage(x3,paralaxX,0.5*canvas.height,2*canvas.width,0.5*canvas.height)

        paralaxX-=5
        // paralaxX-=5
        paralaxX%=canvas.width
    }
    
    function road()
    {
        
        roadX -= acc
        roadX%=canvas.width

        var x3 = new Image()
        x3.src = '../Assets/layeredBg/ly5.png'
        ctx.drawImage(x3,roadX,0,2*canvas.width,canvas.height)
    

    }

    function cart()
    {
    	cartSpeed += cartAcc

		var x4 = new Image()
		if(cartAcc < 0)
		{
			x4.src = '../Assets/bgAssets/cart1Asset.png'
		}
		else
        	x4.src = '../Assets/bgAssets/cart2Asset.png'

        ctx.drawImage(x4,cartSpeed,linearYCart,150,100)
        ctx.drawImage(x4,cartSpeed+125,linearYCart,150,100)
        if(cartSpeed >= canvas.width+350 && cartAcc > 0)
        {
        	cartAcc += 2
            cartAcc *= -1
        }    
        else if(cartSpeed < -350 && cartAcc < 0)
        {
            cartAcc *= -1
            cartAcc -= 2
        }

    }

    function road2()
    {
        
        var x1 = new Image()
        var x2 = new Image()
        var x4 = new Image()
        var x5 = new Image()
        
        
        x1.src = '../Assets/layeredBg/ly2.png'
        ctx.drawImage(x1,roadX,0,2*canvas.width,canvas.height)

        x2.src = '../Assets/layeredBg/ly1.png'
        ctx.drawImage(x2,roadX,0,2*canvas.width,canvas.height)

        x4.src = '../Assets/layeredBg/ly4.png'
        ctx.drawImage(x4,roadX,0,2*canvas.width,canvas.height)

        x5.src = '../Assets/layeredBg/ly3.png'
        ctx.drawImage(x5,roadX,0,2*canvas.width,canvas.height)
    }
    function movement()
    {
        posY+=speedY // naik turun
        posY+=gravity // gravitasi
        
        
        if(posY>=minY)
        {
            posY=minY
            gravity=0
            if(totalFramesCounter % 12 == 0)
                indexImage = 11
            else if(totalFramesCounter % 3 == 0)
                indexImage = 2
            else if(totalFramesCounter % 2 == 0)
                indexImage = 1
            else if(totalFramesCounter % 1 == 0)
                indexImage = 0
        }
        else
        {
            gravity = 10
            if(isPressed)
            {
                if(totalFramesCounter % 12 == 0)
                    indexImage = 11
                else if(totalFramesCounter % 3 == 0)
                    indexImage = 2
                else if(totalFramesCounter % 2 == 0)
                    indexImage = 1
                else if(totalFramesCounter % 1 == 0)
                    indexImage = 0
            }
        }

        if(posY<=maxY)
        {
            posY = maxY
        }
        var sprite = new Image()
        sprite.src = pathPlayer[indexImage]

        if(isHit){
            ctx.globalAlpha = opacity;

            setTimeout(() => {
                opacity += 0.1
            }, 10);  

            if(opacity >= 1){
                isHit = false
                opacity = 1
            }
        }

        ctx2.drawImage(sprite,posX,posY,120,120)

        ctx2.globalAlpha = 1;
    }

    function coin()
    {
        framesCoin += 1
        // untuk bikin coin baru
        if(framesCoin>=200)
        {
            framesCoin = 0
            var posCoinY = Math.round(Math.random())
            for(let i = 0 ; i < 5 ; i++)
            {
                linearXCoin[arrCoin] = canvas.width + i*60
                linearYCoin[arrCoin] = (posCoinY ? 200 : 400)
                arrCoin++
                coinCollision.push(canvas.width + i*60)
            }
        }
        
        // print coin
        for(let i = 0 ; i < arrCoin ; i++)
        {
            var path = new Image()

            path.src = "../Assets/obstacle/coin.png"
            ctx2.drawImage(path,linearXCoin[i],linearYCoin[i],60,60)

            // collision coin
            if(posY + 110 >= linearYCoin[i] && posY <= linearYCoin[i] + 60 && linearXCoin[i] <= posX  + 95 && linearXCoin[i] + 60 >= posX)
            {
                linearXCoin.splice(i,1)
                linearYCoin.splice(i,1)
                i--
                arrCoin--
                totalCoin += 1
                totalCoinAbs += 1
            }
            else
            {
                coinCollision[i] -= acc
                linearXCoin[i] -= acc
                if(linearXCoin[i]<=-70)
                {
                    linearXCoin.shift()
                    linearYCoin.shift()
                    arrCoin--
                    i--
                }
            }
        }
    }            
    

    function missileHit()
    {
        if(isHit)
        {
            ctx.save();
            var dx = Math.random()*10 + 3;
            var dy = Math.random()*10 + 3;
            ctx.translate(dx, dy);  

            setInterval(() =>
            {
                ctx.restore();
                
            }, 200);
        }
    }

    function coinCounter()
    {
        var path = new Image()

        path.src = "../Assets/obstacle/coin.png"
        ctx2.drawImage(path,30,20,60,60)

        ctx.font = "3vw Arial"
        ctx.fillStyle = "white"
        ctx.fillText("x " + totalCoin, 100, 60)
    }

    function missile()
    {
        framesMissile++
        if(framesMissile == 20)
        {
            framesMissile = 0
            
            linearXMissile[totalMissile] = canvas.width
            
            linearYMissile[totalMissile] = posY
            totalMissile++
            if(Math.floor(Math.random() * 10) < 8)
            {
                linearYMissile[totalMissile] = Math.floor(Math.random() * (maxY-minY)) + minY
                linearXMissile[totalMissile] = canvas.width + Math.floor(Math.random() * (200-120)) + 120
                totalMissile++
            }
        }

        for(let i = 0 ; i < totalMissile ; i++)
        {
            var path = new Image()
            path.src = "../Assets/obstacle/missile.png"

            ctx2.drawImage(path,linearXMissile[i],linearYMissile[i],180,25)
            
            if(posY + 110 >= linearYMissile[i] && posY <= linearYMissile[i]+25  && linearXMissile[i]+180 >= posX && linearXMissile[i] <= posX+95)
            {
                linearXMissile.splice(i,1)
                linearYMissile.splice(i,1)
                i--
                totalMissile--
                isHit = true;            
                opacity = 0.1;

                totalCoin -= 1
            }
            else
            {
                linearXMissile[i] -= (acc+7)
                if(linearXMissile[i]<=-200)
                {
                    linearXMissile.splice(i,1)
                    linearYMissile.splice(i,1)
                    totalMissile--
                    i--
                }
            }
        }

    }

    function point()
    {
        ctx.font = "3vw Arial"
        ctx.fillStyle = "white"
        let total = (totalFramesCounter*3 + (totalCoinAbs-5)*1200)
        if(total<0)total=0
        ctx.fillText("Points = " + total, 1170, 60)
    }

    function jembatan()
    {
    
    }


    function draw()
    {
        clear() // background paralax

        
        jembatan()
        cart()
        road2() // untuk atas bawah
        
        coin() // random coin

        missileHit()



        movement() // playe☺r

        ctx.restore();
        
        road() // untuk atas bawah
        
        coinCounter()


        missile()

        point()



        totalFramesCounter++
        if(totalFramesCounter%4 == 0)
        {
            acc += 0.005
        }
        
        if(totalCoin < 0 || totalCoin > 20)
        {
            // put your code here
            canvas.style.display = "none";
            document.getElementsByClassName("outerdiv")[0].style.visibility = "visible";
            document.body.style.backgroundImage = "url('../Assets/images/background/bgAkhirv2.png')";
            details()
        }
        
        // console.log("coin : "+totalCoin)
        requestAnimationFrame(draw)
    }
    
    function ControlUp(event)
    {
        // w
        if(event.keyCode == 87)
        {
            speedY=0
            indexImage = 12
            isPressed = false
        }
        
    }
    function ControlDown(event)
    {
        // w
        if(event.keyCode == 87)
        {
            speedY=-23
            isPressed = true
        }
        
    }
    draw();
    function animateTitle(){
        var title=document.title;
        document.title=title.substr(1,title.length)+title.substr(0,1);                
    }
    setInterval(animateTitle,100);
} 

// mulai dari sini buat progress bar

var screen;

function removeLogo(){
    screen = document.getElementsByClassName('wrapper-container-logo')[0];
	screen.style.display = "none";
}
function progressBar(){
    screen = document.getElementsByClassName('progress-load')[0];
    screen.style.display = "block";
    var bar = document.getElementById("barbar");
    let percent = 0

    let timer = setInterval(function() {
        percent += 1
        document.getElementById('text').style.fontSize = "x-large"
        document.getElementById('text').innerHTML =percent +"%"
        bar.style.width = percent +"%"
    }, 30)
}
var totalmain = 0
function main() {
    removeLogo();
   
    progressBar();
    setTimeout(function(){ 
        screen.style.display = "none";
        game() 
    }, 3000);
}

function details()
{
    var benefit = document.getElementById("benefit");
    var req = document.getElementById("req");
    var test = document.getElementById("test");
    var reg = document.getElementById("reg");
    var contact = document.getElementById("contact");

    document.getElementById("benefitDetail").style.position = "absolute";
    document.getElementById("reqDetail").style.position = "absolute";
    document.getElementById("testDetail").style.position = "absolute";
    document.getElementById("regDetail").style.position = "absolute";
    document.getElementById("contactDetail").style.position = "absolute";
    
    document.getElementById("benefitDetail").style.top = "5vw";
    document.getElementById("reqDetail").style.top = "5vw";
    document.getElementById("testDetail").style.top = "5vw";
    document.getElementById("regDetail").style.top = "5vw";
    document.getElementById("contactDetail").style.top = "5vw";

    document.getElementById("benefitDetail").style.left = "1vw";
    document.getElementById("reqDetail").style.left = "1vw";
    document.getElementById("testDetail").style.left = "1vw";
    document.getElementById("regDetail").style.left = "1vw";
    document.getElementById("contactDetail").style.left = "1vw";

    //document.getElementById("benefitDetail").style.display = "block";
    

    benefit.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "visible";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    req.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "visible";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    test.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "visible";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    reg.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "visible";
        document.getElementById("contactDetail").style.visibility = "hidden";
    }

    contact.onclick = function(){
        document.getElementById("benefitDetail").style.visibility = "hidden";
        document.getElementById("reqDetail").style.visibility = "hidden";
        document.getElementById("testDetail").style.visibility = "hidden";
        document.getElementById("regDetail").style.visibility = "hidden";
        document.getElementById("contactDetail").style.visibility = "visible";
        document.getElementById("contactDetail1").style.display = "block";
    }

}
    

document.onkeydown = function(e) {
    if(e.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
    return false;
    }
}