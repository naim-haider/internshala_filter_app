import React, { useEffect, useState, useMemo } from "react";

const API_URL =
  "https://internshala-filter-backend.onrender.com/api/internships";

function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch internships");
        return res.json();
      })
      .then((data) => {
        const internships = data.internship_ids.map(
          (id) => data.internships_meta[id]
        );
        setInternships(internships);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const profiles = useMemo(() => {
    const set = new Set(internships.map((i) => i.profile_name));
    return Array.from(set).sort();
  }, [internships]);

  const locations = useMemo(() => {
    const allLocations = internships.flatMap((i) => i.location_names || []);
    const uniqueLocations = Array.from(new Set(allLocations)).sort();
    return uniqueLocations;
  }, [internships]);

  console.log(locations);

  const durations = useMemo(() => {
    const set = new Set(internships.map((i) => i.duration));
    return Array.from(set).sort((a, b) => a - b);
  }, [internships]);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const profileMatch =
        !selectedProfile || internship.profile_name === selectedProfile;

      const locationMatch =
        !selectedLocation ||
        internship.location_names?.includes(selectedLocation);

      const durationMatch =
        !selectedDuration || internship.duration === selectedDuration;

      return profileMatch && locationMatch && durationMatch;
    });
  }, [internships, selectedProfile, selectedLocation, selectedDuration]);

  if (loading) return <div className="loading">Loading internships...</div>;
  if (error) return <div className="error">Error loading data: {error}</div>;

  return (
    <div className="min-h-screen justify-center bg-gray-100 p-4 md:flex md:gap-6">
      <div className="md:flex md:gap-6 justify-center ">
        <aside className="md:w-2/5 bg-white p-4 rounded-lg shadow sticky top-4 h-fit">
          <h2 className="text-base font-semibold mb-4 ml-24">
            <i className="fa-solid fa-filter text-sm mr-1"></i>Filters
          </h2>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="profile">
              Profile
            </label>
            <select
              id="profile"
              className="w-full border rounded p-2"
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
            >
              <option value="">All</option>
              {profiles.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="location">
              Location
            </label>
            <select
              id="location"
              className="w-full border rounded p-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="duration">
              Duration (months)
            </label>
            <select
              id="duration"
              className="w-full border rounded p-2"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">All</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input type="checkbox" name="location" id="city" />
            <label htmlFor="city" className="ml-2">
              Internships in my city
            </label>
          </div>
          <div className="mb-4">
            <input type="checkbox" name="location" id="home" />
            <label htmlFor="home" className="ml-2">
              Work from home
            </label>
          </div>
          <div className="mb-4">
            <input type="checkbox" name="location" id="partTime" />
            <label htmlFor="partTime" className="ml-2">
              Part-time
            </label>
          </div>
          <div className="mb-4">
            <label for="steps-range" className="block mb-2 text-base ">
              Desired minimum monthly stipend (₹)
            </label>
            <input
              id="steps-range"
              type="range"
              min="0"
              max="5"
              className="range-thumb w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-sm text-gray-500 dark:text-gray-400  start-0">
              0
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 relative start-[35%]">
              4k
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 relative start-[48%]">
              6k
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 relative -end-4">
              2k
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 relative -end-[56%]">
              8k
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 relative -end-[68%]">
              10k
            </span>
          </div>
          <div className="mb-4 text-[#008bdc] font-semibold">
            View more filters
            <span>
              <i className="fa-solid fa-angle-down relative top-0.5 left-1"></i>
            </span>
          </div>
        </aside>

        <main className="md:w-3/4">
          {filteredInternships.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">
              No internships found matching your criteria.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id || internship.internship_id}
                  className="bg-white rounded-lg shadow p-5 transition hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {internship.title || internship.profile}
                  </h3>
                  <p className="text-gray-500">
                    <strong className="mr-1 text-gray-500">Company:</strong>
                    {internship.company_name || internship.company}
                  </p>
                  <p className="text-gray-500">
                    <strong className="mr-1 text-gray-500">Location:</strong>
                    {internship.location_names?.join(", ") || "Not specified"}
                  </p>
                  <p className="text-gray-500">
                    <strong className="mr-1 text-gray-500">Duration:</strong>{" "}
                    {internship.duration}
                    {typeof internship.duration === "number" ? "months" : ""}
                  </p>
                  <p className="text-gray-500">
                    <strong className="mr-1 text-gray-500">Stipend:</strong>
                    {internship.stipend
                      ? typeof internship.stipend === "object"
                        ? internship.stipend.salary ||
                          internship.stipend.large_stipend_text ||
                          "Not disclosed"
                        : internship.stipend
                      : "Not disclosed"}
                  </p>
                  <a
                    href={internship.apply_link || internship.apply_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg backdrop-blur-md bg-opacity-70 hover:from-teal-500 hover:to-blue-500 transition-all duration-300 ease-in-out hover:shadow-blue-500/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
