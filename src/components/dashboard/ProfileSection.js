
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiMapPin, FiPhone, FiMail, FiGlobe, FiCalendar, FiStar, FiUser } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';
import { generateAvatar } from '../../utils/helpers';
import { userService } from '../../services/userService';

const ProfileSection = () => {
  const { serviceUser } = useSelector(state => state.user);
  // Helper to show N/A if value is missing/empty
  const showValue = v => (v && v !== '.' && v !== '' ? v : 'N/A');
  let userData = {
    name: 'N/A',
    address: 'N/A',
    phone: 'N/A',
    fax: 'N/A',
    mobile: 'N/A',
    email: 'N/A',
    contactPerson: 'N/A',
  };
  if (serviceUser && typeof serviceUser === 'object' && Array.isArray(serviceUser.ResultSet) && serviceUser.ResultSet.length > 0) {
    const pod = serviceUser.ResultSet[0];
    userData = {
      name: showValue(pod.pod_name),
      address: showValue(`${pod.address1 || ''} ${pod.address2 || ''} ${pod.pod_town || ''} ${pod.pod_city || ''} ${pod.pod_country || ''}`.replace(/\s+/g, ' ').trim()),
      phone: showValue(pod.telno),
      fax: showValue(pod.faxno),
      mobile: showValue(pod.pod_mobileno),
      email: showValue(pod.email),
      contactPerson: showValue(pod.contactperson),
    };
  }
  const avatar = generateAvatar(userData.name !== 'N/A' ? userData.name : 'User');
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  useEffect(() => {
    let cancelled = false;
    let blobUrl = null;
    const svc = (serviceUser && Array.isArray(serviceUser.ResultSet) && serviceUser.ResultSet[0]?.serviceNo) || localStorage.getItem('serviceNo');
    if (!svc) return;

    (async () => {
      try {
        const blob = await userService.fetchProfilePic(svc);
        if (cancelled) return;
        if (blob && blob.size > 0) {
          blobUrl = URL.createObjectURL(blob);
          setProfileImgUrl(blobUrl);
        }
      } catch (err) {
        // ignore silently, keep avatar fallback
        console.debug('No profile pic for dashboard section', err?.message || err);
      }
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [serviceUser]);
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {profileImgUrl ? (
            <img src={profileImgUrl} alt="Profile" className="h-10 w-10 rounded-full mr-3 flex-shrink-0 object-cover" />
          ) : (
            <div className={`h-10 w-10 rounded-full ${avatar.color} flex items-center justify-center mr-3 flex-shrink-0`}>
              <span className="text-white font-bold text-lg">
                {avatar.initials}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {userData.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiMail className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Email</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.email}</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiPhone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Phone</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.phone}</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiMapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Address</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.address}</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiMail className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Fax</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.fax}</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiPhone className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Mobile</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.mobile}</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <FiUser className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Contact Person</p>
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{userData.contactPerson}</p>
          </div>
        </div>
      </div>
      {/* No bottom info bar, as requested */}
    </div>
  );
};

export default ProfileSection;


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