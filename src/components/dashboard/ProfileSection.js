// import React from 'react';
// import { useSelector } from 'react-redux';
// import { FiMapPin, FiPhone, FiMail, FiGlobe, FiCalendar, FiStar } from 'react-icons/fi';
// import { formatDate } from '../../utils/formatters';

// const ProfileSection = () => {
//   const { user } = useSelector(state => state.auth);

//   // Mock user data (in real app, this would come from API)
//   const userData = {
//     name: user?.name || 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
//     location: 'LUCHU TAOYUAN COUNTY ,TAIWAN',
//     phone: '+886 033123831',
//     email: user?.email || 'john@oceancargolt.com',
//     website: 'www.oceancargolt.com',
//     joinedDate: '2023-06-15',
//     rating: 4.8,
//     language: 'English',
//     currency: 'USD',
//     source: 'Direct Registration',
//     lastModified: '2024-01-20T10:30:00Z',
//   };

//   return (
//     <div className="card">
//       <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
//         {/* Avatar Section */}
//         <div className="flex flex-col items-center mb-6 md:mb-0">
//           <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
//                         flex items-center justify-center mb-4">
//             <span className="text-white text-4xl font-bold">
//               {userData.name.charAt(0)}
//             </span>
//           </div>
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <FiStar
//                 key={i}
//                 className={`w-5 h-5 ${
//                   i < Math.floor(userData.rating)
//                     ? 'text-yellow-400 fill-yellow-400'
//                     : 'text-gray-300 dark:text-gray-600'
//                 }`}
//               />
//             ))}
//             <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//               {userData.rating}
//             </span>
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="flex-1">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                 {userData.name}
//               </h1>
//               <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
//                 <FiMapPin className="mr-2" />
//                 <span>{userData.location}</span>
//               </div>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <span className="inline-block px-3 py-1 bg-green-100 text-green-800 
//                              dark:bg-green-900 dark:text-green-300 rounded-full text-sm 
//                              font-medium">
//                 Active
//               </span>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="flex items-center">
//               <FiPhone className="text-gray-400 mr-3" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.phone}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <FiMail className="text-gray-400 mr-3" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.email}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <FiGlobe className="text-gray-400 mr-3" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.website}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <FiCalendar className="text-gray-400 mr-3" />
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {formatDate(userData.joinedDate, 'short')}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Other Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                   Language
//                 </p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.language}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                   Currency
//                 </p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.currency}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                   Source
//                 </p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {userData.source}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                   Last Modified
//                 </p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {formatDate(userData.lastModified, 'time')} on{' '}
//                   {formatDate(userData.lastModified, 'short')}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSection;
import React from 'react';
import { useSelector } from 'react-redux';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiCalendar, 
  FiStar,
  FiUser,
  FiCheckCircle,
  FiEdit,
  FiBriefcase,
  FiGlobe
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const ProfileSection = () => {
  const { user } = useSelector(state => state.auth);

  const userData = {
    name: user?.name || 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
    location: 'LUCHU TAOYUAN COUNTY ,TAIWAN',
    phone: '+886 033123831',
    email: user?.email || 'john@oceancargolt.com',
    joinedDate: '2023-06-15',
    rating: 4.8,
    company: 'Ocean Cargo Ltd',
    role: user?.role === 'admin' ? 'Administrator' : 'Ship Owner',
    status: 'Active',
  };

  return (
    <div className="card p-4">
      {/* Ultra Compact Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                        flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {userData.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {userData.name}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 
                             dark:bg-green-900 dark:text-green-300 rounded text-xs font-medium">
                <FiCheckCircle className="w-2.5 h-2.5 mr-1" />
                {userData.status}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              <FiBriefcase className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate mr-3">{userData.company}</span>
              <FiUser className="w-3 h-3 mr-1 flex-shrink-0" />
              <span>{userData.role}</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 
                         dark:hover:bg-blue-900/30 rounded transition-colors flex-shrink-0">
          <FiEdit className="w-4 h-4" />
        </button>
      </div>

      {/* Contact Info Grid - 2x2 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiMail className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Email</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {userData.email}
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiPhone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Phone</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {userData.phone}
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiMapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Location</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {userData.location}
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiGlobe className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Website</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {userData.company.toLowerCase().replace(/\s+/g, '')}.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar - Single Row */}
      <div className="flex items-center justify-between border-t border-gray-200 
                    dark:border-gray-700 pt-2 text-xs">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-3 h-3 mr-1.5 flex-shrink-0" />
          <span className="truncate">Joined {formatDate(userData.joinedDate, 'short')}</span>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <div className="flex mr-1.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(userData.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-900 dark:text-white font-medium text-xs">
              {userData.rating}
            </span>
          </div>
          
          <div className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 
                        px-2 py-0.5 rounded">
            ID: {user?.id?.toString().padStart(6, '0') || '000001'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;



// import React from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   FiMapPin, 
//   FiPhone, 
//   FiMail, 
//   FiGlobe, 
//   FiCalendar, 
//   FiStar,
//   FiUser,
//   FiDollarSign,
//   FiGlobe as FiLanguage,
//   FiEdit,
//   FiCheckCircle
// } from 'react-icons/fi';
// import { formatDate } from '../../utils/formatters';

// const ProfileSection = () => {
//   const { user } = useSelector(state => state.auth);

//   // Mock user data
//   const userData = {
//     name: user?.name || 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
//     location: 'LUCHU TAOYUAN COUNTY ,TAIWAN',
//     phone: '+886 033123831',
//     email: user?.email || 'john@oceancargolt.com',
//     website: 'oceancargolt.com',
//     joinedDate: '2023-06-15',
//     rating: 4.8,
//     language: 'English',
//     currency: 'USD',
//     source: 'Direct Registration',
//     lastModified: '2024-01-20T10:30:00Z',
//     company: 'Ocean Cargo Ltd',
//     role: user?.role === 'admin' ? 'Administrator' : 'Ship Owner',
//     status: 'Active',
//     shipsCount: 3,
//     projectsCount: 5,
//   };

//   return (
//     <div className="card">
//       {/* Compact Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
//                         flex items-center justify-center mr-4">
//             <span className="text-white text-2xl font-bold">
//               {userData.name.charAt(0)}
//             </span>
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//               {userData.name}
//             </h1>
//             <div className="flex items-center mt-1">
//               <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">
//                 {userData.role}
//               </span>
//               <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 
//                              dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium">
//                 <FiCheckCircle className="w-3 h-3 mr-1" />
//                 {userData.status}
//               </span>
//             </div>
//           </div>
//         </div>
//         <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 
//                          dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-100 
//                          dark:hover:bg-blue-900/50 transition-colors text-sm font-medium">
//           <FiEdit className="mr-2" />
//           Edit Profile
//         </button>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
//               <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
//               <p className="text-sm font-medium text-gray-900 dark:text-white">
//                 {formatDate(userData.joinedDate, 'short')}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
//               <FiStar className="w-4 h-4 text-green-600 dark:text-green-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
//               <div className="flex items-center">
//                 <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
//                   {userData.rating}
//                 </span>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar
//                       key={i}
//                       className={`w-3 h-3 ${
//                         i < Math.floor(userData.rating)
//                           ? 'text-yellow-400 fill-yellow-400'
//                           : 'text-gray-300 dark:text-gray-600'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
//           <div className="flex items-center">
//             <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
//               <FiDollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
//               <p className="text-sm font-medium text-gray-900 dark:text-white">
//                 {userData.currency}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
//           <div className="flex items-center">
//             <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg mr-3">
//               <FiLanguage className="w-4 h-4 text-orange-600 dark:text-orange-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Language</p>
//               <p className="text-sm font-medium text-gray-900 dark:text-white">
//                 {userData.language}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Information Grid */}
//       <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Contact Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-3">
//             <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
//                 <FiMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                   {userData.email}
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
//                 <FiPhone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {userData.phone}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
//                 <FiMapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {userData.location}
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
//                 <FiGlobe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Website</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                   {userData.website}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Info Footer */}
//       <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//         <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400">
//           <div className="flex items-center">
//             <FiCalendar className="mr-2" />
//             <span>Last updated: {formatDate(userData.lastModified, 'short')}</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span>Source: {userData.source}</span>
//             <span className="hidden md:inline">•</span>
//             <span className="hidden md:inline">Company: {userData.company}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSection;