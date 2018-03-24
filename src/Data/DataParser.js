import _ from 'lodash';

import nivoData from './nivoData';

const DAYS_IN_QUERY = 5;
const HOURS_IN_DAYS = 24;
const EXPECTED_OBS = DAYS_IN_QUERY * HOURS_IN_DAYS;

const generateColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.random() * 100);
  const light = Math.floor(Math.random() * 100);
  return `hsl(${hue},${sat}%,${light}%)`;
};

const convertToNivoData = dataSourceMap =>
  Object.keys(dataSourceMap).map(sourceId => ({
    "id": sourceId,
    "color": generateColor(),
    "data": dataSourceMap[sourceId],
  }));

const cleanData = (data) => {
  const indicesToRemove = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].data.length !== EXPECTED_OBS) {
      indicesToRemove.push(i);
    }
  }
  _.pullAt(data, indicesToRemove);
};

/**
 * Parses the JSON response into NIVO readable format.
 * @param {*} jsonData JSON response of the API call
 * @param {*} dataValue The graph view we want to see (e.g. Voltage, Power, etc)
 */
const parseJsonData = (jsonData) => {
  if (jsonData.success) {
    const data = jsonData.data.results;
    const dataSourceMap = {};
    data.forEach((dataPoint) => {
      let dataArray = dataSourceMap[dataPoint.sourceId];
      if (dataArray) {
        dataArray.push({
          "color": generateColor(),
          "x": `${dataPoint.localDate} ${dataPoint.localTime}`,
          "y": dataPoint.voltage,
        });
      } else {
        dataArray = [{
          "color": generateColor(),
          "x": `${dataPoint.localDate} ${dataPoint.localTime}`,
          "y": dataPoint.voltage,
        }];
        dataSourceMap[dataPoint.sourceId] = dataArray;
      }
    });

    const parsedData = convertToNivoData(dataSourceMap);
    cleanData(parsedData);
    console.log(parsedData);
    return parsedData;
  }
  return false;
};


export default parseJsonData;
