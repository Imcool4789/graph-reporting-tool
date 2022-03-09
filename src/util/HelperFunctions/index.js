export default class HelperFunctions {
  static getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getReportColour(code) {
    let Colours = {};
    Colours["AEROA"] = "#008000";
    Colours["AEROB"] = "#7cfc00";
    Colours["AEROC"] = "##00fa9a";
    Colours["AEROD"] = "#ffff00";
    Colours["ARCC"] = "#696969";
    Colours["ARCCA"] = "#ff00ff";
    Colours["ARCCB"] = "#ff1493"
    Colours["BMEE"] = "#f5f5f5";
    Colours["CIVE"] = "#8b0000";
    Colours["COMM"] = "#00ffff";
    Colours["SYSC"] = "#dda0dd";
    Colours["EE"] = "#f0e68c";
    Colours["EPHYS"] = "#f08080";
    Colours["EEE"] = "#800080";
    Colours["SENG"] = "#ffa500";
    Colours["SREEA"] = "#00bfff";
    Colours["SREEB"] = "#4169e1";
    Colours["MECH"] = "#0000ff";
    Colours["BMEE"]="#ff4500";
    return Colours[code];
  }
}
