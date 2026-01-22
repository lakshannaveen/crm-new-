import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiCalendar, FiAnchor, FiFlag } from "react-icons/fi";
import { formatDate } from "../../utils/formatters";
import { setSelectedShipJmain } from "../../actions/shipActions";
import { getMilestonesByShip } from "../../actions/projectActions";
import ShipDetailsModal from "./ShipDetailsModal";

const ShipCard = ({ ship }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    // Store the ship's JMAIN in localStorage before showing details
    if (ship.jmainNo || ship.SHIP_JMAIN) {
      dispatch(setSelectedShipJmain(ship.jmainNo || ship.SHIP_JMAIN));
    }
    setShowDetails(true);
  };

  const handleProjectDetailsClick = () => {
    // determine job category and jmain values from the ship object
    const jobCategory =
      ship.raw?.SHIP_JCAT || ship.SHIP_JCAT || ship.JCAT || ship.jcat;
    const jmain =
      ship.raw?.SHIP_JMAIN || ship.jmainNo || ship.SHIP_JMAIN || ship.id;

    if (jmain) {
      dispatch(setSelectedShipJmain(jmain));
    }

    if (jobCategory && jmain) {
      dispatch(getMilestonesByShip(jobCategory, jmain));
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
          {/* Ship Image */}
          <div className="mb-4 md:mb-0 md:w-1/3">
            <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
              <img
                src={ship.image}
                alt={ship.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Ship Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {ship.name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                  <FiAnchor className="mr-2" />
                  <span className="mr-4">IMO: {ship.imoNumber}</span>
                  <FiFlag className="mr-2" />
                  <span>{ship.flag}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {ship.type} • {ship.dwt} DWT • Built {ship.yearBuilt}
                </p>
              </div>
              {/* <button
                onClick={handleViewDetails}
                className="mt-2 md:mt-0 px-4 py-2 bg-blue-50 text-blue-600 
                         dark:bg-blue-900/30 dark:text-blue-400 rounded-lg 
                         hover:bg-blue-100 dark:hover:bg-blue-900/50 
                         transition-colors text-sm font-medium"
              >
                View Details
              </button> */}
            </div>

            {/* Progress Bar */}
            {/* <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span></span>
                <span className="font-medium">{ship.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    ship.progress,
                  )} rounded-full 
                           transition-all duration-300`}
                  style={{ width: `${ship.progress}%` }}
                />
              </div>
            </div> */}

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Start Date
                </p>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(ship.startDate, "short")}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Expected Completion
                </p>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(ship.endDate, "short")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/projects/${ship.id}`}
                onClick={handleProjectDetailsClick}
                className="flex-1 min-w-[120px] btn-primary text-center py-2 text-sm"
              >
                Project Milestones
              </Link>
              <button
                className="flex-1 min-w-[120px] btn-secondary py-2 text-sm"
                onClick={handleViewDetails}
              >
                Quick View
              </button>
              <Link
                to={`/ships/${ship.id}`}
                className="flex-1 min-w-[120px] border border-gray-300 
                         dark:border-gray-600 rounded-lg py-2 text-sm text-center
                         hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <ShipDetailsModal ship={ship} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default ShipCard;
