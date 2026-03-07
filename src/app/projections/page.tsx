"use client";

import { useState, useMemo, ReactNode, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Info } from "lucide-react";

// Editable cell that only commits on blur or Enter
function EditableCell({ value, onChange, prefix, suffix, className = "" }: { value: number; onChange: (v: number) => void; prefix?: string; suffix?: string; className?: string }) {
  const [localValue, setLocalValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const commit = () => {
    const num = parseFloat(localValue) || 0;
    if (num !== value) {
      onChange(num);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      {prefix && <span className="text-charcoal-light text-xs">{prefix}</span>}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commit();
            inputRef.current?.blur();
          }
          if (e.key === "Escape") {
            setLocalValue(value.toString());
            inputRef.current?.blur();
          }
        }}
        className={`px-2 py-1 text-right rounded border border-charcoal/10 bg-cream focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage text-sm ${className}`}
      />
      {suffix && <span className="text-charcoal-light text-xs">{suffix}</span>}
    </div>
  );
}

type Tab = "strategy" | "inputs" | "revenue" | "costs" | "monthly" | "summary";

// Product definitions with descriptions
const PRODUCTS = {
  assessment: {
    name: "Haven Assessment",
    desc: "One-time comprehensive home health evaluation. 4-6 hours on-site testing radon, air quality, water, combustion safety, mold risk, and ventilation. Includes detailed report and remediation roadmap.",
  },
  complete: {
    name: "Haven Complete",
    desc: "Assessment + first year of Haven Care bundled. Customer gets the full assessment plus monitoring sensors (theirs to keep), 2 bi-annual service visits, and year-end re-assessment. Higher ticket, builds recurring revenue.",
  },
  care: {
    name: "Haven Care",
    desc: "Monthly subscription for ongoing monitoring and service. Smart sensors track radon/air quality continuously. Includes bi-annual service visits and annual re-assessment. Recurring revenue stream.",
  },
  lighting: {
    name: "Circadian Lighting",
    desc: "Add-on service: smart lighting installation that shifts color temperature throughout the day. Morning: bright/energizing (5000K), evening: warm/relaxing (2700K), night: sleep-ready (2200K). One-time install fee.",
  },
  airPurifier: {
    name: "Air Purifier",
    desc: "Add-on: HEPA air purifier installation. Recommended for homes with elevated PM2.5, VOCs, or allergy concerns. Includes unit, installation, and setup. One-time fee.",
  },
  waterFilter: {
    name: "Water Filtration",
    desc: "Add-on: whole-house or under-sink water filtration system. Recommended for homes with elevated contaminants, chlorine, or hard water. Includes system, installation, and setup. One-time fee.",
  },
};

// Tooltip component
function Tooltip({ children, content }: { children: ReactNode; content: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="ml-1 text-charcoal-light hover:text-sage transition-colors"
      >
        <Info size={14} />
      </button>
      {show && (
        <div className="absolute left-0 top-full mt-1 z-50 w-72 p-3 bg-charcoal text-cream text-xs rounded-lg shadow-lg">
          {content}
        </div>
      )}
    </span>
  );
}

