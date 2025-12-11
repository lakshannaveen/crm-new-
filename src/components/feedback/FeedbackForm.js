// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { FiCheck, FiAlertCircle, FiStar, FiMessageSquare, FiCalendar } from 'react-icons/fi';
// import { formatDate } from '../../utils/formatters';
// import FeedbackStep from './FeedbackStep';
// import FeedbackReview from './FeedbackReview';
// import FeedbackConfirmation from './FeedbackConfirmation';

// const FeedbackForm = ({ vessel }) => {
//   const { user } = useSelector(state => state.auth);
  
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     // Vessel Information
//     vesselName: vessel?.name || "M.V. SSL THAMIRABARANI",
//     vesselIMO: vessel?.imoNumber || "IMO: 9312468",
//     vesselSR: "SR/4354",
//     ownerRep: "MR. KABILAN SADASIVAM - FLEET MANAGEMENT INDIA PVT LTD (INDIA)",
//     shipManager: "MR. SAMPATH WIJESINGHE",
//     feedbackDate: new Date().toISOString().split('T')[0],
//     arrivalDate: "",
//     completionDate: "",
//     sailingDate: "",
//     specDuration: "",
//     agreedDuration: "",
//     actualDuration: "",
    
//     // Ratings (0-100 scale)
//     ratings: {
//       responsiveness: 0,
//       publicRelations: 0,
//       deckPlanning: 0,
//       deckPipesQuality: 0,
//       deckPipesTimely: 0,
//       deckTankQuality: 0,
//       deckTankTimely: 0,
//       deckMachineryQuality: 0,
//       deckMachineryTimely: 0,
//       deckSteelQuality: 0,
//       deckSteelTimely: 0,
//       enginePlanning: 0,
//       enginePipesQuality: 0,
//       enginePipesTimely: 0,
//       rudderQuality: 0,
//       rudderTimely: 0,
//       mainEngineQuality: 0,
//       mainEngineTimely: 0,
//       otherEngineQuality: 0,
//       otherEngineTimely: 0,
//       steelPlanning: 0,
//       steelWorkQuality: 0,
//       steelWorkTimely: 0,
//       electricalPlanning: 0,
//       electricalQuality: 0,
//       electricalTimely: 0,
//       electronicQuality: 0,
//       electronicTimely: 0,
//       automationQuality: 0,
//       automationTimely: 0,
//       surfacePlanning: 0,
//       blastingQuality: 0,
//       blastingTimely: 0,
//       paintingQuality: 0,
//       paintingTimely: 0,
//       tankCleaningQuality: 0,
//       tankCleaningTimely: 0,
//       stagingQuality: 0,
//       docking: 0,
//       undocking: 0,
//       mooring: 0,
//       unmooring: 0,
//       outfittingPlanning: 0,
//       carpentryQuality: 0,
//       carpentryTimely: 0,
//       claddingQuality: 0,
//       claddingTimely: 0,
//       aluminumQuality: 0,
//       aluminumTimely: 0,
//       generalServices: 0,
//       materialsQuality: 0,
//       materialsDelivery: 0,
//       overallQuality: 0,
//       safetyEnvironment: 0,
//       competitorPerformance: 0,
//     },
    
//     // Yes/No Questions
//     valueForMoney: null,
//     recommend: null,
    
//     // Additional Comments
//     poorAverageDetails: "",
//     observations: "",
//     shipManagerComments: "",
    
//     // Feedback Reference
//     feedbackRef: `FB-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
//   });

//   const steps = [
//     { id: 0, title: 'Vessel Details', icon: <FiCalendar /> },
//     { id: 1, title: 'Responsiveness & PR', icon: <FiMessageSquare /> },
//     { id: 2, title: 'Deck Department', icon: <FiStar /> },
//     { id: 3, title: 'Engine Department', icon: <FiStar /> },
//     { id: 4, title: 'Steel & Electrical', icon: <FiStar /> },
//     { id: 5, title: 'Surface & Docking', icon: <FiStar /> },
//     { id: 6, title: 'Outfitting & Services', icon: <FiStar /> },
//     { id: 7, title: 'Overall Evaluation', icon: <FiAlertCircle /> },
//     { id: 8, title: 'Review & Submit', icon: <FiCheck /> },
//   ];

//   const handleRatingChange = (category, value) => {
//     setFormData(prev => ({
//       ...prev,
//       ratings: {
//         ...prev.ratings,
//         [category]: parseInt(value)
//       }
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleYesNoChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value === "yes"
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     // Calculate overall score
//     const ratings = Object.values(formData.ratings).filter(r => r > 0);
//     const averageScore = ratings.length > 0 
//       ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
//       : 0;
    
//     const finalData = {
//       ...formData,
//       overallScore: Math.round(averageScore),
//       submittedBy: user?.name,
//       submittedAt: new Date().toISOString(),
//     };

//     console.log('Submitting feedback:', finalData);
    
//     // Here you would typically send to API
//     // await submitFeedback(finalData);
    
//     // Move to confirmation
//     setCurrentStep(currentStep + 1);
//   };

