import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

// Styled wrapper for the calendar
const CalendarWrapper = styled('div')(({ theme }) => ({
  '.MuiDateCalendar-root': {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    backgroundColor: 'transparent',
  },
  // Header styling
  '.MuiPickersCalendarHeader-root': {
    paddingLeft: '24px',
    paddingRight: '24px',
    marginTop: '8px',
  },
  '.MuiPickersCalendarHeader-label': {
    fontSize: '1rem',
    fontWeight: 600,
  },
  // Day styling
  '.MuiDayCalendar-weekDayLabel': {
    color: '#757575',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  '.MuiPickersDay-root': {
    fontSize: '0.875rem',
    margin: '4px',
    color: '#1a1a1a',
    '&:hover': {
      backgroundColor: '#f8f8fa',
    },
    '&.Mui-selected': {
      backgroundColor: '#F4B183 !important',
      color: '#000000',
      '&:hover': {
        backgroundColor: '#F4B183',
        opacity: 0.9,
      },
    },
    '&.MuiPickersDay-today': {
      backgroundColor: '#F4B183',
      color: '#000000',
      '&:not(.Mui-selected)': {
        border: 'none',
      },
    },
  },
  // Progress dots
  '.day-with-progress::after': {
    content: '""',
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    backgroundColor: '#F4B183',
    borderRadius: '50%',
  },
}));

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#F4B183',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

function MyCalendar() {
  const [date, setDate] = React.useState(new Date());

  // Example function to determine which dates have progress
  const shouldShowProgress = (date) => {
    if (!date) return false;
    const progressDates = [1, 5, 10, 15, 20, 25];
    return progressDates.includes(date.getDate());
  };

  // Custom day renderer
  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const hasProgress = !outsideCurrentMonth && shouldShowProgress(day);

    return (
      <PickersDay 
        {...other} 
        day={day} 
        outsideCurrentMonth={outsideCurrentMonth}
        className={hasProgress ? 'day-with-progress' : ''}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarWrapper>
          <DateCalendar
            value={date}
            onChange={(newDate) => setDate(newDate)}
            slots={{
              day: ServerDay
            }}
            sx={{
              width: '100%',
            }}
          />
        </CalendarWrapper>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyCalendar;

