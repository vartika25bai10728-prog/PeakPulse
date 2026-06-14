const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");
const mapCanvas = document.getElementById("mapCanvas");
const mapCtx = mapCanvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const zoneSelect = document.getElementById("zoneSelect");
const sensitivityInput = document.getElementById("sensitivity");
const missionState = document.getElementById("missionState");
const zoneTitle = document.getElementById("zoneTitle");
const droneGps = document.getElementById("droneGps");
const gpsSource = document.getElementById("gpsSource");
const gpsBtn = document.getElementById("gpsBtn");
const gpsState = document.getElementById("gpsState");
const gpsAccuracy = document.getElementById("gpsAccuracy");
const gpsUpdated = document.getElementById("gpsUpdated");
const connectionMode = document.getElementById("connectionMode");
const droneEndpoint = document.getElementById("droneEndpoint");
const connectBtn = document.getElementById("connectBtn");
const droneLinkState = document.getElementById("droneLinkState");
const routeBadge = document.getElementById("routeBadge");
const navBadge = document.getElementById("navBadge");
const riskBadge = document.getElementById("riskBadge");
const alertMessage = document.getElementById("alertMessage");
const targetGpsText = document.getElementById("targetGpsText");
const conditionText = document.getElementById("conditionText");
const confidenceText = document.getElementById("confidenceText");
const signalOneStatus = document.getElementById("signalOneStatus");
const signalTwoStatus = document.getElementById("signalTwoStatus");
const sensorText = document.getElementById("sensorText");
const rgbSensor = document.getElementById("rgbSensor");
const thermalSensor = document.getElementById("thermalSensor");
const micSensor = document.getElementById("micSensor");
const gpsAltSensor = document.getElementById("gpsAltSensor");
const envSensor = document.getElementById("envSensor");
const motionSignal = document.getElementById("motionSignal");
const thermalSignal = document.getElementById("thermalSignal");
const obstacleSignal = document.getElementById("obstacleSignal");
const windSignal = document.getElementById("windSignal");
const motionBar = document.getElementById("motionBar");
const thermalBar = document.getElementById("thermalBar");
const obstacleBar = document.getElementById("obstacleBar");
const windBar = document.getElementById("windBar");
const taskText = document.getElementById("taskText");
const avoidanceText = document.getElementById("avoidanceText");
const routeProgress = document.getElementById("routeProgress");
const learningText = document.getElementById("learningText");
const mapLink = document.getElementById("mapLink");
const cameraMode = document.getElementById("cameraMode");
const cameraStatus = document.getElementById("cameraStatus");
const mapLayerButtons = Array.from(document.querySelectorAll(".map-layer-tabs button"));
const ledPattern = document.getElementById("ledPattern");
const announcementMode = document.getElementById("announcementMode");
const deviceToast = document.getElementById("deviceToast");
const mapMode = document.getElementById("mapMode");
const etaText = document.getElementById("etaText");
const routeModeText = document.getElementById("routeModeText");
const mapDronePin = document.getElementById("mapDronePin");
const mapTargetPin = document.getElementById("mapTargetPin");
const navSteps = [
  document.getElementById("navStep1"),
  document.getElementById("navStep2"),
  document.getElementById("navStep3"),
  document.getElementById("navStep4")
];
const learnedRoutes = document.getElementById("learnedRoutes");
const environmentText = document.getElementById("environmentText");
const distressStatus = document.getElementById("distressStatus");
const processedMetric = document.getElementById("processedMetric");
const savedMetric = document.getElementById("savedMetric");
const spikeMetric = document.getElementById("spikeMetric");
const eventLog = document.getElementById("eventLog");
const scanLine = document.getElementById("scanLine");
const beaconLight = document.getElementById("beaconLight");
const audioToggle = document.getElementById("audioToggle");
const lightToggle = document.getElementById("lightToggle");
const rescueToggle = document.getElementById("rescueToggle");

const zones = {
  ridge: {
    title: "Avalanche Ridge",
    droneGps: "30.73520 N, 79.06690 E",
    baseCoords: { lat: 30.7352, lon: 79.0669 },
    targetGps: "30.74210 N, 79.05840 E",
    targetCoords: { lat: 30.7421, lon: 79.0584 },
    targetOffset: { lat: 0.0069, lon: -0.0085 },
    danger: "rock wall, avalanche debris, wind pocket",
    color: "#98a77c"
  },
  pass: {
    title: "Forested Avalanche Corridor",
    droneGps: "30.74330 N, 79.09580 E",
    baseCoords: { lat: 30.7433, lon: 79.0958 },
    targetGps: "30.74990 N, 79.10220 E",
    targetCoords: { lat: 30.7499, lon: 79.1022 },
    targetOffset: { lat: 0.0066, lon: 0.0064 },
    danger: "trees, debris, unstable snow shelf",
    color: "#88976c"
  },
  glacier: {
    title: "Wind-Shear Glacier",
    droneGps: "30.77180 N, 79.12170 E",
    baseCoords: { lat: 30.7718, lon: 79.1217 },
    targetGps: "30.77820 N, 79.11380 E",
    targetCoords: { lat: 30.7782, lon: 79.1138 },
    targetOffset: { lat: 0.0064, lon: -0.0079 },
    danger: "wind shear, ice blocks, avalanche debris",
    color: "#b6c99b"
  }
};

