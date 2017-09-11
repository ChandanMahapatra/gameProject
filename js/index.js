    $(document).ready(function(){
           
       //Instructions Menu     
            $("#instructions").on("click",function(e){
                $("#game-menu").hide();
                $("#game-instructions").fadeIn();
            });
            $("#main-menu").on("click",function(e){
                $("#game-instructions").hide();
                $("#game-menu").fadeIn();
            });
      
      
      //End Game
            $("#main-menu-P1").on("click",function(e){
                $("#Player1Turn").hide();
                $("#game-menu").fadeIn();
            });
             $("#main-menu-P2").on("click",function(e){
                $("#Player2Turn").hide();
                $("#game-menu").fadeIn();
            });
             $("#main-menu-PS").on("click",function(e){
                $("#PlayerStats").hide();
                $("#game-menu").fadeIn();
            });
      
      
      
        //Start Game 
      
      
            $("#start-game").on("click",function(e){
                $("#game-menu").hide();
                $("#Player1Turn").fadeIn();
                
                
                //Initialization
                var playerMoney = [];
                var playerHealth = [];
                var playerAttack = [];
                var playerDefence = [];
                var playerSoldier = [];
                var playerWall = [];
                var playerFarm = [];
                var playerIndustry = [];

                for(i=0;i<2;i++)
                {
                  playerMoney[i] = 500;
                  playerHealth[i] = 100;
                  playerAttack[i] = 0;
                  playerDefence[i] = 0;
                  playerSoldier[i] = 0;
                  playerWall[i]  = 0;
                  playerFarm[i] = 0;
                  playerIndustry[i] = 0;
                }
              
                //Stats Calculation
                  for(i=0;i<2;i++)
                  {
                    playerAttack[i] =  20 + playerSoldier[i]*7;
                    playerDefence[i] = 10 + playerWall[i]*5;
                    playerMoney[i]+= playerIndustry[i]*20;
                    playerHealth[i]+= playerFarm[i]*5;
                    if(playerHealth[i]>100)
                     playerHealth[i] =100;
                  }
              
                $("#Enter-p1").on("click",function(e){
                    var p1InputValue = parseFloat(document.querySelector('#p1Input').value);
                    var playerno = 0;
                    PStats(p1InputValue, playerno);
                    $("#Player1Turn").hide();
                    $("#Player2Turn").fadeIn();
                });
                
                $("#Enter-p2").on("click",function(e){
                    var p2InputValue = parseFloat(document.querySelector('#p2Input').value);
                    var playerno = 1;
                    PStats(p2InputValue, playerno);
                    $("#Player2Turn").hide();
                    $("#PlayerStats").fadeIn();
                });
              
                $("#Enter-PS").on("click",function(e){
                    $("#PlayerStats").hide();
                    $("#Player1Turn").fadeIn();
                });   
              
              
              
                function PStats(pValue, pno){
                  var playerInput = pValue;
                  var i = pno;
                  switch (playerInput)
                    {
                      case 1:
                      if(playerMoney[i]>60)
                      {
                        playerWall[i]++;
                        playerMoney[i]-=60 ;
                      }
                      else
                      {
                        alert("You do not have enough money to build this!!");
                      }
                      break;
                      case 2:
                      if(playerMoney[i]>75)
                      {
                        playerSoldier[i]++;
                        playerMoney[i]-=75 ;
                      }
                      else
                      {
                        alert("You do not have enough money to build this!!");
                      }
                      break;
                      case 3:
                      if(playerMoney[i]>75)
                      {
                        playerIndustry[i]++;
                        playerMoney[i]-=75 ;
                      }
                      else
                      {
                        alert("You do not have enough money to build this!!");
                      }
                      break;
                      case 4:
                      if(playerMoney[i]>80)
                      {
                        playerFarm[i]++;
                        playerMoney[i]-=80;
                      }
                      else
                      {
                        alert("You do not have enough money to build this!!");
                      }
                      break;
                      case 5:
                      {
                        var dam = 0;
                        if(i == 0)
                          {
                            if(playerHealth[i]>0)
                            {
                              dam = playerAttack[i]-playerDefence[i+1]/2;
                              if(dam>0)
                                  {
                                    playerHealth[i+1]-= dam;
                                  }  
                            }
                            else
                            {
                              console.log("Game Over");
                              console.log("Player 1 Health: " + playerHealth[0]);
                              console.log("Player 2 Health: " + playerHealth[1]);
                              alert("Player 2 Wins");
                            }
                          } 
                        else
                          {
                            if(playerHealth[i]>0)
                            {
                              dam = playerAttack[i]-playerDefence[i-1]/2;
                              if(dam>0)
                                {
                                    playerHealth[i-1]-= dam;
                                }
                            }
                            else
                            {
                              console.log("Game Over");
                              console.log("Player 1 Health: " + playerHealth[0]);
                              console.log("Player 2 Health: " + playerHealth[1]);
                              alert("Player 1 Wins");
                            }
                          }
                        break;
                      }
                  }
                  if(i == 1)
                  {
                    for(var k=0;k<2;k++)
                    {
                      playerAttack[k] =  20 + playerSoldier[k]*7;
                      playerDefence[k] = 10 + playerWall[k]*5;
                      playerMoney[k]+= playerIndustry[k]*20;
                      playerHealth[k]+= playerFarm[k]*5;
                      if(playerHealth[k]>100)
                        {
                          playerHealth[k] =100;
                        }
                    }
                    document.querySelector('.p1Health1').innerHTML = playerHealth[0];
                    var p1Health1Element = document.querySelector(".p1Health1");
                    var p1HealthBar = 2 * playerHealth[0];
                    var p1HealthElement = document.querySelector(".p1Health");
                    p1HealthElement.style.width = p1HealthBar+"px";
                    if(playerHealth[0] >= 75)
                       {
                        p1HealthElement.style.background = "#44D560";
                        p1Health1Element.style.color = "#44D560"; 
                       }
                    else if(playerHealth[0] <75 && playerHealth[0] >=40)
                            {
                            p1HealthElement.style.background = "#E7BD61";
                            p1Health1Element.style.color = "#E7BD61";  
                            }
                    else {
                            p1HealthElement.style.background = "#CA2F12";
                            p1Health1Element.style.color = "#CA2F12";
                            }        
                    document.querySelector('.p1Attack').innerHTML = playerAttack[0];
                    document.querySelector('.p1Defence').innerHTML = playerDefence[0];
                    document.querySelector('.p1Money').innerHTML = playerMoney[0];
                    document.querySelector('.p1Wall').innerHTML = playerWall[0];
                    document.querySelector('.p1Soldier').innerHTML = playerSoldier[0];
                    document.querySelector('.p1Industry').innerHTML = playerIndustry[0];
                    document.querySelector('.p1Farm').innerHTML = playerFarm[0];
                    document.querySelector('.p2Health2').innerHTML = playerHealth[1];
                    var p2Health2Element = document.querySelector(".p2Health2");
                    var p2HealthBar = 2 * playerHealth[1];
                    var p2HealthElement = document.querySelector(".p2Health");
                    p2HealthElement.style.width = p2HealthBar+"px";
                    if(playerHealth[1] >= 75)
                       {
                        p2HealthElement.style.background = "#44D560";
                        p2Health2Element.style.color = "#44D560";
                       }
                    else if(playerHealth[1] <75 && playerHealth[1] >=40)
                            {
                            p2HealthElement.style.background = "#E7BD61";
                            p2Health2Element.style.color = "#E7BD61";
                            }
                    else {
                            p2HealthElement.style.background = "#CA2F12";
                            p2Health2Element.style.color = "#CA2F12";
                            } 
                    document.querySelector('.p2Attack').innerHTML = playerAttack[1];
                    document.querySelector('.p2Defence').innerHTML = playerDefence[1];
                    document.querySelector('.p2Money').innerHTML = playerMoney[1];
                    document.querySelector('.p2Wall').innerHTML = playerWall[1];
                    document.querySelector('.p2Soldier').innerHTML = playerSoldier[1];
                    document.querySelector('.p2Industry').innerHTML = playerIndustry[1];
                    document.querySelector('.p2Farm').innerHTML = playerFarm[1];
                  }
                }
              
              
     
            }); //end of game function
      
      
   });