import _ from 'lodash';
import nivoData from './nivoData';

let START_DATE;
const HOURS_IN_DAYS = 24;
let EXPECTED_OBS;
const HOUR_IN_MS = 60 * 60 * 1000;

const calcNumDays = (startDate, endDate) => {
  START_DATE = new Date(`${startDate}T00:00`);
  const endDateObj = new Date(endDate);
  const timeDiff = Math.abs(endDateObj.getTime() - START_DATE.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  EXPECTED_OBS = diffDays * HOURS_IN_DAYS;
};

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

const getKeyMapWithTime = () => {
  const timeMap = {};
  const startDate = _.cloneDeep(START_DATE);
  for (let i = 0; i < EXPECTED_OBS; i += 1) {
    const dateString = formatDate(startDate);
    timeMap[dateString] = null;
    startDate.setTime(startDate.getTime() + HOUR_IN_MS);
  }
  return timeMap;
};

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
 * @param {*} jsonData JSON response of the API call
 * @param {*} dataValue The graph view we want to see (e.g. Voltage, Power, etc)
 */
const parseJsonData = (jsonData, startDate, endDate, aggregate, dataValue) => {
  calcNumDays(startDate, endDate);
  console.log(jsonData);
  if (jsonData.success) {
    const data = jsonData.data.results;
    const dataSourceMap = {};
    const keyMapWithTimeSkeleton = getKeyMapWithTime();

    data.forEach((observation) => {
      if (dataSourceMap[observation.sourceId] === undefined) {
        dataSourceMap[observation.sourceId] = _.cloneDeep(keyMapWithTimeSkeleton);
      }
      dataSourceMap[observation.sourceId][`${observation.localDate}T${observation.localTime}`] = observation[dataValue];
    });

    // convert to dygraph format
    const parsedData = dygraphParse(dataSourceMap, keyMapWithTimeSkeleton);
    return parsedData;
  }
  return false;
};

export default parseJsonData;
