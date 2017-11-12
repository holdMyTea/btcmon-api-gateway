export default ['DB_SERVICE_HOST', 'DB_SERVICE_PORT', 'CONFIG_HOST', 'CONFIG_PORT', 'APP_HOST', 'APP_PORT']
  .reduce((acc, val) => {
    if (process.env[val]) {
      acc[val] = process.env[val]
      return acc
    } else {
      throw new Error('Enviromental property ' + val + ' is missing')
    }
  }, {})
