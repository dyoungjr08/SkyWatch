
document.getElementById('app').innerHTML = `
  <form id="pricingForm">
    <label for="citySize">City Size (sq miles):</label>
    <input type="number" id="citySize" name="citySize" required><br><br>
    
    <label for="responseTime">Desired Response Time (seconds):</label>
    <input type="number" id="responseTime" name="responseTime" required><br><br>

    <label for="monitoring">24/7 Monitoring:</label>
    <input type="checkbox" id="monitoring" name="monitoring"><br><br>

    <button type="submit">Calculate</button>
  </form>
  <div id="result"></div>
`;

document.getElementById('pricingForm').onsubmit = function(event) {
  event.preventDefault();
  const citySize = parseFloat(document.getElementById('citySize').value);
  const responseTime = parseFloat(document.getElementById('responseTime').value);
  const monitoring = document.getElementById('monitoring').checked;

  const droneSpeed = 35.0; // mph (1.458 miles in 150 sec)
  const coveragePerDrone = Math.PI * Math.pow((responseTime * (droneSpeed / 3600)), 2); // in square miles
  const dronesRequired = Math.ceil(citySize / coveragePerDrone);
  const baseCostPerDrone = monitoring ? 3000 : 1500;
  const totalMonthlyCost = dronesRequired * baseCostPerDrone;

  document.getElementById('result').innerHTML = `
    <p>Estimated Drones Required: ${dronesRequired}</p>
    <p>Estimated Monthly Cost: $${totalMonthlyCost.toLocaleString()}</p>
  `;
};
