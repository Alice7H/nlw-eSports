import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

interface TimePickerProps extends ReactDatePickerProps {}

export default function TimePicker({...rest}: TimePickerProps) {
  return (
    <DatePicker
      {...rest}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={30}
      timeCaption="Time"
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      autoComplete='off'
      popperPlacement='bottom-start'
      className='w-[35vw] md:w-[70px] bg-zinc-900 py-3 px-3 rounded text-small placeholder:text-zinc-500'
  />
  )
}
