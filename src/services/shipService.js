// // Mock service for ship management
// import oceanQueenImage from '../assets/image/ocean_queen_12.jpg';
// import SeaVoyagerImage from '../assets/image/MV Sea Voyager.jpg';
// import BlueWaveImage from '../assets/image/MV Blue Wave.jpg';

// class ShipService {
//   // Mock ships database
//   ships = [
//     {
//       id: 1,
//       name: 'MV Ocean Queen',
//       ownerId: 1,
//       imoNumber: 'IMO 1234567',
//       type: 'Container Ship',
//       flag: 'Panama',
//       dwt: '45,000',
//       grossTonnage: '35,000',
//       length: '250m',
//       beam: '32m',
//       draft: '12m',
//       yearBuilt: '2015',
//       status: 'under_repair',
//       progress: 75,
//       startDate: '2024-01-10',
//       endDate: '2024-03-15',
//       image: oceanQueenImage,
//       lastDryDocking: '2022-05-15',
//       nextDryDocking: '2024-11-20',
//       classSurveyDue: '2024-09-30',
//     },
//     {
//       id: 2,
//       name: 'MV Sea Voyager',
//       ownerId: 1,
//       imoNumber: 'IMO 2345678',
//       type: 'Bulk Carrier',
//       flag: 'Liberia',
//       dwt: '82,000',
//       grossTonnage: '48,000',
//       length: '290m',
//       beam: '45m',
//       draft: '18m',
//       yearBuilt: '2018',
//       status: 'in_dock',
//       progress: 45,
//       startDate: '2024-02-01',
//       endDate: '2024-05-30',
//       image: SeaVoyagerImage,
//       lastDryDocking: '2021-11-10',
//       nextDryDocking: '2025-05-15',
//       classSurveyDue: '2024-12-15',
//     },
//     {
//       id: 3,
//       name: 'MV Blue Wave',
//       ownerId: 1,
//       imoNumber: 'IMO 3456789',
//       type: 'Tanker',
//       flag: 'Marshall Islands',
//       dwt: '120,000',
//       grossTonnage: '68,000',
//       length: '330m',
//       beam: '58m',
//       draft: '22m',
//       yearBuilt: '2020',
//       status: 'planned',
//       progress: 20,
//       startDate: '2024-03-01',
//       endDate: '2024-08-31',
//       image: BlueWaveImage,
//       lastDryDocking: '2023-03-20',
//       nextDryDocking: '2025-09-30',
//       classSurveyDue: '2024-11-30',
//     },
//   ];

//   async getShips() {
//     // Mock API delay
//     await new Promise(resolve => setTimeout(resolve, 500));
//     return this.ships;
//   }

//   async getShipDetails(shipId) {
//     await new Promise(resolve => setTimeout(resolve, 300));
//     const ship = this.ships.find(s => s.id === parseInt(shipId));
//     if (!ship) throw new Error('Ship not found');
//     return ship;
//   }

//   async addShip(shipData) {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     const newShip = {
//       id: Date.now(),
//       ...shipData,
//       createdAt: new Date().toISOString(),
//     };
//     this.ships.push(newShip);
//     return newShip;
//   }

//   async updateShip(shipId, shipData) {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     const index = this.ships.findIndex(s => s.id === parseInt(shipId));
//     if (index === -1) throw new Error('Ship not found');
    
//     this.ships[index] = { ...this.ships[index], ...shipData };
//     return this.ships[index];
//   }
// }

// export const shipService = new ShipService();

// Mock service for ship management
import oceanQueenImage from '../assets/image/ocean_queen_12.jpg';
import SeaVoyagerImage from '../assets/image/MV Sea Voyager.jpg';
import EvermeedImage from '../assets/image/ever meed.jpg';
import unq from '../assets/image/unq.jpg';
import BlueWaveImage from '../assets/image/MV Blue Wave.jpg';

