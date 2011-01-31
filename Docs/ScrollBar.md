Class: ScrollBar {#ScrollBar}
==========================================
This class provides a simple, fully costumizeable interface for creating costum scrollbars, both horizontal and vertical.

ScrollBar Method: constructor {#ScrollBar:constructor}
---------------------------------
### Syntax:

	var scroller = new ScrollBar(wrapper,[,options]);

### Arguments:

1. wrapper - (string | Element) - The element for which you want to apply the scrolling.
2. options - (Object - optional) See below:

### Options:
1. step (`int`) how many pixels to move for each scroll step (default is `30`)
2. mode (`string`) can be either `vertical` or `horizontal`(default is `vertical`)
3. rtl (`bool`) used for horizontal scrolling (default is `false`)
4. margins (`int`) how many margins to add to the end of the scroll zone (can help fix some issues). default is `50`.
5. scrollerHTML (`string`) - the html used to create the scrollbar. If you wish to costumize it, make sure you keep the default class names, or it will break:
        - scroller - the scrollbar container
        - scroll - the scroll area
        - handle - the scroll handle
        - increase - the increase button (up/left)
        - decrease - the decrease button (down/right)
6. wrapped (`Element` | `String`) - if provided, the class will use this element for creating the scroller effect instead of creating a wrapping element.

*note: the scroller element will be added with a class representing it's mode (vertical/horizontal) so that you can style it, allowing you to use both types on the same element*

ScrollBar Method dettach : {#ScrollBar:dettach}
----------------
Dettaches the scroller from the element

### Syntax:
    
    scroller.dettach();
	
    
ScrollBar Method attach : {#ScrollBar:attach}
----------------
Reattaches the scroller to it's element

### Syntax:
    
    scroller.attach();
	

ScrollBar Method increase : {#ScrollBar:increase}
----------------
Advances the scroller

### Syntax:
    
    scroller.inrease([pixels]);

### Arguments:

1. pixels (`int` - optional) - how many pixels to increase. If non supplied will use the `steps` option


ScrollBar Method increase : {#ScrollBar:decrease}
----------------
Regresses the scroller

### Syntax:
    
    scroller.denrease([pixels]);

### Arguments:

1. pixels (`int` - optional) - how many pixels to increase. If non supplied will use the `steps` option
    

ScrollBar : Events {#ScrollBar:Events}
---------------
 * `increase`  - fired when the is an increase in the scroller. Will pass the number of pixels moved as an argument
 * `decrease` - fired when the is a decrease in the scroller. Will pass the number of pixels moved as an argument
 