const obstacles = [
  { id: "tree", label: "Tree cluster", x: 0.30, y: 0.63, radius: 0.075, color: "#2f6b56" },
  { id: "rock", label: "Rock face", x: 0.50, y: 0.49, radius: 0.085, color: "#8b6e24" },
  { id: "debris", label: "Avalanche debris", x: 0.60, y: 0.57, radius: 0.07, color: "#728156" },
  { id: "wind", label: "Wind hazard", x: 0.70, y: 0.34, radius: 0.10, color: "#9b3e32" }
];

const survivors = {
  one: { label: "Demo Signal 01", x: 0.72, y: 0.55, status: "Motion detected | stable heat", score: 42 },
  two: { label: "Demo Signal 02", x: 0.82, y: 0.38, status: "No motion | low heat", score: 91 }
};

let scanning = false;
let frame = 0;
let spikes = 0;
let progress = 0;
let trajectory = [];
let decisionMade = false;
let targetReached = false;
let eventFlags = {};
let gpsWatchId = null;
let liveGps = null;
let targetGpsFix = null;
let targetGpsCoords = null;
let droneConnected = false;
let saferRoutesLearned = 0;
let windPressure = 18;

const palette = {
  ink: "#172111",
  dark: "#728156",
  panel: "#88976c",
  mid: "#98a77c",
  soft: "#cfe1b9",
  light: "#e7f5dc",
  muted: "#4c5a3d",
  route: "#2f6b56",
  alert: "#9b3e32"
};

function formatGps(latitude, longitude) {
  const latDir = latitude >= 0 ? "N" : "S";
  const lonDir = longitude >= 0 ? "E" : "W";
  return `${Math.abs(latitude).toFixed(5)} ${latDir}, ${Math.abs(longitude).toFixed(5)} ${lonDir}`;
}

function getTargetGpsFix() {
  const zone = zones[zoneSelect.value];
  if (!liveGps) {
    return {
      text: zone.targetGps,
      lat: zone.targetCoords.lat,
      lon: zone.targetCoords.lon
    };
  }

  const lat = liveGps.latitude + zone.targetOffset.lat;
  const lon = liveGps.longitude + zone.targetOffset.lon;
  return { text: formatGps(lat, lon), lat, lon };
}

function getDroneGpsFix() {
  const zone = zones[zoneSelect.value];
  const base = liveGps || zone.baseCoords;
  const route = getRoutePoint(progress);
  const latDrift = (route.y - 0.74) * -0.005;
  const lonDrift = (route.x - 0.10) * 0.006;
  return {
    lat: base.latitude ? base.latitude + latDrift : base.lat + latDrift,
    lon: base.longitude ? base.longitude + lonDrift : base.lon + lonDrift
  };
}

function updateGpsDisplay() {
  const zone = zones[zoneSelect.value];
  if (!liveGps && !scanning) {
    droneGps.textContent = zone.droneGps;
    gpsSource.textContent = "simulated feed";
    return;
  }

  const fix = getDroneGpsFix();
  droneGps.textContent = formatGps(fix.lat, fix.lon);
  gpsSource.textContent = liveGps ? "live GPS feed" : "simulated route feed";

  if (liveGps) {
    gpsAccuracy.textContent = `+/- ${Math.round(liveGps.accuracy)} m`;
    gpsUpdated.textContent = new Date(liveGps.timestamp).toLocaleTimeString();
  }

  if (decisionMade && targetGpsFix) {
    targetGpsText.textContent = `Demo priority signal | ${targetGpsFix}`;
  }
}

function updateMapLink(coords) {
  mapLink.href = `https://www.google.com/maps?q=${coords.lat.toFixed(6)},${coords.lon.toFixed(6)}`;
  mapLink.classList.add("active");
}

function setGpsState(text, stateClass) {
  gpsState.textContent = text;
  gpsState.className = `state-pill ${stateClass}`;
}