class ShipService {
  ships = [
    // {
    //   id: 1,
    //   name: 'MV Ocean Queen',
    //   ownerId: 1,
    //   imoNumber: 'IMO 1234567',
    //   type: 'Container Ship',
    //   flag: 'Panama',
    //   dwt: '45,000',
    //   grossTonnage: '35,000',
    //   length: '250m',
    //   beam: '32m',
    //   draft: '12m',
    //   yearBuilt: '2015',
    //   status: 'under_repair',
    //   progress: 75,
    //   startDate: '2024-01-10',
    //   endDate: '2024-03-15',
    //   image: oceanQueenImage,
    //   lastDryDocking: '2022-05-15',
    //   nextDryDocking: '2024-11-20',
    //   classSurveyDue: '2024-09-30',
    // },
    // {
    //   id: 2,
    //   name: 'MV Sea Voyager',
    //   ownerId: 1,
    //   imoNumber: 'IMO 2345678',
    //   type: 'Bulk Carrier',
    //   flag: 'Liberia',
    //   dwt: '82,000',
    //   grossTonnage: '48,000',
    //   length: '290m',
    //   beam: '45m',
    //   draft: '18m',
    //   yearBuilt: '2018',
    //   status: 'in_dock',
    //   progress: 45,
    //   startDate: '2024-02-01',
    //   endDate: '2024-05-30',
    //   image: SeaVoyagerImage,
    //   lastDryDocking: '2021-11-10',
    //   nextDryDocking: '2025-05-15',
    //   classSurveyDue: '2024-12-15',
    // },
    // {
    //   id: 3,
    //   name: 'MV Blue Wave',
    //   ownerId: 1,
    //   imoNumber: 'IMO 3456789',
    //   type: 'Tanker',
    //   flag: 'Marshall Islands',
    //   dwt: '120,000',
    //   grossTonnage: '68,000',
    //   length: '330m',
    //   beam: '58m',
    //   draft: '22m',
    //   yearBuilt: '2020',
    //   status: 'planned',
    //   progress: 20,
    //   startDate: '2024-03-01',
    //   endDate: '2024-08-31',
    //   image: BlueWaveImage,
    //   lastDryDocking: '2023-03-20',
    //   nextDryDocking: '2025-09-30',
    //   classSurveyDue: '2024-11-30',
    // },
    // New ships added from provided data

    {
      id: 4,
      name: 'M.V. "EVER MEED"',
      imoNumber: '9935258',
      type: 'Container Ship',
      flag: 'Singapore',
      dwt: '156,349',
      grossTonnage: '165,350',
      length: '366m',
      beam: '51m',
      draft: '15.8m',
      yearBuilt: '2020',
      status: 'under_repair',
      progress: 60,
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      image: EvermeedImage, // Using existing image as placeholder
      lastDryDocking: '2022-08-10',
      nextDryDocking: '2025-02-28',
      classSurveyDue: '2024-10-15',
      // Additional fields from provided data
      ownerId: 1,
      projectName: 'M.V. "EVER MEED"',
      shipCategory: 'SR',
      jobMain: '4301',
      speed: '',
      country: 'Singapore',
      currency: 'USD',
      currencyRate: '299.3',
      foreignValue: '0',
      localValue: '0',
      shipManager: '0004163',
      estimateEngineer: '0004533',
      projectManager: '',
      afloatDuration: '1',
      inDockDuration: '0',
      repairSummary: '',
      depth: '',
      displacement: '',
      classNotation: '',
      completionDate: '',
      dockNumber: '',
      workDoneStatus: 'RD',
      billStatus: 'SB',
      vesselHistory: '',
      estimateLaborRate: '',
      coatingInspector: '',
      coatingProvider: '',
      agentCode: 'A0578',
      ownerCode: 'O0077',
      paymentCode: '',
      invoiceStatus: '',
      invoiceEngineer: '0003715',
      projectEngineer: '',
      expectedRevenue: '4000',
      classificationDual: '',
    },
    {
      id: 5,
      name: 'M.V. "EVER UNIQUE"',
      imoNumber: '',
      type: 'Container Ship',
      flag: 'Taiwan',
      dwt: '63,388',
      grossTonnage: '69,218',
      length: '285m',
      beam: '40m',
      draft: '12.7m',
      yearBuilt: '2018',
      status: 'planned',
      progress: 30,
      startDate: '2024-03-10',
      endDate: '2024-06-15',
      image: unq,  
      lastDryDocking: '2021-06-20',
      nextDryDocking: '2024-12-31',
      classSurveyDue: '2024-08-30', 
      ownerId: 1,
      projectName: '',
      shipCategory: 'SR',
      jobMain: '1771',
      speed: '',
      country: 'Taiwan',
      currency: 'USD',
      currencyRate: '114.98',
      foreignValue: '',
      localValue: '',
      shipManager: '0002356',
      estimateEngineer: '0003051',
      projectManager: '',
      afloatDuration: '13',
      inDockDuration: '0',
      repairSummary: '',
      depth: '',
      displacement: '',
      classNotation: '',
      completionDate: '',
      dockNumber: '',
      workDoneStatus: 'RD',
      billStatus: 'SB',
      vesselHistory: '',
      estimateLaborRate: '',
      coatingInspector: '',
      coatingProvider: '',
      agentCode: 'A0066',
      ownerCode: 'O0077',
      paymentCode: '',
      invoiceStatus: '',
      invoiceEngineer: '',
      projectEngineer: '',
      expectedRevenue: '',
      classificationDual: '',
    },
  ];

