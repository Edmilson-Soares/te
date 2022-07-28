'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('instituicao')
      .service('myService')
      .getWelcomeMessage();
  },
};
