(function()
{
    $('.gallery img').on('click', function()
    {
        $.getJSON('includes/getImages.php', { getImage:this.id }, function(data)
        {
            $('.image').attr('src', 'images/gallery/' + data.gallery_img);
            $('.image').attr('alt', data.gallery_alt);
            $('.caption').text(data.gallery_alt);
            $('.imageCredit').text(data.gallery_credit);        
        });
    });

})();