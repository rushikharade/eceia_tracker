"use client";

import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface TaskTemplate {
  taskNo: number;
  activity: string;
  sub: string[];
}

interface SubActivityForm {
  name: string;
  startDate: string;
  endDate: string;
  coordinator: string;
  members: string;
  remarks: string;
  status: string;
}

interface TaskForm extends TaskTemplate {
  startDate: string;
  endDate: string;
  coordinator: string;
  members: string;
  remarks: string;
  meetingType: string;
  subActivities: SubActivityForm[];
}

interface ProjectFormState {
  projectName: string;
  projectType: string;
  projectActivity: string;
  category: string;
  capacity: string;
  baselineFrom: string;
  baselineTo: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  coordinates: string;
  kmlFile: File | null;
  existingEC: string;
  existingECFile: File | null;
  pariveshCredentials: string;
  pariveshUsername: string;
  ccrRequired: string;
  complianceNotes: string;
  registrationChecklist: string;
  registrationRemarks: string;
  additionalNotes: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  tasks: TaskForm[];
}

/* ================= TASK MASTER (Based on Document) ================= */
const TASKS: TaskTemplate[] = [
  { 
    taskNo: 1, 
    activity: "Enquiry Received from client", 
    sub: ["Email", "Tender", "Other"]
  },
  { 
    taskNo: 2, 
    activity: "Screening of Project", 
    sub: ["Project category finalization"]
  },
  { taskNo: 3, activity: "Proposal", sub: [
   " Preparation of Proposal by Internal coordinator with CEO and share with client"

  ] },
  { taskNo: 4, activity: "Tender Document (If applicable)", sub: [
    "All required government tender documents have been successfully submitted, and acknowledgement of receipt has been obtained."
  ] },
  { taskNo: 5, activity: "PO", sub: [
    "Date of Receipt"
  ] },
  { taskNo: 6, activity: "PO Acknowledgment", sub: [
    "Send PO acceptance mail to client"
  ] },
  { taskNo: 7, activity: "Legal Status Verification", sub: [
    "Land/NA/CRZ/X approvals (Consideration of applicable NOCs, Forest clearance etc.)"
  ] },
  {
    taskNo: 8,
    activity: "Kick-Off Meeting",
    sub: [
      "Internal meeting, team members finalization",
      "Activity Chart and timeline Preparation",
      "Meeting with client for project description",
      "Client Document Request (Share our LOD & RFI) - Land, layout, process details, Capacity, fuel, emission sources etc.(Respective to sector)",
      "Laboratory Team: Finalization of the Baseline Monitoring Period, and confirmation is required regarding the inclusion of any previously considered baseline data."
    ]
  },
  {
    taskNo: 9,
    activity: "Detailed Environmental Settings",
    sub: ["Project details sharing via mail to all FAEs and LULC team members","Coordinates, satellite map, Environmental Settings table and toposheet"]
  },
  {
    taskNo: 10,
    activity: "Baseline Monitoring Locations",
    sub: [
      "Procurement of Secondary Data",
      "Windrose Preparation",
      "Selection of Baseline Monitoring Locations"
    ]
  },
  {
    taskNo: 11,
    activity: "Project Details Distribution",
    sub: ["Project details shared with all FAE/Team members through E-mail"]
  },
  {
    taskNo: 12,
    activity: "Project Details Distribution with Laboratory Team",
    sub: ["Prepared baseline monitoring locations and shared PO (External Lab) with laboratory team"]
  },
  {
    taskNo: 13,
    activity: "Site Visit Planning",
    sub: ["All FAEs/EC/TM/FAA - Need to visit the study area for the preparation of their functional area reports at earliest. - E-mail the detailed schedule and complete it."]
  },
  {
    taskNo: 14,
    activity: "TOR Application & Internal Review",
    sub: [
      "Preparation of Pre-Feasibility Report with Annexures (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Preparation of CAF, Part-A and Part-B for TOR Application (word file) - (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Draft PFR & Form-I will share with client for review through E-mail.",
      "Technical review and Finalization of PFR & Form-I by Internal coordinator of that sector with EC",
      "Submission of TOR Application on Parivesh Portal (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)"
    ]
  },
  {
    taskNo: 15,
    activity: "TOR Application Status",
    sub: ["Daily Status Monitoring on Parivesh Portal"]
  },
  {
    taskNo: 16,
    activity: "Query Raised on Parivesh Portal",
    sub: [
      "EDS raised by Member Secreatry, MoEFCC",
      "Details to be shared with client/Team Members of project for preparing query reply through Email",
      "Technical review and Finalization of Reply by Internal coordinator with EC",
      "Online submission of details/information to the EDS raised"
    ]
  },
  {
    taskNo: 17,
    activity: "SEAC / EAC Acceptance",
    sub: ["Daily Status Monitoring"]
  },
  {
    taskNo: 18,
    activity: "Standard TOR",
    sub: ["TOR grant date and TOR letter number"]
  },
  {
    taskNo: 19,
    activity: "In Case of Expansion Project - Certified Compliance Report (CCR)",
    sub: [
      "Preparation of Existing EC / CCA Compliance Report",
      "Finalization with Client and EC",
      "Submission to IRO for Certification",
      "Follow-up for RO Site Visit",
      "Reply to Site Visit Observations",
      "Receipt of Certified Compliance Report",
      "Preparation & Submission of Action Taken Report"
    ]
  },
  {
    taskNo: 19,
    activity: "In Case of Specific TOR Case - TOR Presentation",
    sub: [
      "Preparation of TOR Presentation (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical review and Finalization of TOR Presentation by Internal Coordinator with EC"
    ]
  },
  {
    taskNo: 20,
    activity: "SEAC / EAC Meeting Agenda for TOR (If Applicable)",
    sub: ["Mentioned Agenda number, date and Sr. No. of project"]
  },
  {
    taskNo: 21,
    activity: "Query Raised by Committee During / After TOR Presentation",
    sub: [
      "ADS raised by Member Secreatry, MoEFCC for TOR during TOR Presentation (If applicable) OR",
      "ADS raised in MOM Received for TOR",
      "Details shared with client/Team Members of project for preparation of Reply of queries through Email",
      "Submission of details/information to the ADS raised"
    ]
  },
  {
    taskNo: 22,
    activity: "Reconsideration TOR Presentation (In Case of Queries from MOM)",
    sub: [
      "Preparation of TOR Reconsideration Presentation (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical review and Finalization of Reconsideration TOR Presentation by Internal coordinator with EC"
    ]
  },
  {
    taskNo: 23,
    activity: "SEAC / EAC Reconsideration Meeting Agenda for TOR (If Applicable)",
    sub: ["Record the SEAC/EAC reconsideration meeting agenda number, meeting date, and project serial number"]
  },
  {
    taskNo: 24,
    activity: "MOM for TOR",
    sub: ["TOR Recommendation MOM received date"]
  },
  {
    taskNo: 25,
    activity: "Specific TOR Grant",
    sub: ["TOR Grant Details: TOR grant date and TOR letter number"]
  },
  {
    taskNo: 26,
    activity: "Distribution of TOR Letter",
    sub: ["TOR Letter Circulation with the client and all FAEs, EC, and TM"]
  },
  {
    taskNo: 27,
    activity: "Baseline Monitoring (Primary Data Collection)",
    sub: [
      "Analysis of Collected Samples",
      "Collection of Meteorological Data (Baseline Period)",
      "Provide Results of Monitoring reports to concerned FAEs for review (Excel Sheet) through E-mail.",
      "Check & Review of Ion balance of water results by FAE - WP.",
      "Received confirmation of all  results from concerned FAEs through E-mail.",
      "Technical review and Finalization of Results with concerned FAE & EC"
    ]
  },
  {
    taskNo: 28,
    activity: "Site Visit Details (During Baseline Period -- If Applicable)",
    sub: ["Collection of Site Visit Report along with geotagged photographs - Field Datasheet collection and scanned field diary from FAEs/EC/TM through E-mail.                      NOTE: Toposheet is required during site visit so collect from LULC Expert."]
  },
  { taskNo: 29, activity: "Collection of FAE Reports", sub: [
    "E-mail to all FAEs after site visit with timeline for their specific functional areas"
  ] },
  { taskNo: 30, activity: "Socio-Economic Study", sub: [
    "Collection of SE FAE Report along with field data sheets, site visit report & photographs from FAE after Site visit within 15 Days through E-mail"
  ] },
  { taskNo: 31, activity: "Ecology and Biodiversity Study", sub: [
    "Collection of EB FAE Report along with field data sheets, site visit report & photographs from FAE after Site visit within 15 Days through E-mail"
  ] },
  { taskNo: 32, activity: "LULC Study", sub: [
    "Collection of LULC FAE Report along with site visit report & photographs from FAE after Site visit within 10 Days through E-mail."
  ] },
  { taskNo: 33, activity: "HG-Geo Study", sub: [
    "Collection of HG-Geo FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { 
    taskNo: 34, 
    activity: "Risk & Hazard Study", 
    sub: ["To carry out Risk Modelling through SAFETI, ALOHA, PHAST etc. Software by concerned FAE"] 
  },
  { taskNo: 35, activity: "Risk & Hazard Study", sub: [
    "Collection of RH FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { 
    taskNo: 36, 
    activity: "Air Quality Study", 
    sub: ["Preparation of Windrose for Monitoring Period from the Primary collected Meteorological Data, To carry out Air Quality Modelling through AERMOD CLOUD software, Vehicular modelling by concerned person.",
        "Collection of AQ FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
    ] 
  },
  { 
    taskNo: 37, 
    activity: "Noise Study", 
    sub: ["Carried out Noise modelling by concerned person.","Collection of Noise FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."] 
  },
  { taskNo: 38, activity: "Air Pollution Study (Primary Data Interpretation)", sub: [
    "Collection of AP FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { taskNo: 39, activity: "Water Pollution Study", sub: [
    "Collection of WP FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { taskNo: 40, activity: "Soil Conservation Study (Primary Data Interpretation)", sub: [
    "Collection of SC FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { taskNo: 41, activity: "SHW Study", sub: [
    "Collection of SHW FAE Report along with site visit report & photographs from FAE after Site visit within 15 Days through E-mail."
  ] },
  { 
    taskNo: 42, 
    activity: "Review of FAE Reports by respective EC", 
    sub: ["After collection of all FAE reports; share with EC through E-mail.","Technical Review and Finalization of FAE reports by EC (Compilation of all FAE reports are covered in different chapters and will cover by project team.)"] 
  },
  {
    taskNo: 43,
    activity: "EIA Details - Initial Pages",
    sub: [
      "Preparation of Cover Page",
      "Preparation of covering letter and Undertaking by PP - share with client through E-mail.",
      "Undertaking by consultant - Finalized through original signatures on hardcopy.",
      "Use Plagiarism checker software - EIA report share with concerned person through E-mail.",
      "Prepare Plagiarism certificate and finalized through original signatures on hardcopy.",
      "Prepare Index incorporating tables, figures, photographs, maps and list of annexures",
      "Preparation of Executive Summary (E-mail to concerned person).",
      "Preparation of Detailed TOR Complaince Report by Internal coordinator",
      "Technical Review and Finalization of TOR Compliance Report by concerned EC & FAEs (E-mail to concerned person).",
      "Declaration by all Experts (Hard copy with original signatures and date)"
    ]
  },
  { taskNo: 44, activity: "Chapter-1: Introduction", sub: [
    "Gives brief outline of the project and project proponent, description of the project, project location and regulatory framework. It also includes the scope of the study as per the awarded Terms of Reference."
  ] },
  { taskNo: 45, activity: "Chapter-2: Project Description", sub: [
    "Provides need for the project, details regarding the project location, layout,  process description, required resources & infrastructure and the pollution potential."
  ] },
  { taskNo: 46, activity: "Chapter-3: Baseline Studies", sub: [
    "Describes the existing baseline status of the study area of 10 km radial periphery  from proposed project site."
  ] },
  { taskNo: 47, activity: "Chapter-4: Impact Identification and Mitigation Measures", sub: [
    "Deals with the identification, prediction, evaluation of impacts and mitigation of the significant adverse impacts. Chapter 4 has been developed based on Chapter 2 and Chapter 3 by correlating the activities under the proposed project and their  impacts on the receiving environmental attributes. "
  ] },
  { taskNo: 48, activity: "Chapter-5: Site Alternatives", sub: [
    "Analysis of alternatives."
  ] },
  { taskNo: 49, activity: "Chapter-6: Environmental Monitoring Program", sub: [
    "Delineates the proposed post-project Environmental Monitoring Plan and the budgetary provisions for EHS components."
  ] },
  { taskNo: 50, activity: "Chapter-7: Additional Studies", sub: [
    "Discusses the additional studies viz. Risk assessment study required for the project."
  ] },
  { taskNo: 51, activity: "Chapter-8: Project Benefits", sub: [
    "Highlights benefits of the project"
  ] },
  { taskNo: 52, activity: "Chapter-9: Environmental Cost-Benefit Analysis", sub: [
    "Environmental Cost Benefits"
  ] },
  { taskNo: 53, activity: "Chapter-10: Environment Management Plan", sub: [
    "Delineates the Environment Management Plan highlighting the mitigation measures and roles and responsibilities of the management."
  ] },
  { taskNo: 54, activity: "Chapter-11: Executive Summary", sub: [
    "Attempts to summarize the entire report and conclude the outcome of the study."
  ] },
  { taskNo: 55, activity: "Chapter-12: Disclosure of Consultant", sub: [
    "Disclosure of Consultant engaged."
  ] },
  {
    taskNo: 56,
    activity: "Compilation of EIA Report",
    sub: [
      "Merging of all chapters along with all Annexures by Internal coordinator",
      "Merged chapters share with client for review (E-mail to client).",
      "Conduct one client meeting for review and getting confirmation"
    ]
  },
  { taskNo: 57, activity: "Finalization of Draft EIA Report", sub: [
    "Technical Review and Finalization of Draft EIA Report by Internal coordinator with EC (E-mail to concerned person)."
  ] },
  {
    taskNo: 58,
    activity: "Submission of Draft EIA Report",
    sub: [
      "Preparation of required covering letters and share with client for signatures",
      "Submisison of Draft EIA report along with covering letters"
    ]
  },
  {
    taskNo: 59,
    activity: "Public Hearing",
    sub: [
      "Preparation of PH Presentation & Required documents for PH (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical Review and Finalization of PH Presentation with EC (E-mail to concerned person).",
      "Preparation of PH Proceedings (On the day of PH/After few days of PH)",
      "Finalization of Reply for Queries which are raised during PH with the help of EC and submit to RO.",
      "Receive PH MOM from the SPCB. - Please mention date and share with Project team and client through E-mail."
    ]
  },
  {
    taskNo: 60,
    activity: "Final EIA Report",
    sub: [
      "Share the PH Points with FAEs/EC and receive confirmation for the final EIA report.",
      "Preparation of final EIA report compiling the PH Proceedings",
      "Prepare necessary latest required documents and compiling EIA reports.",
      "Technical Review and Finalization of EIA Report with EC (E-mail to concerned person)."
    ]
  },
  {
    taskNo: 61,
    activity: "EC Application on Parivesh Portal",
    sub: [
      "Preparation of EC Application (Part-C) in word file.",
      "Submission of EC Application on Parivesh Portal (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Share Screenshot of EC Application submission to client and Project Team"
    ]
  },
  {
    taskNo: 62,
    activity: "EC Application Status",
    sub: ["EC Application status checking  on daily basis on Parivesh Portal"]
  },
  {
    taskNo: 63,
    activity: "Query Raised on Parivesh Portal",
    sub: [
      "EDS raised by Member Secreatry, MoEFCC",
      "Details shared with client/Team Members of project for preparation of Reply of queries through Email",
      "Technical review and Finalization of Reply with EC",
      "Submission of details/information to the EDS raised"
    ]
  },
  {
    taskNo: 64,
    activity: "SEAC/EAC Acceptance",
    sub: ["Status checking on daily basis"]
  },
  {
    taskNo: 65,
    activity: "SEAC/EAC - EC Presentation",
    sub: [
      "Preparation of EC Presentation (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical review and Finalization of EC Presentation with EC"
    ]
  },
  {
    taskNo: 66,
    activity: "SEAC/EAC meeting agenda with date for EC",
    sub: ["Mentioned Agenda number, date and Sr. No. of project"]
  },
  {
    taskNo: 67,
    activity: "Query Raised by Committee during/after Presentation",
    sub: [
      "ADS raised by Member Secreatry, MoEFCC for EC during EC Presentation OR",
      "ADS raised in MOM received for EC",
      "Details Details shared with client/Team Members of project for preparation of Reply of queries through Email",
      "Submission of details/information to the ADS raised"
    ]
  },
  {
    taskNo: 68,
    activity: "Reconsideration EC Presentation (In case of queries received from MOM)",
    sub: [
      "Preparation of EC Reconsideration Presentation (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical review and Finalization of Reconsideration EC Presentation"
    ]
  },
  {
    taskNo: 69,
    activity: "SEAC/EAC Reconsideration meeting agenda with date for EC",
    sub: ["Mentioned Agenda number, date and Sr. No. of project"]
  },
  {
    taskNo: 70,
    activity: "MOM for EC from SEAC/EAC",
    sub: [
      "EC Recommendtaion MOM Received Date - Email share with client and Project Team"
    ]
  },
  {
    taskNo: 71,
    activity: "SEIAA - EC Presentation",
    sub: [
      "Preparation of SEIAA EC Presentation (Email to be done if the work is allotted to other Team Members apart from Internal Coordinator)",
      "Technical review and Finalization of EC Presentation with EC"
    ]
  },
  {
    taskNo: 72,
    activity: "MOM for EC from SEIAA",
    sub: [
      "EC Recommendtaion MOM Received Date - Email share with client and Project Team"
        ]
  },
  {
    taskNo: 73,
    activity: "EC Letter Grant",
    sub: ["EC Grant Date with EC letter No."]
  },
  {
    taskNo: 74,
    activity: "EC review/verification",
    sub: [
      "Verify the EC letter- if incorrect then immediate inform client and apply for corrigendum on portal "
    ]
  },
  {
    taskNo: 75,
    activity: "Distribution of EC letter",
    sub: ["E-mail to client and all FAEs/EC/TM - Granted EC letter"]
  },
  {
    taskNo: 76,
    activity: "Project Closure",
    sub: [
      "E-mail to client for Project completion certificate alongwith client feedback form",
      "Received Completion certificate & Feedback Form from client."
    ]
  },
  {
    taskNo: 77,
    activity: "Learning outcomes from this project",
    sub: ["Compilation of all learning outcomes from all FAEs and EC."]
  },
  {
    taskNo: 78,
    activity: "Improvements to be done / KPIs",
    sub: ["To check performance of all FAE/TM and rating to be done "]
  }
];

/* ================= COMPONENT ================= */
export default function NewProjectPanel({ onClose }: { onClose: () => void }) {
  const [project, setProject] = useState<ProjectFormState>({
    /* A. BASIC INFO */
    projectName: "",
    projectType: "",
    projectActivity: "",
    category: "",
    capacity: "",
    baselineFrom: "",
    baselineTo: "",

    /* B. LOCATION */
    state: "",
    district: "",
    taluka: "",
    village: "",
    coordinates: "",
    kmlFile: null,

    /* C. EXPANSION ONLY */
    existingEC: "",
    existingECFile: null,
    pariveshCredentials: "",
    pariveshUsername: "",
    ccrRequired: "",
    complianceNotes: "",

    /* D. NEW PROJECT ONLY */
    registrationChecklist: "",
    registrationRemarks: "",

    /* E. GENERAL */
    additionalNotes: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",

    /* TASKS */
    tasks: TASKS.map((t) => ({
      ...t,
      startDate: "",
      endDate: "",
      coordinator: "",
      members: "",
      remarks: "",
      meetingType: "",
      subActivities: t.sub.map((subName) => ({
        name: subName,
        startDate: "",
        endDate: "",
        coordinator: "",
        members: "",
        remarks: "",
        status: ""
      }))
    }))
  });

  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  const toggleTask = (taskNo: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskNo)) {
      newExpanded.delete(taskNo);
    } else {
      newExpanded.add(taskNo);
    }
    setExpandedTasks(newExpanded);
  };

  const updateField = <K extends keyof ProjectFormState>(
    field: K,
    value: ProjectFormState[K]
  ) => {
    setProject((currentProject) => ({ ...currentProject, [field]: value }));
  };

  const updateTask = (index: number, field: keyof TaskForm, value: string) => {
    setProject((currentProject) => {
      const tasks = [...currentProject.tasks];
      tasks[index] = { ...tasks[index], [field]: value };
      return { ...currentProject, tasks };
    });
  };

  const updateSubActivity = (
    taskIndex: number,
    subIndex: number,
    field: keyof SubActivityForm,
    value: string
  ) => {
    setProject((currentProject) => {
      const tasks = [...currentProject.tasks];
      const task = tasks[taskIndex];
      const subActivities = [...task.subActivities];

      subActivities[subIndex] = {
        ...subActivities[subIndex],
        [field]: value,
      };

      tasks[taskIndex] = {
        ...task,
        subActivities,
      };

      return { ...currentProject, tasks };
    });
  };

  const handleFieldChange =
    (field: keyof ProjectFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      updateField(field, event.target.value);
    };

  const handleFileChange =
    (field: "kmlFile" | "existingECFile") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.files?.[0] ?? null);
    };

  const handleTaskChange =
    (taskIndex: number, field: keyof TaskForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      updateTask(taskIndex, field, event.target.value);
    };

  const handleSubActivityChange =
    (taskIndex: number, subIndex: number, field: keyof SubActivityForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      updateSubActivity(taskIndex, subIndex, field, event.target.value);
    };

  const submitProject = () => {
    console.log("FINAL PAYLOAD 👉", project);
    alert("Project saved successfully! Check console for complete data.");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
      <div className="bg-white max-w-7xl mx-auto my-8 rounded-xl shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-emerald-900">New Project Registration</h2>
          <button onClick={onClose} className="hover:bg-emerald-100 p-2 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= A. BASIC PROJECT INFO ================= */}
        <Section title="A. Basic Project Information">
          <InputGrid>
            <Input 
              placeholder="Project Name" 
              value={project.projectName}
              onChange={handleFieldChange("projectName")} 
            />
            <Select 
              value={project.projectType}
              onChange={handleFieldChange("projectType")}
            >
              <option value="">Project Type</option>
              <option>New</option>
              <option>Expansion</option>
              <option>Modernisation</option>
              <option>Amendment</option>
            </Select>
            <Input 
              placeholder="Project Activity (EIA Schedule)" 
              value={project.projectActivity}
              onChange={handleFieldChange("projectActivity")}
            />
            <Select 
              value={project.category}
              onChange={handleFieldChange("category")}
            >
              <option value="">Category</option>
              <option>A</option>
              <option>B1</option>
            </Select>
            <Input 
              placeholder="Capacity" 
              value={project.capacity}
              onChange={handleFieldChange("capacity")}
            />
            <div className="flex gap-2 col-span-1">
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-1">Baseline From</label>
                <Input 
                  type="month" 
                  value={project.baselineFrom}
                  onChange={handleFieldChange("baselineFrom")}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-1">Baseline To</label>
                <Input 
                  type="month" 
                  value={project.baselineTo}
                  onChange={handleFieldChange("baselineTo")}
                />
              </div>
            </div>
          </InputGrid>
        </Section>

        {/* ================= B. LOCATION ================= */}
        <Section title="B. Location Details">
          <InputGrid>
            <Input 
              placeholder="State" 
              value={project.state}
              onChange={handleFieldChange("state")}
            />
            <Input 
              placeholder="District" 
              value={project.district}
              onChange={handleFieldChange("district")}
            />
            <Input 
              placeholder="Taluka" 
              value={project.taluka}
              onChange={handleFieldChange("taluka")}
            />
            <Input 
              placeholder="Village" 
              value={project.village}
              onChange={handleFieldChange("village")}
            />
            <Input 
              placeholder="Coordinates (Lat, Long)" 
              value={project.coordinates}
              onChange={handleFieldChange("coordinates")}
            />
            <div>
              <label className="text-sm text-gray-700 block mb-1">Upload KML File</label>
              <Input 
                type="file" 
                accept=".kml"
                onChange={handleFileChange("kmlFile")}
              />
            </div>
          </InputGrid>
        </Section>

        {/* ================= C. EXPANSION ONLY ================= */}
        {project.projectType === "Expansion" && (
          <Section title="C. Expansion Case Details">
            <InputGrid cols="md:grid-cols-2">
              <Select 
                value={project.existingEC}
                onChange={handleFieldChange("existingEC")}
              >
                <option value="">Existing EC Available?</option>
                <option>Yes</option>
                <option>No</option>
              </Select>

              {project.existingEC === "Yes" && (
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Upload Existing EC Letter</label>
                  <Input 
                    type="file" 
                    onChange={handleFileChange("existingECFile")}
                  />
                </div>
              )}

              <Input 
                placeholder="Parivesh Username / Email" 
                value={project.pariveshUsername}
                onChange={handleFieldChange("pariveshUsername")}
              />
              
              <Select
                value={project.ccrRequired}
                onChange={handleFieldChange("ccrRequired")}
              >
                <option value="">Certified EC / CCR Required?</option>
                <option>Yes</option>
                <option>No</option>
              </Select>
            </InputGrid>
            
            <Textarea 
              placeholder="Compliance Notes (EC/CCA compliance details)" 
              value={project.complianceNotes}
              onChange={handleFieldChange("complianceNotes")}
            />
          </Section>
        )}

        {/* ================= D. NEW PROJECT ONLY ================= */}
        {project.projectType === "New" && (
          <Section title="D. New Project Registration">
            <Select
              value={project.registrationChecklist}
              onChange={handleFieldChange("registrationChecklist")}
            >
              <option value="">Registration Checklist Completed?</option>
              <option>Yes</option>
              <option>No</option>
            </Select>
            <Textarea 
              placeholder="Registration Remarks" 
              value={project.registrationRemarks}
              onChange={handleFieldChange("registrationRemarks")}
            />
          </Section>
        )}

        {/* ================= E. GENERAL ================= */}
        <Section title="E. General & Client Details">
          <Textarea 
            placeholder="Additional Notes" 
            value={project.additionalNotes}
            onChange={handleFieldChange("additionalNotes")}
          />
          <InputGrid>
            <Input 
              placeholder="Client Name" 
              value={project.clientName}
              onChange={handleFieldChange("clientName")}
            />
            <Input 
              type="email" 
              placeholder="Client Email" 
              value={project.clientEmail}
              onChange={handleFieldChange("clientEmail")}
            />
            <Input 
              placeholder="Client Phone" 
              value={project.clientPhone}
              onChange={handleFieldChange("clientPhone")}
            />
          </InputGrid>
        </Section>

        {/* ================= TASK LIST ================= */}
        <div className="p-6 space-y-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 sticky top-16 bg-gray-50 py-2 z-10">
            <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm">
              ✓
            </span>
            Project Tasks & Timeline
          </h3>

          {project.tasks.map((task, taskIndex) => (
            <div key={`${task.taskNo}-${taskIndex}`} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              {/* TASK HEADER */}
              <div 
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleTask(task.taskNo)}
              >
                <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-sm flex-shrink-0">
                  #{task.taskNo}
                </span>
                <p className="font-semibold text-gray-900 flex-1">{task.activity}</p>
                {task.sub.length > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {task.sub.length} sub-activities
                  </span>
                )}
                {expandedTasks.has(task.taskNo) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {/* EXPANDED CONTENT */}
              {expandedTasks.has(task.taskNo) && (
                <div className="p-4 pt-0 space-y-4 border-t">
                  {/* MAIN TASK DETAILS */}
                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium text-blue-900 text-sm">Main Task Details</h4>
                    
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Meeting Type</label>
                      <Select 
                        value={task.meetingType}
                        onChange={handleTaskChange(taskIndex, "meetingType")}
                      >
                        <option value="">Select Type</option>
                        <option>Physical Meeting</option>
                        <option>Virtual Meeting</option>
                        <option>Email Communication</option>
                        <option>Site Visit</option>
                        <option>Individual Work</option>
                        <option>Data from Client</option>
                      </Select>
                    </div>

                    <InputGrid cols="md:grid-cols-4">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Start Date</label>
                        <Input 
                          type="date" 
                          value={task.startDate}
                          onChange={handleTaskChange(taskIndex, "startDate")} 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">End Date</label>
                        <Input 
                          type="date" 
                          value={task.endDate}
                          onChange={handleTaskChange(taskIndex, "endDate")} 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Internal Coordinator / FAE / EC</label>
                        <Input 
                          placeholder="Coordinator"
                          value={task.coordinator}
                          onChange={handleTaskChange(taskIndex, "coordinator")}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Additional Team Members</label>
                        <Input 
                          placeholder="Team Members"
                          value={task.members}
                          onChange={handleTaskChange(taskIndex, "members")}
                        />
                      </div>
                    </InputGrid>

                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Remarks (if any)</label>
                      <Textarea 
                        placeholder="Main task remarks" 
                        value={task.remarks}
                        onChange={handleTaskChange(taskIndex, "remarks")}
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* SUB-ACTIVITIES */}
                  {task.subActivities && task.subActivities.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 text-sm">Sub-Activities</h4>
                      {task.subActivities.map((subActivity, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 p-4 rounded-lg space-y-3 border-l-4 border-emerald-500">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-gray-700 flex-1">
                              {subIndex + 1}. {subActivity.name}
                            </p>
                            <Select 
                              className="w-40"
                              value={subActivity.status}
                              onChange={handleSubActivityChange(taskIndex, subIndex, "status")}
                            >
                              <option value="">Status</option>
                              <option>Not Started</option>
                              <option>Pending</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                              <option>On Hold</option>
                            </Select>
                          </div>

                          <InputGrid cols="md:grid-cols-4">
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Start Date</label>
                              <Input 
                                type="date" 
                                value={subActivity.startDate}
                                onChange={handleSubActivityChange(taskIndex, subIndex, "startDate")}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">End Date</label>
                              <Input 
                                type="date" 
                                value={subActivity.endDate}
                                onChange={handleSubActivityChange(taskIndex, subIndex, "endDate")}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Coordinator / EC</label>
                              <Input 
                                placeholder="Coordinator"
                                value={subActivity.coordinator}
                                onChange={handleSubActivityChange(taskIndex, subIndex, "coordinator")}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Team Members</label>
                              <Input 
                                placeholder="Team Members"
                                value={subActivity.members}
                                onChange={handleSubActivityChange(taskIndex, subIndex, "members")}
                              />
                            </div>
                          </InputGrid>

                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Remarks</label>
                            <Textarea 
                              placeholder="Sub-activity remarks" 
                              value={subActivity.remarks}
                              onChange={handleSubActivityChange(taskIndex, subIndex, "remarks")}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex justify-between items-center bg-gray-50 sticky bottom-0">
          <p className="text-sm text-gray-600">
            Complete all required fields before saving • {project.tasks.length} Tasks
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={submitProject} 
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition font-medium shadow-md"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL UI HELPERS ================= */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
  <div className="p-6 space-y-4 border-b">
    <h3 className="font-semibold text-lg text-gray-800 border-l-4 border-emerald-600 pl-3">
      {title}
    </h3>
    {children}
  </div>
  );
}

function InputGrid({
  children,
  cols = "md:grid-cols-3",
}: {
  children: ReactNode;
  cols?: string;
}) {
  return <div className={`grid grid-cols-1 ${cols} gap-4`}>{children}</div>;
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 p-2.5 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
    />
  );
}

function Select({
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
}) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-gray-300 p-2.5 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 ${className}`}
    >
      {children}
    </select>
  );
}

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 3}
      className="w-full rounded-lg border border-gray-300 p-2.5 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
    />
  );
}
