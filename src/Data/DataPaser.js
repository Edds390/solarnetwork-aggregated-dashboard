const parseJsonData = (jsonData) => {
  if (jsonData.success) {
    const data = jsonData.data.results;
    const parsedData = data.map(() => {
      {
        color: 
      }
    })
    const nivoInput = {
      id: "SolarNode",
      color: "hsl(202, 70%, 50%)",
      data: parsedData,
    };
    return nivoInput;

  }
}