/* global Module, moment */

/* Magic Mirror Module: MMM-PostHTML
 * By Blacklyquid
 * MIT Licensed.
 */
// { "html": "Your HTML Here", "sensorId": "MMM-section-id" }

Module.register('MMM-PostHTML', {
  defaults: {
    sensorId: null,
    loadingText: 'Waiting...',
    wrapperClass: 'post-html'
  },

  requiresVersion: '2.1.0',

  start() {
    this.viewModel = null;
    this._initCommunication();
  },

  getDom() {
    const wrapper = document.createElement('div');
    wrapper.classList = this.config.wrapperClass;
    
    if (this.viewModel) {
      
        wrapper.innerHTML = `${this.viewModel.html}`;
        
    } else {
      const loadingEl = document.createElement('span');
      loadingEl.innerHTML = this.config.loadingText;
      wrapper.appendChild(loadingEl);
    }

    return wrapper;
  },

  socketNotificationReceived(notificationName, payload) {
    if (notificationName === 'MMM-PostHTML.VALUE_RECEIVED' && payload) {
      if (!this.config.sensorId || (this.config.sensorId && this.config.sensorId === payload.sensorId)) {
        this.viewModel = payload;
        this.updateDom();
      }
    }
  },

  _initCommunication() {
    this.sendSocketNotification('MMM-PostHTML.INIT', {
      sensorId: this.config.sensorId
    });
  },

  _formatTimestamp(timestamp) {
    return moment(timestamp).format('HH:mm');
  }
});
