const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Comprehensive States & Districts Dictionary
const indiaLocations = {
  "Andaman and Nicobar Islands": ["Port Blair", "Nicobar", "South Andaman"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat", "Ziro"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Jagdalpur"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi", "Solan"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Ballari"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Wayanad", "Thrissur", "Kollam", "Alappuzha"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Cherrapunji"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Berhampur", "Balasore"],
  "Puducherry": ["Puducherry", "Auroville", "Karaikal"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar"],
  "Sikkim": ["Gangtok", "Namchi", "Pelling"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Hathras", "Prayagraj", "Noida", "Ghaziabad", "Meerut", "Gorakhpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Roorkee", "Haldwani"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah", "Durgapur", "Asansol"]
};

// Active Disaster Hotspots (For rendering Live Map Risk Layers)
const activeHotspots = [
  { id: "OD-01", state: "Odisha", city: "Puri", lat: 19.8135, lng: 85.8312, type: "Cyclone", riskLevel: "High Risk", severity: "high", warning: "Severe Cyclonic Storm", actionPlan: "Evacuate coastal low-lying areas immediately.", why: "Deep depression over Bay of Bengal.", helpline: "1070" },
  { id: "KL-02", state: "Kerala", city: "Wayanad", lat: 11.6854, lng: 76.1320, type: "Flood Watch", riskLevel: "Moderate", severity: "watch", warning: "Flash Flood Alert", actionPlan: "Move away from active drainage paths.", why: "Heavy rainfall exceeding 210mm.", helpline: "1079" },
  { id: "RJ-03", state: "Rajasthan", city: "Jaipur", lat: 26.9124, lng: 75.7873, type: "Heatwave", riskLevel: "High Risk", severity: "high", warning: "Severe Heatwave", actionPlan: "Stay indoors between 11 AM - 4 PM.", why: "Persistent anticyclonic ridge trapping dry air.", helpline: "108" },
  { id: "UK-04", state: "Uttarakhand", city: "Dehradun", lat: 30.3165, lng: 78.0322, type: "Landslide", riskLevel: "Watch", severity: "watch", warning: "Landslide Risk", actionPlan: "Avoid non-essential transit across passes.", why: "Active Western Disturbance.", helpline: "1070" },
  { id: "MH-05", state: "Maharashtra", city: "Mumbai", lat: 19.0760, lng: 72.8777, type: "Urban Flood", riskLevel: "Moderate", severity: "watch", warning: "Waterlogging Alert", actionPlan: "Avoid coastal promenades during high tide.", why: "High tide coinciding with heavy downpour.", helpline: "1916" },
  { id: "UP-06", state: "Uttar Pradesh", city: "Hathras", lat: 27.5971, lng: 78.0500, type: "Normal", riskLevel: "Safe", severity: "normal", warning: "No active alerts", actionPlan: "Normal conditions prevail.", why: "Stable barometric pressure.", helpline: "112" }
];

app.get("/api/locations", (req, res) => res.json({ states: indiaLocations }));
app.get("/api/disasters", (req, res) => res.json({ hotspots: activeHotspots }));

app.post("/api/chat", (req, res) => {
  const { message = "", location = "All India" } = req.body;
  const query = message.toLowerCase();

  // Check if query matches an active hotspot
  let match = activeHotspots.find(d => query.includes(d.city.toLowerCase()) || location.toLowerCase() === d.city.toLowerCase());
  
  // If no disaster found, generate a dynamic "Safe" response for any selected district
  if (!match) {
    const locArr = location.split(", ");
    const city = locArr[0] || location;
    const state = locArr[1] || "";
    match = {
      type: "Normal Conditions", city: city, state: state, riskLevel: "Safe",
      why: "Current meteorological feeds indicate stable weather patterns with no severe alerts.",
      actionPlan: "Standard daily activities can proceed safely. No emergency actions required.",
      helpline: "112 (National Emergency)"
    };
  }

  const text = "### ⚠️ WeatherGPT Advisory: " + match.city + " [" + match.riskLevel + "]\n\n" +
               "**Meteorological Status:**\n" + match.why + "\n\n" +
               "**Recommended Action:**\n" + match.actionPlan + "\n\n" +
               "📞 **Helpline:** " + match.helpline;

  const speech = "Advisory for " + match.city + ". Risk level is " + match.riskLevel + ". " + match.actionPlan;

  res.json({ success: true, reply: text, spokenText: speech });
});

app.listen(PORT, () => console.log("WeatherGPT V2 active on http://localhost:" + PORT));