//   const getStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <FeedbackStep
//             title="Vessel Information"
//             description="Please provide vessel details and timeline information"
//           >
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Vessel Name
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.vesselName}
//                     onChange={(e) => handleInputChange('vesselName', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     IMO Number
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.vesselIMO}
//                     onChange={(e) => handleInputChange('vesselIMO', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     SR Number
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.vesselSR}
//                     onChange={(e) => handleInputChange('vesselSR', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Feedback Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.feedbackDate}
//                     onChange={(e) => handleInputChange('feedbackDate', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Arrival Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.arrivalDate}
//                     onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Completion Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.completionDate}
//                     onChange={(e) => handleInputChange('completionDate', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Sailing Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.sailingDate}
//                     onChange={(e) => handleInputChange('sailingDate', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Spec Duration (Days)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.specDuration}
//                     onChange={(e) => handleInputChange('specDuration', e.target.value)}
//                     className="input-field"
//                     min="0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Agreed Duration (Days)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.agreedDuration}
//                     onChange={(e) => handleInputChange('agreedDuration', e.target.value)}
//                     className="input-field"
//                     min="0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Actual Duration (Days)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.actualDuration}
//                     onChange={(e) => handleInputChange('actualDuration', e.target.value)}
//                     className="input-field"
//                     min="0"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Owner's Representative
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.ownerRep}
//                     onChange={(e) => handleInputChange('ownerRep', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Ship Manager
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.shipManager}
//                     onChange={(e) => handleInputChange('shipManager', e.target.value)}
//                     className="input-field"
//                   />
//                 </div>
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 1:
//         return (
//           <FeedbackStep
//             title="Responsiveness & Public Relations"
//             description="Rate our initial communication and PR services"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="1.0 Responsiveness to initial inquiry"
//                 value={formData.ratings.responsiveness}
//                 onChange={(value) => handleRatingChange('responsiveness', value)}
//               />
              
//               <RatingCard
//                 title="2.0 Public Relations"
//                 value={formData.ratings.publicRelations}
//                 onChange={(value) => handleRatingChange('publicRelations', value)}
//               />
//             </div>
//           </FeedbackStep>
//         );

//       case 2:
//         return (
//           <FeedbackStep
//             title="Deck Department Work"
//             description="Evaluate deck department performance"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="3.1 Planning of work"
//                 value={formData.ratings.deckPlanning}
//                 onChange={(value) => handleRatingChange('deckPlanning', value)}
//               />
              
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   3.2 Pipes and valve repairs on deck
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.deckPipesQuality}
//                     onChange={(value) => handleRatingChange('deckPipesQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="Timely Completion"
//                     value={formData.ratings.deckPipesTimely}
//                     onChange={(value) => handleRatingChange('deckPipesTimely', value)}
//                     compact
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   3.3 Work inside ballast & cargo tank
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.deckTankQuality}
//                     onChange={(value) => handleRatingChange('deckTankQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="Timely Completion"
//                     value={formData.ratings.deckTankTimely}
//                     onChange={(value) => handleRatingChange('deckTankTimely', value)}
//                     compact
//                   />
//                 </div>
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 3:
//         return (
//           <FeedbackStep
//             title="Engine Department Work"
//             description="Evaluate engine department performance"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="4.1 Planning of work"
//                 value={formData.ratings.enginePlanning}
//                 onChange={(value) => handleRatingChange('enginePlanning', value)}
//               />
              
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   4.2 E/R, P/R pipes and valves repair
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.enginePipesQuality}
//                     onChange={(value) => handleRatingChange('enginePipesQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="Timely Completion"
//                     value={formData.ratings.enginePipesTimely}
//                     onChange={(value) => handleRatingChange('enginePipesTimely', value)}
//                     compact
//                   />
//                 </div>
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 4:
//         return (
//           <FeedbackStep
//             title="Steel Repairs & Electrical Work"
//             description="Evaluate steel and electrical department performance"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="5.1 Planning of work (Steel)"
//                 value={formData.ratings.steelPlanning}
//                 onChange={(value) => handleRatingChange('steelPlanning', value)}
//               />
              
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   5.2 Steel work
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.steelWorkQuality}
//                     onChange={(value) => handleRatingChange('steelWorkQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="Timely Completion"
//                     value={formData.ratings.steelWorkTimely}
//                     onChange={(value) => handleRatingChange('steelWorkTimely', value)}
//                     compact
//                   />
//                 </div>
//               </div>

//               <RatingCard
//                 title="6.1 Planning (Electrical/Electronic/Automation)"
//                 value={formData.ratings.electricalPlanning}
//                 onChange={(value) => handleRatingChange('electricalPlanning', value)}
//               />
//             </div>
//           </FeedbackStep>
//         );

//       case 5:
//         return (
//           <FeedbackStep
//             title="Surface Preparation & Docking"
//             description="Evaluate surface preparation and docking operations"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="7.1 Planning of work (Surface)"
//                 value={formData.ratings.surfacePlanning}
//                 onChange={(value) => handleRatingChange('surfacePlanning', value)}
//               />
              
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   7.2 Blasting
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.blastingQuality}
//                     onChange={(value) => handleRatingChange('blastingQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="Timely Completion"
//                     value={formData.ratings.blastingTimely}
//                     onChange={(value) => handleRatingChange('blastingTimely', value)}
//                     compact
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <RatingCard
//                   title="8.1 Docking"
//                   value={formData.ratings.docking}
//                   onChange={(value) => handleRatingChange('docking', value)}
//                 />
//                 <RatingCard
//                   title="8.2 Undocking"
//                   value={formData.ratings.undocking}
//                   onChange={(value) => handleRatingChange('undocking', value)}
//                 />
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 6:
//         return (
//           <FeedbackStep
//             title="Outfitting & General Services"
//             description="Evaluate outfitting work and general services"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="9.1 Planning of work (Outfitting)"
//                 value={formData.ratings.outfittingPlanning}
//                 onChange={(value) => handleRatingChange('outfittingPlanning', value)}
//               />
              
