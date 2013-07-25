/*
 * SimpleDateFormat for JavaScript - https://github.com/noahcooper/SimpleDateFormatJS
 * Copyright (c) 2013 Noah Cooper (noah.cooper@hotmail.com)
 * Dual licensed under MIT and GPL licenses (http://projects.iamnoahcooper.com/license)
 * Version: 1.3 (25-JUL-2013)
 *
 * Based on the SimpleDateFormat Java class 
 * (http://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html)
 */

/*
 * The simpleDateFormat constructor accepts two arguments:
 *
 * pattern (optional):
 * The pattern to use for returned dates. The following subset of pattern letters from SimpleDateFormat 
 * are supported:
 *
 * y           - Year
 * M           - Month in year
 * d           - Day in month
 * E           - Day in week
 * a           - Am/pm marker
 * k(+nn|-nn)* - Hour in day (1 - 24)
 * h(+nn|-nn)* - Hour in am/pm (1 - 12)
 * m           - Minute in hour
 *
 * *The pattern letters h and k may be followed by a plus (+) or minus (-) sign and an integer between 
 *  1 and 23 to adjust the hour accordingly. This is useful, for example, when working with a Date object 
 *  in a different timezone.
 *
 * As in Java, strings can be quoted using single quotes to avoid interpretation, e.g. 
 * "MMMM d, yyyy, 'at' h:mm a". "''" represents a single quote or apostrophe, e.g. 
 * "MMMM d, yyyy, 'at' h 'o''clock'".
 *
 * If no pattern is provided, the default is "M/d/yy" for the locales en_US and es_US, or "d/M/yy" for 
 * en_CA, fr_CA, en_GB, and en_AU.
 *
 * locale (optional):
 * The locale for returned dates, comprised of an ISO-639 language code and an ISO-3166 country code. The 
 * names of months and days will be returned in the locale provided. For example, if the locale is es_US, 
 * "d 'de' MMMM 'de' yyyy" will return a date such as "6 de julio de 2012". If locale is fr_CA, 
 * "'le' d MMMM yyyy k'h'mm" will return a date such as "le 6 juillet 2012 13h00".
 
 * Currently supported values are "en_US", "es_US", "en_CA", "fr_CA", "en_GB", and "en_AU". The default 
 * is "en_US".
 */
