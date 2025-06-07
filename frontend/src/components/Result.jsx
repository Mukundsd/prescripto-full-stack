import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe destructuring with fallback values
  const prediction = location.state?.prediction ?? "";
  const disease = location.state?.disease ?? "";

  useEffect(() => {
    console.log("location.state:", location.state);
    console.log("Prediction:", prediction);
    console.log("Disease:", disease);
  }, [prediction, disease]);

  const handleBack = () => {
    navigate("/disease");
  };

  const diseaseToSpecialityMap = {
    Diabetes: "Diabetologist",
    "Heart Disease": "Cardiologist",
    "Breast Cancer": "Breast Cancer Specialist",
    Hepatitis: "Hepatologist",
  };

  const handleDoctors = () => {
    if (!disease) {
      alert("Disease not found");
      return;
    }
    const speciality = diseaseToSpecialityMap[disease] || disease;
    navigate(`/doctors/${encodeURIComponent(speciality)}`);
  };

  if (!prediction || !disease) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-3xl font-bold mb-4">No Prediction Available</h2>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={handleBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isPositive = prediction.toLowerCase() !== "no";
  const displaySpeciality = diseaseToSpecialityMap[disease] || disease;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-6">Prediction Result for {disease}</h1>

      <div className="p-8 rounded-lg shadow-lg bg-white text-center">
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          {isPositive ? (
            <>You may have <span className="text-red-600">{disease}</span></>
          ) : (
            <>You may <span className="text-green-600">not</span> have <span className="text-green-600">{disease}</span></>
          )}
        </p>

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleBack}
        >
          Predict Another Disease
        </button>
      </div>

      {isPositive && (
        <div className="mt-28 text-center">
          <h2 className="text-3xl font-semibold mb-4">Find Recommended Doctors Here</h2>
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={handleDoctors}
          >
            See {displaySpeciality} Specialists
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
