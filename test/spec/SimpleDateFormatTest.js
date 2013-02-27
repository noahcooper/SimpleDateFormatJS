var sdf = new simpleDateFormat(), 
sdfDate = new Date('1970', '00', '28', '00', '00', '00');

describe('SimpleDateFormat', function() {
  /* before each spec, reset global variables */
  beforeEach(function() {
    sdf = new simpleDateFormat();
    sdfDate = new Date('1970', '00', '28', '00', '00', '00');
  });
  
  /* default tests */
  describe('Defaults', function() {
    it('default date is now', function() {
      var now = new Date(), 
      defaultSample = ([now.getMonth() + 1, now.getDate(), now.getFullYear().toString().substring(2)]).join('/');
      
      expect(sdf.format()).toBe(defaultSample);
    });
  });
  
  /* suite to validate the handling of user input */
  describe('Input', function() {
    it('should return default pattern', function() {
      sdf.applyPattern('M/d/yy');
      expect(sdf.format(sdfDate)).toBe('1/28/70');
    });
    
    it('given null time, should use now', function() {
      var now = new Date(), 
      defaultSample = ([now.getMonth() + 1, now.getDate(), now.getFullYear().toString().substring(2)]).join('/');
      
      expect(sdf.format(null)).toBe(defaultSample);
    });
    
    it('given pattern and locale params, pattern takes precedence', function() {
      window.sdf = new simpleDateFormat('M/d/yy', 'en_CA');
      expect(sdf.format(sdfDate)).not.toBe('28/1/70');
    });
    
    it('given null pattern, should honor locale setting', function() {
      window.sdf = new simpleDateFormat(null, 'en_CA');
      expect(sdf.format(sdfDate)).toBe('28/1/70');
    });
  });
  
  /* general suite to very some common date formats that aren't tied to a specific locale */
  describe('Non-Locale Specific', function() {
    describe('Common Formats', function() {
      it('given pattern "M/d/yy"', function() {
        sdf.applyPattern('M/d/yy');
        expect(sdf.format(sdfDate)).toBe('1/28/70');
      });
      
      it('given pattern "d/M/yy"', function() {
        sdf.applyPattern('d/M/yy');
        expect(sdf.format(sdfDate)).toBe('28/1/70');
      });
      
      it('given pattern "MMMM d, yyyy"', function() {
        sdf.applyPattern('MMMM d, yyyy');
        expect(sdf.format(sdfDate)).toBe('January 28, 1970');
      });
      
      it('given pattern "EEEE, MMMM d, yyyy"', function() {
        sdf.applyPattern('EEEE, MMMM d, yyyy');
        expect(sdf.format(sdfDate)).toBe('Wednesday, January 28, 1970');
      });
      
      it('given pattern "EEEE, MMMM d, yyyy, h:mma", should display double digit hours', function() {
        sdf.applyPattern('EEEE, MMMM d, yyyy, h:mma');
        expect(sdf.format(sdfDate)).toBe('Wednesday, January 28, 1970, 12:00AM');
      });
      
      it('given pattern "EEEE, MMMM d, yyyy, h:mma", should display single digit hours with no leading zero', function() {
        var dateClone = sdfDate;
        dateClone.setHours('01');
        sdf.applyPattern('EEEE, MMMM d, yyyy, h:mma');
        expect(sdf.format(dateClone)).toBe('Wednesday, January 28, 1970, 1:00AM');
      });
      
      it('given pattern "h \'o\'\'clock\'"', function() {
        sdf.applyPattern('h \'o\'\'clock\'');
        expect(sdf.format(sdfDate)).toBe('12 o\'clock');
      });
      
      it('given pattern "h+3:mm"', function() {
        sdf.applyPattern('h+3:mm');
        expect(sdf.format(sdfDate)).toBe('3:00');
      });
    });
  });
  
  /* en_US language tests */
  describe('en_US', function() {
    describe('Should use the correct month names', function() {
      var enUSDateClone = sdfDate;
      
      it('should get January correct', function() {
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSDateClone)).toBe('January');
      });
      
      it('should get February correct', function() {
        var enUSFeb = new Date(enUSDateClone.valueOf());
        enUSFeb.setMonth(1);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSFeb)).toBe('February');
      });

      it('should get March correct', function() {
        var enUSMarch = new Date(enUSDateClone.valueOf());
        enUSMarch.setMonth(2);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSMarch)).toBe('March');
      });
      
      it('should get April correct', function() {
        var enUSApril = new Date(enUSDateClone.valueOf());
        enUSApril.setMonth(3);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSApril)).toBe('April');
      });
      
      it('should get May correct', function() {
        var enUSMay = new Date(enUSDateClone.valueOf());
        enUSMay.setMonth(4);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSMay)).toBe('May');
      });
      
      it('should get June correct', function() {
        var enUSJune = new Date(enUSDateClone.valueOf());
        enUSJune.setMonth(5);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSJune)).toBe('June');
      });
      
      it('should get July correct', function() {
        var enUSJuly = new Date(enUSDateClone.valueOf());
        enUSJuly.setMonth(6);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSJuly)).toBe('July');
      });
      
      it('should get August correct', function() {
        var enUSAugust = new Date(enUSDateClone.valueOf());
        enUSAugust.setMonth(7);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSAugust)).toBe('August');
      });
      
      it('should get September correct', function() {
        var enUSSeptember = new Date(enUSDateClone.valueOf());
        enUSSeptember.setMonth(8);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSSeptember)).toBe('September');
      });
      
      it('should get October correct', function() {
        var enUSOctober = new Date(enUSDateClone.valueOf());
        enUSOctober.setMonth(9);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSOctober)).toBe('October');
      });
      
      it('should get November correct', function() {
        var enUSNovember = new Date(enUSDateClone.valueOf());
        enUSNovember.setMonth(10);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSNovember)).toBe('November');
      });
      
      it('should get December correct', function() {
        var enUSDecember = new Date(enUSDateClone.valueOf());
        enUSDecember.setMonth(11);
        sdf.applyPattern('MMMM');
        expect(sdf.format(enUSDecember)).toBe('December');
      });
    });
    
    describe('Should use the correct day names', function() {
      var enUSDateClone = sdfDate;
      
      it('should get Sunday correct', function() {
        var enUSSunday = new Date(enUSDateClone.valueOf());
        enUSSunday.setDate(18);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSSunday)).toBe('Sunday');
      });
      
      it('should get Monday correct', function() {
        var enUSMonday = new Date(enUSDateClone.valueOf());
        enUSMonday.setDate(19);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSMonday)).toBe('Monday');
      });
      
      it('should get Tuesday correct', function() {
        var enUSTuesday = new Date(enUSDateClone.valueOf());
        enUSTuesday.setDate(20);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSTuesday)).toBe('Tuesday');
      });
      
      it('should get Wednesday correct', function() {
        var enUSWednesday = new Date(enUSDateClone.valueOf());
        enUSWednesday.setDate(21);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSWednesday)).toBe('Wednesday');
      });
      
      it('should get Thursday correct', function() {
        var enUSThursday = new Date(enUSDateClone.valueOf());
        enUSThursday.setDate(22);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSThursday)).toBe('Thursday');
      });
      
      it('should get Friday correct', function() {
        var enUSFriday = new Date(enUSDateClone.valueOf());
        enUSFriday.setDate(23);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSFriday)).toBe('Friday');
      });
      
      it('should get Saturday correct', function() {
        var enUSSaturday = new Date(enUSDateClone.valueOf());
        enUSSaturday.setDate(24);
        sdf.applyPattern('EEEE');
        expect(sdf.format(enUSSaturday)).toBe('Saturday');
      });
    });
  });

  /* es_US language tests */
  describe('es_US', function() {
    describe('Should use the correct month names', function() {
      var esUSDateClone = sdfDate;
      
      it('should get January correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        expect(sdf.format(esUSDateClone)).toBe('enero');
      });
      
      it('should get February correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSFeb = new Date(esUSDateClone.valueOf());
        esUSFeb.setMonth(1);
        expect(sdf.format(esUSFeb)).toBe('febrero');
      });

      it('should get March correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSMarch = new Date(esUSDateClone.valueOf());
        esUSMarch.setMonth(2);
        expect(sdf.format(esUSMarch)).toBe('marzo');
      });
      
      it('should get April correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSApril = new Date(esUSDateClone.valueOf());
        esUSApril.setMonth(3);
        expect(sdf.format(esUSApril)).toBe('abril');
      });
      
      it('should get May correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSMay = new Date(esUSDateClone.valueOf());
        esUSMay.setMonth(4);
        expect(sdf.format(esUSMay)).toBe('mayo');
      });
      
      it('should get June correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSJune = new Date(esUSDateClone.valueOf());
        esUSJune.setMonth(5);
        expect(sdf.format(esUSJune)).toBe('junio');
      });
      
      it('should get July correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSJuly = new Date(esUSDateClone.valueOf());
        esUSJuly.setMonth(6);
        expect(sdf.format(esUSJuly)).toBe('julio');
      });
      
      it('should get August correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSAugust = new Date(esUSDateClone.valueOf());
        esUSAugust.setMonth(7);
        expect(sdf.format(esUSAugust)).toBe('agosto');
      });
      
      it('should get September correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSSeptember = new Date(esUSDateClone.valueOf());
        esUSSeptember.setMonth(8);
        expect(sdf.format(esUSSeptember)).toBe('septiembre');
      });
      
      it('should get October correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSOctober = new Date(esUSDateClone.valueOf());
        esUSOctober.setMonth(9);
        expect(sdf.format(esUSOctober)).toBe('octubre');
      });
      
      it('should get November correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSNovember = new Date(esUSDateClone.valueOf());
        esUSNovember.setMonth(10);
        expect(sdf.format(esUSNovember)).toBe('noviembre');
      });
      
      it('should get December correct', function() {
        sdf = new simpleDateFormat('MMMM', 'es_US');
        var esUSDecember = new Date(esUSDateClone.valueOf());
        esUSDecember.setMonth(11);
        expect(sdf.format(esUSDecember)).toBe('diciembre');
      });
    });
    
    describe('Should use the correct day names', function() {
      var esUSDateClone = sdfDate;
      
      it('should get Sunday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSSunday = new Date(esUSDateClone.valueOf());
        esUSSunday.setDate(18);
        expect(sdf.format(esUSSunday)).toBe('domingo');
      });
      
      it('should get Monday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSMonday = new Date(esUSDateClone.valueOf());
        esUSMonday.setDate(19);
        expect(sdf.format(esUSMonday)).toBe('lunes');
      });
      
      it('should get Tuesday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSTuesday = new Date(esUSDateClone.valueOf());
        esUSTuesday.setDate(20);
        expect(sdf.format(esUSTuesday)).toBe('martes');
      });
      
      it('should get Wednesday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSWednesday = new Date(esUSDateClone.valueOf());
        esUSWednesday.setDate(21);
        expect(sdf.format(esUSWednesday)).toBe('mi&eacute;rcoles');
      });
      
      it('should get Thursday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSThursday = new Date(esUSDateClone.valueOf());
        esUSThursday.setDate(22);
        expect(sdf.format(esUSThursday)).toBe('jueves');
      });
      
      it('should get Friday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSFriday = new Date(esUSDateClone.valueOf());
        esUSFriday.setDate(23);
        expect(sdf.format(esUSFriday)).toBe('viernes');
      });
      
      it('should get Saturday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'es_US');
        var esUSSaturday = new Date(esUSDateClone.valueOf());
        esUSSaturday.setDate(24);
        expect(sdf.format(esUSSaturday)).toBe('s&aacute;bado');
      });
    });
  });
  
  /* fr_CA language tests */
  describe('fr_CA', function() {
    describe('Should use the correct month names', function() {
      var frCADateClone = sdfDate;
      
      it('should get January correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        expect(sdf.format(frCADateClone)).toBe('janvier');
      });
      
      it('should get February correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAFeb = new Date(frCADateClone.valueOf());
        frCAFeb.setMonth(1);
        expect(sdf.format(frCAFeb)).toBe('f&#233;vrier');
      });

      it('should get March correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAMarch = new Date(frCADateClone.valueOf());
        frCAMarch.setMonth(2);
        expect(sdf.format(frCAMarch)).toBe('mars');
      });
      
      it('should get April correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAApril = new Date(frCADateClone.valueOf());
        frCAApril.setMonth(3);
        expect(sdf.format(frCAApril)).toBe('avril');
      });
      
      it('should get May correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAMay = new Date(frCADateClone.valueOf());
        frCAMay.setMonth(4);
        expect(sdf.format(frCAMay)).toBe('mai');
      });
      
      it('should get June correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAJune = new Date(frCADateClone.valueOf());
        frCAJune.setMonth(5);
        expect(sdf.format(frCAJune)).toBe('juin');
      });
      
      it('should get July correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAJuly = new Date(frCADateClone.valueOf());
        frCAJuly.setMonth(6);
        expect(sdf.format(frCAJuly)).toBe('juillet');
      });
      
      it('should get August correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAAugust = new Date(frCADateClone.valueOf());
        frCAAugust.setMonth(7);
        expect(sdf.format(frCAAugust)).toBe('ao&#251;t');
      });
      
      it('should get September correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCASeptember = new Date(frCADateClone.valueOf());
        frCASeptember.setMonth(8);
        expect(sdf.format(frCASeptember)).toBe('septembre');
      });
      
      it('should get October correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCAOctober = new Date(frCADateClone.valueOf());
        frCAOctober.setMonth(9);
        expect(sdf.format(frCAOctober)).toBe('octobre');
      });
      
      it('should get November correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCANovember = new Date(frCADateClone.valueOf());
        frCANovember.setMonth(10);
        expect(sdf.format(frCANovember)).toBe('novembre');
      });
      
      it('should get December correct', function() {
        sdf = new simpleDateFormat('MMMM', 'fr_CA');
        var frCADecember = new Date(frCADateClone.valueOf());
        frCADecember.setMonth(11);
        expect(sdf.format(frCADecember)).toBe('d&#233;cembre');
      });
    });
    
    describe('Should use the correct day names', function() {
      var frCADateClone = sdfDate;
      
      it('should get Sunday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCASunday = new Date(frCADateClone.valueOf());
        frCASunday.setDate(18);
        expect(sdf.format(frCASunday)).toBe('dimanche');
      });
      
      it('should get Monday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCAMonday = new Date(frCADateClone.valueOf());
        frCAMonday.setDate(19);
        expect(sdf.format(frCAMonday)).toBe('lundi');
      });
      
      it('should get Tuesday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCATuesday = new Date(frCADateClone.valueOf());
        frCATuesday.setDate(20);
        expect(sdf.format(frCATuesday)).toBe('mardi');
      });
      
      it('should get Wednesday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCAWednesday = new Date(frCADateClone.valueOf());
        frCAWednesday.setDate(21);
        expect(sdf.format(frCAWednesday)).toBe('mercredi');
      });
      
      it('should get Thursday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCAThursday = new Date(frCADateClone.valueOf());
        frCAThursday.setDate(22);
        expect(sdf.format(frCAThursday)).toBe('jeudi');
      });
      
      it('should get Friday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCAFriday = new Date(frCADateClone.valueOf());
        frCAFriday.setDate(23);
        expect(sdf.format(frCAFriday)).toBe('vendredi');
      });
      
      it('should get Saturday correct', function() {
        sdf = new simpleDateFormat('EEEE', 'fr_CA');
        var frCASaturday = new Date(frCADateClone.valueOf());
        frCASaturday.setDate(24);
        expect(sdf.format(frCASaturday)).toBe('samedi');
      });
    });
  });
});