/**
 * Creates boxes with selectable and sortable elements
 *
 * Usage example:
 * $('#sortiBoxesContainer').sortiBoxes(options)
 *
 * Options example:
 * var options = {
        params: [
            {
                name:  'foo',
                label: 'Foo'
            },
            {
                name:  'bar',
                label: 'Bar'
            }
        ],
        data:   [
            {
                id:   1,
                name: 'Section Name',

                boxes: [{
                    id:   1,
                    name: 'Box Name',

                    elements: [
                        {
                            id:       1,
                            name:     'Element Name',
                            special:  true,
                            selected: true,
                            status:   true,
                            params: {
                                foo: 15,
                                bar: 53
                            }
                        },
                        {
                            id:       2,
                            name:     'Element Name',
                            special:  true,
                            selected: true,
                            status:   true,
                            params: {
                                foo: 67,
                                bar: 89
                            }
                        },
                    ]
                }]
            }
        ],
        additionalHeading: `<tr><td>Additional Heading</td></tr>`,
        labels: {
            toggleAvailableOn:  'Show available elements',
            toggleAvailableOff: 'Hide available elements',
            selectedBoxInitMsg: 'No elements selected'
        },
        bootstrapVersion: 2,
        colWidthName:     '25%',
        amountVisibleInAvailableBox: 10,
        amountVisibleInSelectedBox:  5,
        callbackElementMoved: function () {
            console.log('element moved, pass data to form');
        },
        callbackBoxesRendered: function () {
            console.log('boxes rendered, paint them black');
        }
    };
 */

require('../themes/default.pcss');

