export default class HelperFunctions {
  static getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getreportColours() {
    let Colours = {};

    Colours["Aero"] = "#2f4f4f";
    Colours["ARCC"] = "##8b4513";
    Colours["BMEE"] = "#008000";
    Colours["CIVE"] = "#000080";
    Colours["COMM"] = "#ff0000";
    Colours["SYSC"] = "#ffff00";
    Colours["EE"] = "#000080";
    Colours["EPHYS"] = "#00ff00";
    Colours["EEE"] = "#00ffff";
    Colours["SENG"] = "#eee8aa";
    Colours["SREE"] = "#6495ed";
    Colours["MECH"] = "#ff00ff";

    return Colours;
  }
}
