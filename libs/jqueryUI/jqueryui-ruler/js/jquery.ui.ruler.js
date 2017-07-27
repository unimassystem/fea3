(function ($) {
    $.widget("ef.ruler", {
        options: {
            unit: 'px',
            tickMajor: 100,
            tickMinor: 20,
            tickMicro: 10,
            showLabel: true,
			arrowStyle: 'line'
        },

        _$el: null,
        _$container: null,
        _$corner: null,
        _$topRuler: null,
        _$leftRuler: null,
        _$topArrow: null,
        _$leftArrow: null,
        _$stage: null,

        _scrollTop: 0,
        _scrollLeft: 0,

        _scrollBarWidth: 0,
        _unitDiv: 1,

        _lastTopRulerPos: 0,
        _lastLeftRulerPos: 0,

        /**
         * px - pixel
         * mm - millimeter
         * cm - centimeter
         * in - inch
         */
        _units: ['px', 'mm', 'cm', 'in'],

        _create: function () {

            var self = this;

            /* Options */
            this.options.unit = this._constrainUnit(this.options.unit);
            this.options.tickMajor = this._constrainTick(this.options.tickMajor);
            this.options.tickMinor = this._constrainTick(this.options.tickMinor);
            this.options.tickMicro = this._constrainTick(this.options.tickMicro);

            /* Calculate scrollbar width */
            this._scrollBarWidth = this._calcScrollBarWidth();

            /* Create container */
            var $container = $(document.createElement('div')).addClass('ef-ruler');

            /* corner */
            var $corner = $(document.createElement('div')).addClass('corner');
            $corner.appendTo($container);

            /* Top ruler */
            var $topRuler = $(document.createElement('div')).addClass('ruler').addClass('top');
            $topRuler.appendTo($container);

			var toparrowClass, leftarrowClass
			switch (this.options.arrowStyle) {
			case 'arrow':
				toparrowClass = 'top-arrow';
				leftarrowClass = 'left-arrow';
				break;
			case 'line':
				toparrowClass = 'top-line';
				leftarrowClass = 'left-line';
				break;
			case 'none':
				toparrowClass = 'top-none';
				leftarrowClass = 'left-none';
				break;
			}
			
            var $topArrow = $(document.createElement('div')).addClass(toparrowClass);
            $topArrow.appendTo($topRuler);

            /* Left ruler */
            var $leftRuler = $(document.createElement('div')).addClass('ruler').addClass('left');
            $leftRuler.appendTo($container);

            var $leftArrow = $(document.createElement('div')).addClass(leftarrowClass);
            $leftArrow.appendTo($leftRuler);

            /* stage */
            var $stage = $(document.createElement('div')).addClass('stage');
            $stage.appendTo($container);
            $stage.append(this.element.contents());


            $container.appendTo(this.element);

            this._$container = $container;
            this._$corner = $corner;
            this._$topRuler = $topRuler;
            this._$leftRuler = $leftRuler;
            this._$topArrow = $topArrow;
            this._$leftArrow = $leftArrow;
            this._$stage = $stage;

            this.refresh();

            /* events */
            $container.scroll(function () {
                self._scrollTop = $container.scrollTop();
                self._scrollLeft = $container.scrollLeft();

                self._fixRulerPosition();
            });
            this.element.mousemove(function (event) {
                self._fixArrowsPosition(event.clientX, event.clientY);
            });
            $(window).resize(function () {
                self._fixRulerSize();
                self._updateRulerTicks();
            });
        },

        _destroy: function () {
            /* Unbind */
            this._$container.unbind('scroll');
            this.element.unbind('mousemove');
            $(window).unbind('resize');

            /* Restore element contents */
            this.element.prepend(this._$stage.contents());

            /* Remove created elements */
            this._$container.remove();
        },

        _setOption: function (key, value) {
            switch (key) {
                case 'unit':
                    value = this._constrainUnit(value);
                    break;
                case 'tickMajor':
                case 'tickMinor':
                case 'tickMicro':
                    value = this._constrainTick(value);
                    break;
            }

            this._super(key, value);
        },

        _setOptions: function (options) {
            this._super(options);

            this.refresh();
        },

        _constrainUnit: function (unit) {
            if (typeof unit === 'string') {
                unit = unit.toLowerCase();
                this._units.every(function (sUnit) {
                    if (unit === sUnit)
                        return false;

                    return true;
                });
            } else {
                unit = 'px'
            }

            return unit;
        },

        _constrainTick: function (tick) {
            if (isNaN(tick) || tick < 0)
                return 0;

            return tick;
        },

        _calcScrollBarWidth: function () {
            var $tmpEl = $(document.createElement('div')).css({
                position: 'absolute',
                top: '-999px',
                left: '-999px',
                width: '100px',
                height: '100px',
                overflow: 'hidden'
            });

            this.element.append($tmpEl);

            var w1 = $tmpEl[0].offsetWidth;
            $tmpEl.css('overflow', 'scroll');
            var w2 = $tmpEl[0].offsetWidth;

            if (w1 == w2) w2 = $tmpEl[0].clientWidth;

            $tmpEl.remove();

            return (w1 - w2);
        },

        _calcPixelsPerMM: function () {
            var $tmpEl = $(document.createElement('div')).css({
                position: 'absolute',
                top: '-999px',
                left: '-999px',
                width: '1mm',
                height: '1mm'
            });

            this.element.append($tmpEl);

            var px = $tmpEl.width();

            $tmpEl.remove();

            return px;
        },

        _fixRulerPosition: function () {
            this._$corner.css({
                top: this._scrollTop,
                left: this._scrollLeft
            });

            /* Fix rulers position */
            this._$topRuler.css('top', this._scrollTop);
            this._$leftRuler.css('left', this._scrollLeft);
        },

        _fixRulerSize: function () {
            var wContainer = this._$container.width(),
                hContainer = this._$container.height(),
                wStage = this._$stage.width(),
                hStage = this._$stage.height();

            /* Fix rulers size */
            this._$topRuler.width(
                (wContainer < wStage) ?
                    wStage :
                    wContainer - this._$corner.width() - this._scrollBarWidth);
            this._$leftRuler.height((hContainer < hStage) ? hStage : hContainer - this._scrollBarWidth);

            this._updateRulerTicks();
        },

        _updateRulerTicks: function (reset) {
            if (reset === true) {
                this._$topRuler.find('.tick').remove();
                this._$leftRuler.find('.tick').remove();

                this._lastTopRulerPos = this._lastLeftRulerPos = 0;
            }

            var $tick = null;
            var unitPos;

            /* Top ruler */
            unitPos = this._lastTopRulerPos * this._unitDiv;
            var topRulerWidth = this._$topRuler.width() + 100;
            while (this._lastTopRulerPos < topRulerWidth) {
                if (this.options.tickMajor > 0 && (unitPos % this.options.tickMajor) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('major')
                        .css('left', this._lastTopRulerPos + 'px');

                    if (this.options.showLabel === true)
                        $tick.text(unitPos);

                    $tick.appendTo(this._$topRuler);
                } else if (this.options.tickMinor > 0 && (unitPos % this.options.tickMinor) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('minor')
                        .css('left', this._lastTopRulerPos + 'px');

                    $tick.appendTo(this._$topRuler);
                } else if (this.options.tickMicro > 0 && (unitPos % this.options.tickMicro) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('micro')
                        .css('left', this._lastTopRulerPos + 'px');

                    $tick.appendTo(this._$topRuler);
                }

                this._lastTopRulerPos += this._unitDiv;
                unitPos++;
            }

            /* Left ruler */
            unitPos = this._lastLeftRulerPos * this._unitDiv;
            var leftRulerHeight = this._$leftRuler.height() + 100;
            while (this._lastLeftRulerPos < leftRulerHeight) {
                if (this.options.tickMajor > 0 && (unitPos % this.options.tickMajor) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('major')
                        .css('top', this._lastLeftRulerPos + 'px');

                    if (this.options.showLabel === true)
                        $tick.append('<span>' + unitPos + '</span>')

                    $tick.appendTo(this._$leftRuler);
                } else if (this.options.tickMinor > 0 && (unitPos % this.options.tickMinor) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('minor')
                        .css('top', this._lastLeftRulerPos + 'px');

                    $tick.appendTo(this._$leftRuler);
                } else if (this.options.tickMicro > 0 && (unitPos % this.options.tickMicro) === 0) {
                    $tick = $(document.createElement('div'))
                        .addClass('tick').addClass('micro')
                        .css('top', this._lastLeftRulerPos + 'px');

                    $tick.appendTo(this._$leftRuler);
                }

                this._lastLeftRulerPos += this._unitDiv;
                unitPos++;
            }
        },

        _fixArrowsPosition: function (mouseX, mouseY) {
            var arrowX = mouseX - this.element.offset().left - this._$corner.width() - Math.round(this._$topArrow.outerWidth() / 2) + parseInt($('.ef-ruler').parents().eq(1).css('padding-left'),10);
            var arrowY = mouseY - this.element.offset().top - this._$corner.height() - Math.round(this._$leftArrow.outerHeight() / 2) + parseInt($('.ef-ruler').parents().eq(1).css('padding-top'),10);

            this._$topArrow.css('left', arrowX + this._scrollLeft);
            this._$leftArrow.css('top', arrowY + this._scrollTop);
        },

        refresh: function () {
            switch (this.options.unit) {
                case 'px':
                    this._unitDiv = 1;
                    break;
                case 'mm':
                    this._unitDiv = this._calcPixelsPerMM();
                    break;
                case 'cm':
                    this._unitDiv = this._calcPixelsPerMM() * 10;
                    break;
                case 'in':
                    this._unitDiv = this._calcPixelsPerMM() * 25.4;
                    break;
            }

            this._fixRulerPosition();
            this._fixRulerSize();
            this._fixArrowsPosition(0, 0);
            this._updateRulerTicks(true);
        }
    });
})(jQuery);