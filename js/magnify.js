$(function () {

    var nativeWidth = 0,
        nativeHeight = 0;

    var $magnifyDiv = $('div.magnify');

    // only after the native dimensions are available, will our script show the zoomed version of the image.
    // native width and height are not yet set so, get the image's actual dimensions after it is finished downloading.

    var imageObject = new Image();
    imageObject.src = $('.small').attr('src');

    //alert('.small.src = ' + imageObject.src);

    imageObject.onload = function () {
      nativeWidth = imageObject.width;
      nativeHeight = imageObject.height;

      //console.log('nativeWidth = ' + nativeWidth + ', nativeHeight = ' + nativeHeight);

        // when the user moves the mouse anywhere within the div that contains our visible(small) image, do the following...
        $magnifyDiv.mousemove(function (e) {

            //wrap div.magnify (this) into a jquery object
            $target = $(this);

            // get the coordinates of div.magnify relative to the edges of the page (document)
            var magnifyOffset = $target.offset();

            //console.log('Realtive to document edges\nleft edge of div.magnify = '
            //+ magnifyOffset.left + ' \ntop edge of div.magnify = '
            //+ magnifyOffset.top + '\n\n');

            //Subtract the top and left offset values to get our mouse's location relative to the edges of div.magnify
            var mouseX = e.pageX - magnifyOffset.left;
            var mouseY = e.pageY - magnifyOffset.top;

            //Fade in the magnifying glass if the mouse is inside div.magnify and fade our when mouse leaves div.magnify
            $glass = $('.large');

            if (mouseX > 0 && mouseX < $target.width() && mouseY > 0 && mouseY < $target.height()){
                $glass.fadeIn(100);

            }else { //mouse cursor not in div.magnify
                $glass.fadeOut(100);
            }
            //perform calculations to zoom to the correct portion of the large image within the glass, and move the mouse cursor as it moves.
            var glassWidth = $glass.width(),
                glassHeight = $glass.height(),
                halfGlassWidth = glassWidth /2,
                halfGlassHeight = glassHeight/2,
                $smallImage = $('.small');

            //calculate new position of magnifying glass based on current mouse position.
            var posX = mouseX - halfGlassWidth,
                posY = mouseY - halfGlassHeight,
                backgroundX,
                backgroundY;

            backgroundX = Math.round(mouseX / $smallImage.width() * nativeWidth - halfGlassWidth) * -1;
            backgroundY = Math.round(mouseY / $smallImage.height() * nativeHeight - halfGlassHeight) * -1;

            $glass.css({
                top: posY,
                left: posX,
                backgroundPosition: backgroundX + 'px ' + backgroundY + 'px'
            })

        })

    };
})