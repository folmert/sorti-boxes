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
                name:  'delay',
                label: 'Churn delay [min]'
            },
            {
                name:  'msisdn_unique',
                label: 'User uniqueness [h]'
            },
            {
                name:  'clickip_unique',
                label: 'IP uniqueness [h]'
            },
            {
                name:  'fire_ratio',
                label: 'Fire ratio [%]'
            },
            {
                name:  'fire_cap',
                label: 'Fire Cap [per&nbsp;day]'
            },
            {
                name:  'since_click',
                label: 'Since click [h]'
            },
            {
                name:  'since_joined',
                label: 'Since joined [h]'
            }
        ],
        data:   [
            {
                id:   1,
                name: 'Event: Joined',

                boxes: [{
                    id:   1,
                    name: 'TR', // will be used as header

                    elements: [
                        {
                            id:       1,
                            name:     'Joined - TR - MOBILE (11)',
                            special:  true, // will add red dot
                            selected: true,
                            status:   true,
                            params: {
                                // keys must match names of main params
                                delay: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                msisdn_unique: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                clickip_unique: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                fire_ratio: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                fire_cap: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                since_click: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                since_joined: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,
                            }
                        },
                        {
                            id:       2,
                            name:     'Joined - TR - ONLINE (10)',
                            special:  false, // will add red dot
                            selected: true,
                            status:   true,
                            params: {
                                // keys must match names of main params
                                delay: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                msisdn_unique: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                clickip_unique: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                fire_ratio: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                fire_cap: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                since_click: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,

                                since_joined: `<span class="span6 val new">
                                                <input value="2" name="triggers[19][rules][11][delay]" autocomplete="off" type="text">
                                                </span>
                                                <span class="span6 val old">3</span>`,
                            }
                        }
                    ]
                }]
            }
        ],
        additionalHeading: `<tr class="small">
                    <th class="span4"></th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1 valInfo">
                            <small class="span6 txt">new</small>
                            <small class="span6 txt">default</small>
                        </th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1 valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="span1"> </th>
                </tr>`,
        labels: {
            toggleAvailableOn:  'Show available elements',
            toggleAvailableOff: 'Hide available elements',
            selectedBoxInitMsg: 'No elements selected'
        },
        bootstrapVersion: 2,
        colWidthName:     4,
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

