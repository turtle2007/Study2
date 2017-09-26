var page = 3;

function conditionBtns(arrBtn){
  for(var i = 0; i<game.condition.length; i++){
    arrBtn [i] = document.createElement("BUTTON");
    arrBtn [i].innerHTML = "Condition " + (i+1) + "<br>" + "环境" + (i+1);
    arrBtn [i].classList.add("button");
    arrBtn [i].id = game.condition[i];
    console.log("The condition " + arrBtn [i].id + " is created");
  }
  arrBtn.forEach(function(element){
    element.addEventListener('click', function(){
      gameCondition = element.id;
      console.log("The condition " + gameCondition + " is clicked");
      pagePivot(page++);
    });
  });
}

function btnUtility (btnContent){
  var arrBtn = document.createElement("BUTTON");
  arrBtn.classList.add("button");
  arrBtn.innerHTML = btnContent;
  return arrBtn;
}

function btnNext(catchBtn){//****************
  var btndiv = document.createElement("div");
  btndiv.classList.add("center");
  var aBtn = document.createElement('button');
  aBtn.innerHTML = '❯';
  aBtn.classList.add("btnNEXT");
  aBtn.addEventListener('click', function () {
    if (catchBtn === 'nothing'){//********************
      pagePivot(page++); 
      console.log('The current page is: ' + page);
      }else{
        lastPage();
      }
    });
  btndiv.appendChild(aBtn);
  btndiv.appendChild(document.createElement('br'));
  return btndiv;
}

function pagePivot(pageIndex){
    // console.log(pageIndex, page);
    switch(pageIndex) {
    case 2:
      pageTwo();
      break;
    case 3:
      var page3 = document.createElement('div')
      page3.classList.add("page3");
      $(".gamefield").append(page3);
      if(gameCondition !== 'con5' && gameCondition !== 'con6'){
        trainingPage();
      } else {
        setupDemo();
        pageDemo ();
        page = 7;
      }
      break;
    case 4: 
      pageT1(gameCondition);
      break;
    case 5:
      trainingDisplay();
      break;
    case 6:
      pageDemo ();
      break;
    case 7:
      pageT3 ();
      break;
    case 8:
      newGame();
      break;
    };
  
}

function pageTwo(){
  var arrBtn = new Array();
  $(".Page1").remove();
  $(".center").remove();
  
  var page2 = document.createElement('div')
  page2.classList.add("page2");
  $(".gamefield").append(page2);
  
  var paragraph = document.createElement("p");
  paragraph.id = 'conditions';
  paragraph.innerHTML = "Please choose this condition to continue."+ "<br>" + "请选择如下环境进入下一页。";
  $(".page2").append(paragraph);

  var divForBtn = document.createElement('div');
  divForBtn.classList.add("conditions");
  $(".page2").append(divForBtn);

  conditionBtns(arrBtn);
  // $(".page2").append(arrBtn[(Math.floor(Math.random()*arrBtn.length))]);//display one random condition
  $(".page2").append(arrBtn); //display all six conditions
}

function trainingPage(){
  $(".page2").remove();
  
  var paragraph = document.createElement("p");
  paragraph.classList.add("explainRemove");
  paragraph.innerHTML = "You will play a warm-up games for practice, but before that, please watch some videos / animations." + "<br>" + "一会儿有一个热身游戏给您练手，不过请先看如下视频或动画。";
  $(".page3").append(paragraph);

  var btndiv = btnNext('nothing');
  $(".constant").append(btndiv);
}

function pageT1 (gameCondition){
  $(".explainRemove").remove();
  if(gameCondition === "con1" || gameCondition === "con3"){ 
    var ctx = document.createElement("canvas");
    ctx.id = "mycanvas";
    ctx.width = 400;
    ctx.height = 400;
    $(".gamefield").append(ctx);
    trainingDisplay();
  }else if(gameCondition === "con2" || gameCondition === "con4"){
    PB_CMT (gameCondition);
  }
}

function trainingDisplay(){
  switch(gameCondition) {
    case 'con1':
      pitch_bright();
      break;
    case 'con2':
      PB_CMT(gameCondition);
      break;
    case 'con3': // case 'T'
      pitch_elevation();
      break;
    case 'con4': // case 'T'
      PB_CMT(gameCondition);
      break;
  };
}

function setupDemo() {
  $(".button").remove(); 
  $("#conditions").remove();
  var btndiv = btnNext('nothing');
  $(".constant").append(btndiv);
  // console.log('Done setting up demo.');
}

function pageDemo(){
  console.log("come to pageDemo");
  $("#mycanvas").remove();
  $("#myvideo").remove();
  var paragraph1 = document.createElement("p");
  paragraph1.classList.add("temp");
  paragraph1.innerHTML = "Time to play the warm-up game. In this game, you will first listen to a sound sequence, then you are expected to repeat the sequence by clicking the circle buttons on the screen. If you can, please do it as quickly and accurately as possible." + "<br>" + "接下来是热身游戏。你会先听到一串音符，伴随着一串圆环， 之后新的圆环序列会出现。你的任务是点击屏幕上的圆环，模仿你听到和看到的音序。请尽量用最短时间完成。";
  $(".page3").append(paragraph1);

  var  buttonDemo = btnUtility("Start" + "<br>" + "开始")
  buttonDemo.id = 'en_disable';
  $(".page3").append(buttonDemo);
  var btnNotPress = true;
  buttonDemo.addEventListener('click', function(){
      buttonDemo.innerHTML = "Play again?" + "<br>" + "再来一遍";
      if (btnNotPress === true){
        btnNotPress = false;
        var  buttonDemo2 = btnUtility("No, thanks, next." + "<br>" + "不了，下一页")
        buttonDemo2.id = 'en_disable';
        $(".page3").append(buttonDemo2);
        buttonDemo2.addEventListener('click', function(){
          pagePivot(page ++);
          })
        }
      startDemo();
    });
}