function simpleDateFormat(pattern, locale) {
  this.locale = (locale && (locale == 'es_US' || locale == 'en_CA' || locale == 'fr_CA' || 
                 locale == 'en_GB' || locale == 'en_AU')) ? locale : 'en_US';
  
  /*
   * applyPattern is a public method which updates the pattern. It accepts one argument:
   *
   * updatedPattern (optional):
   * The updated pattern to apply.
   */
  this.applyPattern = function(updatedPattern) {
    this.pattern = updatedPattern || ((this.locale == 'en_CA' || this.locale == 'fr_CA' || 
                                       this.locale == 'en_GB' || this.locale == 'en_AU') ? 
                                      'd/M/yy' : 'M/d/yy');
  };
  this.applyPattern(pattern);
  
  /*
   * format is a public method which returns the provided Date object as a String formatted based on the 
   * defined pattern. The method accepts one argument:
   *
   * unformattedDate (optional):
   * The date to be formatted. This can be either a Date object, or an ISO-8601 string. If no date is 
   * provided, a new Date object is created at the time the method is called.
   */
  this.format = function(unformattedDate) {
    unformattedDate = unformattedDate || new Date();
    if(!(unformattedDate instanceof Date)) {
      var unformattedDateParts = unformattedDate.split('T')[0].split('-'), 
      unformattedDateTimeParts = (unformattedDate.split('T').length > 1) ? unformattedDate.split('T')[1]
                                                                                          .split('.')[0]
                                                                                          .split('Z')[0]
                                                                                          .split('-')[0]
                                                                                          .split(':') 
                                                                         : ['00', '00', '00'];
      unformattedDate = new Date(unformattedDateParts[0], (unformattedDateParts[1] - 1), 
                                 unformattedDateParts[2], unformattedDateTimeParts[0], 
                                 unformattedDateTimeParts[1], unformattedDateTimeParts[2]);
    }
    
    /*
     * oneDigitNumber is a private method which removes leading zeroes from the provided number. The 
     * method accepts one argument:
     *
     * num (required):
     * The number to be formatted.
     */
    var oneDigitNumber = function(num) {
      num = '' + num;
      return (num.indexOf('0') == 0 && num != '0') ? num.substring(1) : num;
    }, 
    
    /*
     * twoDigitNumber is a private method which ensures the provided number has at least two digits. The 
     * method accepts one argument:
     *
     * num (required):
     * The number to be formatted.
     */
    twoDigitNumber = function(num) {
      num = Number(num);
      return isNaN(num) ? '00' : (((num < 10) ? '0' : '') + num);
    }, 
    
    /*
     * The dateParts object contains each piece of the provided Date needed to construct the formatted 
     * date/time String. Each of the Numbers are converted to a String, with the exception of E.
     */
    dateParts = {
      month: twoDigitNumber(unformattedDate.getMonth() + 1), 
      date: twoDigitNumber(unformattedDate.getDate()), 
      year: twoDigitNumber(unformattedDate.getFullYear()), 
      day: unformattedDate.getDay(), 
      hour24: unformattedDate.getHours(), 
      hour12: unformattedDate.getHours(), 
      minutes: twoDigitNumber(unformattedDate.getMinutes()), 
      ampm: 'AM'
    };
    if(dateParts.hour24 > 11) {
      dateParts.ampm = 'PM';
    }
    dateParts.hour24 = twoDigitNumber(dateParts.hour24);
    if(dateParts.hour12 == 0) {
      dateParts.hour12 = 12;
    }
    if(dateParts.hour12 > 12) {
      dateParts.hour12 = dateParts.hour12 - 12;
    }
    dateParts.hour12 = twoDigitNumber(dateParts.hour12);
    
    var formattedDate, 
    
    /*
     * patternReplace is a private method which interprets a piece of the provided pattern.
     *
     * patternPart (required):
     * The piece of the pattern to be interpretted.
     */
    patternReplace = function(patternPart) {
      var patternPartFormatted = patternPart.replace(/yy+(?=y)/g, 'yy')
                                            .replace(/MMM+(?=M)/g, 'MMM')
                                            .replace(/d+(?=d)/g, 'd')
                                            .replace(/EEE+(?=E)/g, 'EEE')
                                            .replace(/a+(?=a)/g, '')
                                            .replace(/k+(?=k)/g, 'k')
                                            .replace(/h+(?=h)/g, 'h')
                                            .replace(/m+(?=m)/g, 'm'), 
      
      formattedPart = patternPartFormatted.replace(/yyy/g, dateParts.year)
                                          .replace(/yy/g, dateParts.year.substring(2))
                                          .replace(/y/g, dateParts.year)
                                          .replace(/dd/g, dateParts.date)
                                          .replace(/d/g, oneDigitNumber(dateParts.date)), 
      
      /*
       * adjustTimePattern is a private method which adjusts the hour of the provided date up or down.
       *
       * timeParts (required):
       * The pieces of the pattern split on a plus or minus sign after the hour pattern letters.
       *
       * timePatternPart (required):
       * The type of pattern letter. One of "h", "hh", "k", or "kk".
       *
       * operator (required):
       * The mathematical operator, either "+" or "-".
       */
      adjustTimePattern = function(timeParts, timePatternPart, operator) {
        for(var i = 1; i < timeParts.length; i++) {
          if(!isNaN(timeParts[i].substring(0, 1))) {
            var timePartOperand = timeParts[i].substring(0, 2);
            timeParts[i] = timeParts[i].substring(2);
            if(isNaN(timePartOperand.substring(1))) {
              timeParts[i] = timePartOperand.substring(1) + timeParts[i];
              timePartOperand = timePartOperand.substring(0, 1);
            }
            timePartOperand = Number(timePartOperand);
            if(timePartOperand > 23) {
              timePartOperand = 23;
            }
            
            var timePartResult = (operator == '+') ? timePartOperand : (0 - timePartOperand);
            if(timePatternPart == 'kk' || timePatternPart == 'k') {
              timePartResult = (Number(dateParts.hour24) + timePartResult);
              if(timePartResult > 24) {
                timePartResult = timePartResult - 24;
              }
              else if(timePartResult < 0) {
                timePartResult = timePartResult + 24;
              }
            }
            else {
              timePartResult = (Number(dateParts.hour12) + timePartResult);
              if(timePartResult > 24) {
                timePartResult = timePartResult - 24;
              }
              else if(timePartResult < 0) {
                timePartResult = timePartResult + 24;
              }
              if(timePartResult > 12) {
                timePartResult = timePartResult - 12;
              }
            }
            timePartResult = '' + timePartResult;
            if(timePatternPart == 'kk' || timePatternPart == 'hh') {
              timePartResult = twoDigitNumber(timePartResult);
            }
            if((timePatternPart == 'h' && timePartResult == 0) || (timePatternPart == 'hh' && 
               timePartResult == '00')) {
              timePartResult = '12';
            }
            timeParts[i] = timePartResult + timeParts[i];
          }
        }
        
        return timeParts.join('');
      };
      
      if(formattedPart.indexOf('k+') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('kk+'), 'kk', '+');
        formattedPart = adjustTimePattern(formattedPart.split('k+'), 'k', '+');
      }
      if(formattedPart.indexOf('k-') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('kk-'), 'kk', '-');
        formattedPart = adjustTimePattern(formattedPart.split('k-'), 'k', '-');
      }
      
      formattedPart = formattedPart.replace(/kk/g, dateParts.hour24)
                                   .replace(/k/g, oneDigitNumber(dateParts.hour24));
      
      if(formattedPart.indexOf('h+') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('hh+'), 'hh', '+');
        formattedPart = adjustTimePattern(formattedPart.split('h+'), 'h', '+');
      }
      if(formattedPart.indexOf('h-') != -1) {
        formattedPart = adjustTimePattern(formattedPart.split('hh-'), 'hh', '-');
        formattedPart = adjustTimePattern(formattedPart.split('h-'), 'h', '-');
      }
      
      formattedPart = formattedPart.replace(/hh/g, ((dateParts.hour12 < 12 && dateParts.hour12.indexOf && 
                                                     dateParts.hour12.indexOf('0') != 0) ? ('0' + 
                                                     dateParts.hour12) : 
                                                    dateParts.hour12))
                                   .replace(/h/g, oneDigitNumber(dateParts.hour12));
      
      formattedPart = formattedPart.replace(/mm/g, dateParts.minutes)
                                   .replace(/m/g, oneDigitNumber(dateParts.minutes));
      
      formattedPart = formattedPart.replace(/a/g, 'A');
      
      var formattedMonthNames = ['January', 
                                 'February', 
                                 'march', 
                                 'april', 
                                 'may', 
                                 'June', 
                                 'July', 
                                 'august', 
                                 'September', 
                                 'October', 
                                 'November', 
                                 'December'];
      if(locale == 'es_US') {
        formattedMonthNames = ['enero', 
                               'febrero', 
                               'marzo', 
                               'abril', 
                               'mayo', 
                               'junio', 
                               'julio', 
                               'agosto', 
                               'septiembre', 
                               'octubre', 
                               'noviembre', 
                               'diciembre'];
      }
      if(locale == 'fr_CA') {
        formattedMonthNames = ['janvier', 
                               'f&' + '#233;vrier', 
                               'mars', 
                               'avril', 
                               'mai', 
                               'juin', 
                               'juillet', 
                               'ao&' + '#251;t', 
                               'septembre', 
                               'octobre', 
                               'novembre', 
                               'd&' + '#233;cembre'];
      }
      formattedPart = formattedPart.replace(/MMMM/g, formattedMonthNames[Number(dateParts.month) - 1])
                                   .replace(/MMM/g, formattedMonthNames[Number(dateParts.month) - 1]
                                                    .substring(0, 3))
                                   .replace(/MM/g, dateParts.month)
                                   .replace(/M/g, oneDigitNumber(dateParts.month))
                                   .replace(/march/g, 'March')
                                   .replace(/may/g, 'May')
                                   .replace(/Mayo/g, 'mayo');
      
      var formattedDayNames = ['Sunday', 
                               'Monday', 
                               'Tuesday', 
                               'Wednesday', 
                               'Thursday', 
                               'Friday', 
                               'Saturday'];
      if(locale == 'es_US') {
        formattedDayNames = ['domingo', 
                             'lunes', 
                             'martes', 
                             'mi&' + 'eacute;rcoles', 
                             'jueves', 
                             'viernes', 
                             's&' + 'aacute;bado'];
      }
      if(locale == 'fr_CA') {
        formattedDayNames = ['dimanche', 
                             'lundi', 
                             'mardi', 
                             'mercredi', 
                             'jeudi', 
                             'vendredi', 
                             'samedi'];
      }
      formattedPart = formattedPart.replace(/EEEE/g, formattedDayNames[dateParts.day])
                                   .replace(/EEE/g, formattedDayNames[dateParts.day].substring(0, 3))
                                   .replace(/EE/g, formattedDayNames[dateParts.day].substring(0, 3))
                                   .replace(/E/g, formattedDayNames[dateParts.day].substring(0, 3));
      
      formattedPart = formattedPart.replace(/A/g, dateParts.ampm)
                                   .replace(/april/g, 'April')
                                   .replace(/august/g, 'August');
      
      return formattedPart;
    };
    
    /*
     * If the pattern does not contain any quoted strings, parse it as-is.
     */
    if(this.pattern.indexOf('\'') == -1) {
      formattedDate = patternReplace(this.pattern);
    }
    
    /*
     * If the pattern contains one or more quoted strings, split it into pieces and parse only the 
     * non-quoted pattern letters.
     */
    else {
      var formatPatternParts = this.pattern.replace(/\'+(?=\')/g, '\'\'').split('\'\'');
      if(formatPatternParts.length == 1) {
        formatPatternParts = this.pattern.split('\'');
        for(var i = 0; i < formatPatternParts.length; i++) {
          if(i % 2 == 0) {
            formatPatternParts[i] = patternReplace(formatPatternParts[i]);
          }
        }
        return formatPatternParts.join('');
      }
      else {
        for(var i = 0; i < formatPatternParts.length; i++) {
          var formatPatternParts2 = formatPatternParts[i].split('\'');
          for(var j = 0; j < formatPatternParts2.length; j++) {
            if(j % 2 == 0) {
              formatPatternParts2[j] = patternReplace(formatPatternParts2[j]);
            }
          }
          formatPatternParts[i] = formatPatternParts2.join('');
        }
        return formatPatternParts.join('\'');
      }
    }
    
    return formattedDate;
  };
}