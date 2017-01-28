SimpleDateFormat for JavaScript
===============================

Copyright (c) 2013 Noah Cooper  
Dual licensed under MIT and GPL licenses (<http://projects.iamnoahcooper.com/license>)  
Version: 1.3 (25-JUL-2013)

Based on the SimpleDateFormat Java class 
(<http://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html>)

Overview
--------

While the JavaScript Date object provides developers with methods for working with the individual pieces 
of a given date, what's missing is a native method for formatting dates as a string following a specified 
pattern. In Java, SimpleDateFormat provides just that. This project is an attempt to port that 
functionality to JavaScript in an effort to make it easier to present dates in a human-readable format.

Instantiating simpleDateFormat
------------------------------

The following shows the simpleDateFormat constructor in its most basic form. 

```  js
var mySimpleDateFormatter = new simpleDateFormat();
```

The constructor accepts two optional arguments:

 * pattern
 
   The pattern to use for returned dates. The following subset of pattern letters from SimpleDateFormat 
   are supported:
   
   y          - Year  
   M          - Month in year  
   d          - Day in month  
   E          - Day in week  
   a          - Am/pm marker  
   k(+nn|-nn) - Hour in day (1 - 24)  
   h(+nn|-nn) - Hour in am/pm (1 - 12)  
   m          - Minute in hour  
   
   The pattern letters h and k may be followed by a plus (+) or minus (-) sign and an integer between 
   1 and 23 to adjust the hour accordingly. This is useful, for example, when working with a Date object 
   in a different timezone.
   
   As in Java, strings can be quoted using single quotes to avoid interpretation, e.g. 
   "MMMM d, yyyy, 'at' h:mm a". "''" represents a single quote or apostrophe, e.g. 
   "MMMM d, yyyy, 'at' h 'o''clock'".
   
   If no pattern is provided, the default is "M/d/yy" for the locales en_US and es_US, or "d/M/yy" for 
   en_CA, fr_CA, en_GB, and en_AU.
   
 * locale
 
   The locale for returned dates, comprised of an ISO-639 language code and an ISO-3166 country code. The 
   names of months and days will be returned in the locale provided. For example, if the locale is es_US, 
   "d 'de' MMMM 'de' yyyy" will return a date such as "6 de julio de 2012". If locale is fr_CA, 
   "'le' d MMMM yyyy k'h'mm" will return a date such as "le 6 juillet 2012 13h00".
   
   Currently supported values are "en_US", "es_US", "en_CA", "fr_CA", "en_GB", and "en_AU". The default 
   is "en_US".

The applyPattern Method
-----------------------

The applyPattern method is used to update the pattern which was previously defined. 

```  js
var mySimpleDateFormatter = new simpleDateFormat();

mySimpleDateFormatter.applyPattern('MMMM d, yyyy');
```

The method accepts one optional argument:

  * updatedPattern
  
   The updated pattern to apply.

The format Method
-----------------

The format method is used to format a given date based on the defined pattern. The resulting formatted 
string is returned.

```  js
var mySimpleDateFormatter = new simpleDateFormat('MMMM d, yyyy');

var myDate = new Date('2012', '07', '10');

document.getElementById('myDateContainer').innerHTML = mySimpleDateFormatter.format(myDate);
```

The method accepts one optional argument:

  * unformattedDate
  
   The date to be formatted. This can be either a Date object, or an ISO-8601 string. If no date is 
   provided, a new Date object is created at the time the method is called.
   
Examples
--------

Format today's date like "Tuesday, July 10, 2012".

```  js
var mySimpleDateFormatter = new simpleDateFormat('EEEE, MMMM d, yyyy');

document.getElementById('myDateContainer').innerHTML = 'Today is ' + mySimpleDateFormatter.format();
```

Use a pattern which contains an apostrophe.

```  js
var mySimpleDateFormatter = new simpleDateFormat('h \'o\'\'clock\'');

document.getElementById('myDateContainer').innerHTML = 'The time is ' + mySimpleDateFormatter.format();
```

Use the applyPattern method to format a second date using a shorthand for the names of the day and month, like "Tue. Jul 10, 2012".

```  js
var mySimpleDateFormatter = new simpleDateFormat('EEEE, MMMM d, yyyy');

document.getElementById('myDateContainer').innerHTML = 'Today is ' + mySimpleDateFormatter.format();

mySimpleDateFormatter.applyPattern('EEE., MMM d, yyyy');

document.getElementById('myDateContainer2').innerHTML = 'Another way to express today\'s date would be ' + mySimpleDateFormatter.format();
```

Pass an ISO-8601 date/time string to the format method.

```  js
var mySimpleDateFormatter = new simpleDateFormat('EEEE');

document.getElementById('myDateContainer').innerHTML = 'Christmas will fall on ' + mySimpleDateFormatter.format('2012-12-25T08:00:30.263-05:00') + ' in 2012';
```

Adjust the time by 3 hours.

```  js
var mySimpleDateFormatter = new simpleDateFormat('h+3:mm');

document.getElementById('myDateContainer').innerHTML = mySimpleDateFormatter.format('2012-07-10T20:00:30.263-05:00');
```

Express the date in Spanish and French.

```  js
var mySpanishSimpleDateFormatter = new simpleDateFormat('d \'de\' MMMM \'de\' yyyy', 'es_US');

document.getElementById('mySpanishDateContainer').innerHTML = mySpanishSimpleDateFormatter.format();

var myFrenchSimpleDateFormatter = new simpleDateFormat('\'le\' d MMMM yyyy k\'h\'mm', 'fr_CA');

document.getElementById('myFrenchDateContainer').innerHTML = myFrenchSimpleDateFormatter.format();
```