(function ($) {
    /**
     * Adds plugin to jQuery object as a function
     *
     * @param optionsCustom
     */
    $.fn.sortiBoxes = function (optionsCustom) {
        options = $.extend(options, (optionsCustom || {}));
        setBootstrapClasses(options.bootstrapVersion);

        renderBoxes(this, () => {
            $('.sorti-box').each(function () {
                selected.adjustContainerHeight($(this));
                available.adjustContainerHeight($(this));
                resizeBoxIfScrollAppears($(this));
            });

            bindEvents();

            if (typeof options.callbackBoxesRendered == 'function') {
                options.callbackBoxesRendered();
            }
        });
    };


    /**
     * Default options
     */
    let options = {
        labels:                      {
            toggleAvailableOn:  'Show available elements',
            toggleAvailableOff: 'Hide available elements',
            selectedBoxInitMsg: 'No elements selected'
        },
        bootstrapVersion:            2,
        colWidthName:                '33.33%',
        amountVisibleInAvailableBox: 10,
        amountVisibleInSelectedBox:  5
    };


    /**
     * Bootstrap classes
     */
    let bsClasses = {};


    /**
     * Container for dragged element
     */
    let dragSrcEl = null;


    /**
     * Defines Bootstrap classes depending on the used version
     *
     * @param bsVersion
     */
    let setBootstrapClasses = function (bsVersion) {
        switch (bsVersion) {
            case 2:
                bsClasses = $.extend({}, {
                    row:       'row-fluid',
                    col:       'span',
                    glyphicon: {
                        upArrow:   'glyphicons up_arrow',
                        downArrow: 'glyphicons down_arrow',
                        remove:    'glyphicons remove_2',
                        expanded:  'glyphicons expand',
                        collapsed: 'glyphicons collapse'
                    }
                });
                break;

            case 3:
                bsClasses = $.extend({}, {
                    row:       'row',
                    col:       'col-md-',
                    glyphicon: {
                        upArrow:   'glyphicon glyphicon-up_arrow',
                        downArrow: 'glyphicon glyphicon-down_arrow',
                        remove:    'glyphicon glyphicon-remove_2',
                        expanded:  'glyphicon glyphicon-expand',
                        collapsed: 'glyphicon glyphicon-collapse'
                    }
                });
                break;
        }
    };


    /**
     * Renders all boxes to container based on options
     *
     * @param container
     * @param callback
     */
    let renderBoxes = function (container, callback) {
        let sections = [];

        $.each(options.data, (sectionIndex, section) => {
            let _section = $('<div></div>')
                .addClass('sorti-box-section')
                .attr('rel', section.id)
                .append(`<h5>${section.name}</h5>`);

            $.each(section.boxes, (boxIndex, box) => {
                // 1. MAIN PARTS:

                let _box = $(`<div></div>`).addClass('sorti-box').attr('rel', box.id);
                let _boxSelected = $(`<div class="sorti-box-selected-container"><div class="sorti-box-selected sorti-box-half"><table class="table"></table></div></div>`);
                let _boxAvailable = $(`<div class="sorti-box-available-container"><div class="sorti-box-available sorti-box-half"><table class="table"></table></div></div>`);
                let _boxSelectedContent = $(`<tbody></tbody>`);
                let _boxAvailableContent = $(`<tbody></tbody>`);
                let _boxHead = $(`<thead></thead>`);

                // 2. RENDER HEAD:

                let _header = $(`<tr class="sorti-box-header ${bsClasses.row}">
                                 <th class="name">
                                 <span>${box.name}</span></th></tr>`);

                let _heading = $(`<tr class="sorti-box-heading ${bsClasses.row}"></tr>`);
                _heading.append($(`<th><span class="sorti-box-heading-param">Name</span></th>`));
                $.each(options.params, (paramIndex, param) => {
                    _heading.append($(`<th class="vals">
                                        <span class="sorti-box-heading-param">
                                            ${param.label}
                                        </span>
                                        </th>`));
                });
                _heading.append($(`<th class="actions"> </th>`));

                _boxHead.append(_header, _heading, ($(options.additionalHeading) || ''));

                // 3. RENDER AVAILABLE BOX TOGGLE:

                let _boxToggleAvailable = `<thead class="sorti-box-available-toggle sorti-box-available-toggle-expanded">
	            <tr>
		            <th>
			            <span class="btn-action margin-none single pointer ${bsClasses.glyphicon.expanded}"><i></i></span>
			            <span class="sorti-box-available-toggle-label">${options.labels.toggleAvailableOff}</span>
		            </th>
	            </tr>
	            </thead>`;

                // 4. RENDER CONTENT:

                $.each(box.elements, (elementIndex, element) => {
                    let _element = $(`<tr class="${bsClasses.row}"></tr>`).attr('rel', element.id);
                    let _elementName = $(`<td class="name"><span class="txt">${element.name}</span></td>`);
                    if (element.special) {
                        _elementName.addClass('special')
                    }

                    _element.append(_elementName);

                    $.each(options.params, (paramIndex, param) => {
                        _element.append(`<td class="vals">${element.params[param.name]}</td>`);
                    });

                    _element.append(`<td class="actions">
                        <span class="moveUpDown">
                            <a href="#" class="moveUp ${bsClasses.glyphicon.upArrow}"><i></i></a>
                            <a href="#" class="moveDown ${bsClasses.glyphicon.downArrow}"><i></i></a>
                        </span>
                        <span class="toggleElement">
                            <a href="#" class="${bsClasses.glyphicon.remove}"><i></i></a>
                        </span>
                        </td>`);

                    let _elementInAvailableBox = _element.clone();
                    _elementInAvailableBox.appendTo(_boxAvailableContent);

                    if (element.selected) {
                        _element.attr('draggable', true);
                        _element.appendTo(_boxSelectedContent);
                        _elementInAvailableBox.css({'display': 'none'});
                    }
                });

                // 5. COMBINE PARTS:

                _boxSelected.find('table').append(_boxHead);
                _boxSelected.find('table').append(_boxSelectedContent);
                _boxAvailable.find('table').append(_boxToggleAvailable);
                _boxAvailable.find('table').append(_boxAvailableContent);
                _box.append(_boxSelected, _boxAvailable);

                // 6 : SET NAME COL WIDTH:

                _box.find('tr td:first-child, tr th:first-child').css({'width': options.colWidthName});

                // 7. APPEND TO SECTION:

                _section.append(_box);
            });

            sections.push(_section);
        });

        $(container).html('');
        $(sections).each((sectionIndex, section) => {
            $(container).append(section);
        });

        callback();
    };


    /**
     * Returns box container's height based on amount of elements
     *
     * @param amountElements
     * @return {number}
     */
    let calculateContainerHeight = function (amountElements) {
        let elements = $('.sorti-box-selected table tbody tr:not(.info)');

        let elementLowestHeight = Math.min.apply(null, $(elements).map(function () {
            return $(this).outerHeight() + 1; // add border-bottom for each
        }).get());

        return (elementLowestHeight * amountElements) - 1; // last row doesn't have bottom border
    };


    /**
     * Adjusts header's side padding to match scrollable box width
     *
     * @param thisBox
     */
    let resizeBoxIfScrollAppears = function (thisBox) {
        let boxHasScroll = false;
        let scrollWidth;

        $(thisBox).find('tbody').each(function () {
            // if one of tbodies has scroll:
            if ($(this)[0].scrollHeight > $(this).css('max-height').replace(/[^-\d.]/g, '')) {
                boxHasScroll = true;
                scrollWidth = $(this).outerWidth() - $(this).find('tr:visible').outerWidth();
            }
        });

        if (boxHasScroll) {
            $(thisBox).find('thead tr').css({'padding-right': scrollWidth + 'px'});

            $(thisBox).find('tbody').each(function () {
                // for each tbody without scroll:
                if (!($(this)[0].scrollHeight > $(this).css('max-height').replace(/[^-\d.]/g, ''))) {
                    $(this).find('tr').css({'padding-right': scrollWidth + 'px'});
                }
                else {
                    $(this).find('tr').css('padding-right', '');
                }
            });
        }
        else {
            $(thisBox).find('tr').css('padding-right', '');
        }
    };


    /**
     * Returns box as jQuery element based on its child
     *
     * @param target
     * @return {$}
     */
    let getBoxByTarget = function (target) {
        return $(target).closest('.sorti-box');
    };


    /**
     * Returns box as a jQuery element based on box ID
     *
     * @param id
     * @return {$}
     */
    let getBoxById = function (id) {
        return $(`.sorti-box[rel="${id}"]`);
    };


    /**
     * Selected Box methods only
     */
    let selected = function () {
        let adjustContainerHeight = function (thisBox) {
            let newHeight = calculateContainerHeight(options.amountVisibleInSelectedBox);
            thisBox.find('.sorti-box-selected tbody').css({'max-height': newHeight + 'px'});
        };


        /**
         * Returns selected elements
         *
         * @param eventId
         * @return {Array}
         */
        let get = function (eventId) {
            let thisBox = getBoxById(eventId);
            let selectedTriggers = [];

            $(thisBox).find('.sorti-box-selected table tr:not(.info)').each(function () {
                selectedTriggers.push($(this).attr('rel'));
            });

            return selectedTriggers;
        };


        /**
         * Moves available element to selected box
         *
         * @param e
         * @return {boolean}
         */
        let moveToAvailable = function (e) {
            let thisBox = getBoxByTarget(e.target);

            let boxAvailable = $(thisBox).find('.sorti-box-available table tbody');
            let boxSelected = $(thisBox).find('.sorti-box-selected table tbody');
            let row = $(e.target).closest('tr');

            boxAvailable.find(`tr[rel="${row.attr('rel')}"]`).show();
            boxSelected.find(`tr[rel="${row.attr('rel')}"]`).remove();

            toggleInitInfo(thisBox);
            resizeBoxIfScrollAppears(thisBox);

            if (typeof options.callbackElementMoved == 'function') {
                options.callbackElementMoved(thisBox);
            }

            return false;
        };


        /**
         * Moves element up or down
         *
         * @param e
         */
        let moveUpDown = function (e) {
            e.preventDefault();
            let a = e.target.parentElement;
            let row = $(a).closest('tr');

            if ($(a).hasClass('moveUp')) {
                $(row).insertBefore($(row).prev());
            }
            else if ($(a).hasClass('moveDown')) {
                $(row).insertAfter($(row).next());
            }
        };


        /**
         * Shows or hides text about no elements
         *
         * @param thisBox
         */
        let toggleInitInfo = function (thisBox) {
            let boxSelected = $(thisBox).find('.sorti-box-selected table tbody');

            if (!(boxSelected.find('tr').length)) {
                boxSelected.html(`<tr class="info"><td>${options.labels.selectedBoxInitMsg}</td></tr>`);
            }
            else if (boxSelected.find('tr').length && boxSelected.find('.info').length) {
                boxSelected.find('.info').remove();
            }
        };

        return {
            adjustContainerHeight,
            moveToAvailable,
            moveUpDown,
            get,
            toggleInitInfo
        }
    }();


    /**
     * Available Box methods only
     */
    let available = function () {
        /**
         * Adjusts box height to match passed option
         *
         * @param thisBox
         */
        let adjustContainerHeight = function (thisBox) {
            let newHeight = calculateContainerHeight(options.amountVisibleInAvailableBox);
            thisBox.find('.sorti-box-available tbody').css({'max-height': newHeight + 'px'});
        };


        /**
         * Moves element to selected box
         *
         * @param e
         * @return {boolean}
         */
        let moveToSelected = function (e) {
            let thisBox = getBoxByTarget(e.target);
            let boxSelected = $(thisBox).find('.sorti-box-selected table tbody');

            let element = $(e.target).closest('tr').clone();
            element.attr('draggable', true);
            element.appendTo(boxSelected).find('input').val('').prop('disabled', false);

            $(e.target).closest('tr').hide();
            $(boxSelected).animate({
                scrollTop: boxSelected[0].scrollHeight
            }, 0);

            selected.toggleInitInfo(thisBox);
            resizeBoxIfScrollAppears(thisBox);

            if (typeof options.callbackElementMoved == 'function') {
                options.callbackElementMoved(thisBox);
            }

            return false;
        };


        /**
         * Shows or hides available box
         *
         * @param e
         */
        let toggleBox = function (e) {
            let thisBox = getBoxByTarget(e.target);
            let boxAvailableToggle = thisBox.find('.sorti-box-available-toggle');
            thisBox.find('.sorti-box-available tbody').toggle();
            boxAvailableToggle.find('.btn-action').toggleClass(bsClasses.glyphicon.collapsed).toggleClass(bsClasses.glyphicon.expanded);
            boxAvailableToggle.toggleClass('sorti-box-available-toggle-collapsed').toggleClass('sorti-box-available-toggle-expanded');

            thisBox.find('.sorti-box-available-toggle .sorti-box-available-toggle-label')
                .text(boxAvailableToggle.hasClass('sorti-box-available-toggle-collapsed') ?
                    options.labels.toggleAvailableOn : options.labels.toggleAvailableOff);
        };

        return {
            adjustContainerHeight,
            moveToSelected,
            toggleBox
        }
    }();


    /**
     * Handler for action when element is dragged
     * @param e
     */
    let dragStartHandle = function (e) {
        $(this).css({opacity: '0.4'});
        dragSrcEl = this;
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('text/html', this.innerHTML); // needed for FF
    };


    /**
     * Handler for action when dragged element is moved over other element
     * @param e
     */
    let dragOverHandle = function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.originalEvent.dataTransfer.dropEffect = 'move';

        let elementOver = this;
        let elementOverPosYMiddle = ($(elementOver).height() / 2);
        let elementOverPosYMouse = (e.originalEvent.clientY - elementOver.getBoundingClientRect().top);

        setTimeout(() => {
            // move element only if it was moved over other element & if mouse was not moved for some short time
            if ((dragSrcEl != elementOver) && (elementOverPosYMouse == (e.originalEvent.clientY - elementOver.getBoundingClientRect().top))) {
                if (elementOverPosYMouse > elementOverPosYMiddle) {
                    $(dragSrcEl).detach().insertAfter($(elementOver));
                }
                else {
                    $(dragSrcEl).detach().insertBefore($(elementOver));
                }
            }
        }, 50);
    };


    /**
     * Handler for action when dragged element is moved over other element for the first time
     */
    let dragEnterHandle = function () {
        $('.sorti-box-selected tbody tr:not(.info)').removeClass('js-drag-over');
        this.classList.add('js-drag-over'); // remove on dragleave?
    };


    /**
     * Handler for action when dragged element is dropped
     *
     * @param e
     */
    let dragDropHandle = function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    };


    /**
     * Handler for action when drag and drop is finished
     */
    let dragEndHandle = function () {
        $('.sorti-box-selected tbody tr:not(.info)').removeClass('js-drag-over');
        $(this).css({opacity: '1'});
    };


    let bindObjects = [
        {
            event:    'click',
            element:  '.sorti-box-available .toggleElement a',
            function: available.moveToSelected
        },
        {
            event:    'click',
            element:  '.sorti-box-selected .toggleElement a',
            function: selected.moveToAvailable
        },
        {
            event:    'click',
            element:  '.sorti-box-selected .moveUpDown a',
            function: selected.moveUpDown
        },
        {
            event:    'click',
            element:  '.sorti-box-available-toggle',
            function: available.toggleBox
        },
        {
            event:    'dragstart',
            element:  '.sorti-box-selected tbody tr:not(.info)',
            function: dragStartHandle
        },
        {
            event:    'dragover',
            element:  '.sorti-box-selected tbody tr:not(.info)',
            function: dragOverHandle
        },
        {
            event:    'dragenter',
            element:  '.sorti-box-selected tbody tr:not(.info)',
            function: dragEnterHandle
        },
        {
            event:    'drop',
            element:  '.sorti-box-selected tbody tr:not(.info)',
            function: dragDropHandle
        },
        {
            event:    'dragend',
            element:  '.sorti-box-selected tbody tr:not(.info)',
            function: dragEndHandle
        },
    ];


    let bindEvents = (function () {
        $.each(bindObjects, (i, object) => {
            $('body')
                .off(object.event, object.element, object.function)
                .on(object.event, object.element, object.function);
        });

        if (navigator.platform.match('Mac') !== null) {
            $('body').addClass('OSX');
        }
    });
})(jQuery);