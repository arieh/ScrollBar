/*
---
description: a custom scrollbar provider

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3.0 : [Class, Class.Extras, Element]
- more/1.3.0 : [Element.Measure, Slider]

provides: [ScrollerBar]

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
        , scrollerHtml : '<span class="decrease"></span>'
            +'<div class="scroll"><span class="handle"></span></div>'
            +'<span class="increase"></span>'
        , mode : 'vertical'
        , margins : 0
        , wrapped : null
        , alwaysShow : false
    }
    , element : null 
    , scroller : null
    , scrollSize : 0 
    , areaSize : 0
    , position: 0
    , slider: null
    , events : null
    , generated : false
    , attached : false
    , axis : 'y'
    , dir : 'top'
    , property : 'height'
    , initialize : function initialize(elem,opts){
        this.setOptions(opts);
        this.element = $(elem);
        
        this.axis = (this.options.mode =='vertical') ? 'y' :'x';
        this.property = (this.options.mode =='vertical') ? 'height' : 'width';

        this.construct();
        this.attach();
    }
    , construct : function construct(){
        this.scroller = {};
        
        var scroller = this.scroller.element = new Element('div',{"class":'scroller',html:this.options.scrollerHtml}).addClass(this.options.mode)
            , ratio
            , $this = this
            , handleSize;
        
        this.scroller.inc         = scroller.getElement('.decrease');
        this.scroller.dec        = scroller.getElement('.increase');
        this.scroller.scroll     = scroller.getElement('.scroll');
        this.scroller.handle  = scroller.getElement('.handle');
        
        this.scrolled = (this.options.wrapped) ? this.options.wrapped : (function(){
            var html = $this.element.get('html');
            $this.element.empty();
            return new Element('div',{html:html,'class':'wrapped'}).inject($this.element);
        }());
        
        this.element.setStyle('overflow','hidden');
        
        this.element.adopt(scroller);
        
        this.areaSize =  this.element.getDimensions()[this.axis];
        this.scrollSize = this.scrolled.getDimensions()[this.axis];
        
        ratio = this.areaSize / this.scrollSize;
        
        handleSize = +this.scroller.scroll.getDimensions()[this.axis] * ratio;
        
        this.scroller.handle.setStyle(this.property,handleSize);

        if (this.areaSize >= this.scrollSize+this.options.margins 
            && false == this.options.alwaysShow
        ) {
            this.hide();
            this.slider = null;
            this.generated = false;
        } else {
            this.slider = new Slider(
                this.scroller.scroll,
                this.scroller.handle,
                {
                    mode : this.options.mode,
                    range : [
                        0, this.scrollSize - this.areaSize / 2 + this.options.margins
                    ]
                }
            );
            this.generated = true;
        }
        
    }
    , attach : function attach(){
        var $this = this;
        
        if (this.attached) return;
        
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
            if (pos < $this.position) $this.decrease($this.position - pos);
            else $this.increase(pos - $this.position);
        });
        
        this.attached = true;
    }
    , detach : function detach(){
        this.element.removeEvent('mousewheel',this.events.manageWheel);
        this.slider.detach();
        this.scroller.each(function(el){el.destroy();});
        this.generated = false;
        this.attached = false;
    }
    , increase : function increase(step){
        step = step || this.options.step;
        
        if (this.position + step > this.scrollSize-this.areaSize/2) this.position = this.scrollSize-this.areaSize/2;
        else this.position += step;
        
        this.scrolled.setStyle('margin-'+this.dir,-1*this.position);
        this.fireEvent('increase',[this.position]);
    }
    , decrease : function decrease(step){
        step = step || this.options.step;
        
        if (this.position-step < 0) this.position = 0;
        else this.position -=step;
        
        this.scrolled.setStyle('margin-'+this.dir,-1*this.position);
        this.fireEvent('decrease',[this.position]);
    }
    , show : function show(){
        this.scroller.element.setStyle('visibility','visible');    
    }
    , hide : function hide(){
        this.scroller.element.setStyle('visibility','hidden');    
    }
    , toElement : function toElement(){return this.element;}
}, 
ScrollerBar = this.ScrollerBar = new Class(params);

}).apply(this,[this,document.id]);
