import React from 'react';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';


const DatePicker = props => {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const handleSelect = (ranges) => {
        setState(ranges);
        // date-range is stored in:
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }

        const dataselect = {
            startDate: Date.parse(ranges[0].startDate) / 1000, // convert date to epoch in seconds
            endDate: Date.parse(ranges[0].endDate) / 1000 // convert date to epoch in seconds
        }
        // console.log(`startDate: ${dataselect.startDate}`);
        // console.log(`endDate: ${dataselect.endDate}`);
        props.dateSelect();
        props.setDatarange(dataselect);
    }



    return (
        <div>
            <DateRangePicker
                onChange={item => handleSelect([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                weekStartsOn={1}
                ranges={state}
                direction="horizontal"
                preventSnapRefocus={true}
                calendarFocus="backwards"
                maxDate={addDays(new Date(), 0)} // only select 0 next days 
            />
        </div>
    )
}


export default DatePicker
