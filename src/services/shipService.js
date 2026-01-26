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

// Ship service for API calls
import axios from "axios";
import { BACKEND_BASE_URL } from "..";
import { authService } from "./authService";

class ShipService {
  // Transform API response to component-expected format
  transformShipData(apiShip) {
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

      status: "planned",
      progress: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      image: null,
      raw: apiShip,
    };
  }

  getVesselType(code) {
    const map = {
      1: "Bulk Carrier",
      2: "Tanker",
      3: "General Cargo",
      4: "Passenger Ship",
      5: "Offshore",
      6: "Tug/Barge",
      7: "Container Ship",
      8: "RO-RO",
      9: "Reefer",
      10: "LNG Carrier",
      11: "LPG Carrier",
      12: "Chemical Tanker",
    };
    return map[code] || "Other";
  }

  async getShipImagePreview(jmain) {
    if (!jmain) {
      throw new Error("Missing ship JMAIN for image preview");
    }

    const headers = {
      ...authService.getAuthHeader(),
    };

    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/ShipicPreview`,
      {
        params: { jmain },
        headers,
        responseType: "blob",
      },
    );

    const blob = response?.data;
    if (!blob) {
      throw new Error("Ship image not available");
    }

    return URL.createObjectURL(blob);
  }

  async uploadShipImage(jmain, imageFile) {
    if (!jmain) {
      throw new Error("Missing ship JMAIN for image upload");
    }
    if (!imageFile) {
      throw new Error("No image file provided");
    }

    const formData = new FormData();
    formData.append("jmain", jmain);
    formData.append("file", imageFile);

    const headers = {
      ...authService.getAuthHeader(),
    };

    const response = await axios.post(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/UploadShipPic`,
      formData,
      { headers },
    );

    return response.data;
  }

  /**
   * Fetch feedback PDF preview for a ship (if exists).
   * Returns an object URL string for the PDF blob, or null if none available.
   */
  async getFeedbackPreview(jmain, jcat) {
    if (!jmain) throw new Error('Missing jmain for feedback preview');

    const headers = {
      ...authService.getAuthHeader(),
    };

    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/ShipFeedBackPreview`,
      { params: { jmain, jacat: jcat }, headers, responseType: 'blob' },
    );

    const contentType = response.headers?.['content-type'] || '';

    // If backend returned a PDF blob
    if (contentType.includes('application/pdf')) {
      return URL.createObjectURL(response.data);
    }

    // If not PDF, try to read text to detect null/empty response
    try {
      const text = await new Response(response.data).text();
      const lowered = (text || '').toLowerCase();
      if (!text || lowered.includes('null') || lowered.includes('no data')) {
        return null;
      }
      // Unknown non-PDF payload — throw to let caller handle
      throw new Error('Unexpected preview response: ' + text);
    } catch (err) {
      // If reading failed, treat as no preview
      return null;
    }
  }

  /**
   * Upload a single PDF feedback for a ship.
   * - Only a single PDF file is allowed.
   * - Validates file count and MIME/type before uploading.
   */
  async uploadShipFeedback(jmain, pdfFile, jcat = null) {
    if (!jmain) {
      throw new Error('Missing ship JMAIN for feedback upload');
    }

    if (!pdfFile) {
      throw new Error('No file provided for feedback upload');
    }

    // If an array was passed, ensure exactly one file
    if (Array.isArray(pdfFile)) {
      if (pdfFile.length !== 1) {
        throw new Error('Only one PDF file is allowed');
      }
      pdfFile = pdfFile[0];
    }

    // Basic client-side validation for PDF
    const isPdfByType = pdfFile.type === 'application/pdf';
    const isPdfByName = typeof pdfFile.name === 'string' && pdfFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdfByType && !isPdfByName) {
      throw new Error('Invalid file type: only PDF is allowed');
    }

    const formData = new FormData();
    // Backend may expect different key names (case variants). Include common variants.
    formData.append('jmain', jmain);
    formData.append('JMAIN', jmain);
    if (jcat) {
      formData.append('jacat', jcat);
      formData.append('JACAT', jcat);
    }
    formData.append('file', pdfFile);

    const headers = {
      ...authService.getAuthHeader(),
      // Let the browser/axios set Content-Type with proper boundary for multipart/form-data
    };

    const response = await axios.post(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/UploadShipFeedback`,
      formData,
      { headers },
    );

    return response.data;
  }



  async getShips(jcat, jmain) {
    if (!jcat || !jmain) {
      return [];
    }
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/GetAllShips`,
      { params: { p_jcat: jcat, p_jmain_no: jmain }, headers },
    );

    const list = response.data?.ResultSet || [];
    return list.map((s) => this.transformShipData(s));
  }

  async getShipDetails(serviceNo, jmainNo) {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/GetShipByJmainId`,
      {
        params: {
          p_service_no: serviceNo,
          p_jmain_no: jmainNo,
        },
        headers,
      },
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