function setSignalLevel(label, bar, value) {
  const bounded = Math.max(0, Math.min(100, Math.round(value)));
  label.textContent = `${bounded}%`;
  bar.style.setProperty("--level", `${bounded}%`);
}

function updateSpikeSignals(activeObstacle) {
  const sensitivity = Number(sensitivityInput.value);
  const motion = scanning ? 44 + sensitivity * 0.38 + Math.sin(frame / 10) * 8 : 82;
  const thermal = decisionMade ? 94 : scanning && progress > 0.50 ? 78 : 91;
  const obstacle = activeObstacle ? 92 : scanning ? 50 + Math.sin(frame / 12) * 10 : 76;
  const wind = activeObstacle?.id === "wind" ? 96 : scanning && progress > 0.58 ? 66 : 64;

  setSignalLevel(motionSignal, motionBar, motion);
  setSignalLevel(thermalSignal, thermalBar, thermal);
  setSignalLevel(obstacleSignal, obstacleBar, obstacle);
  setSignalLevel(windSignal, windBar, wind);
}

function connectDrone() {
  droneConnected = true;
  const modeLabel = connectionMode.options[connectionMode.selectedIndex].text;
  droneLinkState.textContent = "Demo Mode";
  droneLinkState.className = "state-pill live";
  connectBtn.textContent = "Simulator Active";
  rgbSensor.textContent = "Demo feed";
  thermalSensor.textContent = "No device";
  micSensor.textContent = "Demo audio";
  gpsAltSensor.textContent = "Simulated";
  envSensor.textContent = `Wind ${windPressure} km/h`;
  addEvent(`Demo simulator ready through ${modeLabel}; endpoint ${droneEndpoint.value} is not connected to real hardware`);
}

function updateCameraStatus() {
  const labels = {
    rgb: "DEMO RGB FEED",
    thermal: "THERMAL UNAVAILABLE",
    fusion: "FUSION UNAVAILABLE"
  };
  cameraStatus.textContent = labels[cameraMode.value];
}

function showDeviceUnavailable(feature) {
  deviceToast.textContent = `${feature} not available: no device connected. Demo mode is using simulated RGB/navigation data.`;
  deviceToast.classList.add("active");
  clearTimeout(showDeviceUnavailable.timer);
  showDeviceUnavailable.timer = setTimeout(() => {
    deviceToast.classList.remove("active");
  }, 2600);
}

function updateEnvironmentalState(activeObstacle) {
  windPressure = Math.round(18 + Math.sin(frame / 32) * 7 + (activeObstacle?.id === "wind" ? 18 : 0));
  const altitude = Math.round(128 + progress * 46 + Math.sin(frame / 18) * 7);
  const air = windPressure > 30 ? "Wind shift" : progress > 0.52 ? "Snow drift" : "Stable";
  envSensor.textContent = `Wind ${windPressure} km/h`;
  gpsAltSensor.textContent = `${altitude} m AGL`;
  environmentText.textContent = `${air} | ${windPressure} km/h`;
  etaText.textContent = scanning ? `ETA ${Math.max(1, Math.round((1 - progress) * 7))} min` : "ETA --";
}

function updateNavigationSystem(activeObstacle) {
  const point = getRoutePoint(progress);
  mapDronePin.style.left = `${point.x * 100}%`;
  mapDronePin.style.top = `${point.y * 100}%`;
  mapTargetPin.style.left = `${survivors.two.x * 100}%`;
  mapTargetPin.style.top = `${survivors.two.y * 100}%`;

  const activeStep = progress < 0.22 ? 0 : progress < 0.54 ? 1 : progress < 0.82 ? 2 : 3;
  navSteps.forEach((step, index) => {
    step.classList.toggle("active", index === activeStep);
    step.classList.toggle("done", index < activeStep);
  });

  if (activeObstacle) {
    routeModeText.textContent = `Avoid ${activeObstacle.label}`;
  } else if (decisionMade) {
    routeModeText.textContent = "Guide rescue team";
  } else if (scanning) {
    routeModeText.textContent = "Safest path";
  } else {
    routeModeText.textContent = "Standby";
  }
}

function startLiveGps() {
  if (!navigator.geolocation) {
    setGpsState("Unavailable", "alert");
    addEvent("GPS unavailable: browser does not expose a geolocation sensor", true);
    return;
  }

  gpsBtn.disabled = true;
  gpsBtn.textContent = "Acquiring GPS";
  setGpsState("Acquiring", "scan");

  gpsWatchId = navigator.geolocation.watchPosition(
    position => {
      liveGps = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };
      gpsBtn.textContent = "Live GPS Active";
      setGpsState("Live", "live");
      updateGpsDisplay();
      addEvent(`Live GPS fix: ${formatGps(liveGps.latitude, liveGps.longitude)}`);
    },
    error => {
      gpsBtn.disabled = false;
      gpsBtn.textContent = "Use Live GPS";
      setGpsState("Simulated", "idle");
      addEvent(`GPS fallback active: ${error.message}`, true);
      updateGpsDisplay();
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 12000
    }
  );
}