//               <RatingCard
//                 title="10.0 General Services"
//                 description="Fresh water supply, Shore power supply, ballasting, Cooling water, Ventilation, Fire Line, Crane Facility etc."
//                 value={formData.ratings.generalServices}
//                 onChange={(value) => handleRatingChange('generalServices', value)}
//               />
              
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   11.0 Supply of Materials
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RatingCard
//                     title="Quality"
//                     value={formData.ratings.materialsQuality}
//                     onChange={(value) => handleRatingChange('materialsQuality', value)}
//                     compact
//                   />
//                   <RatingCard
//                     title="In time delivery"
//                     value={formData.ratings.materialsDelivery}
//                     onChange={(value) => handleRatingChange('materialsDelivery', value)}
//                     compact
//                   />
//                 </div>
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 7:
//         return (
//           <FeedbackStep
//             title="Overall Evaluation"
//             description="Final assessment and additional comments"
//           >
//             <div className="space-y-6">
//               <RatingCard
//                 title="12.0 Overall Quality of Service"
//                 value={formData.ratings.overallQuality}
//                 onChange={(value) => handleRatingChange('overallQuality', value)}
//               />
              
//               <RatingCard
//                 title="13.0 Yard's Health, Safety & Environment Practice"
//                 value={formData.ratings.safetyEnvironment}
//                 onChange={(value) => handleRatingChange('safetyEnvironment', value)}
//               />
              
//               <RatingCard
//                 title="14.0 How do you place our performance among competitors?"
//                 value={formData.ratings.competitorPerformance}
//                 onChange={(value) => handleRatingChange('competitorPerformance', value)}
//               />

//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   15.0 In overall, has CDPLC given value for your money?
//                 </h4>
//                 <YesNoSelection
//                   value={formData.valueForMoney}
//                   onChange={(value) => handleYesNoChange('valueForMoney', value)}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   16.0 Would you recommend CDPLC to another Business Partner?
//                 </h4>
//                 <YesNoSelection
//                   value={formData.recommend}
//                   onChange={(value) => handleYesNoChange('recommend', value)}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   17.0 Other observations/recommendations/suggestions for improvements
//                 </label>
//                 <textarea
//                   value={formData.observations}
//                   onChange={(e) => handleInputChange('observations', e.target.value)}
//                   className="input-field h-32"
//                   placeholder="Enter your observations and suggestions..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   18.0 Details on Poor / Average / Undesirable Situation
//                 </label>
//                 <textarea
//                   value={formData.poorAverageDetails}
//                   onChange={(e) => handleInputChange('poorAverageDetails', e.target.value)}
//                   className="input-field h-32"
//                   placeholder="If you selected 'Poor' or 'Average' in any category, please provide details..."
//                 />
//               </div>
//             </div>
//           </FeedbackStep>
//         );

//       case 8:
//         return (
//           <FeedbackReview
//             formData={formData}
//             onEdit={() => setCurrentStep(0)}
//             onSubmit={handleSubmit}
//           />
//         );

//       case 9:
//         return <FeedbackConfirmation formData={formData} />;

//       default:
//         return null;
//     }
//   };

//   const progress = ((currentStep + 1) / steps.length) * 100;

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Bar */}
//       <div className="mb-8">
//         <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
//           <span>Step {currentStep + 1} of {steps.length}</span>
//           <span>{Math.round(progress)}% Complete</span>
//         </div>
//         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
        
//         {/* Step Indicators */}
//         <div className="flex justify-between mt-6">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex flex-col items-center">
//               <button
//                 onClick={() => setCurrentStep(step.id)}
//                 className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
//                   index === currentStep
//                     ? 'bg-blue-600 text-white scale-110'
//                     : index < currentStep
//                     ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
//                     : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
//                 }`}
//               >
//                 {index < currentStep ? <FiCheck /> : step.icon}
//               </button>
//               <span className={`mt-2 text-xs text-center ${
//                 index === currentStep
//                   ? 'text-blue-600 dark:text-blue-400 font-medium'
//                   : 'text-gray-500 dark:text-gray-400'
//               }`}>
//                 {step.title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Current Step Content */}
//       {getStepContent()}

//       {/* Navigation Buttons */}
//       {currentStep < steps.length - 1 && currentStep !== 8 && (
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className={`px-6 py-2 rounded-lg transition-colors ${
//               currentStep === 0
//                 ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
//                 : 'btn-secondary'
//             }`}
//           >
//             Previous
//           </button>
//           <button
//             onClick={nextStep}
//             className="btn-primary px-6 py-2"
//           >
//             {currentStep === steps.length - 2 ? 'Review' : 'Next'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const RatingCard = ({ title, description, value, onChange, compact = false }) => {
//   const getRatingLabel = (score) => {
//     if (score <= 25) return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
//     if (score <= 50) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
//     if (score <= 75) return { text: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
//     return { text: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100' };
//   };

