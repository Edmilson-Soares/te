'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('site')
      .service('myService')
      .getWelcomeMessage();
  },
};
