'use strict';

module.exports = {
  publish: [{
    leoaws: {
      profile: 'default',
      region: 'us-east-1'
    },
    public: true,
  },{
    leoaws: {
      profile: 'default',
      region: 'us-west-2'
    },
    public: true,
  },{
    leoaws: {
      profile: 'default',
      region: 'ap-southeast-2'
    },
    public: true,
  }],
  deploy: {
    dev: {
      stack: 'LeoAuthDev',
      parameters: {
      },
      region: 'ap-southeast-2'
    },
    test: {
      stack: 'LeoAuthTest',
      parameters: {
      },
      region: 'us-east-1'
    }
  }
};