function getRoutePoint(t) {
  const x = 0.10 + t * 0.78;
  let y = 0.74 - t * 0.38 + Math.sin(t * Math.PI * 2.6) * 0.045;

  const rockAvoid = Math.exp(-Math.pow((t - 0.45) / 0.08, 2)) * 0.15;
  const debrisAvoid = Math.exp(-Math.pow((t - 0.56) / 0.06, 2)) * 0.09;
  const windAvoid = Math.exp(-Math.pow((t - 0.68) / 0.07, 2)) * -0.13;
  const treeAvoid = Math.exp(-Math.pow((t - 0.27) / 0.06, 2)) * 0.10;
  y += treeAvoid + rockAvoid + debrisAvoid + windAvoid;

  return { x, y };
}

function getActiveObstacle() {
  if (progress > 0.23 && progress < 0.34) return obstacles[0];
  if (progress > 0.40 && progress < 0.53) return obstacles[1];
  if (progress > 0.54 && progress < 0.62) return obstacles[2];
  if (progress > 0.64 && progress < 0.74) return obstacles[3];
  return null;
}

function drawMountainScene() {
  const zone = zones[zoneSelect.value];
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, cameraMode.value === "thermal" ? "#4c5a3d" : "#728156");
  gradient.addColorStop(0.42, cameraMode.value === "thermal" ? "#88976c" : "#98a77c");
  gradient.addColorStop(1, cameraMode.value === "thermal" ? "#c18b61" : "#e7f5dc");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMountain(0, 190, 220, 60, "#88976c");
  drawMountain(130, 160, 380, 70, "#728156");
  drawMountain(420, 190, 260, 80, "#98a77c");
  drawMountain(610, 145, 420, 90, "#728156");

  ctx.fillStyle = cameraMode.value === "thermal" ? "#e7b06c" : "#e7f5dc";
  ctx.beginPath();
  ctx.moveTo(0, 295);
  ctx.bezierCurveTo(230, 255, 390, 330, 620, 285);
  ctx.bezierCurveTo(770, 255, 855, 315, 960, 292);
  ctx.lineTo(960, 540);
  ctx.lineTo(0, 540);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(47, 107, 86, 0.22)";
  ctx.lineWidth = 2;
  for (let i = -40; i < 960; i += 70) {
    ctx.beginPath();
    ctx.moveTo(i, 430);
    ctx.quadraticCurveTo(i + 95, 388, i + 220, 440);
    ctx.stroke();
  }

  drawDroneHud(zone);
  drawSceneObstacles();
  drawSceneSurvivors();

  if (scanning) {
    drawEventCells();
    drawDroneOnScene();
  }

  if (cameraMode.value !== "rgb") {
    drawThermalOverlay();
  }
}

function drawMountain(x, baseY, width, snowY, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, baseY + 120);
  ctx.lineTo(x + width * 0.48, baseY - 120);
  ctx.lineTo(x + width, baseY + 120);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#e7f5dc";
  ctx.beginPath();
  ctx.moveTo(x + width * 0.48, baseY - 120);
  ctx.lineTo(x + width * 0.39, baseY - snowY);
  ctx.lineTo(x + width * 0.55, baseY - snowY * 0.82);
  ctx.closePath();
  ctx.fill();
}

function drawDroneHud(zone) {
  ctx.strokeStyle = "rgba(47, 107, 86, 0.48)";
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, 904, 484);
  ctx.fillStyle = "rgba(231, 245, 220, 0.74)";
  ctx.fillRect(42, 42, 330, 68);
  ctx.fillStyle = palette.route;
  ctx.font = "700 15px Segoe UI";
  ctx.fillText(`${cameraStatus.textContent} | DEMO`, 58, 68);
  ctx.fillStyle = palette.ink;
  ctx.font = "13px Segoe UI";
  ctx.fillText(zone.title, 58, 90);
  ctx.fillStyle = palette.muted;
  ctx.fillText(zone.danger, 58, 106);
}

