'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('events')
      .service('myService')
      .getWelcomeMessage();
  },
};
