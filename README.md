
Sorti Boxes
=========

[![Build Status](https://travis-ci.org/folmert/sorti-boxes.svg?branch=master)](https://travis-ci.org/folmert/sorti-boxes)
[![Coverage Status](https://coveralls.io/repos/github/folmert/sorti-boxes/badge.svg?branch=master)](https://coveralls.io/github/folmert/sorti-boxes?branch=master)

Creates boxes with selectable and sortable elements. Requires jQuery 1.7+ and Bootstrap 2+.
- possible to define custom params
- data organized by multiple sections, each containing multiple boxes
- elements beside params can use additional options: special, selected and status
- possible to add optional additional heading
- possible to define custom texts (i.e. for showing / hiding available elements)
- possible to define custom column width for element names (in px or %)
- possible to define amount of visible elements (to define when the container should be scrollable)
- possible to define custom callback function after boxes are rendered and elements are moved
- supports both Bootstrap 2 and Bootstrap 3 (TODO)

## Installation

  ```javascript
  npm install sorti-boxes
  ```

## Usage

```javascript
$('#sortiBoxesContainer').sortiBoxes(options)
```

## Options Example

```javascript
var options = {
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
                name: 'Section name',

                boxes: [{
                    id:   1,
                    name: 'Box name', // will be used as header

                    elements: [
                        {
                            id:       1,
                            name:     'Element A',
                            special:  true, // will add red dot
                            selected: true, // makes element visible in selected area
                            status:   true, // TODO: add new class when element.status == true
                            params: {
                                // keys must match names of main params
                                foo: 7,
                                bar: 42
                            }
                        },
                        {
                            id:       2,
                            name:     'Element B',
                            special:  false,
                            selected: true,
                            status:   true,
                            params: {
                                foo: 33,
                                bar: 100
                            }
                        }
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
```

## Tests

  ```
  npm test
  ```
