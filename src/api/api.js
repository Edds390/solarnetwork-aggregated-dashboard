const HOST = 'https://data.solarnetwork.net';

/**
 * This method returns usage data for a single node (nodeId) between a set time (start and end date).,
 * */
const getNodeUsageData = async (nodeId, startDate, endDate) => {
  const query = `https://data.solarnetwork.net/solarquery/api/v1/pub/datum/list?` +
  `nodeId=${nodeId}&` +
  `startDate=${startDate}T0%3A19&` +
  `endDate=${endDate}T0%3A19&aggregate=Hour`;
  try {
    const results = await fetch(query);
    const json = await results.json();
    return json;
  } catch (err) {
    return err;
  }
};

export default getNodeUsageData;
