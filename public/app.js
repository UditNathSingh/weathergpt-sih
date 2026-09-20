let indiaLocations = {};
let activeHotspots = [];
let leafletMap = null;
let currentSelection = "";

// 1. Initialize Map with absolute explicit fixing
function initMap() {
  leafletMap = L.map("disasterMap", { attributionControl: false, zoomControl: false }).setView([22.0, 79.0], 4.5);
  
  // High-reliability OpenStreetMap base, inverted via CSS for perfect Dark Mode
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(leafletMap);
  
  // Force map to recalculate dimensions (Fixes blank map issue in flex/grid containers)
  setTimeout(() => {
    leafletMap.invalidateSize();
    document.getElementById("mapLoader").style.display = "none";
  }, 500);
}

// 2. Load all States & Districts + Active Disasters
async function loadData() {
  // Fetch Location Dict
  const locRes = await fetch("/api/locations");
  const locData = await locRes.json();
  indiaLocations = locData.states;

  // Fetch Hotspots
  const hotRes = await fetch("/api/disasters");
  const hotData = await hotRes.json();
  activeHotspots = hotData.hotspots;

  populateSelectors();
  plotHotspots();
}

// 3. Populate Dropdowns dynamically
function populateSelectors() {
  const stateSelect = document.getElementById("stateSelect");
  const citySelect = document.getElementById("citySelect");

  const states = Object.keys(indiaLocations).sort();
  stateSelect.innerHTML = states.map(s => "<option value=\"" + s + "\">" + s + "</option>").join("");

  const updateCities = (stateName) => {
    const cities = indiaLocations[stateName].sort();
    citySelect.innerHTML = cities.map(c => "<option value=\"" + c + "\">" + c + "</option>").join("");
    currentSelection = cities[0] + ", " + stateName;
  };

  updateCities(states[0]); // Init

  stateSelect.addEventListener("change", (e) => updateCities(e.target.value));
  citySelect.addEventListener("change", (e) => {
    currentSelection = e.target.value + ", " + stateSelect.value;
  });
}

// 4. Plot Active Disasters on Map & Side Panel
function plotHotspots() {
  const riskList = document.getElementById("riskList");
  
  riskList.innerHTML = activeHotspots.filter(h => h.severity !== "normal").map(h => {
    const badgeBg = h.severity === "high" ? "bg-rose-500/20 text-rose-400 border-rose-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "<div onclick=\"focusHotspot('" + h.id + "')\" class=\"cursor-pointer p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-cyan-500/30 transition flex justify-between items-center\">" +
      "<div>" +
        "<p class=\"text-sm font-bold text-white\">" + h.city + "</p>" +
        "<p class=\"text-[10px] text-slate-400\">" + h.state + "</p>" +
      "</div>" +
      "<span class=\"text-[10px] px-2 py-1 rounded-md border " + badgeBg + "\">" + h.type + "</span>" +
    "</div>";
  }).join("");

  activeHotspots.forEach(h => {
    if (h.severity === "normal") return;
    const col = h.severity === "high" ? "#f43f5e" : "#f59e0b";
    const icon = L.divIcon({
      className: "custom-div-icon",
      html: "<div class=\"radar-marker\"><div class=\"pulse\" style=\"background:" + col + "\"></div><div class=\"core\" style=\"background:" + col + "\"></div></div>",
      iconSize: [24, 24], iconAnchor: [12, 12]
    });
    L.marker([h.lat, h.lng], { icon }).addTo(leafletMap).bindPopup("<b class=\"text-cyan-400\">" + h.city + "</b><br/>" + h.type + " (" + h.riskLevel + ")");
  });
}

function focusHotspot(id) {
  const h = activeHotspots.find(x => x.id === id);
  if(h) {
    leafletMap.flyTo([h.lat, h.lng], 7, { duration: 1.5 });
    document.getElementById("userInput").value = "What is the status in " + h.city + "?";
  }
}

// 5. Chat Interface (Text + Voice)
document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("userInput");
  const q = input.value.trim();
  if (!q && !currentSelection) return;
  
  const searchStr = q || "Give me the weather safety report for " + currentSelection;
  const box = document.getElementById("chatMessages");
  
  box.innerHTML += "<div class=\"flex justify-end\"><div class=\"p-3 rounded-2xl rounded-tr-none bg-gradient-to-r from-cyan-600 to-blue-600 text-white max-w-[85%] shadow-md\">" + searchStr + "</div></div>";
  input.value = "";
  box.scrollTop = box.scrollHeight;

  const res = await fetch("/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: searchStr, location: currentSelection })
  });
  const data = await res.json();
  
  box.innerHTML += "<div class=\"flex items-start gap-3\"><div class=\"bg-slate-800/80 border border-white/5 rounded-2xl rounded-tl-none p-4 text-slate-200 max-w-[90%] shadow-lg\">" + data.reply.replace(/\n/g, "<br/>") + "</div></div>";
  box.scrollTop = box.scrollHeight;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.spokenText));
  }
});

// Microphone Web Speech API
const micBtn = document.getElementById("micBtn");
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRec();
  rec.onstart = () => micBtn.classList.add("bg-rose-500/20", "text-rose-400");
  rec.onend = () => micBtn.classList.remove("bg-rose-500/20", "text-rose-400");
  rec.onresult = (e) => {
    document.getElementById("userInput").value = e.results[0][0].transcript;
    document.getElementById("chatForm").dispatchEvent(new Event("submit"));
  };
  micBtn.onclick = () => rec.start();
}

window.onload = () => { initMap(); loadData(); };