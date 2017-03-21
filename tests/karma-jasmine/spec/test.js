describe('sorti-boxes:', function () {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000000;

    var addCSS = function (href) {
        var link = document.createElement("link");
        link.href = href;
        link.rel = 'stylesheet';
        $('head').prepend(link);
    };

    var wait = function (done) {
        setTimeout(done, 10000000);
    };

    // TODO: find a way to add CSS files in Karma
    addCSS('https://maxcdn.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css');

    // TODO: add support for bs 3
    $.each([2], function (b, bsVersion) {
        var options = {
            params:                      [
                {
                    name:  'foo',
                    label: 'Foo'
                },
                {
                    name:  'bar',
                    label: 'Bar'
                },
            ],
            callbackBoxesRendered:       function () {
                console.log('callbackBoxesRendered');
            },
            callbackElementMoved:        function () {
                console.log('callbackElementMoved');
            },
            bootstrapVersion:            bsVersion,
            amountVisibleInAvailableBox: 6,
            amountVisibleInSelectedBox:  5
        };

        var renderBoxes = function (data) {
            $('body').sortiBoxes($.extend(options, {data: data}));
        };

        beforeEach(function () {
            renderBoxes(data);
        });

        it('Boxes are rendered', function (done) {
            expect($('.sorti-box')).toExist();

            done();
        });

        it('Section amount is correct', function (done) {
            expect($('.sorti-box-section').length).toBe(data.length);

            done();
        });

        it('Boxes amount is correct (total and for each section)', function (done) {
            var countTotal = 0;
            $.each(data, function (i, section) {
                var renderedSection = $('.sorti-box-section[rel="' + section.id + '"]');
                expect(renderedSection.find('.sorti-box').length).toBe(section.boxes.length);
                countTotal += section.boxes.length;
            });

            expect($('.sorti-box').length).toBe(countTotal);

            done();
        });

        it('Element amount is correct (total and for each box)', function (done) {
            var countTotal = 0;
            $.each(data, function (i, section) {
                $.each(section.boxes, function (j, box) {
                    var renderedBox = $('.sorti-box[rel="' + box.id + '"]');
                    expect(renderedBox.find('.sorti-box-available tbody tr').length).toBe(box.elements.length);
                    countTotal += box.elements.length;
                });
            });

            expect($('.sorti-box .sorti-box-available tbody tr').length).toBe(countTotal);

            done();
        });

        it('Test corectness behind options: amountVisibleInAvailableBox and amountVisibleInSelectedBox (scroll visibility)', function (done) {
            $('.sorti-box').each(function (i, box) {
                var boxSelected = $(box).find('.sorti-box-selected tbody');
                var boxAvailable = $(box).find('.sorti-box-available tbody');

                $('tbody tr .name .txt').html('Some Short Name'); // edge case: long names

                $(boxSelected).find('tr').each(function (j, element) {
                    $(element).find('.toggleElement a i').click();

                    if ($(boxSelected).find('tr').length > options.amountVisibleInSelectedBox) {
                        // in IE, $.height() returns slightly lower values than scroll height
                        expect($(boxSelected).get(0).scrollHeight > Math.round($(boxSelected).height())).toBe(true);
                    }
                    else {
                        expect($(boxSelected).get(0).scrollHeight > Math.round($(boxSelected).height())).toBe(false);
                    }
                });

                $(boxAvailable).find('tr:visible').each(function (k, element) {
                    $(element).find('.toggleElement a i').click();

                    if ($(boxAvailable).find('tr:visible').length > options.amountVisibleInAvailableBox) {
                        expect($(boxAvailable).get(0).scrollHeight > Math.round($(boxAvailable).height())).toBe(true);
                    }
                    else {
                        expect($(boxAvailable).get(0).scrollHeight > Math.round($(boxAvailable).height())).toBe(false);
                    }
                });
            });

            done();
        });

        it('No UI elements are missing in each boxes (headings, action buttons)', function (done) {
            $('.sorti-box').each(function (i, box) {
                $.each([
                    '.sorti-box-selected-container',
                    '.sorti-box-available-container',
                    '.sorti-box-selected',
                    '.sorti-box-selected table',
                    '.sorti-box-selected table thead',
                    '.sorti-box-selected table tbody',
                    '.sorti-box-available',
                    '.sorti-box-available table',
                    '.sorti-box-available table thead',
                    '.sorti-box-available table tbody',
                    '.sorti-box-selected table thead .sorti-box-header',
                    '.sorti-box-selected table thead .sorti-box-heading',
                    '.sorti-box-selected table thead tr .name',
                    '.sorti-box-selected table tbody',
                    '.sorti-box-selected table tbody tr .name',
                    '.sorti-box-selected table tbody tr .vals',
                    '.sorti-box-selected table tbody tr .actions',
                    '.sorti-box-selected table tbody tr .actions .moveUpDown',
                    '.sorti-box-selected table tbody tr .actions .moveUpDown .moveUp',
                    '.sorti-box-selected table tbody tr .actions .moveUpDown .moveDown',
                    '.sorti-box-selected table tbody tr .actions .toggleElement',
                ], function (j, selector) {
                    expect($(box).find($(selector))).toExist();
                });
            });

            done();
        });

        it('Boxes are gone after trying to render with no data', function (done) {
            renderBoxes([]);
            expect($('.sorti-box-section')).not.toExist();

            done();
        });

        it('Events are binded', function (done) {
            var container = $('body')[0];

            var bindedEvents = (typeof $._data(container, 'events') != 'undefined' ?
                $._data(container, 'events') : container.data('events'));

            $.each([
                {
                    type:     'click',
                    selector: '.sorti-box-available .toggleElement a',
                    fnName:   'moveToSelected'
                },
                {
                    type:     'click',
                    selector: '.sorti-box-selected .toggleElement a',
                    fnName:   'moveToAvailable'
                },
                {
                    type:     'click',
                    selector: '.sorti-box-selected .moveUpDown a',
                    fnName:   'moveUpDown'
                },
                {
                    type:     'click',
                    selector: '.sorti-box-available-toggle',
                    fnName:   'toggleBox'
                }
            ], function (i, eventExpected) {
                expect(getFunctionName(bindedEvents[eventExpected.type].filter(function (event) {
                    return event.selector == eventExpected.selector;
                })[0].handler)).toBe(eventExpected.fnName);
            });

            done();
        });

        it('Elements can be added to selected box', function (done) {
            $('.sorti-box').each(function (i, box) {
                var element = $($(box).find('.sorti-box-available tbody tr:visible')[0]);
                var elementId = element.attr('rel');
                expect($(box).find('.sorti-box-selected tbody').find('tr[rel="' + elementId + '"]')).not.toExist();
                element.find('.toggleElement a i').click();
                expect($(box).find('.sorti-box-selected tbody').find('tr[rel="' + elementId + '"]')).toExist();
            });

            done();
        });

        it('Elements can be removed from selected box', function (done) {
            $('.sorti-box').each(function (i, box) {
                var element = $($(box).find('.sorti-box-selected tbody tr')[0]);
                expect(element.closest('.sorti-box-selected').length).toBe(1);
                element.find('.toggleElement a i').click();
                expect(element.closest('.sorti-box-selected').length).toBe(0);
            });

            done();
        });

        it('Selected elements can be moved up and down by one level', function (done) {
            var element = $($('.sorti-box .sorti-box-selected tbody')[0]).find($('tr:first-child'));

            expect(element.index()).toBe(0);
            element.find('.moveUpDown a.moveDown i').click();
            expect(element.index()).toBe(1);
            element.find('.moveUpDown a.moveUp i').click();
            expect(element.index()).toBe(0);

            done();
        });

        it('All utmost elements have only one arrow visible', function (done) {
            $('.sorti-box').each(function (i, box) {
                expect($(box).find('.sorti-box-selected tbody tr:first-child .actions .moveUpDown .moveUp').css('visibility')).toBe('hidden');
                expect($(box).find('.sorti-box-selected tbody tr:first-child .actions .moveUpDown .moveDown').css('visibility')).toBe('visible');

                expect($(box).find('.sorti-box-selected tbody tr:last-child .actions .moveUpDown .moveUp').css('visibility')).toBe('visible');
                expect($(box).find('.sorti-box-selected tbody tr:last-child .actions .moveUpDown .moveDown').css('visibility')).toBe('hidden');
            });

            done();
        });

        it('Available box visibility can be toggled', function (done) {
            $('.sorti-box').each(function (i, box) {
                var btnToggleAvailable = $(box).find('.sorti-box-available-toggle');
                var boxToggleAvailable = $(box).find('.sorti-box-available tbody');

                for (var j = 0; j < 2; j++) {
                    // initially: visible
                    expect(btnToggleAvailable.hasClass('sorti-box-available-toggle-expanded')).toBe(true);
                    expect(btnToggleAvailable.hasClass('sorti-box-available-toggle-collapsed')).toBe(false);
                    expect(boxToggleAvailable.is(':visible')).toBe(true);

                    btnToggleAvailable.click(); // should hide

                    expect(btnToggleAvailable.hasClass('sorti-box-available-toggle-expanded')).toBe(false);
                    expect(btnToggleAvailable.hasClass('sorti-box-available-toggle-collapsed')).toBe(true);
                    expect(boxToggleAvailable.is(':visible')).toBe(false);

                    btnToggleAvailable.click(); // should show again
                }
            });

            done();
        });

        it('Info about no selected elements appears when box is empty and hides when it\'s not', function (done) {
            $('.sorti-box').each(function (i, box) {
                expect($(box).find('.sorti-box-selected tbody tr.info')).not.toExist();

                $(box).find('.sorti-box-selected tbody tr').each(function (j, element) {
                    $(element).find('.toggleElement a i').click();
                });

                expect($(box).find('.sorti-box-selected tbody tr.info')).toExist();

                $(box).find('.sorti-box-available tbody tr:first-child .toggleElement a i').click();
                expect($(box).find('.sorti-box-selected tbody tr.info')).not.toExist();
            });

            done();
        });
    });

    //it('wait', function (done) {
    //    wait(done);
    //});
});
