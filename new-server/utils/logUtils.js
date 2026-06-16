const colors ={
    YELLOW: 'yellow',
    GREEN: 'green',
    RED: 'red',
    MAGENTA: 'magenta',
    CYAN: 'cyan',
    WHITE:'white'
    }
    
    const levels={
    EMERGENCY: 1,
    ERROR: 2,
    WARNING: 3,
    ALTER: 4,
    NOTICE: 5,
    INFORMATION:6,
    DEBUG:7
    }
    
    function log(message, level){
    switch(level){
      case levels.EMERGENCY: logWithColor(message, colors.RED);
      break;
      case levels.ERROR: logWithColor(message, colors.YELLOW, colors.RED);
      break;
      case levels.WARNING: logWithColor(message, colors.MAGENTA);
      break;
      case levels.ALTER: logWithColor(message, colors.YELLOW, colors.MAGENTA);
      break;
      case levels.NOTICE: logWithColor(message, colors.YELLOW);
      break;
      case levels.INFORMATION: logWithColor(message, colors.GREEN);
      break;
      case levels.DEBUG: logWithColor(message, colors.CYAN);
      break;
      default: logWithColor(message, colors.WHITE);
      break;
    
    }
    }
    
    function logWithColor(message, color, bgColor){
    //`\x1b[105m\x1b[33maaa\x1b[0m`
    let result = `\x1b[${getAnsiColor(color)}m${message}\x1b[0m`
    if(bgColor){
        result = `\x1b[${getAnsiBackgroundColor(bgColor)}m${result}`
    }
    console.log(result);
    
    }
    
    function getAnsiColor(color){
         switch(color){
              case colors.YELLOW: return 33;
              case colors.GREEN: return 92;
              case colors.RED: return 91;
              case colors.MAGENTA: return 35;
              case colors.CYAN: return 96;
              case colors.WHITE: return 37; 
              default: return 30;
         }
    }
    
    function getAnsiBackgroundColor(color){
    
      switch(color){
              case colors.YELLOW: return 103;
              case colors.GREEN: return 102;
              case colors.RED: return 101;
              case colors.MAGENTA: return 105;
              case colors.CYAN: return 106; 
              default: return 107
         }
    }
    
    module.exports = {log, levels};
    
    
     