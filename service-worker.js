// Регистрируем функцию на событие 'push'
self.addEventListener('push', function(event) {
  var payload = event.data ? event.data.text() : 'Payload text';
  
  event.waitUntil(
    // Показываем уведомление с заголовком и телом сообщения.
    self.registration.showNotification('First push message', {
      body: payload,
    })
  );
});
