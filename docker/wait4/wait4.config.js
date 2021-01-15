module.exports = {
  // format version sem-ver
  // `v{major}.${minor}.${patch}`
  wait4: 'v0.1.0',

  // How many times should we retry waiting for a service?
  retries: 5,

  // How many ms to wait before retrying a service connection?
  waitMs: 2500,

  // services definitions
  services: [
    {
      name: 'als-consent-oracle',
      wait4: [
        {
          description: 'MySQL Consent Oracle',
          uri: 'oracle-mysql:3306',
          method: 'mysql',
          // customized RC setup
          rc: {
            namespace: 'ALS',
            configPath: '../config/default.json'
          },
          retries: 5
        }
      ]
    }
  ]
}
