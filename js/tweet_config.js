var MODE_ALWAYS = "always";
var MODE_UPDATING = "updating";

var IWATTER_MODE = MODE_ALWAYS;
var BACKGROUND_COLOR = "#ffffff";
var FONT_CLASS = "medium";

var d = new Date();
//エイプリルフールだったら、
var DELETE_ANIME_TIME = (d.getMonth() == 3 && d.getDate() == 1 ) ? 0 : 1500;
var POP_INTERVAL_TIME = (d.getMonth() == 3 && d.getDate() == 1 ) ? 100:4000;
var SEARCH_WAIT_TIME = (d.getMonth() == 3 && d.getDate() == 1 ) ? 2000:POP_INTERVAL_TIME;