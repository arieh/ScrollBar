/*
---
description:

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3.0 : [Class, Class.Extras, Element]
- more/1.3.0 : [Element.Measure, Slider]

provides: [CostumScroller]

...
*/

/*!
Copyright (c) 2011 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
*/
(function(window,$,undef){

"use strict";
    
var params = {
    Implements : [Options,Events]
    , options :{
        step : 30
        , scrollerHtml : '<span class="increase"></span>'
            +'<div class="scroll"><span class="handle"></span></div>'
            +'<span class="decrease"></span>'
        , mode : 'vertical'
        , rtl : false
        , margins : 50
    }
    , element : null 
    , scroller : null
    , scrollSize : 0 
    , areaSize : 0
    , position: 0
    , slider: null
    , events : null
    , generated : false
    , axis : 'y'
    , dir : 'top'
    , property : 'height'
    , initialize : function initialize(elem,scrolled,opts){
        this.setOptions(opts);
        this.element = $(elem);
        this.scrolled = $(scrolled);
        
        this.axis = (this.options.mode =='vertical') ? 'y' :'x';
        this.dir = (this.options.mode =='vertical') ? 'top' : this.options.rtl ? 'right' : 'left';
        this.property = (this.options.mode =='vertical') ? 'height' : 'width';
        
        this.areaSize =  this.element.getDimensions()[this.axis];
        this.scrollSize = this.scrolled.getDimensions()[this.axis];
        this.generate();
        this.attach();
    }
    , generate : function generate(){
        this.scroller = {};
        
        var scroller = this.scroller.element = new Element('div',{"class":'scroller',html:this.options.scrollerHtml}).addClass(this.options.mode)
            , ratio = this.areaSize / this.scrollSize
            , handleSize;
        
        this.scroller.inc         = scroller.getElement('.increase');
        this.scroller.dec        = scroller.getElement('.decrease');
        this.scroller.scroll     = scroller.getElement('.scroll');
        this.scroller.handle  = scroller.getElement('.handle');
        
        this.element.adopt(scroller);
        
        handleSize = +this.scroller.scroll.getDimensions()[this.axis] * ratio;
        
        this.scroller.handle.setStyle(this.property,handleSize);
        
        this.slider = new Slider(this.scroller.scroll,this.scroller.handle,{mode:this.options.mode, range : [0,this.scrollSize-this.options.margins]});
        
        this.generated = true;
    }
    , attach : function attach(){
        var $this = this;
        
        if (!this.generated) this.generate();
        
        this.events = {
            scrollUp :function scrollUp(){
                $this.slider.set($this.position - $this.options.step);
            }
            , scrollDown : function scrollDown(){
                $this.slider.set($this.position + $this.options.step);
            }
            , manageWheel : function manageWheel(e){
                e.preventDefault();
                if (e.wheel >0){
                    $this.events.scrollUp();
                }else{
                    $this.events.scrollDown();
                }    
            }
        };
        
        this.element.addEvent('mousewheel',this.events.manageWheel);
                
        this.scroller.inc.addEvent('click',this.events.scrollUp);
        this.scroller.dec.addEvent('click',this.events.scrollDown);
        
        this.slider.addEvent('change' , function(pos){
            if (pos < $this.position) $this.increase($this.position - pos);
            else $this.decrease(pos - $this.position);
        });
    }
    , detach : function detach(){
        this.element.removeEvent('mousewheel',this.events.manageWheel);
        this.scroller.each(function(el){el.destroy();});
        this.generated = false;
    }
    , decrease : function decrease(step){
        step = step || this.options.step;
        
        if (this.position + step > this.scrollSize-this.areaSize+this.options.margins) this.position = this.scrollSize-this.areaSize+this.options.margins;
        else this.position += step;
        
        this.scrolled.setStyle('margin-'+this.dir,-1*this.position);
        this.fireEvent('decrease',[this.position]);
    }
    , increase : function increase(step){
        step = step || this.options.step;
        
        if (this.position-step < 0) this.position = 0;
        else this.position -=step;
        
        this.scrolled.setStyle('margin-'+this.dir,-1*this.position);
        this.fireEvent('increase',[this.position]);
    }
}, 
CostumScroller = this.CostumScroller = new Class(params);

}).apply(this,[this,document.id]);