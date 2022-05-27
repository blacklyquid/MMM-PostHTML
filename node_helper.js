const bodyParser = require('body-parser');
const NodeHelper = require('node_helper'); // eslint-disable-line import/no-unresolved

module.exports = NodeHelper.create({
  start() {
    this._initHandler();
  },

  socketNotificationReceived(notificationName, payload) {
    if (notificationName === 'MMM-PostHTML.INIT') {
      console.log(`MMM-PostHTML Node helper: Init notification received from module for sensor "${payload.sensorId}".`); // eslint-disable-line no-console
    }
  },

  _initHandler() {
    this.expressApp.use(bodyParser.json());
    this.expressApp.post('/post-html', this._onJsonReceived.bind(this));
  },

  _onJsonReceived(req, res) {
    this.sendSocketNotification('MMM-PostHTML.VALUE_RECEIVED', req.body);
    res.sendStatus(200);
  }
});
