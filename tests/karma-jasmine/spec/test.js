describe('sorti-boxes:', function () {
    beforeEach(function (done) {
        $('body').sortiBoxes(
            {
                params:                [
                    {
                        name:  'foo',
                        label: 'Foo'
                    },
                    {
                        name:  'bar',
                        label: 'Bar'
                    },
                ],
                data:                  data,
                callbackBoxesRendered: function () {
                    console.log('callbackBoxesRendered');
                    done();
                },
                callbackElementMoved:  function () {
                    console.log('callbackElementMoved');
                }
            }
        );
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
            $.each(section.boxes, function(j, box) {
                var renderedBox = $('.sorti-box[rel="' + box.id + '"]');
                expect(renderedBox.find('.sorti-box-available tbody tr').length).toBe(box.elements.length);
                countTotal += box.elements.length;
            });
        });

        expect($('.sorti-box .sorti-box-available tbody tr').length).toBe(countTotal);

        done();
    });

    it('Element amount is smaller or equal to max. visible amount option and the scroll is not visible yet', function (done) {
        // edge case: long names

        done();
    });

    it('Scroll appears when amount of selected elements exceeds max. visible amount option', function (done) {
        // edge case: long names

        done();
    });

    it('Scroll appears when amount of available elements exceeds max. visible amount option', function (done) {
        // edge case: long names

        done();
    });

    it('No UI elements are missing in each boxes (headings, action buttons)', function (done) {
        $('.sorti-box').each(function(i, box) {
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
            ], function(j, selector) {
                expect($(box).find($(selector))).toExist();
            });
        });

        done();
    });

    it('Boxes are gone after trying to render with no data', function (done) {

        done();
    });

    it('Events are binded', function (done) {

        done();
    });

    it('Elements can be added to selected box', function (done) {

        done();
    });

    it('Elements can be removed from selected box', function (done) {

        done();
    });

    it('Selected elements can be moved up and down by one level', function (done) {
        var row = $($('.sorti-box .sorti-box-selected tbody')[0]).find($('tr:first-child'));

        expect(row.index()).toBe(0);
        row.find('.moveUpDown a.moveDown i').click();
        expect(row.index()).toBe(1);
        row.find('.moveUpDown a.moveUp i').click();
        expect(row.index()).toBe(0);

        done();
    });

    // TODO: add after including css
    //it('All utmost elements have only one arrow visible', function (done) {
    //    $('.sorti-box').each(function(i, box) {
    //        expect($(box).find('.sorti-box-selected tbody tr:first-child .actions .moveUpDown .moveUp').css('visibility')).toBe('hidden');
    //        expect($(box).find('.sorti-box-selected tbody tr:first-child .actions .moveUpDown .moveDown').css('visibility')).toBe('visible');
    //
    //        expect($(box).find('.sorti-box-selected tbody tr:last-child .actions .moveUpDown .moveUp').css('visibility')).toBe('visible');
    //        expect($(box).find('.sorti-box-selected tbody tr:last-child .actions .moveUpDown .moveDown').css('visibility')).toBe('hidden');
    //    });
    //
    //    done();
    //});

    it('Available box visibility can be toggled', function (done) {

        done();
    });
});