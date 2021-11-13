module.exports.ecranize = ( str ) => {
  return (str + '').replace(/[\\']/g, '\'$&').replace(/\u0000/g, '\\0');
}