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

        done();
    });

    it('Element amount is correct (total and for each box)', function (done) {

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

    it('All utmost elements have only one arrow visible', function (done) {

        done();
    });

    it('Available box visibility can be toggled', function (done) {

        done();
    });
});