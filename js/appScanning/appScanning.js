 var $input = $( '#datepickmin' ).pickadate({
        formatSubmit: 'yyyy/mm/dd',
        container: '#container',
        closeOnSelect: true,
        closeOnClear: true
    });
    var $inpu = $( '#datepickmax' ).pickadate({
        formatSubmit: 'yyyy/mm/dd',
        container: '#container',
        closeOnSelect: true,
        closeOnClear: true
    });
    var picker = $input.pickadate('picker');
    var picker = $inpu.pickadate('picker');

