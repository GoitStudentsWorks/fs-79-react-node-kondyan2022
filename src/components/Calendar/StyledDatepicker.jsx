import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import {
  CalendarGlobalStyles,
  TitleWrapper,
  BirthdayCalendarWrapper,IconBtn,IconBtnLeft
} from './StyledDatepicker.styled';
import 'react-datepicker/dist/react-datepicker.css';
import sprite from '../../images/sprite.svg';

const StyledDatepicker = ({
  minDate,
  maxDate,
  disabledDates,
  calendarType,
  getData,
  setFormData,
}) => {
  const [selectedDate, setSelectedDate] = useState(setFormData || Date.now());
  // const isBirthdayPicker = true;

  const CustomInput = ({ onClick }) => {
    return calendarType === 'birthday' ? (
      <BirthdayCalendarWrapper>
        <div onClick={onClick}>
          {format(selectedDate, 'dd.MM.yyyy')}
          <svg
            width="24"
            height="24"
            className="react-datepicker__calendar-icon"
          >
            <use href={sprite + '#icon-calendar'} />
          </svg>
        </div>
      </BirthdayCalendarWrapper>
    ) : (
      <TitleWrapper>
        <div onClick={onClick}>
          {format(selectedDate, 'dd/MM/yyyy')}
          <svg
            width="24"
            height="24"
            className="react-datepicker__calendar-icon"
          >
            <use href={sprite + '#icon-calendar'} />
          </svg>
        </div>

        <div className="react-datepicker__navigation-title-day">
          <IconBtnLeft
            onClick={handlePrevDay}
            className="react-datepicker__navigation-title-day--previous"
          >
            <svg width="16" height="16">
              <use href={sprite + '#icon-chevron-left'} />
            </svg>
          </IconBtnLeft>
          <IconBtn
            onClick={handleNextDay}
            className="react-datepicker__navigation-title-day--next"
          >
            <svg width="16" height="16">
              <use href={sprite + '#icon-chevron-right'} />
            </svg>
          </IconBtn>
        </div>
      </TitleWrapper>
    );
  };

  const handlePrevDay = () => {
    const prevDay = subDays(selectedDate, 1);
    if (minDate && prevDay < minDate) {
      return;
    }
  setSelectedDate(prevDay);
  getData(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    if (maxDate && nextDay > maxDate) {
      return ;
    }
    setSelectedDate(nextDay);
    getData(nextDay);
  };


const [minYear, setMinYear] = useState(1950);
const maxYear = new Date().getFullYear(); 


  return (
    <>
      <DatePicker
        selected={setFormData && selectedDate}
        onChange={(date) => { 
          if (minDate && date > minDate) { 
            return;
          }
          if (maxDate && date > maxDate) {
            return;
          }
          setSelectedDate(date)
          getData(date);
        }}
        customInput={<CustomInput />}
        dateFormat={'dd MM yyyy'}
        calendarStartDay={1}
        formatWeekDay={(day) => day.substr(0, 2)}
        excludeDates={disabledDates}
        showYearDropdown={calendarType === 'birthday'}
        scrollableYearDropdown
        yearDropdownItemNumber={maxYear - minYear + 1}
        minDate={new Date(minYear, 0, 1)} 
        maxDate={new Date(maxYear, 11, 31)}
      />
      <CalendarGlobalStyles />
    </>
  );
};

export default StyledDatepicker;
