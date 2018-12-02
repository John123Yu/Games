let makeId = range => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < range; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

let getCards = (players, name) => {
  var return_ = [];
  players
    .filter(data => data.name === name)
    .map(data => data.hand)
    .forEach(cards => {
      cards.forEach(card => {
        return_.push(card);
      });
    });
  return return_;
};

module.exports = { makeId, getCards };
