describe("sorti-boxes:", function () {
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

    it("boxes are rendered", function (done) {
        expect($('.sorti-box')).toExist();
        done();
    });
});