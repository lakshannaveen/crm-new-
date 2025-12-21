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
import oceanQueenImage from "../assets/image/ocean_queen_12.jpg";
import SeaVoyagerImage from "../assets/image/MV Sea Voyager.jpg";
import BlueWaveImage from "../assets/image/MV Blue Wave.jpg";
import EverUniqueImage from "../assets/image/unq.jpg"
import axios from "axios";
import { BACKEND_BASE_URL } from "..";

class ShipService {
  // Transform API response to component-expected format
  transformShipData(apiShip) {
    const pick = (...keys) => {
      for (const key of keys) {
        const value = apiShip?.[key];
        if (value !== undefined && value !== null && value !== "") return value;
      }
      return undefined;
    };

    return {
      id: apiShip.SHIP_JMAIN,
      jmainNo: apiShip.SHIP_JMAIN,
      name: apiShip.SHIP_VESSEL_NAME || "Unknown Ship",
      imoNumber: apiShip.SHIP_IMO_NO || "N/A",
      type: this.getVesselType(apiShip.SHIP_VESSEL_TYPE),
      flag: apiShip.SHIP_VESSEL_FLAG,
      dwt: apiShip.SHIP_DEAD_WEIGHT,
      grossTonnage: apiShip.SHIP_GROSS_TONNAGE,
      length: apiShip.SHIP_LENGHT_OVERALL
        ? `${apiShip.SHIP_LENGHT_OVERALL}m`
        : "",
      beam: apiShip.SHIP_BREADTH_EXTREME
        ? `${apiShip.SHIP_BREADTH_EXTREME}m`
        : "",
      draft: apiShip.SHIP_DRAFT ? `${apiShip.SHIP_DRAFT}m` : "",
      yearBuilt: apiShip.SHIP_COMPLETION_DATE,

      // Financial fields (used in ShipDetailsPage)
      currency: pick("SHIP_CURRENCY", "CURRENCY", "CURRENCY_CODE", "CURR_CODE"),
      currencyRate: pick(
        "SHIP_CURRENCY_RATE",
        "CURRENCY_RATE",
        "EXCHANGE_RATE",
        "CURR_RATE",
        "CURRENCY_EXCHANGE_RATE"
      ),
      foreignValue: pick(
        "SHIP_FOREIGN_VALUE",
        "FOREIGN_VALUE",
        "FOREIGN_AMOUNT",
        "FC_VALUE",
        "FC_AMOUNT"
      ),
      localValue: pick(
        "SHIP_LOCAL_VALUE",
        "LOCAL_VALUE",
        "LOCAL_AMOUNT",
        "LC_VALUE",
        "LC_AMOUNT"
      ),
      expectedRevenue: pick(
        "SHIP_EXPECTED_REVENUE",
        "EXPECTED_REVENUE",
        "EXP_REVENUE",
        "ESTIMATE_VALUE",
        "SHIP_ESTIMATE_VALUE"
      ),

      // A few common extra fields referenced by the details page
      shipCategory: pick("SHIP_CATEGORY", "JOB_CATEGORY", "SHIP_JOB_CATEGORY","SHIP_JCAT" ),
      jobMain: pick("JOB_MAIN", "SHIP_JOB_MAIN", "SHIP_JOB_MAIN_DESC","SHIP_JMAIN"),
      projectName: pick("PROJECT_NAME", "SHIP_PROJECT_NAME"),
      repairSummary: pick("REPAIR_SUMMARY", "SHIP_REPAIR_SUMMARY"),
      vesselHistory: pick("VESSEL_HISTORY", "SHIP_VESSEL_HISTORY"),

      // Management fields
      shipManager: pick("SHIP_MANAGER", "MANAGER", "SHIP_MANAGER_NAME", "SHIP_SHIP_MANAGER"),
      estimateEngineer: pick(
        "ESTIMATE_ENGINEER",
        "EST_ENGINEER",
        "SHIP_ESTIMATE_ENGINEER"
      ),
      projectManager: pick(
        "PROJECT_MANAGER",
        "PROJ_MANAGER",
        "SHIP_PROJECT_MANAGER"
      ),
      invoiceEngineer: pick(
        "INVOICE_ENGINEER",
        "INV_ENGINEER",
        "SHIP_INVOICE_ENGINEER"
      ),
      projectEngineer: pick(
        "PROJECT_ENGINEER",
        "PROJ_ENGINEER",
        "SHIP_PROJECT_ENGINEER"
      ),

      // Status fields
      workDoneStatus: pick(
        "WORK_DONE_STATUS",
        "SHIP_WORK_DONE_STATUS",
        "WD_STATUS",
        "SHIP_WD_STATUS"
      ),
      billStatus: pick("BILL_STATUS", "SHIP_BILL_STATUS", "BILLING_STATUS"),
      invoiceStatus: pick(
        "INVOICE_STATUS",
        "SHIP_INVOICE_STATUS",
        "INV_STATUS"
      ),
      dockNumber: pick(
        "DOCK_NUMBER",
        "SHIP_DOCK_NUMBER",
        "DOCK_NO",
        "SHIP_DOCKNO"
      ),
      completionDate: pick(
        "COMPLETION_DATE",
        "SHIP_COMPLETION_DATE",
        "COMPLETE_DATE"
      ),

      // Classification fields
      classNotation: pick("CLASS_NOTATION", "SHIP_CLASS_NOTATION", "CLASS_NOT"),
      classificationDual: pick(
        "CLASSIFICATION_DUAL",
        "SHIP_CLASSIFICATION_DUAL",
        "CLASS_DUAL"
      ),
      estimateLaborRate: pick(
        "ESTIMATE_LABOR_RATE",
        "EST_LABOR_RATE",
        "SHIP_EST_LABOR_RATE"
      ),

      // Code fields
      agentCode: pick("AGENT_CODE", "SHIP_AGENT_CODE", "AGT_CODE"),
      ownerCode: pick("OWNER_CODE", "SHIP_OWNER_CODE", "OWN_CODE"),
      paymentCode: pick("PAYMENT_CODE", "SHIP_PAYMENT_CODE", "PAY_CODE"),

      // Coating fields
      coatingInspector: pick(
        "COATING_INSPECTOR",
        "SHIP_COATING_INSPECTOR",
        "COAT_INSPECTOR"
      ),
      coatingProvider: pick(
        "COATING_PROVIDER",
        "SHIP_COATING_PROVIDER",
        "COAT_PROVIDER"
      ),

      // Duration fields
      afloatDuration: pick(
        "AFLOAT_DURATION",
        "SHIP_AFLOAT_DURATION",
        "AFLOAT_DAYS", "SHIP_AFLOT_DURATION"
      ),
      inDockDuration: pick(
        "IN_DOCK_DURATION",
        "SHIP_INDOCK_DURATION",
        "DOCK_DURATION",
        "DOCK_DAYS"
      ),

      // Additional specifications
      depth: pick("SHIP_DEPTH", "DEPTH", "SHIP_DEPTH_MOULDED"),
      displacement: pick("SHIP_DISPLACEMENT", "DISPLACEMENT", "DISPL"),
      speed: pick("SHIP_SPEED", "SPEED", "SERVICE_SPEED"),
      previousName: pick("PREVIOUS_NAME", "SHIP_PREVIOUS_NAME", "PREV_NAME","SHIP_VESSEL_EXNAME"),

      // Contact/Location fields
      country: pick("COUNTRY", "SHIP_COUNTRY", "COUNTRY_NAME"),
      ppdSite: pick("PPD_SITE", "SHIP_PPD_SITE", "SITE"),

      status: "planned",
      progress: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      image: this.getShipImage(apiShip),
      raw: apiShip,
    };
  }

