/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,gameplay,turn;
init();
function init(){
    scores=[0,0];
    roundScore=0;
    turn=0;
    gameplay=true;
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display='none';

}
function nextTurn(){
    if(turn===0){
        turn=1;
    }
    else{
        turn=0;
    }
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
document.querySelector('.btn-roll').addEventListener('click',function(){
    var diceDOM=document.querySelector('.dice');
    if(gameplay){
        var dice=Math.floor(Math.random()*5)+1;
        if(dice !==1){
            roundScore=roundScore+dice;
            diceDOM.style.display='block';
            diceDOM.src='dice-'+dice+'.png'
            document.querySelector('#current-'+turn).textContent=roundScore;
        }
        else{
            roundScore=0;
            diceDOM.style.display='block';
            diceDOM.src='dice-'+dice+'.png'
            document.querySelector('#current-'+turn).textContent=roundScore;
            nextTurn();
        }
    }
});
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameplay){
        scores[turn]+=roundScore;
        roundScore=0;
        document.querySelector('#score-'+turn).textContent=scores[turn];
        if(scores[turn]>=30){
            document.querySelector('#name-'+turn).innerHTML='<b>WINNER</b>';
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            gameplay=false;
        }
        else{
            roundScore=0;
            document.querySelector('#current-'+turn).textContent=roundScore;
            nextTurn();
        }
    }
});
document.querySelector('.btn-new').addEventListener('click',init);