  // Helper method to map vessel type codes to readable names
  getVesselType(typeCode) {
    const typeMap = {
      '1': 'Bulk Carrier',
      '2': 'Tanker',
      '3': 'General Cargo',
      '4': 'Passenger Ship',
      '5': 'Offshore',
      '6': 'Tug/Barge',
      '7': 'Container Ship',
      '8': 'RO-RO',
      '9': 'Reefer',
      '10': 'LNG Carrier',
      '11': 'LPG Carrier',
      '12': 'Chemical Tanker',
    };
    return typeMap[typeCode] || 'Other';
  }

  // Helper method to map country codes to names
  getCountryName(countryCode) {
    const countryMap = {
      '209': 'Singapore',
      '216': 'Taiwan',
      '118': 'Panama',
      '124': 'Liberia',
      '138': 'Marshall Islands',
      // Add more country codes as needed
    };
    return countryMap[countryCode] || `Country ${countryCode}`;
  }

  async getShips() {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.ships;
  }

  async getShipDetails(shipId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const ship = this.ships.find(s => s.id === parseInt(shipId));
    if (!ship) throw new Error('Ship not found');
    return ship;
  }

  async addShip(shipData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newShip = {
      id: Date.now(),
      ...shipData,
      createdAt: new Date().toISOString(),
    };
    this.ships.push(newShip);
    return newShip;
  }

  async updateShip(shipId, shipData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.ships.findIndex(s => s.id === parseInt(shipId));
    if (index === -1) throw new Error('Ship not found');
    
    this.ships[index] = { ...this.ships[index], ...shipData };
    return this.ships[index];
  }

  // New method to search ships by various criteria
  async searchShips(criteria) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.ships.filter(ship => {
      for (const key in criteria) {
        if (criteria[key]) {
          const shipValue = ship[key]?.toString().toLowerCase();
          const searchValue = criteria[key].toString().toLowerCase();
          if (!shipValue || !shipValue.includes(searchValue)) {
            return false;
          }
        }
      }
      return true;
    });
  }
 
  async getShipsByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.ships.filter(ship => ship.status === status);
  }

  // New method to get ships by owner
  async getShipsByOwner(ownerId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.ships.filter(ship => ship.ownerId === parseInt(ownerId));
  }
}

export const shipService = new ShipService();