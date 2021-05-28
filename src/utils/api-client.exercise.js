function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const fullURL = `${process.env.REACT_APP_API_URL}/${endpoint}`

  const response = window.fetch(fullURL, config).then(res => res.json())

  return response
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
