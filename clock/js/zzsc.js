$(function(){
$('#zzsc').html('<canvas id="canvas"></canvas>');
var WINDOW_WIDTH = 920;
		var WINDOW_HEIGHT = 400;
		var RADIUS = 7; //球半径
		var NUMBER_GAP = 10; //数字之间的间隙
		var u=0.65; //碰撞能量损耗系数
		var context; //Canvas绘制上下文
		var balls = []; //存储彩色的小球
		const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //彩色小球的颜色
		var currentNums = []; //屏幕显示的8个字符
		var digit =
                [
                    [
                        [0,0,1,1,1,0,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,0,1,1,0],
                        [0,0,1,1,1,0,0]
                    ],//0
                    [
                        [0,0,0,1,1,0,0],
                        [0,1,1,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [1,1,1,1,1,1,1]
                    ],//1
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,1,1],
                        [1,1,1,1,1,1,1]
                    ],//2
                    [
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,1,0,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//3
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,0],
                        [0,0,1,1,1,1,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,1,1,0],
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,1]
                    ],//4
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,1,1,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//5
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//6
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0]
                    ],//7
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//8
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,1,1,0,0,0,0]
                    ],//9
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0]
                    ]//:
                ];

		function drawDatetime(cxt){
			var nums = [];

			context.fillStyle="#005eac"
			var date = new Date();
			var offsetX = 70, offsetY = 30;
			var hours = date.getHours();
			var num1 = Math.floor(hours/10);
			var num2 = hours%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var minutes = date.getMinutes();
			var num1 = Math.floor(minutes/10);
			var num2 = minutes%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var seconds = date.getSeconds();
			var num1 = Math.floor(seconds/10);
			var num2 = seconds%10;
			nums.push({num: num1});
			nums.push({num: num2});

			for(var x = 0;x<nums.length;x++){ nums[x].offsetx="offsetX;" offsetx="drawSingleNumber(offsetX,offsetY," nums[x].num,cxt);="" 两个数字连一块，应该间隔一些距离="" if(x<nums.length-1){="" if((nums[x].num!="10)" &&(nums[x+1].num!="10)){" offsetx+="NUMBER_GAP;" }="" 说明这是初始化="" if(currentnums.length="=0){" currentnums="nums;" }else{="" 进行比较="" for(var="" index="0;index<currentNums.length;index++){" if(currentnums[index].num!="nums[index].num){" 不一样时，添加彩色小球="" addballs(nums[index]);="" currentnums[index].num="nums[index].num;" renderballs(cxt);="" updateballs();="" return="" date;="" function="" addballs="" (item)="" {="" var="" num="item.num;" nummatrix="digit[num];" y="0;y<numMatrix.length;y++){" x="0;x<numMatrix[y].length;x++){" if(nummatrix[y][x]="=1){" ball="{" offsetx:item.offsetx+radius+radius*2*x,="" offsety:30+radius+radius*2*y,="" color:colors[math.floor(math.random()*colors.length)],="" g:1.5+math.random(),="" vx:math.pow(-1,="" math.ceil(math.random()*10))*4+math.random(),="" vy:-5="" balls.push(ball);="" renderballs(cxt){="" cxt.beginpath();="" cxt.fillstyle="balls[index].color;" cxt.arc(balls[index].offsetx,="" balls[index].offsety,="" radius,="" 0,="" 2*math.pi);="" cxt.fill();="" updateballs="" ()="" i="0;" ball.offsetx="" +="ball.vx;" ball.offsety="" ball.vy+="ball.g;" if(ball.offsety=""> (WINDOW_HEIGHT-RADIUS)){
					ball.offsetY= WINDOW_HEIGHT-RADIUS;
					ball.vy=-ball.vy*u;
				}
				if(ball.offsetX>RADIUS&&ball.offsetX</nums.length;x++){>