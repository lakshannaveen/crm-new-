import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiCalendar, FiAnchor, FiFlag, FiUpload } from "react-icons/fi";
import { formatDate } from "../../utils/formatters";
import { getStatusColor, getStatusText } from "../../utils/helpers";
import {
  setSelectedShipJmain,
  uploadShipImage,
} from "../../actions/shipActions";
import { getMilestonesByShip } from "../../actions/projectActions";
import { getFeedbackDates } from "../../actions/feedbackActions";
import { shipService } from "../../services/shipService";
import ShipDetailsModal from "./ShipDetailsModal";

const ShipCard = ({ ship }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageObjectUrlRef = useRef(null);
  const fileInputRef = useRef(null);
  const [dates, setDates] = useState({
    startDate: ship.startDate,
    endDate: ship.endDate,
  });
  const [loadingDates, setLoadingDates] = useState(false);

  const statusColor = getStatusColor(ship.status);
  const statusText = getStatusText(ship.status);

  // Fetch dates when component mounts
  useEffect(() => {
    let isMounted = true;

    if (imageObjectUrlRef.current) {
      URL.revokeObjectURL(imageObjectUrlRef.current);
      imageObjectUrlRef.current = null;
    }

    setImageSrc(null);
    setHasImageError(false);
    setLoadingImage(false);

    const fetchImage = async () => {
      const jmain =
        ship.raw?.SHIP_JMAIN || ship.jmainNo || ship.SHIP_JMAIN || ship.id;

      if (!jmain) {
        return;
      }

      setLoadingImage(true);
      try {
        const objectUrl = await shipService.getShipImagePreview(jmain);
        if (isMounted) {
          imageObjectUrlRef.current = objectUrl;
          setImageSrc(objectUrl);
          setHasImageError(false);
        } else if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        if (isMounted) {
          setHasImageError(true);
        }
      } finally {
        if (isMounted) {
          setLoadingImage(false);
        }
      }
    };

    const fetchDates = async () => {
      const jobCategory =
        ship.raw?.SHIP_JCAT || ship.SHIP_JCAT || ship.JCAT || ship.jcat;
      const jmain =
        ship.raw?.SHIP_JMAIN || ship.jmainNo || ship.SHIP_JMAIN || ship.id;

      if (jobCategory && jmain) {
        setLoadingDates(true);
        try {
          const response = await dispatch(getFeedbackDates(jobCategory, jmain));
          if (response) {
            // Get dates from response
            const resultData =
              response.ResultSet?.[0] || response[0] || response;
            const startDate =
              resultData.FEEDBACK_START_DATE ||
              resultData.FEEDBACK_START_DT ||
              resultData.startingDate ||
              resultData.START_DATE ||
              resultData.startDate ||
              response.startingDate;
            const endDate =
              resultData.FEEDBACK_END_DATE ||
              resultData.FEEDBACK_END_DT ||
              resultData.endingDate ||
              resultData.END_DATE ||
              resultData.endDate ||
              response.endingDate;

            if (startDate || endDate) {
              setDates({
                startDate: startDate || ship.startDate,
                endDate: endDate || ship.endDate,
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch dates:", error);
        } finally {
          setLoadingDates(false);
        }
      }
    };

    fetchImage();
    fetchDates();

    return () => {
      isMounted = false;
      if (imageObjectUrlRef.current) {
        URL.revokeObjectURL(imageObjectUrlRef.current);
        imageObjectUrlRef.current = null;
      }
    };
  }, [ship, dispatch]);

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const jmain =
      ship.raw?.SHIP_JMAIN || ship.jmainNo || ship.SHIP_JMAIN || ship.id;

    if (!jmain) {
      toast.error("Ship identifier not found");
      return;
    }

    setUploadingImage(true);
    try {
      await dispatch(uploadShipImage(jmain, file));
      // Reload the image after successful upload
      if (imageObjectUrlRef.current) {
        URL.revokeObjectURL(imageObjectUrlRef.current);
        imageObjectUrlRef.current = null;
      }
      setImageSrc(null);
      setHasImageError(false);
      setLoadingImage(true);

      const objectUrl = await shipService.getShipImagePreview(jmain);
      imageObjectUrlRef.current = objectUrl;
      setImageSrc(objectUrl);
      setLoadingImage(false);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploadingImage(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
            <div className="relative h-48 md:h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center group">
              {loadingImage ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Loading image...
                  </p>
                </div>
              ) : imageSrc && !hasImageError ? (
                <img
                  src={imageSrc}
                  alt={ship.name}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setHasImageError(true);
                  }}
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-sm font-medium">No image preview</p>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
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
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <button
                  onClick={handleUploadClick}
                  disabled={uploadingImage || loadingImage}
                  className="px-4 py-2 bg-green-50 text-green-600 
                           dark:bg-green-900/30 dark:text-green-400 rounded-lg 
                           hover:bg-green-100 dark:hover:bg-green-900/50 
                           transition-colors text-sm font-medium flex items-center space-x-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Upload ship image"
                >
                  {uploadingImage ? (
                    <>
                      <div className="w-3 h-3 border-2 border-green-600 dark:border-green-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleViewDetails}
                  className="mt-2 md:mt-0 px-4 py-2 bg-blue-50 text-blue-600 
                           dark:bg-blue-900/30 dark:text-blue-400 rounded-lg 
                           hover:bg-blue-100 dark:hover:bg-blue-900/50 
                           transition-colors text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {/* <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Repair Progress</span>
                <span className="font-medium">{ship.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    ship.progress
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
                    {loadingDates ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : (
                      formatDate(dates.startDate, "iso")
                    )}
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
                    {loadingDates ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : (
                      formatDate(dates.endDate, "iso")
                    )}
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
              {/* <button
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
              </Link> */}
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
