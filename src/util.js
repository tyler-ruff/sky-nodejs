/* 
  Get current Linux Epoch timestamp 
  @source https://stackoverflow.com/questions/25250551/node-js-how-to-generate-timestamp-unix-epoch-format/25250596#25250596
  @author Muhammad Soliman
  @usage
      * console.log("Current Time: " + Date.time())
      * console.log("Custom Time (Mon, 25 Dec 2010 13:30:00 GMT): " + new Date('Mon, 25 Dec 2010 13:30:00 GMT').toUnixTime())
*/
Date.prototype.toUnixTime = function () {
  return (this.getTime() / 1000) | 0;
};
Date.time = function () {
  return new Date().toUnixTime();
};
