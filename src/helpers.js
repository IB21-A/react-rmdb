// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const isPersistedState = (stateName) => {
	// will return the sessionStorage with given name if exists, else return null
	const sessionState = sessionStorage.getItem(stateName);
	// Will return null if negative, else will return what is beyond the &&, parsed
	return sessionState && JSON.parse(sessionState);
};
