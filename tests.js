const options = {
  greetings: {
    hello: 'Bonjour!'
  }
}

const a = (key) => {
  return key.split('.').reduce((o, i) => o[i], options)
}

console.log(a('greetings.hello'))
