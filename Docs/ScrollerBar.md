Class: ScrollerBar {#ScrollerBar}
==========================================
This class provides a simple, fully customizeable interface for creating custom scrollbars both horizontal and vertical.

ScrollerBar Method: constructor {#ScrollerBar:constructor}
---------------------------------
### Syntax:

	var scroller = new ScrollerBar(wrapper[,options]);

### Arguments:

1. wrapper - (string | Element) - The element for which you want to apply the scrolling.
2. options - (Object - optional) See below:

### Options:
1. step (`int`) how many pixels to move for each scroll step (default is `30`)
2. mode (`string`) can be either `vertical` or `horizontal`(default is `vertical`)
3. margins (`int`) how many margins to add to the end of the scroll zone (can help fix some issues). default is `0`.
4. alwaysShow (`bool`) - if set to true, will show the bar even if there is no scrolling needed. default is `false`.
5. scrollerHTML (`string`) - the html used to create the ScrollerBar. If you wish to customize it, make sure you keep the default class names, or it will break:
        - scroller - the ScrollerBar container
        - scroll - the scroll area
        - handle - the scroll handle
        - increase - the increase button (up/left)
        - decrease - the decrease button (down/right)
6. wrapped (`Element` | `String`) - if provided, the class will use this element for creating the scroller effect instead of creating a wrapping element.

*note: the scroller element will be added with a class representing it's mode (vertical/horizontal) so that you can style it, allowing you to use both types on the same element*


ScrollerBar Method detach : {#ScrollerBar:detach}
----------------
Dettaches the scroller from the element

### Syntax:
    
    scroller.detach();
	
    

    
ScrollerBar Method: attach {#ScrollerBar:attach}
----------------
Reattaches the scroller to it's element

### Syntax:
    
    scroller.attach();
	


    
ScrollerBar Method: increase {#ScrollerBar:increase}
----------------
Advances the scroller

### Syntax:
    
    scroller.increase([pixels]);

### Arguments:

1. pixels (`int` - optional) - how many pixels to increase. If non supplied will use the `steps` option



ScrollerBar Method: increase {#ScrollerBar:decrease}
----------------
Regresses the scroller

### Syntax:
    
    scroller.decrease([pixels]);

### Arguments:

1. pixels (`int` - optional) - how many pixels to increase. If non supplied will use the `steps` option
    

    
ScrollerBar : Events {#ScrollerBar:Events}
---------------
 * `increase`  - fired when the is an increase in the scroller. Will pass the number of pixels moved as an argument
 * `decrease` - fired when the is a decrease in the scroller. Will pass the number of pixels moved as an argument
 
