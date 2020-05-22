$(function(){
    $('#reqDetail').hide()
    $('#testDetail').hide()
    $('#regDetail').hide()
    $('#contactDetail').show()
    $('#benefitDetail').hide()

    var currTab = '#benefitDetail'


    //slide animation
    $('#benefit').click(function(){
        $(currTab).slideUp(300, function(){
            $('#benefitDetail').slideDown(500)
        })
        currTab = '#benefitDetail'
    })
    $('#req').click(function(){
        $(currTab).slideUp(300, function(){
            $('#reqDetail').slideDown(500)
        })
        currTab = '#reqDetail'
    })
    $('#test').click(function(){
        $(currTab).slideUp(300, function(){
            $('#testDetail').slideDown(500)
        })
        currTab = '#testDetail'
    })
    $('#reg').click(function(){
        $(currTab).slideUp(300, function(){
            $('#regDetail').slideDown(500)
        })
        currTab = '#regDetail'
    })
    $('#contact').click(function(){
        $(currTab).slideUp(300, function(){
            $('#contactDetail').slideDown(500)
        })
        currTab = '#contactDetail'
    })


    // opacity animation
    $('.titleCell').on('mouseover',function(){
        var id = $(this).attr('id')
        $('#'+id).animate({
            opacity: '1'
        })
    })

    $('.titleCell').on('mouseout',function(){
        var id = $(this).attr('id')
        $('#'+id).animate({
            opacity: '0.5'
        })
    })



    

})