export default function ProjectionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("strategy");

  // ===== REVENUE INPUTS =====
  const [assessmentsPerMonth, setAssessmentsPerMonth] = useState(8);
  const [percentComplete, setPercentComplete] = useState(50);
  const [percentLighting, setPercentLighting] = useState(20);
  const [percentAirPurifier, setPercentAirPurifier] = useState(15);
  const [percentWaterFilter, setPercentWaterFilter] = useState(10);
  const [careRetention, setCareRetention] = useState(80);
  const [monthsToSteady, setMonthsToSteady] = useState(6);

  // ===== PRICING =====
  const [priceAssessment, setPriceAssessment] = useState(1495);
  const [priceComplete, setPriceComplete] = useState(2995);
  const [priceCareMo, setPriceCareMo] = useState(149);
  const [priceLighting, setPriceLighting] = useState(795);
  const [priceAirPurifier, setPriceAirPurifier] = useState(595);
  const [priceWaterFilter, setPriceWaterFilter] = useState(895);

  // ===== REFERRAL PARTNER REVENUE =====
  const [refRadonPercent, setRefRadonPercent] = useState(25);
  const [refRadonAvgJob, setRefRadonAvgJob] = useState(3500);
  const [refRadonCommission, setRefRadonCommission] = useState(10);

  const [refHvacPercent, setRefHvacPercent] = useState(30);
  const [refHvacAvgJob, setRefHvacAvgJob] = useState(5000);
  const [refHvacCommission, setRefHvacCommission] = useState(8);

  const [refWaterPercent, setRefWaterPercent] = useState(15);
  const [refWaterAvgJob, setRefWaterAvgJob] = useState(2500);
  const [refWaterCommission, setRefWaterCommission] = useState(10);

  const [refMoldPercent, setRefMoldPercent] = useState(10);
  const [refMoldAvgJob, setRefMoldAvgJob] = useState(4000);
  const [refMoldCommission, setRefMoldCommission] = useState(10);

  // ===== LABOR MODEL =====
  const [ownerHourlyRate, setOwnerHourlyRate] = useState(75);
  const [hoursPerAssessment, setHoursPerAssessment] = useState(6);
  const [hoursReportWriting, setHoursReportWriting] = useState(2);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employeeHourlyRate, setEmployeeHourlyRate] = useState(35);
  const [employeeOverheadPct, setEmployeeOverheadPct] = useState(25);

  // ===== DIRECT COSTS (COGS) =====
  const [cogsAssessmentLab, setCogsAssessmentLab] = useState(120);
  const [cogsAssessmentEquipConsumables, setCogsAssessmentEquipConsumables] = useState(50);
  const [cogsAssessmentTravel, setCogsAssessmentTravel] = useState(80);

  const [cogsCompleteSensors, setCogsCompleteSensors] = useState(250);
  const [cogsCompleteAdditional, setCogsCompleteAdditional] = useState(150);

  const [cogsCareMoService, setCogsCareMoService] = useState(25);
  const [cogsCareMoSoftware, setCogsCareMoSoftware] = useState(10);

  const [cogsLightingHardware, setCogsLightingHardware] = useState(150);
  const [cogsLightingInstall, setCogsLightingInstall] = useState(50);

  const [cogsAirPurifierHardware, setCogsAirPurifierHardware] = useState(250);
  const [cogsAirPurifierInstall, setCogsAirPurifierInstall] = useState(50);

  const [cogsWaterFilterHardware, setCogsWaterFilterHardware] = useState(350);
  const [cogsWaterFilterInstall, setCogsWaterFilterInstall] = useState(100);

  // ===== OPERATING EXPENSES (MONTHLY) =====
  const [opexInsuranceLiability, setOpexInsuranceLiability] = useState(250);
  const [opexInsuranceEO, setOpexInsuranceEO] = useState(150);
  const [opexInsuranceVehicle, setOpexInsuranceVehicle] = useState(200);

  const [opexVehicleLease, setOpexVehicleLease] = useState(450);
  const [opexVehicleFuel, setOpexVehicleFuel] = useState(300);
  const [opexVehicleMaintenance, setOpexVehicleMaintenance] = useState(100);

  const [opexSoftwareCRM, setOpexSoftwareCRM] = useState(50);
  const [opexSoftwareScheduling, setOpexSoftwareScheduling] = useState(30);
  const [opexSoftwareAccounting, setOpexSoftwareAccounting] = useState(40);
  const [opexSoftwareMonitoring, setOpexSoftwareMonitoring] = useState(100);
  const [opexSoftwareWebsite, setOpexSoftwareWebsite] = useState(50);

  const [opexMarketingAds, setOpexMarketingAds] = useState(500);
  const [opexMarketingContent, setOpexMarketingContent] = useState(200);
  const [opexMarketingNetworking, setOpexMarketingNetworking] = useState(100);

  const [opexOfficePhone, setOpexOfficePhone] = useState(80);
  const [opexOfficeSupplies, setOpexOfficeSupplies] = useState(50);
  const [opexOfficeProfServices, setOpexOfficeProfServices] = useState(200);

  const [opexOwnerDraw, setOpexOwnerDraw] = useState(5000);

  // ===== STARTUP / CAPITAL COSTS (ONE-TIME) =====
  const [capexEquipmentRadon, setCapexEquipmentRadon] = useState(2500);
  const [capexEquipmentAir, setCapexEquipmentAir] = useState(3000);
  const [capexEquipmentThermal, setCapexEquipmentThermal] = useState(1500);
  const [capexEquipmentWater, setCapexEquipmentWater] = useState(500);
  const [capexEquipmentMisc, setCapexEquipmentMisc] = useState(1000);

  const [capexVehicleDownpayment, setCapexVehicleDownpayment] = useState(5000);
  const [capexBranding, setCapexBranding] = useState(3000);
  const [capexWebsite, setCapexWebsite] = useState(2000);
  const [capexLegal, setCapexLegal] = useState(1500);
  const [capexTraining, setCapexTraining] = useState(2000);

  // ===== LABOR CALCULATIONS =====
  const totalHoursPerAssessment = hoursPerAssessment + hoursReportWriting;
  const employeeFullyLoadedRate = employeeHourlyRate * (1 + employeeOverheadPct / 100);
  const laborCostPerAssessment = employeeCount > 0
    ? totalHoursPerAssessment * employeeFullyLoadedRate
    : totalHoursPerAssessment * ownerHourlyRate;
  const monthlyEmployeeCost = employeeCount * employeeFullyLoadedRate * 160; // 160 hrs/mo full-time

  // ===== CALCULATED VALUES =====
  const cogsAssessment = laborCostPerAssessment + cogsAssessmentLab + cogsAssessmentEquipConsumables + cogsAssessmentTravel;
  const cogsComplete = cogsAssessment + cogsCompleteSensors + cogsCompleteAdditional;
  const cogsCareMo = cogsCareMoService + cogsCareMoSoftware;
  const cogsLighting = cogsLightingHardware + cogsLightingInstall;
  const cogsAirPurifier = cogsAirPurifierHardware + cogsAirPurifierInstall;
  const cogsWaterFilter = cogsWaterFilterHardware + cogsWaterFilterInstall;

  const opexInsurance = opexInsuranceLiability + opexInsuranceEO + opexInsuranceVehicle;
  const opexVehicle = opexVehicleLease + opexVehicleFuel + opexVehicleMaintenance;
  const opexSoftware = opexSoftwareCRM + opexSoftwareScheduling + opexSoftwareAccounting + opexSoftwareMonitoring + opexSoftwareWebsite;
  const opexMarketing = opexMarketingAds + opexMarketingContent + opexMarketingNetworking;
  const opexOffice = opexOfficePhone + opexOfficeSupplies + opexOfficeProfServices;
  const opexTotal = opexInsurance + opexVehicle + opexSoftware + opexMarketing + opexOffice + opexOwnerDraw + monthlyEmployeeCost;

  const capexEquipment = capexEquipmentRadon + capexEquipmentAir + capexEquipmentThermal + capexEquipmentWater + capexEquipmentMisc;
  const capexTotal = capexEquipment + capexVehicleDownpayment + capexBranding + capexWebsite + capexLegal + capexTraining;

  // ===== REFERRAL REVENUE PER ASSESSMENT =====
  const refPerAssessment = useMemo(() => {
    const radon = (refRadonPercent / 100) * refRadonAvgJob * (refRadonCommission / 100);
    const hvac = (refHvacPercent / 100) * refHvacAvgJob * (refHvacCommission / 100);
    const water = (refWaterPercent / 100) * refWaterAvgJob * (refWaterCommission / 100);
    const mold = (refMoldPercent / 100) * refMoldAvgJob * (refMoldCommission / 100);
    return { radon, hvac, water, mold, total: radon + hvac + water + mold };
  }, [refRadonPercent, refRadonAvgJob, refRadonCommission, refHvacPercent, refHvacAvgJob, refHvacCommission, refWaterPercent, refWaterAvgJob, refWaterCommission, refMoldPercent, refMoldAvgJob, refMoldCommission]);

  // ===== MONTHLY CALCULATIONS =====
  const monthly = useMemo(() => {
    const standalone = assessmentsPerMonth * (1 - percentComplete / 100);
    const complete = assessmentsPerMonth * (percentComplete / 100);
    const lighting = assessmentsPerMonth * (percentLighting / 100);
    const airPurifier = assessmentsPerMonth * (percentAirPurifier / 100);
    const waterFilter = assessmentsPerMonth * (percentWaterFilter / 100);

    const revenue = {
      standalone: standalone * priceAssessment,
      complete: complete * priceComplete,
      lighting: lighting * priceLighting,
      airPurifier: airPurifier * priceAirPurifier,
      waterFilter: waterFilter * priceWaterFilter,
      referral: assessmentsPerMonth * refPerAssessment.total,
      total: 0,
    };
    revenue.total = revenue.standalone + revenue.complete + revenue.lighting + revenue.airPurifier + revenue.waterFilter + revenue.referral;

    const cogs = {
      standalone: standalone * cogsAssessment,
      complete: complete * cogsComplete,
      lighting: lighting * cogsLighting,
      airPurifier: airPurifier * cogsAirPurifier,
      waterFilter: waterFilter * cogsWaterFilter,
      total: 0,
    };
    cogs.total = cogs.standalone + cogs.complete + cogs.lighting + cogs.airPurifier + cogs.waterFilter;

    const grossProfit = revenue.total - cogs.total;
    const grossMargin = revenue.total > 0 ? (grossProfit / revenue.total) * 100 : 0;
    const netProfit = grossProfit - opexTotal;
    const netMargin = revenue.total > 0 ? (netProfit / revenue.total) * 100 : 0;

    return { standalone, complete, lighting, airPurifier, waterFilter, revenue, cogs, grossProfit, grossMargin, netProfit, netMargin };
  }, [assessmentsPerMonth, percentComplete, percentLighting, percentAirPurifier, percentWaterFilter, priceAssessment, priceComplete, priceLighting, priceAirPurifier, priceWaterFilter, cogsAssessment, cogsComplete, cogsLighting, cogsAirPurifier, cogsWaterFilter, opexTotal, refPerAssessment]);

  // ===== YEAR 1 PROJECTION =====
  const yearOne = useMemo(() => {
    const months = [];
    let cumulativeCare = 0;

    for (let m = 1; m <= 12; m++) {
      const rampMultiplier = m <= monthsToSteady ? m / monthsToSteady : 1;
      const monthAssessments = assessmentsPerMonth * rampMultiplier;
      const standalone = monthAssessments * (1 - percentComplete / 100);
      const complete = monthAssessments * (percentComplete / 100);
      const lighting = monthAssessments * (percentLighting / 100);
      const airPurifier = monthAssessments * (percentAirPurifier / 100);
      const waterFilter = monthAssessments * (percentWaterFilter / 100);

      const newRev = standalone * priceAssessment + complete * priceComplete + lighting * priceLighting + airPurifier * priceAirPurifier + waterFilter * priceWaterFilter;
      const referralRev = monthAssessments * refPerAssessment.total;
      const newCogs = standalone * cogsAssessment + complete * cogsComplete + lighting * cogsLighting + airPurifier * cogsAirPurifier + waterFilter * cogsWaterFilter;

      cumulativeCare += complete;
      const careRev = cumulativeCare * priceCareMo;
      const careCogs = cumulativeCare * cogsCareMo;

      const totalRev = newRev + careRev + referralRev;
      const totalCogs = newCogs + careCogs;
      const grossProfit = totalRev - totalCogs;
      const netProfit = grossProfit - opexTotal;

      months.push({
        month: m,
        assessments: monthAssessments,
        standalone,
        complete,
        lighting,
        airPurifier,
        waterFilter,
        newRev,
        referralRev,
        careRev,
        totalRev,
        newCogs,
        careCogs,
        totalCogs,
        grossProfit,
        opex: opexTotal,
        netProfit,
        careSubscribers: cumulativeCare,
      });
    }

    const totals = months.reduce(
      (acc, m) => ({
        assessments: acc.assessments + m.assessments,
        revenue: acc.revenue + m.totalRev,
        referralRev: acc.referralRev + m.referralRev,
        cogs: acc.cogs + m.totalCogs,
        grossProfit: acc.grossProfit + m.grossProfit,
        opex: acc.opex + m.opex,
        netProfit: acc.netProfit + m.netProfit,
      }),
      { assessments: 0, revenue: 0, referralRev: 0, cogs: 0, grossProfit: 0, opex: 0, netProfit: 0 }
    );

    return { months, totals, endCareSubscribers: cumulativeCare };
  }, [assessmentsPerMonth, percentComplete, percentLighting, percentAirPurifier, percentWaterFilter, priceAssessment, priceComplete, priceLighting, priceAirPurifier, priceWaterFilter, priceCareMo, cogsAssessment, cogsComplete, cogsLighting, cogsAirPurifier, cogsWaterFilter, cogsCareMo, opexTotal, monthsToSteady, refPerAssessment]);

  // ===== YEAR 2 PROJECTION =====
  const yearTwo = useMemo(() => {
    const renewingCare = yearOne.endCareSubscribers * (careRetention / 100);
    const newCompletePerYear = assessmentsPerMonth * 12 * (percentComplete / 100);
    const avgCareSubscribers = renewingCare + newCompletePerYear / 2;

    const monthlyNewRev = monthly.revenue.standalone + monthly.revenue.complete + monthly.revenue.lighting + monthly.revenue.airPurifier + monthly.revenue.waterFilter;
    const monthlyReferralRev = monthly.revenue.referral;
    const monthlyCareRev = avgCareSubscribers * priceCareMo;
    const monthlyRev = monthlyNewRev + monthlyCareRev + monthlyReferralRev;

    const monthlyNewCogs = monthly.cogs.total;
    const monthlyCareCogs = avgCareSubscribers * cogsCareMo;
    const monthlyCogs = monthlyNewCogs + monthlyCareCogs;

    const monthlyGross = monthlyRev - monthlyCogs;
    const monthlyNet = monthlyGross - opexTotal;

    return {
      renewingCare,
      newCompletePerYear,
      avgCareSubscribers,
      monthlyRev,
      monthlyReferralRev,
      monthlyCogs,
      monthlyGross,
      monthlyNet,
      yearlyRev: monthlyRev * 12,
      yearlyReferralRev: monthlyReferralRev * 12,
      yearlyCogs: monthlyCogs * 12,
      yearlyGross: monthlyGross * 12,
      yearlyOpex: opexTotal * 12,
      yearlyNet: monthlyNet * 12,
    };
  }, [yearOne, careRetention, assessmentsPerMonth, percentComplete, monthly, priceCareMo, cogsCareMo, opexTotal]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

  const formatPercent = (n: number) => `${n.toFixed(1)}%`;

  const exportCSV = () => {
    const lines = [
      "HAVEN HOME HEALTH - FINANCIAL MODEL",
      `Generated,${new Date().toISOString().split("T")[0]}`,
      "",
      "===== PRODUCT DEFINITIONS =====",
      `Haven Assessment,"${PRODUCTS.assessment.desc}"`,
      `Haven Complete,"${PRODUCTS.complete.desc}"`,
      `Haven Care,"${PRODUCTS.care.desc}"`,
      `Circadian Lighting,"${PRODUCTS.lighting.desc}"`,
      `Air Purifier,"${PRODUCTS.airPurifier.desc}"`,
      `Water Filtration,"${PRODUCTS.waterFilter.desc}"`,
      "",
      "===== PRICING =====",
      `Haven Assessment,${priceAssessment}`,
      `Haven Complete,${priceComplete}`,
      `Haven Care Monthly,${priceCareMo}`,
      `Circadian Lighting,${priceLighting}`,
      `Air Purifier,${priceAirPurifier}`,
      `Water Filtration,${priceWaterFilter}`,
      "",
      "===== REVENUE ASSUMPTIONS =====",
      `Assessments per Month (steady state),${assessmentsPerMonth}`,
      `% Buying Complete,${percentComplete}%`,
      `% Adding Lighting,${percentLighting}%`,
      `% Adding Air Purifier,${percentAirPurifier}%`,
      `% Adding Water Filter,${percentWaterFilter}%`,
      `Care Retention (Year 2+),${careRetention}%`,
      `Months to Steady State,${monthsToSteady}`,
      "",
      "===== REFERRAL PARTNER REVENUE =====",
      "Category,% Needing Work,Avg Job Value,Commission %,Revenue Per Assessment",
      `Radon Mitigation,${refRadonPercent}%,${refRadonAvgJob},${refRadonCommission}%,${refPerAssessment.radon.toFixed(2)}`,
      `HVAC/Ventilation,${refHvacPercent}%,${refHvacAvgJob},${refHvacCommission}%,${refPerAssessment.hvac.toFixed(2)}`,
      `Water Treatment,${refWaterPercent}%,${refWaterAvgJob},${refWaterCommission}%,${refPerAssessment.water.toFixed(2)}`,
      `Mold Remediation,${refMoldPercent}%,${refMoldAvgJob},${refMoldCommission}%,${refPerAssessment.mold.toFixed(2)}`,
      `TOTAL Per Assessment,,,,$${refPerAssessment.total.toFixed(2)}`,
      "",
      "===== LABOR MODEL =====",
      `Hours per Assessment (on-site),${hoursPerAssessment}`,
      `Hours for Report Writing,${hoursReportWriting}`,
      `Total Hours per Assessment,${totalHoursPerAssessment}`,
      `Owner Hourly Rate,${ownerHourlyRate}`,
      `Number of Employees,${employeeCount}`,
      `Employee Hourly Rate,${employeeHourlyRate}`,
      `Employee Overhead %,${employeeOverheadPct}%`,
      `Employee Fully-Loaded Rate,${employeeFullyLoadedRate.toFixed(2)}`,
      `Labor Cost per Assessment,${laborCostPerAssessment.toFixed(2)}`,
      `Monthly Employee Cost,${monthlyEmployeeCost.toFixed(2)}`,
      "",
      "===== DIRECT COSTS (COGS) - PER UNIT =====",
      "Assessment Costs",
      `  Labor,${laborCostPerAssessment.toFixed(2)}`,
      `  Lab Fees,${cogsAssessmentLab}`,
      `  Equipment Consumables,${cogsAssessmentEquipConsumables}`,
      `  Travel,${cogsAssessmentTravel}`,
      `  TOTAL Assessment COGS,${cogsAssessment}`,
      "",
      "Complete Additional Costs",
      `  Monitoring Sensors,${cogsCompleteSensors}`,
      `  Additional Setup,${cogsCompleteAdditional}`,
      `  TOTAL Complete COGS,${cogsComplete}`,
      "",
      "Care Monthly Costs",
      `  Service Time,${cogsCareMoService}`,
      `  Software/Platform,${cogsCareMoSoftware}`,
      `  TOTAL Care COGS/mo,${cogsCareMo}`,
      "",
      "Lighting Costs",
      `  Hardware,${cogsLightingHardware}`,
      `  Installation Labor,${cogsLightingInstall}`,
      `  TOTAL Lighting COGS,${cogsLighting}`,
      "",
      "Air Purifier Costs",
      `  Hardware,${cogsAirPurifierHardware}`,
      `  Installation Labor,${cogsAirPurifierInstall}`,
      `  TOTAL Air Purifier COGS,${cogsAirPurifier}`,
      "",
      "Water Filter Costs",
      `  Hardware,${cogsWaterFilterHardware}`,
      `  Installation Labor,${cogsWaterFilterInstall}`,
      `  TOTAL Water Filter COGS,${cogsWaterFilter}`,
      "",
      "===== OPERATING EXPENSES (MONTHLY) =====",
      "Insurance",
      `  General Liability,${opexInsuranceLiability}`,
      `  E&O / Professional,${opexInsuranceEO}`,
      `  Vehicle,${opexInsuranceVehicle}`,
      `  Subtotal Insurance,${opexInsurance}`,
      "",
      "Vehicle",
      `  Lease/Payment,${opexVehicleLease}`,
      `  Fuel,${opexVehicleFuel}`,
      `  Maintenance,${opexVehicleMaintenance}`,
      `  Subtotal Vehicle,${opexVehicle}`,
      "",
      "Software & Tools",
      `  CRM,${opexSoftwareCRM}`,
      `  Scheduling,${opexSoftwareScheduling}`,
      `  Accounting,${opexSoftwareAccounting}`,
      `  Monitoring Platform,${opexSoftwareMonitoring}`,
      `  Website/Hosting,${opexSoftwareWebsite}`,
      `  Subtotal Software,${opexSoftware}`,
      "",
      "Marketing",
      `  Ads (Google/Meta),${opexMarketingAds}`,
      `  Content/SEO,${opexMarketingContent}`,
      `  Networking/Events,${opexMarketingNetworking}`,
      `  Subtotal Marketing,${opexMarketing}`,
      "",
      "Office & Admin",
      `  Phone/Internet,${opexOfficePhone}`,
      `  Supplies,${opexOfficeSupplies}`,
      `  Professional Services,${opexOfficeProfServices}`,
      `  Subtotal Office,${opexOffice}`,
      "",
      `Owner Draw / Salary,${opexOwnerDraw}`,
      "",
      `TOTAL MONTHLY OPEX,${opexTotal}`,
      `TOTAL ANNUAL OPEX,${opexTotal * 12}`,
      "",
      "===== STARTUP / CAPITAL COSTS =====",
      "Equipment",
      `  Radon Monitors,${capexEquipmentRadon}`,
      `  Air Quality Meters,${capexEquipmentAir}`,
      `  Thermal Camera,${capexEquipmentThermal}`,
      `  Water Testing Kit,${capexEquipmentWater}`,
      `  Misc Tools,${capexEquipmentMisc}`,
      `  Subtotal Equipment,${capexEquipment}`,
      "",
      `Vehicle Downpayment,${capexVehicleDownpayment}`,
      `Branding/Logo,${capexBranding}`,
      `Website Build,${capexWebsite}`,
      `Legal/Incorporation,${capexLegal}`,
      `Training/Certification,${capexTraining}`,
      "",
      `TOTAL STARTUP COSTS,${capexTotal}`,
      "",
      "===== YEAR 1 MONTHLY PROJECTION =====",
      "Month,Assessments,New Revenue,Referral Rev,Care Revenue,Total Revenue,COGS,Gross Profit,OPEX,Net Profit,Care Subs",
      ...yearOne.months.map(
        (m) => `${m.month},${m.assessments.toFixed(1)},${m.newRev.toFixed(0)},${m.referralRev.toFixed(0)},${m.careRev.toFixed(0)},${m.totalRev.toFixed(0)},${m.totalCogs.toFixed(0)},${m.grossProfit.toFixed(0)},${m.opex.toFixed(0)},${m.netProfit.toFixed(0)},${m.careSubscribers.toFixed(0)}`
      ),
      `TOTAL,${yearOne.totals.assessments.toFixed(0)},-,${yearOne.totals.referralRev.toFixed(0)},-,${yearOne.totals.revenue.toFixed(0)},${yearOne.totals.cogs.toFixed(0)},${yearOne.totals.grossProfit.toFixed(0)},${yearOne.totals.opex.toFixed(0)},${yearOne.totals.netProfit.toFixed(0)},${yearOne.endCareSubscribers.toFixed(0)}`,
      "",
      "===== YEAR 1 SUMMARY =====",
      `Total Revenue,${yearOne.totals.revenue.toFixed(0)}`,
      `  - Referral Revenue,${yearOne.totals.referralRev.toFixed(0)}`,
      `Total COGS,${yearOne.totals.cogs.toFixed(0)}`,
      `Gross Profit,${yearOne.totals.grossProfit.toFixed(0)}`,
      `Total OPEX,${yearOne.totals.opex.toFixed(0)}`,
      `Net Profit (before tax),${yearOne.totals.netProfit.toFixed(0)}`,
      `Startup Costs,${capexTotal}`,
      `Net After Startup,${(yearOne.totals.netProfit - capexTotal).toFixed(0)}`,
      "",
      "===== YEAR 2 PROJECTION =====",
      `Care Subscribers Renewing,${yearTwo.renewingCare.toFixed(0)}`,
      `New Complete Customers,${yearTwo.newCompletePerYear.toFixed(0)}`,
      `Avg Care Subscribers,${yearTwo.avgCareSubscribers.toFixed(0)}`,
      "",
      `Monthly Revenue,${yearTwo.monthlyRev.toFixed(0)}`,
      `  - Monthly Referral Revenue,${yearTwo.monthlyReferralRev.toFixed(0)}`,
      `Monthly COGS,${yearTwo.monthlyCogs.toFixed(0)}`,
      `Monthly Gross Profit,${yearTwo.monthlyGross.toFixed(0)}`,
      `Monthly OPEX,${opexTotal}`,
      `Monthly Net Profit,${yearTwo.monthlyNet.toFixed(0)}`,
      "",
      `Annual Revenue,${yearTwo.yearlyRev.toFixed(0)}`,
      `  - Annual Referral Revenue,${yearTwo.yearlyReferralRev.toFixed(0)}`,
      `Annual COGS,${yearTwo.yearlyCogs.toFixed(0)}`,
      `Annual Gross Profit,${yearTwo.yearlyGross.toFixed(0)}`,
      `Annual OPEX,${yearTwo.yearlyOpex.toFixed(0)}`,
      `Annual Net Profit,${yearTwo.yearlyNet.toFixed(0)}`,
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "haven-financial-model.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const InputRow = ({ label, value, onChange, indent = false, tooltip }: { label: string; value: number; onChange: (v: number) => void; indent?: boolean; tooltip?: string }) => (
    <div className={`flex items-center justify-between py-2 border-b border-charcoal/5 ${indent ? "pl-4" : ""}`}>
      <label className={`text-sm ${indent ? "text-charcoal-light" : "text-charcoal"}`}>
        {tooltip ? <Tooltip content={tooltip}>{label}</Tooltip> : label}
      </label>
      <div className="flex items-center gap-1">
        <span className="text-charcoal-light text-sm">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 px-2 py-1 text-right rounded border border-charcoal/10 bg-cream focus:outline-none focus:ring-1 focus:ring-sage text-sm"
        />
      </div>
    </div>
  );

  const InputRowPercent = ({ label, value, onChange, tooltip }: { label: string; value: number; onChange: (v: number) => void; tooltip?: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-charcoal/5">
      <label className="text-sm text-charcoal">
        {tooltip ? <Tooltip content={tooltip}>{label}</Tooltip> : label}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 px-2 py-1 text-right rounded border border-charcoal/10 bg-cream focus:outline-none focus:ring-1 focus:ring-sage text-sm"
        />
        <span className="text-charcoal-light text-sm">%</span>
      </div>
    </div>
  );

  const InputRowNumber = ({ label, value, onChange, tooltip }: { label: string; value: number; onChange: (v: number) => void; tooltip?: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-charcoal/5">
      <label className="text-sm text-charcoal">
        {tooltip ? <Tooltip content={tooltip}>{label}</Tooltip> : label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 px-2 py-1 text-right rounded border border-charcoal/10 bg-cream focus:outline-none focus:ring-1 focus:ring-sage text-sm"
      />
    </div>
  );

  const SubtotalRow = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center justify-between py-2 bg-charcoal/5 px-2 rounded">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <span className="text-sm font-medium text-charcoal">{formatCurrency(value)}</span>
    </div>
  );

  // Spreadsheet-style row components
  const SpreadsheetRow = ({ label, value, onChange, prefix = "", suffix = "", tooltip, indent = false }: { label: string; value: number; onChange: (v: number) => void; prefix?: string; suffix?: string; tooltip?: string; indent?: boolean }) => (
    <tr className="border-b border-charcoal/5 hover:bg-charcoal/[0.02]">
      <td className={`py-2 px-4 text-charcoal text-sm ${indent ? "pl-8" : ""}`}>
        {tooltip ? <Tooltip content={tooltip}>{label}</Tooltip> : label}
      </td>
      <td className="py-2 px-4 text-right">
        <EditableCell value={value} onChange={onChange} prefix={prefix} suffix={suffix} className="w-28" />
      </td>
    </tr>
  );

  const SpreadsheetSubtotal = ({ label, value, format = "currency" }: { label: string; value: number; format?: "currency" | "hours" | "number" }) => (
    <tr className="border-b border-charcoal/10 bg-charcoal/5">
      <td className="py-2 px-4 text-charcoal text-sm font-medium">{label}</td>
      <td className="py-2 px-4 text-right text-charcoal font-medium font-mono">
        {format === "currency" && formatCurrency(value)}
        {format === "hours" && `${value} hrs`}
        {format === "number" && value.toFixed(1)}
      </td>
    </tr>
  );

  const SpreadsheetRefRow = ({ label, pct, setPct, job, setJob, comm, setComm, calc }: { label: string; pct: number; setPct: (v: number) => void; job: number; setJob: (v: number) => void; comm: number; setComm: (v: number) => void; calc: number }) => (
    <tr className="border-b border-charcoal/5 bg-amber-50/50 hover:bg-amber-50">
      <td className="py-2 px-4 text-charcoal text-sm">{label}</td>
      <td className="py-2 px-4">
        <div className="flex items-center justify-end gap-3">
          <EditableCell value={pct} onChange={setPct} suffix="%" className="w-16" />
          <EditableCell value={job} onChange={setJob} prefix="$" className="w-24" />
          <EditableCell value={comm} onChange={setComm} suffix="%" className="w-14" />
          <span className="font-mono text-sm text-charcoal w-20 text-right">{formatCurrency(calc)}</span>
        </div>
      </td>
    </tr>
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "strategy", label: "Strategy & Assumptions" },
    { id: "inputs", label: "All Inputs" },
    { id: "revenue", label: "Revenue" },
    { id: "costs", label: "Costs" },
    { id: "monthly", label: "Monthly P&L" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <div className="min-h-screen bg-cream py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <Link href="/" className="flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors text-sm mb-2">
              <ArrowLeft size={16} />
              Back to site
            </Link>
            <h1 className="text-3xl font-serif text-charcoal">Financial Model</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="btn-primary flex items-center gap-2 text-sm">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards - Always Visible */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-charcoal text-cream p-4 rounded-xl">
            <p className="text-cream/60 text-xs mb-1">Year 1 Net</p>
            <p className="text-xl font-serif">{formatCurrency(yearOne.totals.netProfit)}</p>
          </div>
          <div className="bg-charcoal text-cream p-4 rounded-xl">
            <p className="text-cream/60 text-xs mb-1">Year 2 Net</p>
            <p className="text-xl font-serif">{formatCurrency(yearTwo.yearlyNet)}</p>
          </div>
          <div className="bg-sage/20 p-4 rounded-xl">
            <p className="text-charcoal-light text-xs mb-1">Gross Margin</p>
            <p className="text-xl font-serif text-charcoal">{formatPercent(monthly.grossMargin)}</p>
          </div>
          <div className="bg-sage/20 p-4 rounded-xl">
            <p className="text-charcoal-light text-xs mb-1">Monthly OPEX</p>
            <p className="text-xl font-serif text-charcoal">{formatCurrency(opexTotal)}</p>
          </div>
          <div className="bg-sage/20 p-4 rounded-xl">
            <p className="text-charcoal-light text-xs mb-1">Startup Costs</p>
            <p className="text-xl font-serif text-charcoal">{formatCurrency(capexTotal)}</p>
          </div>
          <div className="bg-amber-100 p-4 rounded-xl">
            <p className="text-charcoal-light text-xs mb-1">Referral Rev/Mo</p>
            <p className="text-xl font-serif text-charcoal">{formatCurrency(monthly.revenue.referral)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "bg-charcoal text-cream" : "bg-cream-dark text-charcoal hover:bg-charcoal/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "strategy" && (
          <div className="space-y-8">
            {/* Market Positioning */}
            <div className="bg-gradient-to-r from-charcoal to-charcoal-light text-cream p-8 rounded-xl">
              <p className="text-sage text-sm tracking-widest uppercase mb-2">Market Positioning</p>
              <h2 className="font-serif text-3xl mb-4">Luxury Home Health</h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                Haven is positioned for the <strong className="text-cream">luxury and premium market</strong> — homeowners who invest in quality, care about health, and expect white-glove service. Not competing on price with basic radon tests. Competing on trust, expertise, and outcomes with high-end home services.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-cream/10 px-3 py-1 rounded-full text-sm">$1M+ homes</span>
                <span className="bg-cream/10 px-3 py-1 rounded-full text-sm">Health-conscious buyers</span>
                <span className="bg-cream/10 px-3 py-1 rounded-full text-sm">New construction</span>
                <span className="bg-cream/10 px-3 py-1 rounded-full text-sm">Renovation projects</span>
                <span className="bg-cream/10 px-3 py-1 rounded-full text-sm">Executive relocations</span>
              </div>
            </div>

            {/* Vision Spectrum */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-charcoal px-6 py-4">
                <h2 className="font-serif text-xl text-cream">The Vision Spectrum</h2>
                <p className="text-cream/60 text-sm mt-1">From simplest viable business to maximum ambition</p>
              </div>
              <div className="divide-y divide-charcoal/10">
                {/* Floor */}
                <div className="p-6 bg-charcoal/[0.02]">
                  <div className="flex items-start gap-4">
                    <div className="bg-charcoal/10 text-charcoal text-xs font-medium px-2 py-1 rounded">FLOOR</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-charcoal mb-2">Solo Practitioner</h3>
                      <p className="text-charcoal-light text-sm mb-3">
                        One person, one van, serving the local market. Simple and profitable.
                      </p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• 4-6 assessments/month, owner-operated</li>
                        <li>• $100K-150K revenue, $60-80K take-home</li>
                        <li>• Referral partnerships with local contractors</li>
                        <li>• No employees, minimal overhead</li>
                        <li>• Lifestyle business, location-flexible</li>
                      </ul>
                      <p className="text-sage text-sm mt-3 font-medium">This works. This is the baseline.</p>
                    </div>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sage/20 text-sage text-xs font-medium px-2 py-1 rounded">LEVEL 2</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-charcoal mb-2">Local Market Leader</h3>
                      <p className="text-charcoal-light text-sm mb-3">
                        Dominant player in one metro area. Known brand, realtor partnerships, recurring revenue.
                      </p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• 15-25 assessments/month with 1-2 technicians</li>
                        <li>• $400-600K revenue, strong Haven Care subscriber base</li>
                        <li>• Exclusive partnerships with top realtors/brokers</li>
                        <li>• Remediation referral network generating passive income</li>
                        <li>• Owner focuses on sales, partnerships, quality control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Level 3 */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sage/30 text-sage-dark text-xs font-medium px-2 py-1 rounded">LEVEL 3</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-charcoal mb-2">Regional Operator</h3>
                      <p className="text-charcoal-light text-sm mb-3">
                        Multi-city presence. Systemized operations, management layer.
                      </p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• 50-100 assessments/month across multiple markets</li>
                        <li>• $1-2M revenue, team of 5-10</li>
                        <li>• Standardized training, quality assurance program</li>
                        <li>• Could acquire small remediation companies</li>
                        <li>• "Haven of [Region]" brand recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Level 4 */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">LEVEL 4</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-charcoal mb-2">Franchise / License Model</h3>
                      <p className="text-charcoal-light text-sm mb-3">
                        Other operators pay to use the Haven system. Recurring revenue from licensing.
                      </p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• $25-50K franchise fee + 5-6% royalty on revenue</li>
                        <li>• Haven provides: brand, training, software, leads</li>
                        <li>• Franchisees operate locally</li>
                        <li>• Scales without proportional headcount</li>
                        <li>• Requires: proven playbook, strong unit economics, legal setup</li>
                      </ul>
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                        <p className="text-xs text-amber-800 font-medium mb-1">Revenue Potential</p>
                        <p className="text-sm text-amber-900">10 franchises @ $400K avg revenue = <strong>$240K/yr royalties</strong> + franchise fees</p>
                        <p className="text-sm text-amber-900">25 franchises = <strong>$600K/yr royalties</strong>, mostly passive</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ceiling */}
                <div className="p-6 bg-charcoal text-cream">
                  <div className="flex items-start gap-4">
                    <div className="bg-sage text-charcoal text-xs font-medium px-2 py-1 rounded">CEILING</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg mb-2">National Certification Standard</h3>
                      <p className="text-cream/80 text-sm mb-3">
                        "Haven Certified" becomes the recognized standard for home health — like LEED, but residential.
                      </p>
                      <ul className="text-sm text-cream/70 space-y-1">
                        <li>• Insurance companies offer discounts for certified homes</li>
                        <li>• Real estate listings feature Haven Certification</li>
                        <li>• Municipalities adopt Haven Index for housing standards</li>
                        <li>• Software licensing to inspectors, contractors, property managers</li>
                        <li>• Haven becomes a verb: "Have you Haven'd your home?"</li>
                      </ul>
                      <div className="mt-4 p-3 bg-cream/10 rounded-lg">
                        <p className="text-xs text-sage font-medium mb-1">Revenue Potential</p>
                        <p className="text-sm text-cream/90">Certification fees: $50-100/home × 10K homes/yr = <strong>$500K-1M/yr</strong></p>
                        <p className="text-sm text-cream/90">Software licensing to inspectors: $100/mo × 500 users = <strong>$600K/yr</strong></p>
                        <p className="text-sm text-cream/90">Combined with franchise royalties: <strong>$2M+/yr</strong> potential</p>
                      </div>
                      <p className="text-sage text-sm mt-4 font-medium">
                        The long game. Requires years of brand building and regulatory relationships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Science Positioning */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-charcoal/10">
                <h2 className="font-serif text-xl text-charcoal">Science & Credibility Positioning</h2>
                <p className="text-charcoal-light text-sm mt-1">Where to draw the line on what we test</p>
              </div>
              <div className="p-6">
                <p className="text-charcoal-light mb-6">
                  Haven must be <strong className="text-charcoal">grounded in established science</strong> to maintain credibility with the luxury market. But there's a spectrum from consensus science to emerging/edge science. Where do we draw the line?
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="font-medium text-green-800 mb-2">Core Services (Consensus Science)</p>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Radon — EPA/Health Canada guidelines</li>
                      <li>✓ Air Quality (PM2.5, CO2, VOCs)</li>
                      <li>✓ Water contaminants (lead, bacteria)</li>
                      <li>✓ Mold & moisture</li>
                      <li>✓ Combustion safety / CO</li>
                      <li>✓ Ventilation rates</li>
                    </ul>
                    <p className="text-xs text-green-600 mt-3">No controversy. Clear health impacts. Regulatory backing.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <p className="font-medium text-amber-800 mb-2">Emerging (Growing Evidence)</p>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>? Circadian lighting / blue light</li>
                      <li>? PFAS / forever chemicals</li>
                      <li>? Microplastics in water</li>
                      <li>? Indoor pesticide residue</li>
                      <li>? Noise pollution</li>
                    </ul>
                    <p className="text-xs text-amber-600 mt-3">Science is there but not yet mainstream. Early adopter appeal.</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="font-medium text-red-800 mb-2">Edge Science (Controversial)</p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>✗ EMF / 5G exposure</li>
                      <li>✗ Geopathic stress</li>
                      <li>✗ "Toxic mold syndrome"</li>
                      <li>✗ Multiple chemical sensitivity</li>
                    </ul>
                    <p className="text-xs text-red-600 mt-3">Risks credibility. Attracts wrong customer. Avoid or handle carefully.</p>
                  </div>
                </div>
                <div className="bg-charcoal/5 p-4 rounded-lg">
                  <p className="font-medium text-charcoal mb-2">Recommendation</p>
                  <p className="text-sm text-charcoal-light">
                    <strong>Lead with consensus science.</strong> Position emerging topics as "we're watching this" or premium add-ons for clients who ask.
                    Avoid edge science entirely — if someone asks about EMF, recommend a specialist rather than diluting Haven's credibility.
                    The luxury market values expertise and trust over comprehensive coverage of fringe concerns.
                  </p>
                </div>
              </div>
            </div>

            {/* Home Inspection as Lead Gen */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-sage/20 px-6 py-4 border-b border-charcoal/10">
                <h2 className="font-serif text-xl text-charcoal">Acquisition Play: Standard Home Inspections</h2>
                <p className="text-charcoal-light text-sm mt-1">Use transactional inspections as lead gen for Haven assessments</p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-charcoal mb-3">The Opportunity</h3>
                    <p className="text-sm text-charcoal-light mb-4">
                      Standard home inspections happen at every real estate transaction. They're commoditized ($400-600) but high-volume.
                      Haven could offer inspections as a <strong>gateway service</strong> — get in the door, then upsell the full health assessment.
                    </p>
                    <ul className="text-sm text-charcoal-light space-y-2">
                      <li>• <strong>Volume:</strong> 500K+ home sales/year in Ontario alone</li>
                      <li>• <strong>Timing:</strong> Buyers are already spending on the home</li>
                      <li>• <strong>Captive audience:</strong> 2-3 hours on-site with the client</li>
                      <li>• <strong>Natural upsell:</strong> "I check the structure, but what about what you're breathing?"</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-3">Considerations</h3>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800"><strong>Pro:</strong> Built-in lead flow from realtor relationships</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800"><strong>Pro:</strong> Cross-sell to Haven Care after purchase</p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-800"><strong>Consider:</strong> Requires home inspector certification (additional licensing)</p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-800"><strong>Consider:</strong> Commoditized, lower margin — purely for lead gen</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-800"><strong>Risk:</strong> Could dilute premium positioning if not handled carefully</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-charcoal/5 p-4 rounded-lg mt-6">
                  <p className="font-medium text-charcoal mb-2">Possible Structure</p>
                  <p className="text-sm text-charcoal-light">
                    Offer "Haven Inspection+" — standard home inspection ($500) with a <strong>free radon screening</strong> included.
                    Use radon results as the hook: "Your radon is borderline elevated. Want us to do the full assessment?"
                    Conversion target: 20-30% of inspection clients upgrade to full Haven Assessment.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Strategic Questions */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-amber-100 px-6 py-4 border-b border-charcoal/10">
                <h2 className="font-serif text-xl text-charcoal">Key Strategic Questions</h2>
                <p className="text-charcoal-light text-sm mt-1">Assumptions to validate before scaling</p>
              </div>
              <div className="divide-y divide-charcoal/5">
                <div className="p-6">
                  <h3 className="font-medium text-charcoal mb-3">1. Bundled vs. À La Carte: Will customers pay for the full package?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Hypothesis A: Bundled Wins</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• "I want to know everything about my home"</li>
                        <li>• Peace of mind buyers, new homeowners</li>
                        <li>• Higher ticket, simpler operations</li>
                        <li>• Haven Index only works with full data</li>
                      </ul>
                    </div>
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Hypothesis B: À La Carte Demand</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• "I just want radon tested" — triggered by specific concern</li>
                        <li>• Lower barrier to entry, upsell opportunity</li>
                        <li>• More competition (single-service providers)</li>
                        <li>• Need separate pricing/positioning</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal-light mt-4 italic">
                    <strong>To validate:</strong> Track inquiry sources. Are people searching "radon testing Toronto" or "home health assessment"?
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="font-medium text-charcoal mb-3">2. Who is the primary customer?</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">New Homeowners</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• Just bought, want peace of mind</li>
                        <li>• Timing: 0-6 months post-close</li>
                        <li>• Channel: Realtors, mortgage brokers</li>
                      </ul>
                    </div>
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Health-Conscious Families</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• Kids, allergies, unexplained symptoms</li>
                        <li>• Willing to pay premium</li>
                        <li>• Channel: Pediatricians, wellness influencers</li>
                      </ul>
                    </div>
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Pre-Sale Sellers</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• Want certification to boost sale price</li>
                        <li>• "Haven Certified" as selling point</li>
                        <li>• Channel: Listing agents, staging companies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-medium text-charcoal mb-3">3. Owned services vs. referral revenue?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Referral Model (Current)</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• Partner with radon mitigators, HVAC, etc.</li>
                        <li>• Earn 8-10% referral commission</li>
                        <li>• Low capital, stay focused on assessment</li>
                        <li>• Risk: Partners control quality</li>
                      </ul>
                    </div>
                    <div className="bg-cream-dark p-4 rounded-lg">
                      <p className="font-medium text-charcoal mb-2">Owned Services (Future?)</p>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        <li>• Acquire/build radon mitigation capability</li>
                        <li>• Higher revenue per customer</li>
                        <li>• More capital, licensing, complexity</li>
                        <li>• Vertical integration play</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Acquisition Channels */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-sage/20 px-6 py-4 border-b border-charcoal/10">
                <h2 className="font-serif text-xl text-charcoal">Customer Acquisition Channels</h2>
                <p className="text-charcoal-light text-sm mt-1">Partnership and direct opportunities</p>
              </div>
              <div className="p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-charcoal/10">
                      <th className="pb-3 font-medium text-charcoal">Channel</th>
                      <th className="pb-3 font-medium text-charcoal">Value Prop to Partner</th>
                      <th className="pb-3 font-medium text-charcoal">Deal Structure</th>
                      <th className="pb-3 font-medium text-charcoal">Volume Potential</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal-light">
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Realtors (Buyer Agents)</td>
                      <td className="py-3">Differentiate from other agents, add value to clients</td>
                      <td className="py-3">Referral fee or co-marketing</td>
                      <td className="py-3">High — 10+ deals/agent/year</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Mortgage Brokers</td>
                      <td className="py-3">Add-on service at closing, protect investment</td>
                      <td className="py-3">Bundle with closing package</td>
                      <td className="py-3">High — volume players</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Home Inspectors</td>
                      <td className="py-3">Upsell to their customers (we do what they can't)</td>
                      <td className="py-3">Referral fee per lead</td>
                      <td className="py-3">Medium — relationship-based</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Insurance Agents</td>
                      <td className="py-3">Risk reduction = lower claims, better underwriting</td>
                      <td className="py-3">Discount on premiums for certified homes</td>
                      <td className="py-3">High — if insurer partnership</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Home Warranty Companies</td>
                      <td className="py-3">Pre-emptive issues = fewer claims</td>
                      <td className="py-3">Bundled offering</td>
                      <td className="py-3">Medium</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Pediatricians / Allergists</td>
                      <td className="py-3">Recommend to patients with respiratory issues</td>
                      <td className="py-3">Referral, no fee (professional recommendation)</td>
                      <td className="py-3">Low but high-intent</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Naturopaths</td>
                      <td className="py-3">Patients already invested in environmental health</td>
                      <td className="py-3">Referral fee or reciprocal referrals</td>
                      <td className="py-3">Medium — high-intent, health-conscious clients</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3 font-medium text-charcoal">Property Managers</td>
                      <td className="py-3">Liability protection, tenant health</td>
                      <td className="py-3">Portfolio pricing</td>
                      <td className="py-3">Medium — recurring</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-charcoal">Direct (SEO/Ads)</td>
                      <td className="py-3">—</td>
                      <td className="py-3">Paid acquisition, content marketing</td>
                      <td className="py-3">Scalable but competitive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white border border-charcoal/10 rounded-xl overflow-hidden">
              <div className="bg-blue-900 px-6 py-4">
                <h2 className="font-serif text-xl text-cream">Required & Valuable Certifications</h2>
                <p className="text-cream/60 text-sm mt-1">What credentials are needed to operate credibly</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Phase 1 - Essential */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">PHASE 1</span>
                    <span className="font-medium text-charcoal">Essential / Required (First 6 Months)</span>
                    <span className="text-charcoal-light text-sm">~$1,700-2,100</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-charcoal/10 text-charcoal-light">
                          <th className="pb-2 font-medium">Certification</th>
                          <th className="pb-2 font-medium">Issuing Body</th>
                          <th className="pb-2 font-medium">Cost</th>
                          <th className="pb-2 font-medium">Time</th>
                          <th className="pb-2 font-medium">Renewal</th>
                        </tr>
                      </thead>
                      <tbody className="text-charcoal-light">
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">C-NRPP Radon Measurement</td>
                          <td className="py-2">C-NRPP / Health Canada</td>
                          <td className="py-2">$700-1,000</td>
                          <td className="py-2">2-3 weeks</td>
                          <td className="py-2">2 years, 20 CE credits</td>
                        </tr>
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">IICRC WRT (Water Damage)</td>
                          <td className="py-2">IICRC</td>
                          <td className="py-2">$530-630</td>
                          <td className="py-2">3 days</td>
                          <td className="py-2">3 years</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-charcoal">InterNACHI CPI</td>
                          <td className="py-2">InterNACHI</td>
                          <td className="py-2">$499/year</td>
                          <td className="py-2">2-4 weeks self-study</td>
                          <td className="py-2">Annual</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Phase 2 - Core */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">PHASE 2</span>
                    <span className="font-medium text-charcoal">Core Competency (6-12 Months)</span>
                    <span className="text-charcoal-light text-sm">~$3,100-4,300</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-charcoal/10 text-charcoal-light">
                          <th className="pb-2 font-medium">Certification</th>
                          <th className="pb-2 font-medium">Issuing Body</th>
                          <th className="pb-2 font-medium">Cost</th>
                          <th className="pb-2 font-medium">Time</th>
                          <th className="pb-2 font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-charcoal-light">
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">IICRC AMRT (Mold)</td>
                          <td className="py-2">IICRC</td>
                          <td className="py-2">$1,100-1,300</td>
                          <td className="py-2">4 days</td>
                          <td className="py-2">Requires WRT first</td>
                        </tr>
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">CIE (Indoor Environmentalist)</td>
                          <td className="py-2">ACAC</td>
                          <td className="py-2">$500</td>
                          <td className="py-2">Exam scheduling</td>
                          <td className="py-2">2 years experience required</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-charcoal">OAHI RHI (Ontario)</td>
                          <td className="py-2">OAHI</td>
                          <td className="py-2">$1,500-2,500</td>
                          <td className="py-2">6-12 months</td>
                          <td className="py-2">For home inspection lead-gen play</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Phase 3 - Premium */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">PHASE 3</span>
                    <span className="font-medium text-charcoal">Premium Positioning (Year 2+)</span>
                    <span className="text-charcoal-light text-sm">~$5,950-7,700</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-charcoal/10 text-charcoal-light">
                          <th className="pb-2 font-medium">Certification</th>
                          <th className="pb-2 font-medium">Issuing Body</th>
                          <th className="pb-2 font-medium">Cost</th>
                          <th className="pb-2 font-medium">Time</th>
                          <th className="pb-2 font-medium">Why</th>
                        </tr>
                      </thead>
                      <tbody className="text-charcoal-light">
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">CMI/CMC (Microbial)</td>
                          <td className="py-2">ACAC</td>
                          <td className="py-2">$500-700</td>
                          <td className="py-2">Exam</td>
                          <td className="py-2">Premium mold credentials</td>
                        </tr>
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">BPI Building Analyst</td>
                          <td className="py-2">BPI</td>
                          <td className="py-2">$1,950</td>
                          <td className="py-2">1-2 weeks</td>
                          <td className="py-2">Building science credibility</td>
                        </tr>
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">ITC Level I Thermography</td>
                          <td className="py-2">ITC</td>
                          <td className="py-2">$2,000-3,000</td>
                          <td className="py-2">4 days</td>
                          <td className="py-2">Thermal imaging for moisture/insulation</td>
                        </tr>
                        <tr className="border-b border-charcoal/5">
                          <td className="py-2 font-medium text-charcoal">C-NRPP Radon Mitigation</td>
                          <td className="py-2">C-NRPP</td>
                          <td className="py-2">$1,500-2,000</td>
                          <td className="py-2">1-2 weeks</td>
                          <td className="py-2">If offering mitigation services</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-charcoal">WELL AP</td>
                          <td className="py-2">IWBI</td>
                          <td className="py-2">$299 USD</td>
                          <td className="py-2">Self-study + exam</td>
                          <td className="py-2">Luxury wellness positioning</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">Investment Summary</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-800 font-medium">Phase 1 (Essential)</p>
                      <p className="text-blue-700">$1,700-2,100 • 2-3 months</p>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Phase 1+2 (Credible)</p>
                      <p className="text-blue-700">$4,800-6,400 • 12 months</p>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">All Phases (Premium)</p>
                      <p className="text-blue-700">$10,750-14,100 • 24 months</p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-3">Note: NRPP certification required in 25 US states if expanding there. Water quality analyst certification required for regulated systems in Ontario.</p>
                </div>
              </div>
            </div>

            {/* Model Assumptions Summary */}
            <div className="bg-cream-dark p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-4">Current Model Assumptions</h2>
              <p className="text-charcoal-light text-sm mb-4">These assumptions are baked into the financial model. Adjust in the Inputs tab.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-charcoal-light text-xs mb-1">Service Mix</p>
                  <p className="font-medium text-charcoal">{percentComplete}% buy Complete bundle</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-charcoal-light text-xs mb-1">Add-on Attachment</p>
                  <p className="font-medium text-charcoal">{percentLighting}% add Circadian Lighting</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-charcoal-light text-xs mb-1">Referral Revenue</p>
                  <p className="font-medium text-charcoal">{formatCurrency(refPerAssessment.total)} per assessment</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-charcoal-light text-xs mb-1">Labor Model</p>
                  <p className="font-medium text-charcoal">{employeeCount > 0 ? `${employeeCount} employee(s)` : "Owner-operated"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "inputs" && (
          <div className="bg-white rounded-xl border border-charcoal/10 overflow-hidden">
            <table className="w-full text-sm table-fixed">
              <colgroup>
                <col className="w-3/5" />
                <col className="w-2/5" />
              </colgroup>
              <thead>
                <tr className="bg-charcoal/5 border-b border-charcoal/10">
                  <th className="text-left py-2 px-4 font-medium text-charcoal">Item</th>
                  <th className="text-right py-2 px-4 font-medium text-charcoal">Value</th>
                </tr>
              </thead>
              <tbody>
                {/* PRICING */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">PRICING</td>
                </tr>
                <SpreadsheetRow label="Haven Assessment" tooltip={PRODUCTS.assessment.desc} value={priceAssessment} onChange={setPriceAssessment} prefix="$" />
                <SpreadsheetRow label="Haven Complete" tooltip={PRODUCTS.complete.desc} value={priceComplete} onChange={setPriceComplete} prefix="$" />
                <SpreadsheetRow label="Haven Care (monthly)" tooltip={PRODUCTS.care.desc} value={priceCareMo} onChange={setPriceCareMo} prefix="$" />
                <SpreadsheetRow label="Circadian Lighting" tooltip={PRODUCTS.lighting.desc} value={priceLighting} onChange={setPriceLighting} prefix="$" />
                <SpreadsheetRow label="Air Purifier" tooltip={PRODUCTS.airPurifier.desc} value={priceAirPurifier} onChange={setPriceAirPurifier} prefix="$" />
                <SpreadsheetRow label="Water Filtration" tooltip={PRODUCTS.waterFilter.desc} value={priceWaterFilter} onChange={setPriceWaterFilter} prefix="$" />

                {/* REVENUE ASSUMPTIONS */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">REVENUE ASSUMPTIONS</td>
                </tr>
                <SpreadsheetRow label="Assessments / Month (steady state)" tooltip="Total new customers per month after ramp-up" value={assessmentsPerMonth} onChange={setAssessmentsPerMonth} />
                <SpreadsheetRow label="% Buying Complete" tooltip="% who buy bundled Complete vs standalone Assessment" value={percentComplete} onChange={setPercentComplete} suffix="%" />
                <SpreadsheetRow label="% Adding Lighting" tooltip="% who add Circadian Lighting" value={percentLighting} onChange={setPercentLighting} suffix="%" />
                <SpreadsheetRow label="% Adding Air Purifier" tooltip="% who add Air Purifier" value={percentAirPurifier} onChange={setPercentAirPurifier} suffix="%" />
                <SpreadsheetRow label="% Adding Water Filter" tooltip="% who add Water Filtration" value={percentWaterFilter} onChange={setPercentWaterFilter} suffix="%" />
                <SpreadsheetRow label="Care Retention (Year 2+)" tooltip="% of Complete customers who renew Care" value={careRetention} onChange={setCareRetention} suffix="%" />
                <SpreadsheetRow label="Months to Steady State" tooltip="Ramp-up period" value={monthsToSteady} onChange={setMonthsToSteady} />

                {/* REFERRAL PARTNER REVENUE */}
                <tr className="bg-amber-200 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">REFERRAL PARTNER REVENUE</td>
                </tr>
                <tr className="bg-amber-50 border-b border-charcoal/10 text-xs text-charcoal-light">
                  <td className="py-1 px-4">Category</td>
                  <td className="py-1 px-4 text-right">% Need | Avg Job | Commission | Rev/Assessment</td>
                </tr>
                <SpreadsheetRefRow label="Radon Mitigation" pct={refRadonPercent} setPct={setRefRadonPercent} job={refRadonAvgJob} setJob={setRefRadonAvgJob} comm={refRadonCommission} setComm={setRefRadonCommission} calc={refPerAssessment.radon} />
                <SpreadsheetRefRow label="HVAC / Ventilation" pct={refHvacPercent} setPct={setRefHvacPercent} job={refHvacAvgJob} setJob={setRefHvacAvgJob} comm={refHvacCommission} setComm={setRefHvacCommission} calc={refPerAssessment.hvac} />
                <SpreadsheetRefRow label="Water Treatment" pct={refWaterPercent} setPct={setRefWaterPercent} job={refWaterAvgJob} setJob={setRefWaterAvgJob} comm={refWaterCommission} setComm={setRefWaterCommission} calc={refPerAssessment.water} />
                <SpreadsheetRefRow label="Mold Remediation" pct={refMoldPercent} setPct={setRefMoldPercent} job={refMoldAvgJob} setJob={setRefMoldAvgJob} comm={refMoldCommission} setComm={setRefMoldCommission} calc={refPerAssessment.mold} />
                <tr className="bg-amber-100 border-b border-charcoal/10 font-medium">
                  <td className="py-2 px-4 text-charcoal text-sm">Total Referral Revenue / Assessment</td>
                  <td className="py-2 px-4 text-right text-charcoal font-mono">{formatCurrency(refPerAssessment.total)}</td>
                </tr>

                {/* LABOR MODEL */}
                <tr className="bg-blue-100 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">LABOR MODEL</td>
                </tr>
                <SpreadsheetRow label="Hours per Assessment (on-site)" tooltip="Time spent at customer location" value={hoursPerAssessment} onChange={setHoursPerAssessment} suffix="hrs" indent />
                <SpreadsheetRow label="Hours for Report Writing" tooltip="Time to write up findings and recommendations" value={hoursReportWriting} onChange={setHoursReportWriting} suffix="hrs" indent />
                <SpreadsheetSubtotal label="Total Hours per Assessment" value={totalHoursPerAssessment} format="hours" />
                <tr className="bg-blue-50 border-b border-charcoal/10">
                  <td colSpan={2} className="py-1 px-4 text-xs text-charcoal-light italic">Owner-Operated Model</td>
                </tr>
                <SpreadsheetRow label="Owner Hourly Rate (imputed)" tooltip="What you value your time at" value={ownerHourlyRate} onChange={setOwnerHourlyRate} prefix="$" indent />
                <tr className="bg-blue-50 border-b border-charcoal/10">
                  <td colSpan={2} className="py-1 px-4 text-xs text-charcoal-light italic">Employee Model (set count to 0 if owner-operated)</td>
                </tr>
                <SpreadsheetRow label="Number of Employees" tooltip="Full-time employees doing assessments. Set to 0 if you do them yourself." value={employeeCount} onChange={setEmployeeCount} indent />
                <SpreadsheetRow label="Employee Hourly Rate" value={employeeHourlyRate} onChange={setEmployeeHourlyRate} prefix="$" indent />
                <SpreadsheetRow label="Employee Overhead %" tooltip="Benefits, payroll taxes, etc. on top of hourly rate" value={employeeOverheadPct} onChange={setEmployeeOverheadPct} suffix="%" indent />
                <SpreadsheetSubtotal label="Employee Fully-Loaded Rate (per hr)" value={employeeFullyLoadedRate} />
                <SpreadsheetSubtotal label="Labor Cost per Assessment" value={laborCostPerAssessment} />
                {employeeCount > 0 && <SpreadsheetSubtotal label="Monthly Employee Cost (in OPEX)" value={monthlyEmployeeCost} />}

                {/* DIRECT COSTS - ASSESSMENT */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">DIRECT COSTS (COGS) - ASSESSMENT</td>
                </tr>
                <SpreadsheetSubtotal label="Labor (from above)" value={laborCostPerAssessment} />
                <SpreadsheetRow label="Lab Fees" value={cogsAssessmentLab} onChange={setCogsAssessmentLab} prefix="$" indent />
                <SpreadsheetRow label="Equipment Consumables" value={cogsAssessmentEquipConsumables} onChange={setCogsAssessmentEquipConsumables} prefix="$" indent />
                <SpreadsheetRow label="Travel" value={cogsAssessmentTravel} onChange={setCogsAssessmentTravel} prefix="$" indent />
                <SpreadsheetSubtotal label="Assessment COGS" value={cogsAssessment} />

                {/* DIRECT COSTS - COMPLETE */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">DIRECT COSTS - COMPLETE (additional)</td>
                </tr>
                <SpreadsheetRow label="Monitoring Sensors" value={cogsCompleteSensors} onChange={setCogsCompleteSensors} prefix="$" indent />
                <SpreadsheetRow label="Additional Setup" value={cogsCompleteAdditional} onChange={setCogsCompleteAdditional} prefix="$" indent />
                <SpreadsheetSubtotal label="Complete COGS (total)" value={cogsComplete} />

                {/* DIRECT COSTS - CARE & LIGHTING */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">DIRECT COSTS - CARE & ADD-ONS</td>
                </tr>
                <SpreadsheetRow label="Care: Service Time (per mo)" value={cogsCareMoService} onChange={setCogsCareMoService} prefix="$" indent />
                <SpreadsheetRow label="Care: Software/Platform (per mo)" value={cogsCareMoSoftware} onChange={setCogsCareMoSoftware} prefix="$" indent />
                <SpreadsheetSubtotal label="Care COGS / month" value={cogsCareMo} />
                <SpreadsheetRow label="Lighting: Hardware" value={cogsLightingHardware} onChange={setCogsLightingHardware} prefix="$" indent />
                <SpreadsheetRow label="Lighting: Installation" value={cogsLightingInstall} onChange={setCogsLightingInstall} prefix="$" indent />
                <SpreadsheetSubtotal label="Lighting COGS" value={cogsLighting} />
                <SpreadsheetRow label="Air Purifier: Hardware" value={cogsAirPurifierHardware} onChange={setCogsAirPurifierHardware} prefix="$" indent />
                <SpreadsheetRow label="Air Purifier: Installation" value={cogsAirPurifierInstall} onChange={setCogsAirPurifierInstall} prefix="$" indent />
                <SpreadsheetSubtotal label="Air Purifier COGS" value={cogsAirPurifier} />
                <SpreadsheetRow label="Water Filter: Hardware" value={cogsWaterFilterHardware} onChange={setCogsWaterFilterHardware} prefix="$" indent />
                <SpreadsheetRow label="Water Filter: Installation" value={cogsWaterFilterInstall} onChange={setCogsWaterFilterInstall} prefix="$" indent />
                <SpreadsheetSubtotal label="Water Filter COGS" value={cogsWaterFilter} />

                {/* OPEX - INSURANCE */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OPERATING EXPENSES - INSURANCE (monthly)</td>
                </tr>
                <SpreadsheetRow label="General Liability" value={opexInsuranceLiability} onChange={setOpexInsuranceLiability} prefix="$" indent />
                <SpreadsheetRow label="E&O / Professional" value={opexInsuranceEO} onChange={setOpexInsuranceEO} prefix="$" indent />
                <SpreadsheetRow label="Vehicle Insurance" value={opexInsuranceVehicle} onChange={setOpexInsuranceVehicle} prefix="$" indent />
                <SpreadsheetSubtotal label="Insurance Subtotal" value={opexInsurance} />

                {/* OPEX - VEHICLE */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OPERATING EXPENSES - VEHICLE (monthly)</td>
                </tr>
                <SpreadsheetRow label="Lease / Payment" value={opexVehicleLease} onChange={setOpexVehicleLease} prefix="$" indent />
                <SpreadsheetRow label="Fuel" value={opexVehicleFuel} onChange={setOpexVehicleFuel} prefix="$" indent />
                <SpreadsheetRow label="Maintenance" value={opexVehicleMaintenance} onChange={setOpexVehicleMaintenance} prefix="$" indent />
                <SpreadsheetSubtotal label="Vehicle Subtotal" value={opexVehicle} />

                {/* OPEX - SOFTWARE */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OPERATING EXPENSES - SOFTWARE (monthly)</td>
                </tr>
                <SpreadsheetRow label="CRM" value={opexSoftwareCRM} onChange={setOpexSoftwareCRM} prefix="$" indent />
                <SpreadsheetRow label="Scheduling" value={opexSoftwareScheduling} onChange={setOpexSoftwareScheduling} prefix="$" indent />
                <SpreadsheetRow label="Accounting" value={opexSoftwareAccounting} onChange={setOpexSoftwareAccounting} prefix="$" indent />
                <SpreadsheetRow label="Monitoring Platform" value={opexSoftwareMonitoring} onChange={setOpexSoftwareMonitoring} prefix="$" indent />
                <SpreadsheetRow label="Website / Hosting" value={opexSoftwareWebsite} onChange={setOpexSoftwareWebsite} prefix="$" indent />
                <SpreadsheetSubtotal label="Software Subtotal" value={opexSoftware} />

                {/* OPEX - MARKETING */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OPERATING EXPENSES - MARKETING (monthly)</td>
                </tr>
                <SpreadsheetRow label="Ads (Google/Meta)" value={opexMarketingAds} onChange={setOpexMarketingAds} prefix="$" indent />
                <SpreadsheetRow label="Content / SEO" value={opexMarketingContent} onChange={setOpexMarketingContent} prefix="$" indent />
                <SpreadsheetRow label="Networking / Events" value={opexMarketingNetworking} onChange={setOpexMarketingNetworking} prefix="$" indent />
                <SpreadsheetSubtotal label="Marketing Subtotal" value={opexMarketing} />

                {/* OPEX - OFFICE */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OPERATING EXPENSES - OFFICE & ADMIN (monthly)</td>
                </tr>
                <SpreadsheetRow label="Phone / Internet" value={opexOfficePhone} onChange={setOpexOfficePhone} prefix="$" indent />
                <SpreadsheetRow label="Supplies" value={opexOfficeSupplies} onChange={setOpexOfficeSupplies} prefix="$" indent />
                <SpreadsheetRow label="Professional Services" value={opexOfficeProfServices} onChange={setOpexOfficeProfServices} prefix="$" indent />
                <SpreadsheetSubtotal label="Office Subtotal" value={opexOffice} />

                {/* OPEX - OWNER & EMPLOYEES */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">OWNER & EMPLOYEE COMPENSATION</td>
                </tr>
                <SpreadsheetRow label="Owner Monthly Draw / Salary" value={opexOwnerDraw} onChange={setOpexOwnerDraw} prefix="$" indent />
                {employeeCount > 0 && <SpreadsheetSubtotal label={`Employee Cost (${employeeCount} @ ${formatCurrency(employeeFullyLoadedRate)}/hr × 160 hrs)`} value={monthlyEmployeeCost} />}
                <tr className="bg-charcoal/10 border-b border-charcoal/10 font-medium">
                  <td className="py-2 px-4 text-charcoal text-sm">TOTAL MONTHLY OPEX</td>
                  <td className="py-2 px-4 text-right text-charcoal font-mono">{formatCurrency(opexTotal)}</td>
                </tr>

                {/* STARTUP COSTS */}
                <tr className="bg-sage/20 border-b border-charcoal/10">
                  <td colSpan={2} className="py-2 px-4 font-serif font-medium text-charcoal">STARTUP / CAPITAL COSTS (one-time)</td>
                </tr>
                <SpreadsheetRow label="Radon Monitors" value={capexEquipmentRadon} onChange={setCapexEquipmentRadon} prefix="$" indent />
                <SpreadsheetRow label="Air Quality Meters" value={capexEquipmentAir} onChange={setCapexEquipmentAir} prefix="$" indent />
                <SpreadsheetRow label="Thermal Camera" value={capexEquipmentThermal} onChange={setCapexEquipmentThermal} prefix="$" indent />
                <SpreadsheetRow label="Water Testing Kit" value={capexEquipmentWater} onChange={setCapexEquipmentWater} prefix="$" indent />
                <SpreadsheetRow label="Misc Tools" value={capexEquipmentMisc} onChange={setCapexEquipmentMisc} prefix="$" indent />
                <SpreadsheetSubtotal label="Equipment Subtotal" value={capexEquipment} />
                <SpreadsheetRow label="Vehicle Downpayment" value={capexVehicleDownpayment} onChange={setCapexVehicleDownpayment} prefix="$" indent />
                <SpreadsheetRow label="Branding / Logo" value={capexBranding} onChange={setCapexBranding} prefix="$" indent />
                <SpreadsheetRow label="Website Build" value={capexWebsite} onChange={setCapexWebsite} prefix="$" indent />
                <SpreadsheetRow label="Legal / Incorporation" value={capexLegal} onChange={setCapexLegal} prefix="$" indent />
                <SpreadsheetRow label="Training / Certification" value={capexTraining} onChange={setCapexTraining} prefix="$" indent />
                <tr className="bg-charcoal/10 border-b border-charcoal/10 font-medium">
                  <td className="py-2 px-4 text-charcoal text-sm">TOTAL STARTUP COSTS</td>
                  <td className="py-2 px-4 text-right text-charcoal font-mono">{formatCurrency(capexTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="bg-cream-dark p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-4">Service Revenue (Monthly at Steady State)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-charcoal-light border-b border-charcoal/10">
                      <th className="pb-3">Product</th>
                      <th className="pb-3 text-right">Units</th>
                      <th className="pb-3 text-right">Price</th>
                      <th className="pb-3 text-right">Revenue</th>
                      <th className="pb-3 text-right">COGS</th>
                      <th className="pb-3 text-right">Gross Profit</th>
                      <th className="pb-3 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal">
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3"><Tooltip content={PRODUCTS.assessment.desc}>Haven Assessment</Tooltip></td>
                      <td className="py-3 text-right">{monthly.standalone.toFixed(1)}</td>
                      <td className="py-3 text-right">{formatCurrency(priceAssessment)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.standalone)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.standalone)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.standalone - monthly.cogs.standalone)}</td>
                      <td className="py-3 text-right">{formatPercent(((priceAssessment - cogsAssessment) / priceAssessment) * 100)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3"><Tooltip content={PRODUCTS.complete.desc}>Haven Complete</Tooltip></td>
                      <td className="py-3 text-right">{monthly.complete.toFixed(1)}</td>
                      <td className="py-3 text-right">{formatCurrency(priceComplete)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.complete)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.complete)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.complete - monthly.cogs.complete)}</td>
                      <td className="py-3 text-right">{formatPercent(((priceComplete - cogsComplete) / priceComplete) * 100)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3"><Tooltip content={PRODUCTS.lighting.desc}>Circadian Lighting</Tooltip></td>
                      <td className="py-3 text-right">{monthly.lighting.toFixed(1)}</td>
                      <td className="py-3 text-right">{formatCurrency(priceLighting)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.lighting)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.lighting)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.lighting - monthly.cogs.lighting)}</td>
                      <td className="py-3 text-right">{formatPercent(((priceLighting - cogsLighting) / priceLighting) * 100)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3"><Tooltip content={PRODUCTS.airPurifier.desc}>Air Purifier</Tooltip></td>
                      <td className="py-3 text-right">{monthly.airPurifier.toFixed(1)}</td>
                      <td className="py-3 text-right">{formatCurrency(priceAirPurifier)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.airPurifier)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.airPurifier)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.airPurifier - monthly.cogs.airPurifier)}</td>
                      <td className="py-3 text-right">{formatPercent(((priceAirPurifier - cogsAirPurifier) / priceAirPurifier) * 100)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3"><Tooltip content={PRODUCTS.waterFilter.desc}>Water Filtration</Tooltip></td>
                      <td className="py-3 text-right">{monthly.waterFilter.toFixed(1)}</td>
                      <td className="py-3 text-right">{formatCurrency(priceWaterFilter)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.waterFilter)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.waterFilter)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.waterFilter - monthly.cogs.waterFilter)}</td>
                      <td className="py-3 text-right">{formatPercent(((priceWaterFilter - cogsWaterFilter) / priceWaterFilter) * 100)}</td>
                    </tr>
                    <tr className="font-medium bg-charcoal/5">
                      <td className="py-3 px-2 rounded-l">Subtotal Services</td>
                      <td className="py-3 text-right">{assessmentsPerMonth}</td>
                      <td className="py-3 text-right">—</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.standalone + monthly.revenue.complete + monthly.revenue.lighting + monthly.revenue.airPurifier + monthly.revenue.waterFilter)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.cogs.total)}</td>
                      <td className="py-3 text-right">{formatCurrency(monthly.revenue.standalone + monthly.revenue.complete + monthly.revenue.lighting + monthly.revenue.airPurifier + monthly.revenue.waterFilter - monthly.cogs.total)}</td>
                      <td className="py-3 text-right rounded-r">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <h2 className="font-serif text-xl text-charcoal mb-4">Referral Partner Revenue (Monthly at Steady State)</h2>
              <p className="text-sm text-charcoal-light mb-4">Commission earned when customers hire your partner network for remediation work identified during assessments.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-charcoal-light border-b border-charcoal/10">
                      <th className="pb-3">Remediation Type</th>
                      <th className="pb-3 text-right">% Need Work</th>
                      <th className="pb-3 text-right">Avg Job Value</th>
                      <th className="pb-3 text-right">Commission</th>
                      <th className="pb-3 text-right">Rev / Assessment</th>
                      <th className="pb-3 text-right">Monthly Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal">
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3">Radon Mitigation</td>
                      <td className="py-3 text-right">{refRadonPercent}%</td>
                      <td className="py-3 text-right">{formatCurrency(refRadonAvgJob)}</td>
                      <td className="py-3 text-right">{refRadonCommission}%</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.radon)}</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.radon * assessmentsPerMonth)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3">HVAC / Ventilation</td>
                      <td className="py-3 text-right">{refHvacPercent}%</td>
                      <td className="py-3 text-right">{formatCurrency(refHvacAvgJob)}</td>
                      <td className="py-3 text-right">{refHvacCommission}%</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.hvac)}</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.hvac * assessmentsPerMonth)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3">Water Treatment</td>
                      <td className="py-3 text-right">{refWaterPercent}%</td>
                      <td className="py-3 text-right">{formatCurrency(refWaterAvgJob)}</td>
                      <td className="py-3 text-right">{refWaterCommission}%</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.water)}</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.water * assessmentsPerMonth)}</td>
                    </tr>
                    <tr className="border-b border-charcoal/5">
                      <td className="py-3">Mold Remediation</td>
                      <td className="py-3 text-right">{refMoldPercent}%</td>
                      <td className="py-3 text-right">{formatCurrency(refMoldAvgJob)}</td>
                      <td className="py-3 text-right">{refMoldCommission}%</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.mold)}</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.mold * assessmentsPerMonth)}</td>
                    </tr>
                    <tr className="font-medium bg-amber-200/50">
                      <td className="py-3 px-2 rounded-l">Total Referral Revenue</td>
                      <td className="py-3 text-right" colSpan={2}>—</td>
                      <td className="py-3 text-right">{formatCurrency(refPerAssessment.total)}</td>
                      <td className="py-3 text-right rounded-r">{formatCurrency(monthly.revenue.referral)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-charcoal text-cream p-6 rounded-xl">
              <h2 className="font-serif text-xl mb-4">Total Monthly Revenue</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-cream/60 text-sm">Service Revenue</p>
                  <p className="text-2xl font-serif">{formatCurrency(monthly.revenue.standalone + monthly.revenue.complete + monthly.revenue.lighting)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Referral Revenue</p>
                  <p className="text-2xl font-serif">{formatCurrency(monthly.revenue.referral)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Total Revenue</p>
                  <p className="text-2xl font-serif">{formatCurrency(monthly.revenue.total)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Gross Profit</p>
                  <p className="text-2xl font-serif text-sage">{formatCurrency(monthly.grossProfit)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "costs" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream-dark p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-4">Monthly Operating Expenses</h2>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Insurance</span>
                  <span className="text-charcoal">{formatCurrency(opexInsurance)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Vehicle</span>
                  <span className="text-charcoal">{formatCurrency(opexVehicle)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Software & Tools</span>
                  <span className="text-charcoal">{formatCurrency(opexSoftware)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Marketing</span>
                  <span className="text-charcoal">{formatCurrency(opexMarketing)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Office & Admin</span>
                  <span className="text-charcoal">{formatCurrency(opexOffice)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Owner Draw</span>
                  <span className="text-charcoal">{formatCurrency(opexOwnerDraw)}</span>
                </div>
                <div className="flex justify-between py-3 bg-charcoal/5 px-2 rounded font-medium">
                  <span className="text-charcoal">TOTAL MONTHLY</span>
                  <span className="text-charcoal">{formatCurrency(opexTotal)}</span>
                </div>
                <div className="flex justify-between py-2 text-charcoal-light">
                  <span>Annual OPEX</span>
                  <span>{formatCurrency(opexTotal * 12)}</span>
                </div>
              </div>
            </div>

            <div className="bg-cream-dark p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-4">Startup / Capital Costs</h2>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Equipment</span>
                  <span className="text-charcoal">{formatCurrency(capexEquipment)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Vehicle Downpayment</span>
                  <span className="text-charcoal">{formatCurrency(capexVehicleDownpayment)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Branding</span>
                  <span className="text-charcoal">{formatCurrency(capexBranding)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Website</span>
                  <span className="text-charcoal">{formatCurrency(capexWebsite)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Legal</span>
                  <span className="text-charcoal">{formatCurrency(capexLegal)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-charcoal/5">
                  <span className="text-charcoal">Training</span>
                  <span className="text-charcoal">{formatCurrency(capexTraining)}</span>
                </div>
                <div className="flex justify-between py-3 bg-charcoal/5 px-2 rounded font-medium">
                  <span className="text-charcoal">TOTAL STARTUP</span>
                  <span className="text-charcoal">{formatCurrency(capexTotal)}</span>
                </div>
              </div>
            </div>

            <div className="bg-charcoal text-cream p-6 rounded-xl md:col-span-2">
              <h2 className="font-serif text-xl mb-4">Break-Even Analysis</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-cream/60 text-sm">Monthly OPEX</p>
                  <p className="text-2xl font-serif">{formatCurrency(opexTotal)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Avg Gross Profit / Assessment</p>
                  <p className="text-2xl font-serif">{formatCurrency(monthly.grossProfit / assessmentsPerMonth)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Assessments to Break Even</p>
                  <p className="text-2xl font-serif text-sage">
                    {(opexTotal / (monthly.grossProfit / assessmentsPerMonth)).toFixed(1)} / month
                  </p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Payback Period</p>
                  <p className="text-2xl font-serif text-sage">
                    {monthly.netProfit > 0 ? `${Math.ceil(capexTotal / monthly.netProfit)} months` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div className="bg-cream-dark p-6 rounded-xl overflow-x-auto">
            <h2 className="font-serif text-xl text-charcoal mb-4">Year 1 Monthly P&L</h2>
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="text-left text-charcoal-light border-b border-charcoal/10">
                  <th className="pb-3">Month</th>
                  <th className="pb-3 text-right">Assessments</th>
                  <th className="pb-3 text-right">Service Rev</th>
                  <th className="pb-3 text-right">Referral Rev</th>
                  <th className="pb-3 text-right">Care Rev</th>
                  <th className="pb-3 text-right">Total Rev</th>
                  <th className="pb-3 text-right">COGS</th>
                  <th className="pb-3 text-right">Gross</th>
                  <th className="pb-3 text-right">OPEX</th>
                  <th className="pb-3 text-right">Net</th>
                </tr>
              </thead>
              <tbody className="text-charcoal">
                {yearOne.months.map((m) => (
                  <tr key={m.month} className="border-b border-charcoal/5">
                    <td className="py-2">{m.month}</td>
                    <td className="py-2 text-right">{m.assessments.toFixed(1)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.newRev)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.referralRev)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.careRev)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.totalRev)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.totalCogs)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.grossProfit)}</td>
                    <td className="py-2 text-right">{formatCurrency(m.opex)}</td>
                    <td className={`py-2 text-right font-medium ${m.netProfit >= 0 ? "text-sage" : "text-red-500"}`}>
                      {formatCurrency(m.netProfit)}
                    </td>
                  </tr>
                ))}
                <tr className="font-medium bg-charcoal/5">
                  <td className="py-3 px-2 rounded-l">TOTAL</td>
                  <td className="py-3 text-right">{yearOne.totals.assessments.toFixed(0)}</td>
                  <td className="py-3 text-right">—</td>
                  <td className="py-3 text-right">{formatCurrency(yearOne.totals.referralRev)}</td>
                  <td className="py-3 text-right">—</td>
                  <td className="py-3 text-right">{formatCurrency(yearOne.totals.revenue)}</td>
                  <td className="py-3 text-right">{formatCurrency(yearOne.totals.cogs)}</td>
                  <td className="py-3 text-right">{formatCurrency(yearOne.totals.grossProfit)}</td>
                  <td className="py-3 text-right">{formatCurrency(yearOne.totals.opex)}</td>
                  <td className={`py-3 text-right rounded-r ${yearOne.totals.netProfit >= 0 ? "text-sage" : "text-red-500"}`}>
                    {formatCurrency(yearOne.totals.netProfit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Year 1 Summary */}
            <div className="bg-charcoal text-cream p-6 rounded-xl">
              <h2 className="font-serif text-xl mb-6">Year 1 Summary</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                <div>
                  <p className="text-cream/60 text-sm">Total Assessments</p>
                  <p className="text-3xl font-serif">{yearOne.totals.assessments.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Total Revenue</p>
                  <p className="text-3xl font-serif">{formatCurrency(yearOne.totals.revenue)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Referral Revenue</p>
                  <p className="text-3xl font-serif text-amber-300">{formatCurrency(yearOne.totals.referralRev)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Gross Profit</p>
                  <p className="text-3xl font-serif">{formatCurrency(yearOne.totals.grossProfit)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Net Profit</p>
                  <p className="text-3xl font-serif text-sage">{formatCurrency(yearOne.totals.netProfit)}</p>
                </div>
              </div>
              <div className="border-t border-cream/10 pt-6 grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-cream/60 text-sm">Startup Costs</p>
                  <p className="text-xl font-serif">{formatCurrency(capexTotal)}</p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Net After Startup</p>
                  <p className={`text-xl font-serif ${yearOne.totals.netProfit - capexTotal >= 0 ? "text-sage" : "text-red-400"}`}>
                    {formatCurrency(yearOne.totals.netProfit - capexTotal)}
                  </p>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">Care Subscribers (EOY)</p>
                  <p className="text-xl font-serif">{yearOne.endCareSubscribers.toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* Year 2 Summary */}
            <div className="bg-sage/20 p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-6">Year 2 Projection</h2>
              <p className="text-charcoal-light text-sm mb-4">
                Assumes {careRetention}% of Y1 Complete customers renew Care ({yearTwo.renewingCare.toFixed(0)} subscribers),
                plus {yearTwo.newCompletePerYear.toFixed(0)} new Complete customers.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <p className="text-charcoal-light text-sm">Monthly Revenue</p>
                  <p className="text-3xl font-serif text-charcoal">{formatCurrency(yearTwo.monthlyRev)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Monthly Referral</p>
                  <p className="text-3xl font-serif text-amber-700">{formatCurrency(yearTwo.monthlyReferralRev)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Monthly Net Profit</p>
                  <p className="text-3xl font-serif text-charcoal">{formatCurrency(yearTwo.monthlyNet)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Annual Revenue</p>
                  <p className="text-3xl font-serif text-charcoal">{formatCurrency(yearTwo.yearlyRev)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Annual Net Profit</p>
                  <p className="text-3xl font-serif text-sage">{formatCurrency(yearTwo.yearlyNet)}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-cream-dark p-6 rounded-xl">
              <h2 className="font-serif text-xl text-charcoal mb-4">Key Metrics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <p className="text-charcoal-light text-sm">Gross Margin</p>
                  <p className="text-2xl font-serif text-charcoal">{formatPercent(monthly.grossMargin)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Net Margin (Steady)</p>
                  <p className="text-2xl font-serif text-charcoal">{formatPercent(monthly.netMargin)}</p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Break-Even</p>
                  <p className="text-2xl font-serif text-charcoal">
                    {(opexTotal / (monthly.grossProfit / assessmentsPerMonth)).toFixed(1)} /mo
                  </p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Payback Period</p>
                  <p className="text-2xl font-serif text-charcoal">
                    {monthly.netProfit > 0 ? `${Math.ceil(capexTotal / monthly.netProfit)} months` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-charcoal-light text-sm">Referral % of Rev</p>
                  <p className="text-2xl font-serif text-amber-700">
                    {formatPercent((monthly.revenue.referral / monthly.revenue.total) * 100)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