require('kovarik-glyphicons-bootstrap2/glyphicons.css');
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

        if (options.data.length) {
            $('#notification-rules .well').hide();

            renderBoxes(this, function () {
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
        }
        else {
            $('#notification-rules .boxes').html('');
            $('#notification-rules .well').show();
        }
    };


    /**
     * Default options
     */
    var options = {
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
    var bsClasses = {};


    /**
     * Defines Bootstrap classes depending on the used version
     *
     * @param bsVersion
     */
    var setBootstrapClasses = function (bsVersion) {
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
    var renderBoxes = function (container, callback) {
        var sections = [];

        $.each(options.data, function (sectionIndex, section) {
            var _section = $('<div></div>')
                .addClass('sorti-box-section')
                .attr('rel', section.id)
                .append(`<h5>${section.name}</h5>`);

            $.each(section.boxes, function (boxIndex, box) {
                // 1. MAIN PARTS:

                var _box = $('<div></div>').addClass('sorti-box').attr('rel', box.id);
                var _boxSelected = $('<div class="sorti-box-selected-container"><div class="sorti-box-selected sorti-box-half"><table class="table"></table></div></div>');
                var _boxAvailable = $('<div class="sorti-box-available-container"><div class="sorti-box-available sorti-box-half"><table class="table"></table></div></div>');
                var _boxSelectedContent = $('<tbody></tbody>');
                var _boxAvailableContent = $('<tbody></tbody>');
                var _boxHead = $('<thead></thead>');

                // 2. RENDER HEAD:

                var _header = $(`<tr class="sorti-box-header ${bsClasses.row}">
                                 <th class="name">
                                 <span>${box.name}</span></th></tr>`);

                var _heading = $(`<tr class="sorti-box-heading ${bsClasses.row}"></tr>`);
                _heading.append($(`<th><span class="sorti-box-heading-param">Name</span></th>`));
                $.each(options.params, function (paramIndex, param) {
                    _heading.append($(`<th class="vals">
                                        <span class="sorti-box-heading-param">
                                            ${param.label}
                                        </span>
                                        </th>`));
                });
                _heading.append($(`<th class="actions"> </th>`));

                _boxHead.append(_header, _heading, ($(options.additionalHeading) || ''));

                // 3. RENDER AVAILABLE BOX TOGGLE:

                var _boxToggleAvailable = `<thead class="sorti-box-available-toggle sorti-box-available-toggle-expanded">
	            <tr>
		            <th>
			            <span class="btn-action margin-none single pointer ${bsClasses.glyphicon.expanded}"><i></i></span>
			            <span class="sorti-box-available-toggle-label">${options.labels.toggleAvailableOff}</span>
		            </th>
	            </tr>
	            </thead>`;

                // 4. RENDER CONTENT:

                $.each(box.elements, function (elementIndex, element) {
                    var _element = $(`<tr class="${bsClasses.row}"></tr>`).attr('rel', element.id);
                    var _elementName = $(`<td class="name"><span class="txt">${element.name}</span></td>`);
                    if (element.special) {
                        _elementName.addClass('special')
                    }

                    _element.append(_elementName);

                    $.each(options.params, function (paramIndex, param) {
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

                    var _elementInAvailableBox = _element.clone();
                    _elementInAvailableBox.appendTo(_boxAvailableContent);

                    if (element.selected) {
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
        $(sections).each(function (sectionIndex, section) {
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
    var calculateContainerHeight = function (amountElements) {
        var elements = $('.sorti-box-selected table tbody tr:not(.info)');

        var elementLowestHeight = Math.min.apply(null, $(elements).map(function () {
            return $(this).outerHeight() + 1; // add border-bottom for each
        }).get());

        return (elementLowestHeight * amountElements) - 1; // last row doesn't have bottom border
    };


    /**
     * Adjusts header's side padding to match scrollable box width
     *
     * @param thisBox
     */
    var resizeBoxIfScrollAppears = function (thisBox) {
        var boxHasScroll = false;
        var scrollWidth;

        $(thisBox).find('tbody').each(function () {
            // if one of tbodies has scroll:
            if ($(this)[0].scrollHeight > $(this).css('max-height').replace(/[^-\d\.]/g, '')) {
                boxHasScroll = true;
                scrollWidth = $(this).outerWidth() - $(this).find('tr:visible').outerWidth();
            }
        });

        if (boxHasScroll) {
            $(thisBox).find('thead tr').css({'padding-right': scrollWidth + 'px'});

            $(thisBox).find('tbody').each(function () {
                // for each tbody without scroll:
                if (!($(this)[0].scrollHeight > $(this).css('max-height').replace(/[^-\d\.]/g, ''))) {
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
    var getBoxByTarget = function (target) {
        return $(target).closest('.sorti-box');
    };


    /**
     * Returns box as a jQuery element based on box ID
     *
     * @param id
     * @return {$}
     */
    var getBoxById = function (id) {
        return $(`.sorti-box[rel="${id}"]`);
    };


    /**
     * Returns true if box with given ID exists
     *
     * @param id
     * @return {bool}
     */
    var boxExists = function (id) {
        return getBoxById(id).length;
    };


    /**
     * Selected Box methods only
     */
    var selected = function () {
        var adjustContainerHeight = function (thisBox) {
            var newHeight = calculateContainerHeight(options.amountVisibleInSelectedBox);
            thisBox.find('.sorti-box-selected tbody').css({'max-height': newHeight + 'px'});
        };


        /**
         * Returns selected elements
         *
         * @param eventId
         * @return {Array}
         */
        var get = function (eventId) {
            var thisBox = getBoxById(eventId);
            var selectedTriggers = [];

            $(thisBox).find('.sorti-box-selected table tr:not(.info)').each(function () {
                selectedTriggers.push($(this).attr('rel'));
            });

            return selectedTriggers;
        };


        /**
         * Clears all selected elements
         *
         * @param thisBox
         */
        var clear = function (thisBox) {
            thisBox.find('.sorti-box-selected table tbody').html('');
        };


        /**
         * Moves selected element back to available box
         *
         * @param thisBox
         */
        var unselect = function (thisBox) {
            thisBox.find('.sorti-box-selected table tbody tr:not(.info)').each(function () {
                $(this).appendTo(thisBox.find('.sorti-box-available table tbody'));
            });
        };


        /**
         * Moves available element to selected box
         *
         * @param e
         * @return {boolean}
         */
        var moveToAvailable = function (e) {
            var thisBox = getBoxByTarget(e.target);

            var boxAvailable = $(thisBox).find('.sorti-box-available table tbody');
            var boxSelected = $(thisBox).find('.sorti-box-selected table tbody');
            var row = $(e.target).closest('tr');

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
        var moveUpDown = function (e) {
            e.preventDefault();
            var a = e.target.parentElement;
            var row = $(a).closest('tr');

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
        var toggleInitInfo = function (thisBox) {
            var boxSelected = $(thisBox).find('.sorti-box-selected table tbody');

            if (!(boxSelected.find('tr').length)) {
                boxSelected.html(`<tr class="info"><td>${options.labels.selectedBoxInitMsg}</td></tr>`);
            }
            else if (boxSelected.find('tr').length && boxSelected.find('.info').length) {
                boxSelected.find('.info').remove();
            }
        };


        return {
            adjustContainerHeight: adjustContainerHeight,
            moveToAvailable:       moveToAvailable,
            moveUpDown:            moveUpDown,
            get:                   get,
            toggleInitInfo:        toggleInitInfo
        }
    }();


    /**
     * Available Box methods only
     */
    var available = function () {
        /**
         * Adjusts box height to match passed option
         *
         * @param thisBox
         */
        var adjustContainerHeight = function (thisBox) {
            var newHeight = calculateContainerHeight(options.amountVisibleInAvailableBox);
            thisBox.find('.sorti-box-available tbody').css({'max-height': newHeight + 'px'});
        };


        /**
         * Sorts elements in given box alphabetically
         *
         * @param thisBox
         */
        var sortAlphabetically = function (thisBox) {
            var elements = $(thisBox).find('.sorti-box-available table tbody tr');

            elements.detach().sort(function (a, b) {
                var at = $(a).find('.name').text();
                var bt = $(b).find('.name').text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            });
            elements.appendTo($(thisBox).find('.sorti-box-available table tbody'));
        };


        /**
         * Moves element to selected box
         *
         * @param e
         * @return {boolean}
         */
        var moveToSelected = function (e) {
            var thisBox = getBoxByTarget(e.target);
            var boxSelected = $(thisBox).find('.sorti-box-selected table tbody');

            $(e.target).closest('tr').clone().appendTo(boxSelected).find('input').val('').prop('disabled', false);

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
        var toggleBox = function (e) {
            var thisBox = getBoxByTarget(e.target);
            var boxAvailableToggle = thisBox.find('.sorti-box-available-toggle');
            thisBox.find('.sorti-box-available tbody').toggle();
            boxAvailableToggle.find('.btn-action').toggleClass(bsClasses.glyphicon.collapsed).toggleClass(bsClasses.glyphicon.expanded);
            boxAvailableToggle.toggleClass('sorti-box-available-toggle-collapsed').toggleClass('sorti-box-available-toggle-expanded');

            thisBox.find('.sorti-box-available-toggle .sorti-box-available-toggle-label')
                .text(boxAvailableToggle.hasClass('sorti-box-available-toggle-collapsed') ?
                    options.labels.toggleAvailableOn : options.labels.toggleAvailableOff);
        };


        return {
            adjustContainerHeight: adjustContainerHeight,
            moveToSelected:        moveToSelected,
            toggleBox:             toggleBox,
            sortAlphabetically:    sortAlphabetically,
        }
    }();


    var bindObjects = [
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
        }
    ];


    var bindEvents = (function () {
        $.each(bindObjects, function (i, object) {
            $('body')
                .off(object.event, object.element, object.function)
                .on(object.event, object.element, object.function);
        });

        if (navigator.platform.match('Mac') !== null) {
            $('body').addClass('OSX');
        }
    });
})(jQuery);