  getVesselType(code) {
    const map = {
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
      '12': 'Chemical Tanker'
    };
    return map[code] || "Other";
  }

  getShipImage(ship) {
    const type = (ship.SHIP_VESSEL_TYPE || "").toString();
    if (type === "7") return oceanQueenImage,EverUniqueImage;
    if (type === "1") return SeaVoyagerImage;
    if (type === "2") return BlueWaveImage;
    return oceanQueenImage;
  }

  async getShips(serviceNo) {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/GetOwnersShip`,
      { params: { P_SERVICE_NO: serviceNo } }
    );

    const list = response.data?.ResultSet || [];
    return list.map((s) => this.transformShipData(s));
  }

  async getShipDetails(serviceNo, jmainNo) {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/GetShipByJmainId`,
      {
        params: {
          p_service_no: serviceNo,
          p_jmain_no: jmainNo,
        },
      }
    );

    const payload = response.data;
    const record =
      (Array.isArray(payload?.ResultSet) && payload.ResultSet.length
        ? payload.ResultSet[0]
        : null) ?? (Array.isArray(payload) ? payload[0] : payload);

    if (!record || record.SHIP_JMAIN == null) {
      throw new Error("Ship details not found in API response");
    }

    return this.transformShipData(record);
  }

  async addShip(shipData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newShip = {
      id: Date.now(),
      ...shipData,
      createdAt: new Date().toISOString(),
    };
    this.ships.push(newShip);
    return newShip;
  }

  async updateShip(shipId, shipData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = this.ships.findIndex((s) => s.id === parseInt(shipId));
    if (index === -1) throw new Error("Ship not found");

    this.ships[index] = { ...this.ships[index], ...shipData };
    return this.ships[index];
  }

  // New method to search ships by various criteria
  async searchShips(criteria) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.ships.filter((ship) => {
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
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.ships.filter((ship) => ship.status === status);
  }

  // New method to get ships by owner
  async getShipsByOwner(ownerId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.ships.filter((ship) => ship.ownerId === parseInt(ownerId));
  }
}

export const shipService = new ShipService();