//   const label = getRatingLabel(value);

//   return (
//     <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
//       compact ? 'p-4' : 'p-6'
//     }`}>
//       <div className="mb-4">
//         <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
//         {description && (
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
//         )}
//       </div>
      
//       <div className="space-y-4">
//         {/* Score Display */}
//         <div className="flex items-center justify-between">
//           <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${label.bg} ${label.color}`}>
//             {label.text}
//           </span>
//         </div>
        
//         {/* Slider */}
//         <div className="space-y-2">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             step="1"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
//           />
          
//           {/* Labels */}
//           <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//             <span>0 (Poor)</span>
//             <span>25</span>
//             <span>50 (Average)</span>
//             <span>75</span>
//             <span>100 (Excellent)</span>
//           </div>
//         </div>
        
//         {/* Quick Select Buttons */}
//         <div className="flex space-x-2 pt-2">
//           {[0, 25, 50, 75, 100].map(score => (
//             <button
//               key={score}
//               onClick={() => onChange(score)}
//               className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
//                 value === score
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//               }`}
//             >
//               {score === 0 ? 'Poor' : 
//                score === 25 ? 'Poor/Avg' : 
//                score === 50 ? 'Avg' : 
//                score === 75 ? 'Good' : 'Excel'}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const YesNoSelection = ({ value, onChange }) => {
//   return (
//     <div className="flex space-x-4">
//       <button
//         onClick={() => onChange("yes")}
//         className={`flex-1 py-3 rounded-lg border-2 transition-all ${
//           value === true
//             ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//             : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
//         }`}
//       >
//         <div className="flex flex-col items-center">
//           <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mb-2 ${
//             value === true 
//               ? 'border-green-500 bg-green-500 text-white' 
//               : 'border-gray-400'
//           }`}>
//             {value === true && <FiCheck className="text-xs" />}
//           </div>
//           <span className="font-medium">YES</span>
//         </div>
//       </button>
      
//       <button
//         onClick={() => onChange("no")}
//         className={`flex-1 py-3 rounded-lg border-2 transition-all ${
//           value === false
//             ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
//             : 'border-gray-300 dark:border-gray-600 hover:border-red-500'
//         }`}
//       >
//         <div className="flex flex-col items-center">
//           <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mb-2 ${
//             value === false 
//               ? 'border-red-500 bg-red-500 text-white' 
//               : 'border-gray-400'
//           }`}>
//             {value === false && <span className="text-xs">✕</span>}
//           </div>
//           <span className="font-medium">NO</span>
//         </div>
//       </button>
//     </div>
//   );
// };

// export default FeedbackForm;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiCheck, FiAlertCircle, FiStar, FiMessageSquare, FiCalendar, FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi';
import useMobile from '../../hooks/useMobile';