function startDemo(){
  $('.button').attr("disabled", true); 
  document.body.style.backgroundColor = 'black';
  $('.backgroundRect').css("backgroundColor", "rgba(255,255,255,0)");
  var rootElement = $(".page3");
  warmUpGame(rootElement);
}

function buttonEnable (){
  $('.button').attr("disabled", false);
}

function pageT3(){
  $(".page3").remove();
  var bgColorDiv = document.createElement("div");
  var paragraph1 = document.createElement("p");
  var paragraph2 = document.createElement("p");
  var paragraph3 = document.createElement("p");
  
  paragraph1.innerHTML = "Now let's begin the real game. There will be three game levels with 16 trials in each. Remember to do it as quickly and accurately as you can." + "<br>" + "游戏正式开始。游戏一共有三级，每级包含20个不同的音序。记住请尽可能用最短的时间和准度完成。";
  paragraph2.innerHTML = "In order to help you have your best performance, please make your brower full screen, and turn off music or other prompt sound on your comuter so you can hear the game easily. Please do use mouse instead of touch pad, otherwise it'll slow down your speed and waste your data for our analysis. Thanks！" + "<br>" + "为了您有最佳表现，请您全屏浏览器，暂停您电脑上可能的其它提示音。 还有，一定要用鼠标， 别用触摸板，否则会影响您的速度，不利于我们数据分析。多谢！";
  paragraph3.innerHTML = "Be ready!" + "<br>" + "准备好！";
  bgColorDiv.appendChild(paragraph1);
  bgColorDiv.appendChild(paragraph2);
  bgColorDiv.appendChild(paragraph3);
  $(".gamefield").append(bgColorDiv);
}

function pitch_bright(){
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  circleMoves('brightness', ctx);
}

function pitch_elevation(){
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  circleMoves('elevation', ctx);
}

function circleMoves(catchMoves, ctx){
  document.getElementById("mycanvas").style.background = "black";
  document.getElementById("mycanvas").style.opacity = 1.0;
  var cNotes = document.getElementById("cNotes");
  var dNotes = document.getElementById("dNotes");
  var eNotes = document.getElementById("eNotes");
  var gNotes = document.getElementById("gNotes");
  var aNotes = document.getElementById("aNotes");
  var sample = {
    colour: ['#1f1f1f', '#575757', '#8f8f8f', "#c7c7c7", '#ffffff', '#ffffff', "#c7c7c7", '#8f8f8f', '#575757', '#1f1f1f'],
    pitch: [cNotes, dNotes, eNotes, gNotes, aNotes, aNotes, gNotes, eNotes, dNotes, cNotes],
    elevation: [330, 265, 200, 135, 70, 70, 135, 200, 265, 330]
  }
  var i = 0;
  var moves = setInterval(function(){
    if (catchMoves === 'elevation'){
      circleSoundSync_ele (ctx, sample.elevation[i], sample.pitch[i]);
    }else{
      circleSoundSync_bri (ctx, sample.colour[i], sample.pitch[i]);
    }
    i++;
    if (i >=sample.elevation.length) {
      clearInterval(moves);
      setTimeout(function(){
        document.getElementById("mycanvas").style.opacity = 0.0;
      }, 450);
    }
  }, 500)
}

function trainingSound(freq){
  freq.currentTime = 0.6;
  freq.play();
}

function circleSoundSync_bri (ctx, hexColor, freq){
  trainingSound(freq);
  setTimeout(function(){
    ctx.arc(200, 200, 80, 0, 2*Math.PI);
    ctx.fillStyle = hexColor;
    ctx.fill();
    }, 70);
  if(page === 5){
    var timeElapse = 400;
  }else if(page === 6){
    var timeElapse = 500;
  }
  setTimeout(function(){
    ctx.clearRect(100, 100, 200, 200);
  }, timeElapse);
}
function circleSoundSync_ele (ctx, position, freq){
  trainingSound(freq);
  setTimeout(function(){
    ctx.beginPath();
    ctx.arc(200, position, 40, 0, 2*Math.PI);
    ctx.fillStyle = '#9696a5';
    ctx.fill();
  }, 70);
  if(page === 5){
    var timeElapse = 400;
  }else if(page === 6){
    var timeElapse = 500;
  }
  setTimeout(function(){
    ctx.clearRect(0, 0, 400, 400);
  }, timeElapse);
}

function PB_CMT (gameCondition){
  if(page >= 4){
    $("#myvideo").remove();
  }
  var ifrm = document.createElement("iframe");
  ifrm.id = "myvideo";
  if(gameCondition === "con2"){
    if(page == 5){
      ifrm.setAttribute("src", "http://content.jwplatform.com/players/ns8naR5X-WDIJhdqp.html");//jwplayer
    }else{
      ifrm.setAttribute("src", "http://content.jwplatform.com/players/ns8naR5X-WDIJhdqp.html");
    }
    ifrm.style.width = "560px";
    ifrm.style.height = "315px";
  }else{
    if(page == 5){
      ifrm.setAttribute("src", "http://content.jwplatform.com/players/lqCLzPyS-WDIJhdqp.html");//jwplayer
    }else{
      ifrm.setAttribute("src", "http://content.jwplatform.com/players/lqCLzPyS-WDIJhdqp.html");//jwplayer
    }
    ifrm.style.width = "560px";
    ifrm.style.height = "315px";
    ifrm.style.frameborder = "0"
    ifrm.style.scrolling="auto"
  }
  $(".gamefield").append(ifrm);
  console.log($('.btnNEXT'));
}