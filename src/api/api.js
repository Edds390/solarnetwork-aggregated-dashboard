const HOST = 'https://data.solarnetwork.net';

// This method returns usage data for a single node between a set time
const getAllUsageData = (nodeId, startDate, endDate) => {
  const query = `https://data.solarnetwork.net/solarquery/api/v1/pub/datum/list?nodeId=${nodeId}&startDate=${startDate}T0%3A19&endDate=${endDate}T0%3A19&aggregate=Hour`;
  fetch(query)
    .then(results => results.json())
    .then((json) => {
      return json;
    });
};

export default getAllUsageData;