const FeedbackForm = ({ vessel, onSubmit }) => {
  const { user } = useSelector(state => state.auth);
  const isMobile = useMobile();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Vessel Information
    vesselName: vessel?.name || "M.V. SSL THAMIRABARANI",
    vesselIMO: vessel?.imoNumber || "IMO: 9312468",
    vesselSR: "SR/4354",
    ownerRep: "MR. KABILAN SADASIVAM - FLEET MANAGEMENT INDIA PVT LTD (INDIA)",
    shipManager: "MR. SAMPATH WIJESINGHE",
    feedbackDate: new Date().toISOString().split('T')[0],
    arrivalDate: "",
    completionDate: "",
    sailingDate: "",
    specDuration: "",
    agreedDuration: "",
    actualDuration: "",
    
    // Ratings (0-100 scale)
    ratings: {
      responsiveness: 0,
      publicRelations: 0,
      deckPlanning: 0,
      deckPipesQuality: 0,
      deckPipesTimely: 0,
      deckTankQuality: 0,
      deckTankTimely: 0,
      deckMachineryQuality: 0,
      deckMachineryTimely: 0,
      deckSteelQuality: 0,
      deckSteelTimely: 0,
      enginePlanning: 0,
      enginePipesQuality: 0,
      enginePipesTimely: 0,
      rudderQuality: 0,
      rudderTimely: 0,
      mainEngineQuality: 0,
      mainEngineTimely: 0,
      otherEngineQuality: 0,
      otherEngineTimely: 0,
      steelPlanning: 0,
      steelWorkQuality: 0,
      steelWorkTimely: 0,
      electricalPlanning: 0,
      electricalQuality: 0,
      electricalTimely: 0,
      electronicQuality: 0,
      electronicTimely: 0,
      automationQuality: 0,
      automationTimely: 0,
      surfacePlanning: 0,
      blastingQuality: 0,
      blastingTimely: 0,
      paintingQuality: 0,
      paintingTimely: 0,
      tankCleaningQuality: 0,
      tankCleaningTimely: 0,
      stagingQuality: 0,
      docking: 0,
      undocking: 0,
      mooring: 0,
      unmooring: 0,
      outfittingPlanning: 0,
      carpentryQuality: 0,
      carpentryTimely: 0,
      claddingQuality: 0,
      claddingTimely: 0,
      aluminumQuality: 0,
      aluminumTimely: 0,
      generalServices: 0,
      materialsQuality: 0,
      materialsDelivery: 0,
      overallQuality: 0,
      safetyEnvironment: 0,
      competitorPerformance: 0,
    },
    
    // Yes/No Questions
    valueForMoney: null,
    recommend: null,
    
    // Additional Comments
    poorAverageDetails: "",
    observations: "",
    shipManagerComments: "",
    
    // Feedback Reference
    feedbackRef: `FB-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  });

  const steps = [
    { id: 0, title: 'Vessel Details', icon: <FiCalendar /> },
    { id: 1, title: 'Responsiveness', icon: <FiMessageSquare /> },
    { id: 2, title: 'Deck Dept', icon: <FiStar /> },
    { id: 3, title: 'Engine Dept', icon: <FiStar /> },
    { id: 4, title: 'Steel & Electrical', icon: <FiStar /> },
    { id: 5, title: 'Surface & Docking', icon: <FiStar /> },
    { id: 6, title: 'Outfitting', icon: <FiStar /> },
    { id: 7, title: 'Overall', icon: <FiAlertCircle /> },
    { id: 8, title: 'Review', icon: <FiCheck /> },
    { id: 9, title: 'Complete', icon: <FiCheck /> },
  ];

  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.min(Math.max(currentStep, 0), steps.length - 1);
  const currentStepData = steps[safeCurrentStep] || steps[0];

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: parseInt(value)
      }
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleYesNoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "yes"
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    }
  };

  const calculateOverallScore = () => {
    const ratings = Object.values(formData.ratings).filter(r => r > 0);
    return ratings.length > 0 
      ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
      : 0;
  };

  const handleSubmit = async () => {
    // Calculate overall score
    const overallScore = calculateOverallScore();

    const finalData = {
      ...formData,
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedBy: user?.name || "Anonymous",
      submittedAt: new Date().toISOString(),
      overallScore,
      vesselName: vessel?.name || formData.vesselName,
      vesselIMO: vessel?.imoNumber || formData.vesselIMO
    };

    console.log('Submitting feedback:', finalData);
    
    // Call the onSubmit prop with the final data
    if (onSubmit) {
      onSubmit(finalData);
    }
    
    // Go to completion step
    setCurrentStep(9);
  };

  // Mobile Progress Indicator
  const MobileProgressIndicator = () => (
    <div className="md:hidden mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`p-2 rounded-lg ${currentStep === 0 ? 'text-gray-400' : 'text-blue-600'}`}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {currentStepData?.title || 'Step'}
          </div>
        </div>
        
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className={`p-2 rounded-lg ${currentStep === steps.length - 1 ? 'text-gray-400' : 'text-blue-600'}`}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );

  // Mobile Step Navigation Buttons
  const MobileStepButtons = () => {
    if (currentStep >= steps.length - 1) return null;
    
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-10 shadow-lg">
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-3 rounded-lg flex-1 mr-2 ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <FiChevronLeft className="inline mr-2" />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg flex-1 ml-2"
          >
            {currentStep === steps.length - 2 ? 'Review' : 'Next'}
            <FiChevronRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Mobile Optimized Rating Card
  const MobileRatingCard = ({ title, description, value, onChange, compact = false }) => {
    const getRatingLabel = (score) => {
      if (score <= 25) return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' };
      if (score <= 50) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' };
      if (score <= 75) return { text: 'Good', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' };
      return { text: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' };
    };

    const label = getRatingLabel(value);

    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
        compact ? 'p-3' : 'p-4'
      }`}>
        <div className="mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">{title}</h4>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${label.bg} ${label.color}`}>
                {label.text}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          
          <div className="grid grid-cols-5 gap-1 pt-2">
            {[0, 25, 50, 75, 100].map(score => (
              <button
                key={score}
                onClick={() => onChange(score)}
                className={`py-1.5 text-xs rounded transition-colors ${
                  value === score
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {score === 0 ? 'P' : 
                 score === 25 ? 'P/A' : 
                 score === 50 ? 'A' : 
                 score === 75 ? 'G' : 'E'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Desktop Rating Card
  const DesktopRatingCard = ({ title, description, value, onChange, compact = false }) => {
    const getRatingLabel = (score) => {
      if (score <= 25) return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' };
      if (score <= 50) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' };
      if (score <= 75) return { text: 'Good', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' };
      return { text: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' };
    };

    const label = getRatingLabel(value);

    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
        compact ? 'p-4' : 'p-6'
      }`}>
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${label.bg} ${label.color}`}>
              {label.text}
            </span>
          </div>
          
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
            
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>0 (Poor)</span>
              <span>25</span>
              <span>50 (Average)</span>
              <span>75</span>
              <span>100 (Excellent)</span>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            {[0, 25, 50, 75, 100].map(score => (
              <button
                key={score}
                onClick={() => onChange(score)}
                className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
                  value === score
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {score === 0 ? 'Poor' : 
                 score === 25 ? 'Poor/Avg' : 
                 score === 50 ? 'Average' : 
                 score === 75 ? 'Good' : 'Excellent'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const RatingCard = isMobile ? MobileRatingCard : DesktopRatingCard;

  const YesNoSelection = ({ value, onChange, title, description }) => {
    return (
      <div className="space-y-3">
        <div>
          <h4 className={`font-medium text-gray-900 dark:text-white ${isMobile ? 'text-base' : 'text-lg'}`}>
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className={`flex space-x-4 ${isMobile ? 'space-x-2' : ''}`}>
          <button
            onClick={() => onChange("yes")}
            className={`${isMobile ? 'flex-1 py-2' : 'flex-1 py-3'} rounded-lg border-2 transition-all ${
              value === true
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} rounded-full border-2 flex items-center justify-center mb-2 ${
                value === true 
                  ? 'border-green-500 bg-green-500 text-white' 
                  : 'border-gray-400'
              }`}>
                {value === true && <FiCheck className={isMobile ? "text-xs" : ""} />}
              </div>
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>YES</span>
            </div>
          </button>
          
          <button
            onClick={() => onChange("no")}
            className={`${isMobile ? 'flex-1 py-2' : 'flex-1 py-3'} rounded-lg border-2 transition-all ${
              value === false
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-red-500'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} rounded-full border-2 flex items-center justify-center mb-2 ${
                value === false 
                  ? 'border-red-500 bg-red-500 text-white' 
                  : 'border-gray-400'
              }`}>
                {value === false && <span className={isMobile ? "text-xs" : ""}>✕</span>}
              </div>
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>NO</span>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const getStepContent = () => {
    const cardClass = isMobile ? "p-4" : "p-6";
    const titleClass = isMobile ? "text-lg mb-2" : "text-2xl mb-2";
    const descClass = isMobile ? "text-sm" : "text-base";

    switch (safeCurrentStep) {
      case 0:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Vessel Information
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Please provide vessel details and timeline information
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vessel Name
                </label>
                <input
                  type="text"
                  value={formData.vesselName}
                  onChange={(e) => handleInputChange('vesselName', e.target.value)}
                  className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                />
              </div>
              
              <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-2 gap-4'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    IMO Number
                  </label>
                  <input
                    type="text"
                    value={formData.vesselIMO}
                    onChange={(e) => handleInputChange('vesselIMO', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SR Number
                  </label>
                  <input
                    type="text"
                    value={formData.vesselSR}
                    onChange={(e) => handleInputChange('vesselSR', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                      className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => handleInputChange('completionDate', e.target.value)}
                      className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sailing Date
                    </label>
                    <input
                      type="date"
                      value={formData.sailingDate}
                      onChange={(e) => handleInputChange('sailingDate', e.target.value)}
                      className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    />
                  </div>
                </div>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-3 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Spec Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={formData.specDuration}
                    onChange={(e) => handleInputChange('specDuration', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Agreed Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={formData.agreedDuration}
                    onChange={(e) => handleInputChange('agreedDuration', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Actual Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={formData.actualDuration}
                    onChange={(e) => handleInputChange('actualDuration', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                    min="0"
                  />
                </div>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Owner's Representative
                  </label>
                  <input
                    type="text"
                    value={formData.ownerRep}
                    onChange={(e) => handleInputChange('ownerRep', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ship Manager
                  </label>
                  <input
                    type="text"
                    value={formData.shipManager}
                    onChange={(e) => handleInputChange('shipManager', e.target.value)}
                    className={`input-field ${isMobile ? 'py-2 text-sm' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Responsiveness & Public Relations
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Rate our initial communication and PR services
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="1.0 Responsiveness to initial inquiry"
                description="How quickly and effectively did we respond to your initial inquiry?"
                value={formData.ratings.responsiveness}
                onChange={(value) => handleRatingChange('responsiveness', value)}
              />
              
              <RatingCard
                title="2.0 Public Relations"
                description="Quality of our public relations and customer service"
                value={formData.ratings.publicRelations}
                onChange={(value) => handleRatingChange('publicRelations', value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Deck Department Work
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Evaluate deck department performance
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="3.1 Planning of work"
                description="Quality of work planning and scheduling"
                value={formData.ratings.deckPlanning}
                onChange={(value) => handleRatingChange('deckPlanning', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  3.2 Pipes and valve repairs on deck
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.deckPipesQuality}
                    onChange={(value) => handleRatingChange('deckPipesQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.deckPipesTimely}
                    onChange={(value) => handleRatingChange('deckPipesTimely', value)}
                    compact
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  3.3 Tank cleaning and repairs
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.deckTankQuality}
                    onChange={(value) => handleRatingChange('deckTankQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.deckTankTimely}
                    onChange={(value) => handleRatingChange('deckTankTimely', value)}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Engine Department Work
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Evaluate engine department performance
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="4.1 Planning of work"
                description="Quality of work planning and scheduling"
                value={formData.ratings.enginePlanning}
                onChange={(value) => handleRatingChange('enginePlanning', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  4.2 E/R, P/R pipes and valves repair
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.enginePipesQuality}
                    onChange={(value) => handleRatingChange('enginePipesQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.enginePipesTimely}
                    onChange={(value) => handleRatingChange('enginePipesTimely', value)}
                    compact
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  4.3 Rudder and propeller work
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.rudderQuality}
                    onChange={(value) => handleRatingChange('rudderQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.rudderTimely}
                    onChange={(value) => handleRatingChange('rudderTimely', value)}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Steel Repairs & Electrical Work
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Evaluate steel and electrical department performance
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="5.1 Planning of work (Steel)"
                description="Quality of steel work planning and scheduling"
                value={formData.ratings.steelPlanning}
                onChange={(value) => handleRatingChange('steelPlanning', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  5.2 Steel work
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.steelWorkQuality}
                    onChange={(value) => handleRatingChange('steelWorkQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.steelWorkTimely}
                    onChange={(value) => handleRatingChange('steelWorkTimely', value)}
                    compact
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  6.1 Electrical work planning
                </h4>
                <RatingCard
                  title="Planning of work"
                  value={formData.ratings.electricalPlanning}
                  onChange={(value) => handleRatingChange('electricalPlanning', value)}
                />
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  6.2 Electrical work execution
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.electricalQuality}
                    onChange={(value) => handleRatingChange('electricalQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.electricalTimely}
                    onChange={(value) => handleRatingChange('electricalTimely', value)}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Surface Preparation & Docking
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Evaluate surface preparation and docking operations
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="7.1 Planning of work (Surface)"
                description="Quality of surface work planning and scheduling"
                value={formData.ratings.surfacePlanning}
                onChange={(value) => handleRatingChange('surfacePlanning', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  7.2 Blasting
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.blastingQuality}
                    onChange={(value) => handleRatingChange('blastingQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.blastingTimely}
                    onChange={(value) => handleRatingChange('blastingTimely', value)}
                    compact
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  7.3 Painting
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.paintingQuality}
                    onChange={(value) => handleRatingChange('paintingQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.paintingTimely}
                    onChange={(value) => handleRatingChange('paintingTimely', value)}
                    compact
                  />
                </div>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                <RatingCard
                  title="8.1 Docking"
                  description="Quality of docking operations"
                  value={formData.ratings.docking}
                  onChange={(value) => handleRatingChange('docking', value)}
                />
                <RatingCard
                  title="8.2 Undocking"
                  description="Quality of undocking operations"
                  value={formData.ratings.undocking}
                  onChange={(value) => handleRatingChange('undocking', value)}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Outfitting & General Services
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Evaluate outfitting work and general services
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="9.1 Planning of work (Outfitting)"
                description="Quality of outfitting work planning"
                value={formData.ratings.outfittingPlanning}
                onChange={(value) => handleRatingChange('outfittingPlanning', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  9.2 Carpentry work
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.carpentryQuality}
                    onChange={(value) => handleRatingChange('carpentryQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="Timely Completion"
                    value={formData.ratings.carpentryTimely}
                    onChange={(value) => handleRatingChange('carpentryTimely', value)}
                    compact
                  />
                </div>
              </div>

              <RatingCard
                title="10.0 General Services"
                description="Fresh water supply, Shore power supply, ballasting, Cooling water, Ventilation, Fire Line, Crane Facility etc."
                value={formData.ratings.generalServices}
                onChange={(value) => handleRatingChange('generalServices', value)}
              />
              
              <div className="space-y-3">
                <h4 className={`font-semibold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  11.0 Supply of Materials
                </h4>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                  <RatingCard
                    title="Quality"
                    value={formData.ratings.materialsQuality}
                    onChange={(value) => handleRatingChange('materialsQuality', value)}
                    compact
                  />
                  <RatingCard
                    title="In time delivery"
                    value={formData.ratings.materialsDelivery}
                    onChange={(value) => handleRatingChange('materialsDelivery', value)}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Overall Evaluation
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Final assessment and additional comments
              </p>
            </div>
            
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <RatingCard
                title="12.0 Overall Quality of Service"
                description="Your overall impression of our services"
                value={formData.ratings.overallQuality}
                onChange={(value) => handleRatingChange('overallQuality', value)}
              />
              
              <RatingCard
                title="13.0 Yard's Health, Safety & Environment Practice"
                description="Assessment of our HSE practices"
                value={formData.ratings.safetyEnvironment}
                onChange={(value) => handleRatingChange('safetyEnvironment', value)}
              />
              
              <RatingCard
                title="14.0 How do you place our performance among competitors?"
                description="Compared to other shipyards you have worked with"
                value={formData.ratings.competitorPerformance}
                onChange={(value) => handleRatingChange('competitorPerformance', value)}
              />

              <YesNoSelection
                title="15.0 In overall, has CDPLC given value for your money?"
                description="Did you feel you received good value for the services provided?"
                value={formData.valueForMoney}
                onChange={(value) => handleYesNoChange('valueForMoney', value)}
              />

              <YesNoSelection
                title="16.0 Would you recommend CDPLC to another Business Partner?"
                description="Would you recommend our services to other companies?"
                value={formData.recommend}
                onChange={(value) => handleYesNoChange('recommend', value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  17.0 Other observations/recommendations/suggestions for improvements
                </label>
                <textarea
                  value={formData.observations}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                  className={`input-field ${isMobile ? 'h-24 text-sm' : 'h-32'}`}
                  placeholder="Enter your observations and suggestions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  18.0 Details on Poor / Average / Undesirable Situation
                </label>
                <textarea
                  value={formData.poorAverageDetails}
                  onChange={(e) => handleInputChange('poorAverageDetails', e.target.value)}
                  className={`input-field ${isMobile ? 'h-24 text-sm' : 'h-32'}`}
                  placeholder="If you selected 'Poor' or 'Average' in any category, please provide details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  19.0 Ship Manager's Comments (Optional)
                </label>
                <textarea
                  value={formData.shipManagerComments}
                  onChange={(e) => handleInputChange('shipManagerComments', e.target.value)}
                  className={`input-field ${isMobile ? 'h-24 text-sm' : 'h-32'}`}
                  placeholder="Any additional comments from ship management..."
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="mb-4">
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Review Your Feedback
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Please review all information before submitting
              </p>
            </div>

            {/* User Info */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <FiUser className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.name || 'Anonymous User'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This feedback will be saved locally to your browser
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg p-4 mb-6">
              <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'}`}>
                <div className={`${isMobile ? 'mb-4' : ''}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Feedback Summary
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reference: <span className="font-medium">{formData.feedbackRef}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vessel: <span className="font-medium">{formData.vesselName}</span>
                  </p>
                </div>
                <div className={`text-center ${isMobile ? '' : ''}`}>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {calculateOverallScore()}
                  </div>
                  <span className="px-4 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                    Overall Score
                  </span>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Ratings Summary
              </h4>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-3 gap-4'} mb-6`}>
                {Object.entries(formData.ratings)
                  .filter(([_, score]) => score > 0)
                  .slice(0, isMobile ? 6 : 12)
                  .map(([category, score]) => {
                    const getScoreColor = (s) => {
                      if (s >= 75) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
                      if (s >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
                      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
                    };
                    
                    return (
                      <div key={category} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                            {category.split(/(?=[A-Z])/).slice(0, 2).join(' ')}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(score)}`}>
                            {score}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              score >= 75 ? 'bg-green-500' :
                              score >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {Object.values(formData.ratings).filter(r => r > 0).length} categories rated
              </div>
            </div>

            {/* Comments Preview */}
            {(formData.observations || formData.poorAverageDetails) && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Comments Preview
                </h4>
                
                {formData.observations && (
                  <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Observations:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {formData.observations}
                    </p>
                  </div>
                )}
                
                {formData.poorAverageDetails && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-1">Areas for Improvement:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {formData.poorAverageDetails}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between space-x-4'}`}>
              <button
                onClick={() => setCurrentStep(0)}
                className={`${isMobile ? 'w-full py-3' : 'px-6 py-2'} border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700`}
              >
                Edit Feedback
              </button>
              
              <button
                onClick={handleSubmit}
                className={`${isMobile ? 'w-full py-3' : 'px-6 py-2'} bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Feedback Submitted Successfully!
              </h2>
              
              <p className={`text-gray-600 dark:text-gray-400 mb-6 ${descClass}`}>
                Your feedback has been saved locally and can be viewed in the Feedback History section.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.feedbackRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Vessel:</span>
                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{formData.vesselName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Score:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{calculateOverallScore()}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Just now</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-center space-x-4'}`}>
                <button
                  onClick={() => {
                    // Reset form for new feedback
                    setFormData({
                      ...formData,
                      feedbackRef: `FB-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                      ratings: Object.keys(formData.ratings).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
                      valueForMoney: null,
                      recommend: null,
                      observations: "",
                      poorAverageDetails: "",
                      shipManagerComments: "",
                      arrivalDate: "",
                      completionDate: "",
                      sailingDate: "",
                      specDuration: "",
                      agreedDuration: "",
                      actualDuration: "",
                    });
                    setCurrentStep(0);
                  }}
                  className={`${isMobile ? 'w-full py-3' : 'px-6 py-2'} bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
                >
                  Submit Another Feedback
                </button>
                
                <button
                  onClick={() => {
                    // This will be handled by parent component
                    if (window.location.pathname.includes('/feedback')) {
                      window.location.reload();
                    }
                  }}
                  className={`${isMobile ? 'w-full py-3' : 'px-6 py-2'} border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                  View History
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your feedback is now saved in your browser's local storage.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}>
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              
              <h2 className={`font-bold text-gray-900 dark:text-white ${titleClass}`}>
                Step Not Available
              </h2>
              
              <p className={`text-gray-600 dark:text-gray-400 mb-6 ${descClass}`}>
                Please start from the beginning.
              </p>
              
              <button
                onClick={() => setCurrentStep(0)}
                className={`${isMobile ? 'w-full py-3' : 'px-6 py-2'} bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
              >
                Go to First Step
              </button>
            </div>
          </div>
        );
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                  index === currentStep
                    ? 'bg-blue-600 text-white scale-110'
                    : index < currentStep
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
              >
                {index < currentStep ? <FiCheck /> : step.icon}
              </button>
              <span className={`mt-2 text-xs text-center ${
                index === currentStep
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Progress Indicator */}
      {isMobile && currentStep <= steps.length - 1 && <MobileProgressIndicator />}
      
      {/* Main Content */}
      <div className={`${isMobile ? 'mb-16' : 'mb-8'}`}>
        {getStepContent()}
      </div>
      
      {/* Mobile Step Buttons */}
      {isMobile && currentStep < steps.length - 1 && currentStep !== 8 && currentStep !== 9 && <MobileStepButtons />}
      
      {/* Desktop Navigation */}
      {!isMobile && currentStep < steps.length - 1 && currentStep !== 8 && currentStep !== 9 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {currentStep === steps.length - 2 ? 'Review' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;