import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

const ParseDate = (dateString) => {
  const parsedDate = dayjs(dateString, { strict: true });
  return parsedDate.isValid() ? parsedDate.format('dddd, DD-MM-YYYY') : null;
};

export default ParseDate;
