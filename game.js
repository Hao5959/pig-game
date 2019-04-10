var scores, roundScore, activePlayer, gamePlaying;
init();

function init() {
  gamePlaying = true;

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score_0').textContent = '0';
  document.getElementById('score_1').textContent = '0';
  document.getElementById('current_0').textContent = '0';
  document.getElementById('current_1').textContent = '0';
  document.getElementById('name_0').textContent = 'player_0';
  document.getElementById('name_1').textContent = 'player_1';
  document.querySelector('.panel_0').classList.remove('winner');
  document.querySelector('.panel_1').classList.remove('winner');
  document.querySelector('.panel_0').classList.remove('active');
  document.querySelector('.panel_1').classList.remove('active');
  document.querySelector('.panel_0').classList.add('active');

}

document.querySelector('.btn_roll').addEventListener('click', function(){
  if (gamePlaying) {
    // 1. a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // 3. update the round score IF the rolled was NOT a 1
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current_' + activePlayer).textContent = roundScore;
    }else {
      // alert('You lose! Switch player!');
      nextPlayer();
    }
  }

});

document.querySelector('.btn_hold').addEventListener('click', function() {
  scores[activePlayer] += roundScore;
  document.querySelector('#score_' + activePlayer).textContent = scores[activePlayer];

  if(scores[activePlayer] >= 20) {
    document.querySelector('#name_' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.panel_' + activePlayer).classList.add('winner');
    document.querySelector('.panel_' + activePlayer).classList.remove('active');
    gamePlaying = false;
  }else {
    nextPlayer();
  }
});

document.querySelector('.btn_new').addEventListener('click', init);

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current_0').textContent = '0';
  document.getElementById('current_1').textContent = '0';

  document.querySelector('.dice').style.display = 'none';

  document.querySelector('.panel_0').classList.toggle('active');
  document.querySelector('.panel_1').classList.toggle('active');
}
