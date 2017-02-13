const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const token = '<put here your token>';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, function(msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

var notes = [];

bot.onText(/\/Remembermeplz (.+) at (.+)/, function(msg, match) {
  var userId = msg.from.id; // sender ID
  var text = match[1]; // sender text (what he wants not to forget)
  var time = match[2]; // time to remind!
  
  notes.push({'uid': userId, 'time': time, 'text': text});
  
  bot.sendMessage(userId, 'Ok, i will try to help you with it!');
});

setInterval(function() {
  for (var i = 0; i < notes.length; i++) {
    var curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] == curDate) {
      bot.sendMessage(notes[i]['uid'], 'Hi, you asked me to remind you ' + notes[i]['text']);
      notes.splice(i, 1);
    }
  }
}, 1000);