function drawSceneObstacles() {
  const points = [
    { label: "TREES", x: 290, y: 375, color: "#2f6b56" },
    { label: "ROCK", x: 475, y: 320, color: "#8b6e24" },
    { label: "DEBRIS", x: 575, y: 350, color: "#728156" },
    { label: "WIND", x: 675, y: 245, color: "#9b3e32" }
  ];

  points.forEach(point => {
    ctx.fillStyle = `${point.color}33`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = point.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = point.color;
    ctx.font = "800 12px Segoe UI";
    ctx.fillText(point.label, point.x - 20, point.y - 50);
  });
}

function drawSceneSurvivors() {
  drawSurvivorMarker("S1", 660, 335, "#2f6b56", "Stable");
  drawSurvivorMarker("S2", 780, 260, "#9b3e32", "Priority");
}

function drawThermalOverlay() {
  ctx.save();
  ctx.globalAlpha = cameraMode.value === "fusion" ? 0.34 : 0.58;
  [
    { x: 660, y: 335, r: 34, color: "#f2d27a" },
    { x: 780, y: 260, r: 40, color: "#9b3e32" },
    { x: 675, y: 245, r: 58, color: "#e7b06c" }
  ].forEach(heat => {
    const glow = ctx.createRadialGradient(heat.x, heat.y, 4, heat.x, heat.y, heat.r);
    glow.addColorStop(0, heat.color);
    glow.addColorStop(1, "rgba(155, 62, 50, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(heat.x, heat.y, heat.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawSurvivorMarker(label, x, y, color, status) {
  ctx.fillStyle = `${color}33`;
  ctx.beginPath();
  ctx.arc(x, y, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = "800 14px Segoe UI";
  ctx.fillText(label, x - 10, y + 5);
  ctx.font = "700 11px Segoe UI";
  ctx.fillText(status.toUpperCase(), x - 22, y - 42);
}

function drawEventCells() {
  const sensitivity = Number(sensitivityInput.value);
  const activeCells = Math.round(12 + sensitivity / 4 + Math.sin(frame / 9) * 4);
  ctx.save();
  ctx.globalAlpha = 0.72;
  for (let i = 0; i < activeCells; i += 1) {
    const x = 80 + ((frame * 12 + i * 87) % 780);
    const y = 235 + ((Math.sin(frame / 13 + i) + 1) * 115);
    const size = 7 + ((i + frame) % 17);
    ctx.strokeStyle = i % 4 === 0 ? "rgba(255, 95, 109, 0.74)" : "rgba(40, 215, 239, 0.55)";
    ctx.strokeRect(x, y, size, size);
  }
  ctx.restore();
}

function drawDroneOnScene() {
  const route = getRoutePoint(progress);
  const x = route.x * canvas.width;
  const y = route.y * canvas.height;
  const activeObstacle = getActiveObstacle();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.25);
  ctx.fillStyle = "#28d7ef";
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-14, -10);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-14, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  if (activeObstacle) {
    ctx.strokeStyle = activeObstacle.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 38, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = activeObstacle.color;
    ctx.font = "800 12px Segoe UI";
    ctx.fillText("REFLEX AVOIDANCE", x - 52, y - 46);
  }
}

function drawRouteMap() {
  mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  mapCtx.fillStyle = "#cfe1b9";
  mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

  mapCtx.strokeStyle = "rgba(23, 33, 17, 0.12)";
  mapCtx.lineWidth = 1;
  for (let x = 60; x < mapCanvas.width; x += 90) {
    mapCtx.beginPath();
    mapCtx.moveTo(x, 0);
    mapCtx.lineTo(x, mapCanvas.height);
    mapCtx.stroke();
  }
  for (let y = 45; y < mapCanvas.height; y += 60) {
    mapCtx.beginPath();
    mapCtx.moveTo(0, y);
    mapCtx.lineTo(mapCanvas.width, y);
    mapCtx.stroke();
  }

  drawMapRoads();
  drawMapLabels();

  drawFullRoute();
  drawMapObstacles();
  drawMapSurvivors();
  drawTrajectory();
  drawMapDrone();
}

function drawMapRoads() {
  const roads = [
    [[30, 290], [210, 246], [360, 280], [520, 220], [725, 230], [930, 160]],
    [[120, 80], [250, 132], [420, 120], [610, 168], [820, 94]]
  ];
  roads.forEach((road, index) => {
    mapCtx.strokeStyle = index === 0 ? "rgba(231, 245, 220, 0.9)" : "rgba(231, 245, 220, 0.5)";
    mapCtx.lineWidth = index === 0 ? 12 : 7;
    mapCtx.lineCap = "round";
    mapCtx.lineJoin = "round";
    mapCtx.beginPath();
    road.forEach(([x, y], pointIndex) => {
      if (pointIndex === 0) mapCtx.moveTo(x, y);
      else mapCtx.lineTo(x, y);
    });
    mapCtx.stroke();
  });
}

function drawMapLabels() {
  const y = mapCanvas.height - 92;
  mapCtx.fillStyle = "rgba(231, 245, 220, 0.78)";
  mapCtx.fillRect(18, y, 238, 72);
  mapCtx.strokeStyle = "rgba(23, 33, 17, 0.16)";
  mapCtx.strokeRect(18, y, 238, 72);
  mapCtx.fillStyle = palette.route;
  mapCtx.font = "800 15px Segoe UI";
  mapCtx.fillText("PeakPulse Navigation", 34, y + 28);
  mapCtx.fillStyle = palette.muted;
  mapCtx.font = "12px Segoe UI";
  mapCtx.fillText("GPS route | learned safe path | hazards", 34, y + 50);
}

function mapPoint(point) {
  return {
    x: point.x * mapCanvas.width,
    y: point.y * mapCanvas.height
  };
}

function drawFullRoute() {
  mapCtx.strokeStyle = "rgba(47, 107, 86, 0.28)";
  mapCtx.lineWidth = 4;
  mapCtx.beginPath();
  for (let i = 0; i <= 100; i += 1) {
    const point = mapPoint(getRoutePoint(i / 100));
    if (i === 0) mapCtx.moveTo(point.x, point.y);
    else mapCtx.lineTo(point.x, point.y);
  }
  mapCtx.stroke();
}

function drawMapObstacles() {
  obstacles.forEach(obstacle => {
    const point = mapPoint(obstacle);
    mapCtx.fillStyle = `${obstacle.color}30`;
    mapCtx.beginPath();
    mapCtx.arc(point.x, point.y, obstacle.radius * mapCanvas.width, 0, Math.PI * 2);
    mapCtx.fill();
    mapCtx.strokeStyle = obstacle.color;
    mapCtx.lineWidth = 2;
    mapCtx.stroke();
    mapCtx.fillStyle = obstacle.color;
    mapCtx.font = "700 13px Segoe UI";
    mapCtx.fillText(obstacle.label, point.x - 34, point.y - 34);
  });
}

function drawMapSurvivors() {
  Object.values(survivors).forEach(survivor => {
    const point = mapPoint(survivor);
    const isPriority = survivor.label === "Demo Signal 02";
    mapCtx.fillStyle = isPriority ? palette.alert : palette.route;
    mapCtx.beginPath();
    mapCtx.arc(point.x, point.y, isPriority ? 11 : 8, 0, Math.PI * 2);
    mapCtx.fill();
    mapCtx.fillStyle = palette.ink;
    mapCtx.font = "800 13px Segoe UI";
    mapCtx.fillText(survivor.label, point.x + 14, point.y + 4);
  });
}

function drawTrajectory() {
  if (trajectory.length < 2) return;
  mapCtx.strokeStyle = palette.route;
  mapCtx.lineWidth = 6;
  mapCtx.beginPath();
  trajectory.forEach((point, index) => {
    const mapped = mapPoint(point);
    if (index === 0) mapCtx.moveTo(mapped.x, mapped.y);
    else mapCtx.lineTo(mapped.x, mapped.y);
  });
  mapCtx.stroke();
}

function drawMapDrone() {
  const point = mapPoint(getRoutePoint(progress));
  mapCtx.fillStyle = palette.light;
  mapCtx.beginPath();
  mapCtx.arc(point.x, point.y, 8, 0, Math.PI * 2);
  mapCtx.fill();
  mapCtx.strokeStyle = palette.route;
  mapCtx.lineWidth = 3;
  mapCtx.stroke();
}

function tick() {
  frame += 1;

  if (scanning) {
    progress = Math.min(1, progress + 0.0035);
    if (frame % 3 === 0) trajectory.push(getRoutePoint(progress));
    spikes += Math.round(3 + Number(sensitivityInput.value) / 20);
    updateMissionState();
    maybeLogNavigationEvent();
  }

  drawMountainScene();
  drawRouteMap();
  updateGpsDisplay();
  requestAnimationFrame(tick);
}

function updateMissionState() {
  const activeObstacle = getActiveObstacle();
  const processed = Math.min(24, 5 + Number(sensitivityInput.value) / 10 + (activeObstacle ? 5 : 0));
  const saved = Math.max(0, 100 - processed);

  processedMetric.textContent = `${processed.toFixed(1)}%`;
  savedMetric.textContent = `${saved.toFixed(1)}%`;
  spikeMetric.textContent = String(spikes);
  routeProgress.textContent = `${Math.round(progress * 100)}%`;
  taskText.textContent = progress < 0.55 ? "Learning safer route" : "Prioritize and guide rescue";
  avoidanceText.textContent = activeObstacle ? `Avoiding ${activeObstacle.label}` : "Clear corridor";
  sensorText.textContent = activeObstacle ? `${activeObstacle.label} requires reroute` : "RGB, thermal, mic, GPS, altitude, environment";
  learningText.textContent = activeObstacle ? "Updating safer-route memory" : "Following learned safe corridor";
  if (activeObstacle && !eventFlags[`learned-${activeObstacle.id}`]) {
    eventFlags[`learned-${activeObstacle.id}`] = true;
    saferRoutesLearned += 1;
    learnedRoutes.textContent = String(saferRoutesLearned);
  }
  updateEnvironmentalState(activeObstacle);
  updateSpikeSignals(activeObstacle);
  updateNavigationSystem(activeObstacle);

  if (activeObstacle) {
    navBadge.textContent = "Avoiding";
    navBadge.className = "state-pill alert";
  } else {
    navBadge.textContent = "Navigating";
    navBadge.className = "state-pill scan";
  }

  if (progress > 0.58 && !decisionMade) {
    makePriorityDecision();
  }

  if (progress >= 0.94 && !targetReached) {
    targetReached = true;
    missionState.textContent = "Target Reached";
    missionState.className = "state-pill live";
    routeBadge.textContent = "Target Reached";
    routeBadge.className = "state-pill live";
    addEvent("Target reached: drone holds position and guides rescue team", true);
  }
}

function maybeLogNavigationEvent() {
  if (progress > 0.20 && !eventFlags.motion) {
    eventFlags.motion = true;
    addEvent("Event-driven vision: movement and terrain-change spikes detected");
  }
  if (progress > 0.26 && !eventFlags.tree) {
    eventFlags.tree = true;
    addEvent("Obstacle spike: tree cluster detected, reflex route shift applied", true);
  }
  if (progress > 0.45 && !eventFlags.rock) {
    eventFlags.rock = true;
    addEvent("Obstacle spike: rock face detected, altitude and heading adjusted", true);
  }
  if (progress > 0.56 && !eventFlags.debris) {
    eventFlags.debris = true;
    addEvent("Obstacle spike: avalanche debris detected, reflex path correction applied", true);
  }
  if (progress > 0.61 && !eventFlags.environment) {
    eventFlags.environment = true;
    addEvent("Environmental update: wind and snow drift changed, navigation path recalculated", true);
  }
  if (progress > 0.68 && !eventFlags.wind) {
    eventFlags.wind = true;
    addEvent("Wind hazard spike: path bends away from unstable region", true);
  }
}

function makePriorityDecision() {
  const gpsFix = getTargetGpsFix();
  targetGpsFix = gpsFix.text;
  targetGpsCoords = { lat: gpsFix.lat, lon: gpsFix.lon };
  decisionMade = true;

  riskBadge.textContent = "Priority Signal";
  riskBadge.className = "state-pill alert";
  missionState.textContent = "Priority Set";
  missionState.className = "state-pill alert";
  routeBadge.textContent = "Tracking Target";
  routeBadge.className = "state-pill scan";
  alertMessage.className = "alert-message danger";
  targetGpsText.textContent = `Demo Signal 02 | ${targetGpsFix}`;
  conditionText.textContent = "Route to the signal with no motion and low body heat first";
  confidenceText.textContent = `${survivors.two.score}%`;
  signalOneStatus.textContent = `${survivors.one.status} | ${survivors.one.score}% urgency`;
  signalTwoStatus.textContent = `${survivors.two.status} | ${survivors.two.score}% urgency`;

  const actions = [];
  if (rescueToggle.checked) actions.push("GPS trajectory and target sent to rescue team");
  if (audioToggle.checked) actions.push(`${announcementMode.value} audio announcement armed`);
  if (lightToggle.checked) actions.push(`${ledPattern.value} LED signal active`);

  alertMessage.textContent = `Demo decision: Demo Signal 02 is treated as the highest-risk survivor signature. ${actions.join(", ")}. Drone continues adaptive navigation to the target.`;
  distressStatus.textContent = rescueToggle.checked ? "Sent to rescue team" : "Local beacon only";
  if (lightToggle.checked) beaconLight.classList.add("active");
  updateMapLink(targetGpsCoords);
  addEvent(`DECISION: Demo Signal 02 prioritized at ${targetGpsFix}`, true);
  if (rescueToggle.checked) {
    addEvent(`DISTRESS CALL SENT: target GPS, live route, camera feed, and hazard summary shared with rescue team`, true);
  }
  playBeacon();
}

function playBeacon() {
  if (!audioToggle.checked || !window.AudioContext) return;
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

function addEvent(text, isAlert = false) {
  const li = document.createElement("li");
  if (isAlert) li.classList.add("alert");
  const now = new Date();
  li.innerHTML = `<span>${text}</span><span class="event-time">${now.toLocaleTimeString()}</span>`;
  eventLog.appendChild(li);
}

function startMission() {
  if (scanning) return;
  scanning = true;
  startBtn.textContent = "Mission Active";
  missionState.textContent = "Navigating";
  missionState.className = "state-pill scan";
  routeBadge.textContent = "Tracking Route";
  routeBadge.className = "state-pill scan";
  riskBadge.textContent = "Evaluating";
  riskBadge.className = "state-pill scan";
  navBadge.textContent = "Navigating";
  navBadge.className = "state-pill scan";
  scanLine.classList.add("active");
  sensorText.textContent = "RGB, thermal, mic, GPS, altitude, environment";
  taskText.textContent = "Learning safer route";
  avoidanceText.textContent = "Clear corridor";
  learningText.textContent = "Building safer-route memory";
  mapMode.textContent = "Terrain + GPS route + hazards";
  if (!droneConnected) connectDrone();
  alertMessage.textContent = "Demo mode active: simulated drone feed, route learning, sensor fusion, obstacle avoidance, accessibility signals, and rescue dispatch are running.";
  addEvent("Demo mission started: drone senses environment and begins adaptive navigation");
}

function resetMission() {
  scanning = false;
  frame = 0;
  spikes = 0;
  progress = 0;
  trajectory = [];
  decisionMade = false;
  targetReached = false;
  eventFlags = {};
  targetGpsFix = null;
  targetGpsCoords = null;

  startBtn.textContent = "Start Mission";
  missionState.textContent = "Standby";
  missionState.className = "state-pill idle";
  routeBadge.textContent = "Awaiting Route";
  routeBadge.className = "state-pill idle";
  riskBadge.textContent = "No Target";
  riskBadge.className = "state-pill idle";
  navBadge.textContent = "Idle";
  navBadge.className = "state-pill idle";
  alertMessage.textContent = "Start the mission to let PeakPulse navigate, avoid obstacles, and prioritize targets.";
  alertMessage.className = "alert-message";
  targetGpsText.textContent = "--";
  conditionText.textContent = "--";
  confidenceText.textContent = "--";
  signalOneStatus.textContent = "Motion detected | stable heat";
  signalTwoStatus.textContent = "No motion | low heat";
  sensorText.textContent = "RGB, thermal, mic, GPS, altitude, environment";
  taskText.textContent = "--";
  avoidanceText.textContent = "--";
  routeProgress.textContent = "0%";
  learningText.textContent = "Safer-route memory ready";
  etaText.textContent = "ETA --";
  environmentText.textContent = "Stable";
  distressStatus.textContent = "Ready";
  saferRoutesLearned = 0;
  learnedRoutes.textContent = "0";
  mapLink.href = "#";
  mapLink.classList.remove("active");
  processedMetric.textContent = "0%";
  savedMetric.textContent = "0%";
  spikeMetric.textContent = "0";
  scanLine.classList.remove("active");
  beaconLight.classList.remove("active");
  eventLog.innerHTML = "";
  updateSpikeSignals(null);
  updateNavigationSystem(null);
  updateGpsDisplay();
  drawMountainScene();
  drawRouteMap();
}

function updateZone() {
  const zone = zones[zoneSelect.value];
  zoneTitle.textContent = zone.title;
  resetMission();
}

startBtn.addEventListener("click", startMission);
resetBtn.addEventListener("click", resetMission);
zoneSelect.addEventListener("change", updateZone);
gpsBtn.addEventListener("click", startLiveGps);
connectBtn.addEventListener("click", connectDrone);
cameraMode.addEventListener("change", () => {
  if (cameraMode.value !== "rgb") {
    showDeviceUnavailable(cameraMode.value === "thermal" ? "Thermal camera" : "RGB + thermal fusion");
    cameraMode.value = "rgb";
  }
  updateCameraStatus();
  drawMountainScene();
});
mapLayerButtons.forEach(button => {
  button.addEventListener("click", () => {
    const layer = button.dataset.layer;
    if (layer === "thermal" || layer === "hazards") {
      showDeviceUnavailable(layer === "thermal" ? "Thermal map layer" : "Hazard sensor layer");
      return;
    }
    mapLayerButtons.forEach(item => item.classList.toggle("active", item === button));
  });
});

updateGpsDisplay();
updateCameraStatus();
updateEnvironmentalState(null);
updateSpikeSignals(null);
updateNavigationSystem(null);
drawMountainScene();
drawRouteMap();
tick();
