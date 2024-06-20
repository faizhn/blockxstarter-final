import moment from 'moment';
import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createModal: 'scale-0',
  updateModal: 'scale-0',
  deleteModal: 'scale-0',
  backModal: 'scale-0',
  connectedAccount: '',
  projects: [],
  project: null,
  stats: null,
  backers: [],
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

const daysRemaining = (expiresAt) => {
  const now = moment();
  const expiryDate = moment(Number(expiresAt + '000'));

  const timeDifference = expiryDate.diff(now);

  if (timeDifference <= 0) {
    return '0 hari';
  }

  const days = expiryDate.diff(now, 'days');
  return days <= 1 ? `${days + 1} hari` : `${days + 1} hari`;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  daysRemaining,
};
