import React, { useState, useEffect } from "react";
// Import date-fns for formatting the date
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const tableVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
};


// Sample JSON data for states and their districts
const statesAndDistricts = {
    "Andhra Pradesh": [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R.", "West Godavari", "Kadapa", "Peddapalli", "Siddipet", "Kakinada", "Vijayawada", "Rajahmundry", "Nellore", "Khammam", "Nalgonda", "Warangal", "Mahabubnagar", "Hyderabad", "Rangareddy", "Medak", "Nizamabad", "Kurnool", "Chittoor"
    ],
    "Arunachal Pradesh": [
      "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Changlang", "Tirap", "Longding"
    ],
    "Assam": [
      "Baksa", "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Kondagaon", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarguja", "Bilaspur", "Durg", "Korba", "Raigarh", "Rajnandgaon", "Kanker"
    ],
    "Goa": [
      "North Goa", "South Goa"
    ],
    "Gujarat": [
      "Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Gandhinagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
      "Ambala", "Bhiwani", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
      "Bagalkot", "Ballari", "Bengaluru", "Bidar", "Chamarajanagar", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
    ],
    "Kerala": [
      "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
      "Alirajpur", "Anuppur", "Ashok Nagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Pachmarhi", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nasik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
      "Bishnupur", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
      "East Garo Hills", "East Khasi Hills", "Jaintia Hills", "West Garo Hills", "West Khasi Hills"
    ],
    "Mizoram": [
      "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"
    ],
    "Nagaland": [
      "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
      "Angul", "Balangir", "Baleswar", "Bargarh", "Bhadrak", "Balasore", "Bolangir", "Cuttack", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"
    ],
    "Punjab": [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Patiala", "Rupnagar", "S.A.S. Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"
    ],
    "Rajasthan": [
      "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"
    ],
    "Sikkim": [
      "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
    ],
    "Tamil Nadu": [
      "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tiruvallur", "Tirunelveli", "Tiruppur", "Vellore", "Villupuram", "Virudhunagar"
    ],
    "Telangana": [
      "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal", "Khammam", "Hyderabad", "Secunderabad"
    ],
    "Tripura": [
      "Dhalai", "North Tripura", "South Tripura", "West Tripura"
    ],
    "Uttar Pradesh": [
      "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Auraiya", "Azamgarh", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur","Hapur", "Hardoi", "Hathras", "Jhansi", "Kannauj", "Kanpur", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Raebareli", "Rampur", "Saharanpur", "Sant Kabir Nagar", "Shahjahanpur", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao"
    ]
  }
  ;

function CropRateComponent() {
  const [state, setState] = useState(""); // User input for state name
  const [district, setDistrict] = useState(""); // Selected district
  const [commodity, setCommodity] = useState("Rice");
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state
  const [filteredDistricts, setFilteredDistricts] = useState([]); // State to store filtered districts

  // Sample commodities data
  const commoditiesList = ["Rice", "Wheat", "Sugarcane", "Maize", "Cotton"]; // Add more commodities

  // Function to format the date to dd/MM/yyyy (required by API)
  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy"); // Convert date to dd/MM/yyyy format
  };

  // Handle the state input change
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setState(newState);

    // Filter districts based on entered state
    if (statesAndDistricts[newState]) {
      setFilteredDistricts(statesAndDistricts[newState]);
    } else {
      setFilteredDistricts([]); // Reset districts if state is invalid
    }
  };

  const fetchMarketPrices = async () => {
    if (!state || !district) {
      setError("Please select both state and district.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error on new fetch
    const apiKey = "579b464db66ec23bdd0000017c953df1a53a493f58fe5ec7e36bf1c2";
    let url = `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${apiKey}&format=json&limit=500&filters[State]=${state}&filters[District]=${district}&filters[Commodity]=${commodity}`;

    // If a date is selected, format and include it in the API query
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate); // Convert date to dd/MM/yyyy
      url += `&filters[Arrival_Date]=${formattedDate}`;
    }

    try {
      await new Promise(resolve=>setTimeout(resolve,500)) ;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        setMarketData(data.records);
      } else {
        setError(data.message || "No data found.");
        setMarketData([]);
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.error("Error:", error);
      setMarketData([]);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
  <motion.div
    className="max-w-xl mx-auto py-10 p-6 bg-green-50 rounded-lg shadow-lg"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVariants}
  >
    <motion.h2
      className="text-3xl font-semibold text-center mb-6 drop-shadow-md"
      variants={itemVariants}
    >
      Crop Rate Information
    </motion.h2>

    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        fetchMarketPrices();
      }}
      className="space-y-6 text-lg"
      variants={itemVariants}
    >
      <div className="grid grid-cols-1 gap-6">
        {/* State Input */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label htmlFor="state" className="mb-2 text-base font-medium text-gray-700">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={handleStateChange}
            className="p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition placeholder-gray-500 placeholder-opacity-70"
            placeholder="Enter state name"
            required
          />
        </motion.div>

        {/* District Input */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label htmlFor="district" className="mb-2 text-base font-medium text-gray-700">District</label>
          <select
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition text-gray-500"
            disabled={!filteredDistricts.length}
            required
          >
            <option value="">Select a district</option>
            {filteredDistricts.map((districtName, index) => (
              <option key={index} value={districtName}>{districtName}</option>
            ))}
          </select>
        </motion.div>

        {/* Commodity Select */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label htmlFor="commodity" className="mb-2 text-base font-medium text-gray-700">Commodity</label>
          <select
            id="commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="p-3 text-gray-500 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          >
            {commoditiesList.map((commodityName, index) => (
              <option key={index} value={commodityName}>
                {commodityName}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Arrival Date Picker */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label htmlFor="arrivalDate" className="mb-2 text-base font-medium text-gray-700">Arrival Date</label>
          <input
            type="date"
            id="arrivalDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-3 text-gray-500 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-3 cursor-pointer disabled:opacity-70 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 shadow-md transition duration-200 text-lg"
        variants={itemVariants}
      >
      {loading ? "Getting...":"  Get Prices"}
      </motion.button>
    </motion.form>

    {/* Display results */}
    <div className="mt-6 text-lg">
      {loading ? (
        <motion.div
          className="text-center text-green-500 mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Loading...
        </motion.div>
      ) : error ? (
        <motion.div
          className="text-center text-red-500 mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.div>
      ) : (
        <AnimatePresence>
          {marketData.length > 0 ? (
            <motion.div
              key="market-data"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-2xl font-semibold mb-4">Market Prices:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse shadow-md">
                  <thead className="bg-green-600 text-white text-lg">
                    <tr>
                      <th className="border-b px-4 py-3 text-left font-medium text-white">Market</th>
                      <th className="border-b px-4 py-3 text-left font-medium text-white">Min Price</th>
                      <th className="border-b px-4 py-3 text-left font-medium text-white">Max Price</th>
                      <th className="border-b px-4 py-3 text-left font-medium text-white">Modal Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((record, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-green-50 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                      >
                        <td className="border-b px-4 py-3 text-gray-700">{record.Market}</td>
                        <td className="border-b px-4 py-3 text-gray-700">{record.Min_Price}</td>
                        <td className="border-b px-4 py-3 text-gray-700">{record.Max_Price}</td>
                        <td className="border-b px-4 py-3 text-gray-700">{record.Modal_Price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.p
              className="text-center text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No data found for the selected filters.
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  </motion.div>
</AnimatePresence>

  );
}


export default CropRateComponent;