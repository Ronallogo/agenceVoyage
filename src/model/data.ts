import {Voyage} from "./interfaces";

export var VOYAGES   :   any[] =   [
  { idVoyage: 1, libelleVoyage: "Santiago", dateVoyage: "2024-06-02" },
  { idVoyage: 2, libelleVoyage: "Addis Ababa", dateVoyage: "2024-09-19" },
  { idVoyage: 3, libelleVoyage: "Melbourne", dateVoyage: "2024-05-26" },
  { idVoyage: 4, libelleVoyage: "Tokyo", dateVoyage: "2024-11-19" },
  { idVoyage: 5, libelleVoyage: "Paris", dateVoyage: "2024-11-30" },
  { idVoyage: 6, libelleVoyage: "Bangkok", dateVoyage: "2024-08-22" },
  { idVoyage: 7, libelleVoyage: "Seattle", dateVoyage: "2024-12-20" },
  { idVoyage: 8, libelleVoyage: "New York", dateVoyage: "2024-09-09" },
  { idVoyage: 9, libelleVoyage: "Chicago", dateVoyage: "2025-05-06" },
  { idVoyage: 10, libelleVoyage: "Atlanta", dateVoyage: "2025-01-26" },
  { idVoyage: 11, libelleVoyage: "Sydney", dateVoyage: "2024-12-01" },
  { idVoyage: 12, libelleVoyage: "Buenos Aires", dateVoyage: "2024-08-22" },
  { idVoyage: 13, libelleVoyage: "Beijing", dateVoyage: "2025-05-10" },
  { idVoyage: 14, libelleVoyage: "Paris", dateVoyage: "2024-12-31" },
  { idVoyage: 15, libelleVoyage: "Atlanta", dateVoyage: "2025-01-27" },
  { idVoyage: 16, libelleVoyage: "Hong Kong", dateVoyage: "2025-01-11" },
  { idVoyage: 17, libelleVoyage: "San Francisco", dateVoyage: "2025-01-18" },
  { idVoyage: 18, libelleVoyage: "Frankfurt", dateVoyage: "2024-12-19" },
  { idVoyage: 19, libelleVoyage: "Tokyo", dateVoyage: "2025-05-07" },
  { idVoyage: 20, libelleVoyage: "Hong Kong", dateVoyage: "2024-09-22" },
  { idVoyage: 21, libelleVoyage: "Paris", dateVoyage: "2024-08-27" },
  { idVoyage: 22, libelleVoyage: "Chicago", dateVoyage: "2025-05-06" },
  { idVoyage: 23, libelleVoyage: "Paris", dateVoyage: "2024-09-23" },
  { idVoyage: 24, libelleVoyage: "Chicago", dateVoyage: "2024-08-02" },
  { idVoyage: 25, libelleVoyage: "Brisbane", dateVoyage: "2024-07-03" },
  { idVoyage: 26, libelleVoyage: "Denver", dateVoyage: "2025-02-10" },
  { idVoyage: 27, libelleVoyage: "Nairobi", dateVoyage: "2025-01-29" },
  { idVoyage: 28, libelleVoyage: "San Francisco", dateVoyage: "2024-07-03" },
  { idVoyage: 29, libelleVoyage: "Atlanta", dateVoyage: "2024-10-18" },
  { idVoyage: 30, libelleVoyage: "Buenos Aires", dateVoyage: "2024-10-07" },
  { idVoyage: 31, libelleVoyage: "Paris", dateVoyage: "2024-08-01" },
  { idVoyage: 32, libelleVoyage: "Addis Ababa", dateVoyage: "2025-01-23" },
  { idVoyage: 33, libelleVoyage: "Beijing", dateVoyage: "2025-01-31" },
  { idVoyage: 34, libelleVoyage: "Chicago", dateVoyage: "2025-03-16" },
  { idVoyage: 35, libelleVoyage: "San Francisco", dateVoyage: "2024-12-16" },
  { idVoyage: 36, libelleVoyage: "Paris", dateVoyage: "2024-05-21" },
  { idVoyage: 37, libelleVoyage: "Bogotá", dateVoyage: "2024-10-24" },
  { idVoyage: 38, libelleVoyage: "Chicago", dateVoyage: "2024-12-11" },
  { idVoyage: 39, libelleVoyage: "Paris", dateVoyage: "2024-12-13" },
  { idVoyage: 40, libelleVoyage: "Paris", dateVoyage: "2024-12-05" },
];


export var TICKETS  = [
  { idTypeBillet: 1, libelleTypeBillet: "Économique", prixTypeBillet: 120 },
  { idTypeBillet: 2, libelleTypeBillet: "Affaires", prixTypeBillet: 450 },
  { idTypeBillet: 3, libelleTypeBillet: "Première Classe", prixTypeBillet: 950 },
  { idTypeBillet: 4, libelleTypeBillet: "Low-cost", prixTypeBillet: 75 },
  { idTypeBillet: 5, libelleTypeBillet: "Premium Éco", prixTypeBillet: 250 },
  { idTypeBillet: 6, libelleTypeBillet: "Vol Direct", prixTypeBillet: 300 },
  { idTypeBillet: 7, libelleTypeBillet: "Vol avec Escale", prixTypeBillet: 180 },
  { idTypeBillet: 8, libelleTypeBillet: "Charter", prixTypeBillet: 110 },
  { idTypeBillet: 9, libelleTypeBillet: "VIP", prixTypeBillet: 1250 },
  { idTypeBillet: 10, libelleTypeBillet: "Flex", prixTypeBillet: 320 },
  { idTypeBillet: 11, libelleTypeBillet: "Non-remboursable", prixTypeBillet: 90 },
  { idTypeBillet: 12, libelleTypeBillet: "Last Minute", prixTypeBillet: 135 },
  { idTypeBillet: 13, libelleTypeBillet: "Jeune", prixTypeBillet: 100 },
  { idTypeBillet: 14, libelleTypeBillet: "Senior", prixTypeBillet: 90 },
  { idTypeBillet: 15, libelleTypeBillet: "Militaire", prixTypeBillet: 60 },
  { idTypeBillet: 16, libelleTypeBillet: "Étudiant", prixTypeBillet: 95 },
  { idTypeBillet: 17, libelleTypeBillet: "Offre spéciale", prixTypeBillet: 150 },
  { idTypeBillet: 18, libelleTypeBillet: "Groupe", prixTypeBillet: 200 },
  { idTypeBillet: 19, libelleTypeBillet: "Aller-retour", prixTypeBillet: 350 },
  { idTypeBillet: 20, libelleTypeBillet: "Aller simple", prixTypeBillet: 175 },
  { idTypeBillet: 21, libelleTypeBillet: "Famille", prixTypeBillet: 280 },
  { idTypeBillet: 22, libelleTypeBillet: "Surclassement", prixTypeBillet: 670 },
  { idTypeBillet: 23, libelleTypeBillet: "Ultra luxe", prixTypeBillet: 2000 },
  { idTypeBillet: 24, libelleTypeBillet: "Corporate", prixTypeBillet: 400 },
  { idTypeBillet: 25, libelleTypeBillet: "Tourisme", prixTypeBillet: 220 }
];


 export   function getTodayDate():string{
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  

  return `${year}-${month}-${day}`;
}

export function transformDate(date : string):string{
   const d = new Date(date) ; 

   if(date !== ""){
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
     


  return `${year}-${month}-${day}`;
   }
   return  getTodayDate() ;
}





