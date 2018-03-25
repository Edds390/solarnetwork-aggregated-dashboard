import _ from 'lodash';

let START_DATE;
const HOURS_IN_DAYS = 24;
const HOUR_IN_MS = 60 * 60 * 1000;

/**
 * Calculates the number of observations expected between start and end date.
 * @param {*} startDate Start date string of format yyyy-mm-dd
 * @param {*} endDate End date string for format yyyy-mm-dd
 * @param {*} aggregate Aggregation mode of API call
 */
const calcExpectedObs = (startDate, endDate, aggregate) => {
  let expectedObservations = 0;
  START_DATE = new Date(`${startDate}T00:00`);
  const endDateObj = new Date(endDate);
  const timeDiff = Math.abs(endDateObj.getTime() - START_DATE.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (aggregate === 'Hour') {
    expectedObservations = diffDays * HOURS_IN_DAYS;
  } else if (aggregate === 'Day') {
    expectedObservations = diffDays;
  } else {
    throw new Error('Unknown aggregate mode');
  }

  return expectedObservations;
};

/**
 * Formats a Date to yyyy-mm-ddThh:mm
 * @param {*} date Data object to format
 */
const formatDate = (date) => {
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();
  const hh = date.getHours();

  return [date.getFullYear(),
    '-',
    (mm > 9 ? '' : '0') + mm,
    '-',
    (dd > 9 ? '' : '0') + dd,
    'T',
    (hh > 9 ? '' : '0') + hh,
    ':00',
  ].join('');
};

/**
 * Initializes a skeleton JSON object with date (yyyy-mm-ddThh:mm) as keys and
 * null as values. Dygraph will interpolate based off of nulls.
 * @param {*} expectedObservations Expected number of observations from API call
 */
const getKeyMapWithTime = (expectedObservations) => {
  const timeMap = {};
  const startDate = _.cloneDeep(START_DATE);
  for (let i = 0; i < expectedObservations; i += 1) {
    const dateString = formatDate(startDate);
    timeMap[dateString] = null;
    startDate.setTime(startDate.getTime() + HOUR_IN_MS);
  }
  return timeMap;
};

/**
 * Parses the dataSourceMap to a dygraph-readable format (array of arrays).
 * @param {*} dataSourceMap Map (dataSource as key, map of time as value)
 * map of time has time as key and data value as value.
 * @param {*} timeSkeleton skeleton JSON object, used for its keys
 */
const dygraphParse = (dataSourceMap, timeSkeleton) => {
  const timeMap = {};
  Object.keys(timeSkeleton).forEach((time) => {
    timeMap[time] = [new Date(time)];
  });
  Object.keys(dataSourceMap).forEach((dataSource) => {
    Object.keys(timeMap).forEach((time) => {
      timeMap[time].push(dataSourceMap[dataSource][time]);
    });
  });
  const parsedData = Object.keys(timeMap).map(time => timeMap[time]);
  return parsedData;
};

/**
 * Parses the JSON response into Dygraph readable format.
 * The Dygraph format is an ARRAY of ARRAYS.
 * Each x-value (time) is associated with its own array.
 * The array starts with the x-value (time) as the first value
 * followed by the values of the data sources.
 * Each data source has a dedicated index position in the array.
 * @param {*} jsonData JSON response of the API call
 * @param {*} startDate Start date argument in API call
 * @param {*} endDate End date argument in API call
 * @param {*} aggregate aggregate value (Hour or Day)
 * @param {*} dataValue The graph view we want to see (e.g. Voltage, Power, etc)
 */
const parseJsonData = (jsonData, startDate, endDate, aggregate, dataValue) => {
  const expectedObservations = calcExpectedObs(startDate, endDate, aggregate);
  if (jsonData.success) {
    const data = jsonData.data.results;
    const dataSourceMap = {};
    const keyMapWithTimeSkeleton = getKeyMapWithTime(expectedObservations);
    // dataSourceMap maps the dataSource to a JSON object with time as key and an array of
    // values (voltage etc) as value.
    data.forEach((observation) => {
      if (dataSourceMap[observation.sourceId] === undefined) {
        dataSourceMap[observation.sourceId] = _.cloneDeep(keyMapWithTimeSkeleton);
      }
      dataSourceMap[observation.sourceId][`${observation.localDate}T${observation.localTime}`]
        = observation[dataValue];
    });

    const parsedData = dygraphParse(dataSourceMap, keyMapWithTimeSkeleton);
    return parsedData;
  }
  throw new Error('Data not successful');
};

export default parseJsonData;
