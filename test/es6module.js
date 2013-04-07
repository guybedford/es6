define(() => class cat {
  constructor() {
    console.log('meeow');
  }
  eat() {
    throw new Error('asdf')
  }
});
