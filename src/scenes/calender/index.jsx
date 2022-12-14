import { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'
import { Input, OutlinedInput } from '@mui/material'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import Header from '../../components/Header'
import { tokens } from '../../theme'

const Calendar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [currentEvents, setCurrentEvents] = useState([])
  const [customPrompt, setCustomPrompt] = useState(false)
  const [text, setText] = useState('')

  let lettitle = ''

  const closeModal = () => {
    setCustomPrompt(false)
  }

  const handleSubmit = () => {
    // setText('')
    setCustomPrompt(false)
    return text
  }

  const handleDateClick = (selected) => {
    setCustomPrompt(true)
    const title = handleSubmit()
    const calendarApi = selected.view.calendar
    calendarApi.unselect()

    calendarApi.addEvent({
      title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    })

    if (customPrompt) {
    }

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    // //   })
    // }
  }

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove()
    }
  }

  return (
    <>
      {customPrompt && (
        <Box
          className='calenderPrompt'
          // sx={{
          //   zIndex: '99',
          //   position: 'absolute',

          //   /* opacity: 100%; */
          //   display: 'grid',
          //   placeItems: 'center',
          //   width: '100vw',
          //   height: '100vh',
          //   background: 'rgba(0, 0, 0, 0.8)',
          // }}
        >
          <div className='promptSection'>
            <h3 className='promptTitle'>Input your task</h3>
            <OutlinedInput
              size='small'
              type='text'
              onChange={(e) => setText(e.target.value)}
              sx={{
                margin: '0',
                marginBottom: '20px',
                padding: '0',
                width: '300px',
              }}
            />

            <Button
              variant='contained'
              className='buttonPrompt'
              sx={{
                background: '#535ac8',
                maxWidth: '100px',
                // alignContent: 'center',
                // textAlign: 'center',
                // justifySelf: 'center',
                '&:hover': {
                  backgroundColor: 'green',
                },
              }}
              onClick={handleSubmit}
            >
              Enter
            </Button>
            <CloseIcon className='closeIconPrompt' onClick={closeModal} />
          </div>
        </Box>
      )}
      <Box m='20px'>
        <Header title='Calendar' subtitle='Full Calendar Interactive Page' />

        <Box display='flex' justifyContent='space-between'>
          {/* CALENDAR SIDEBAR */}
          <Box
            flex='1 1 20%'
            backgroundColor={colors.primary[400]}
            p='15px'
            borderRadius='4px'
          >
            <Typography variant='h5'>Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: '10px 0',
                    borderRadius: '2px',
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex='1 1 100%' ml='15px'>
            <FullCalendar
              height='75vh'
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: '12315',
                  title: 'All-day event',
                  date: '2022-09-14',
                },
                {
                  id: '5123',
                  title: 'Timed event',
                  date: '2022-09-28',
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Calendar
