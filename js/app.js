$(document).foundation();

$('#input').on('focus',function()
{
        this.value='';
        $(this).keyup();
    });
