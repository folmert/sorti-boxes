
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
- possible to define custom callback function after box are rendered and elements are moved
- supports both Bootstrap 2 and Bootstrap 3 (TODO)

## Installation

  `npm install sorti-boxes`

## Usage

`$('#sortiBoxesContainer').sortiBoxes(options)`

## Options Example

```javascript
var options = {
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
                    <th class="row-flluid valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="row-flluid valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="row-flluid valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="row-flluid valInfo">
                            <small class="span6 txt">new</small>
                            <small class="span6 txt">default</small>
                        </th>
                    <th class="row-flluid valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="row-flluid valInfo">
                        <small class="span6 txt">new</small>
                        <small class="span6 txt">default</small>
                    </th>
                    <th class="row-flluid valInfo">
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
```

## Tests

  `npm test`
