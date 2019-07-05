// Мы используем библиотеку web-push, чтобы скрыть детали реализации связи
// между сервером приложений и службой push.
// Для получения дополнительной информации 
// см. https://tools.ietf.org/html/draft-ietf-webpush-protocol 
// и https://tools.ietf.org/html/draft-ietf-webpush-encryption.

var webPush = require('web-push');

// Про GCM_API_KEY вы можете подробнее узнать из
// https://developers.google.com/cloud-messaging/
webPush.setGCMAPIKey("AIzaSyCh5FkwP1RpqV3qTUa8nXX1j_7zVPSi4a0");
// В данном примере мы будем рассматривать только route'ы в express.js
module.exports = function(app, route) {
  app.post(route + 'register', function(req, res) {
    res.sendStatus(201);
  });

  app.post(route + 'sendNotification', function(req, res) {
    setTimeout(function() {
      // Для отправки сообщения с payload, подписка должна иметь ключи 'auth' и 'p256dh'.
      webPush.sendNotification({
        endpoint: req.body.endpoint,
        TTL: req.body.ttl,
        keys: {
          p256dh: req.body.key,
          auth: req.body.authSecret
        }
      }, req.body.payload)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        res.sendStatus(500);
        console.log(error);
      });
    }, req.query.delay * 1000);
  });
};