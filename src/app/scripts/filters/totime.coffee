'use strict'

angular.module('newSrcApp')
  .filter 'totime', ->
    (input) ->
      unless input
        return '0:00'
      time = (parseInt(input)/1000).toFixed(0)
      # Minutes and seconds
      mins = ~~(time / 60)
      secs = time % 60

      # Hours, minutes and seconds
      hrs = ~~(time / 3600)
      mins = ~~((time % 3600) / 60)
      secs = time % 60

      # Output like "1:01" or "4:03:59" or "123:03:59"
      ret = ""
      ret += "" + hrs + ":" + ((if mins < 10 then "0" else ""))  if hrs > 0
      ret += "" + mins + ":" + ((if secs < 10 then "0" else ""))
      ret += "" + secs

      return ret
