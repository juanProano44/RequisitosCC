export interface Component {
  componentId: string
  componentName: string
  pageNumber?: number
}

export interface Family {
  familyId: string
  familyName: string
  familyBehaviour: string
  components: Component[]
}

export interface SecurityPrinciple {
  sectionNumber: number
  classId: string
  className: string
  classDescription: string
  families: Family[]
}

export const securityPrinciples: SecurityPrinciple[] = [
  {
    sectionNumber: 11,
    classId: "FDP",
    className: "User Data Protection",
    classDescription:
      "Requirements for protecting user data within the TOE, including access control, information flow control, data integrity, and confidentiality.",
    families: [
      {
        familyId: "FDP_ACC",
        familyName: "Access Control Policy",
        familyBehaviour: "This family defines the access control policies that govern access to user data objects.",
        components: [
          {
            componentId: "FDP_ACC.1",
            componentName: "Subset access control",
            pageNumber: 62,
          },
          {
            componentId: "FDP_ACC.2",
            componentName: "Complete access control",
            pageNumber: 63,
          },
        ],
      },
      {
        familyId: "FDP_ACF",
        familyName: "Access Control Functions",
        familyBehaviour:
          "This family defines the security attributes and rules used to enforce access control policies.",
        components: [
          {
            componentId: "FDP_ACF.1",
            componentName: "Security attribute-based access control",
            pageNumber: 64,
          },
        ],
      },
      {
        familyId: "FDP_DAU",
        familyName: "Data Authentication",
        familyBehaviour: "This family provides requirements for authenticating the integrity and source of user data.",
        components: [
          {
            componentId: "FDP_DAU.1",
            componentName: "Basic Data Authentication",
            pageNumber: 65,
          },
          {
            componentId: "FDP_DAU.2",
            componentName: "Data Authentication with Identity of Guarantor",
            pageNumber: 65,
          },
        ],
      },
      {
        familyId: "FDP_ETC",
        familyName: "Export from the TOE",
        familyBehaviour:
          "This family addresses the security attributes that must accompany user data when exported from the TOE.",
        components: [
          {
            componentId: "FDP_ETC.1",
            componentName: "Export of user data without security attributes",
            pageNumber: 66,
          },
          {
            componentId: "FDP_ETC.2",
            componentName: "Export of user data with security attributes",
            pageNumber: 67,
          },
        ],
      },
      {
        familyId: "FDP_IFC",
        familyName: "Information Flow Control Policy",
        familyBehaviour:
          "This family defines the information flow control policies that govern the flow of information between controlled subjects and controlled information.",
        components: [
          {
            componentId: "FDP_IFC.1",
            componentName: "Subset information flow control",
            pageNumber: 68,
          },
          {
            componentId: "FDP_IFC.2",
            componentName: "Complete information flow control",
            pageNumber: 68,
          },
        ],
      },
      {
        familyId: "FDP_IFF",
        familyName: "Information Flow Control Functions",
        familyBehaviour:
          "This family defines the security attributes and rules used to enforce information flow control policies.",
        components: [
          {
            componentId: "FDP_IFF.1",
            componentName: "Simple security attributes",
            pageNumber: 70,
          },
          {
            componentId: "FDP_IFF.2",
            componentName: "Hierarchical security attributes",
            pageNumber: 71,
          },
          {
            componentId: "FDP_IFF.3",
            componentName: "Limited illicit information flows",
            pageNumber: 72,
          },
          {
            componentId: "FDP_IFF.4",
            componentName: "Partial elimination of illicit information flows",
            pageNumber: 72,
          },
          {
            componentId: "FDP_IFF.5",
            componentName: "No illicit information flows",
            pageNumber: 72,
          },
          {
            componentId: "FDP_IFF.6",
            componentName: "Illicit information flow monitoring",
            pageNumber: 72,
          },
        ],
      },
      {
        familyId: "FDP_IRC",
        familyName: "Information Retention Control",
        familyBehaviour:
          "This family provides requirements for controlling the retention of information within the TOE.",
        components: [
          {
            componentId: "FDP_IRC.1",
            componentName: "Information retention control",
            pageNumber: 74,
          },
        ],
      },
      {
        familyId: "FDP_ITC",
        familyName: "Import from outside of the TOE",
        familyBehaviour:
          "This family addresses the security attributes that must accompany user data when imported into the TOE.",
        components: [
          {
            componentId: "FDP_ITC.1",
            componentName: "Import of user data without security attributes",
            pageNumber: 75,
          },
          {
            componentId: "FDP_ITC.2",
            componentName: "Import of user data with security attributes",
            pageNumber: 75,
          },
        ],
      },
      {
        familyId: "FDP_ITT",
        familyName: "Internal TOE Transfer",
        familyBehaviour: "This family provides requirements for protecting user data when transferred within the TOE.",
        components: [
          {
            componentId: "FDP_ITT.1",
            componentName: "Basic internal transfer protection",
            pageNumber: 77,
          },
          {
            componentId: "FDP_ITT.2",
            componentName: "Transmission separation by attribute",
            pageNumber: 77,
          },
          {
            componentId: "FDP_ITT.3",
            componentName: "Integrity monitoring",
            pageNumber: 78,
          },
          {
            componentId: "FDP_ITT.4",
            componentName: "Attribute-based integrity monitoring",
            pageNumber: 78,
          },
        ],
      },
      {
        familyId: "FDP_RIP",
        familyName: "Residual Information Protection",
        familyBehaviour:
          "This family ensures that any residual information content of a resource is unavailable upon deallocation or reallocation.",
        components: [
          {
            componentId: "FDP_RIP.1",
            componentName: "Subset residual information protection",
            pageNumber: 79,
          },
          {
            componentId: "FDP_RIP.2",
            componentName: "Full residual information protection",
            pageNumber: 79,
          },
        ],
      },
      {
        familyId: "FDP_ROL",
        familyName: "Rollback",
        familyBehaviour: "This family provides requirements for rolling back to a previous secure state.",
        components: [
          {
            componentId: "FDP_ROL.1",
            componentName: "Basic rollback",
            pageNumber: 80,
          },
          {
            componentId: "FDP_ROL.2",
            componentName: "Advanced rollback",
            pageNumber: 80,
          },
        ],
      },
      {
        familyId: "FDP_SDC",
        familyName: "Stored Data Confidentiality",
        familyBehaviour:
          "This family provides requirements for protecting the confidentiality of user data while stored within containers.",
        components: [
          {
            componentId: "FDP_SDC.1",
            componentName: "Stored data confidentiality",
            pageNumber: 81,
          },
          {
            componentId: "FDP_SDC.2",
            componentName: "Stored data confidentiality with dedicated method",
            pageNumber: 82,
          },
        ],
      },
      {
        familyId: "FDP_SDI",
        familyName: "Stored Data Integrity",
        familyBehaviour:
          "This family provides requirements for monitoring and maintaining the integrity of user data while stored within containers.",
        components: [
          {
            componentId: "FDP_SDI.1",
            componentName: "Stored data integrity monitoring",
            pageNumber: 83,
          },
          {
            componentId: "FDP_SDI.2",
            componentName: "Stored data integrity monitoring and action",
            pageNumber: 83,
          },
        ],
      },
      {
        familyId: "FDP_UCT",
        familyName: "Inter-TSF User Data Confidentiality Transfer Protection",
        familyBehaviour:
          "This family provides requirements for protecting the confidentiality of user data during transmission between TSFs.",
        components: [
          {
            componentId: "FDP_UCT.1",
            componentName: "Basic data exchange confidentiality",
            pageNumber: 84,
          },
        ],
      },
      {
        familyId: "FDP_UIT",
        familyName: "Inter-TSF User Data Integrity Transfer Protection",
        familyBehaviour:
          "This family provides requirements for detecting and correcting integrity errors during transmission between TSFs.",
        components: [
          {
            componentId: "FDP_UIT.1",
            componentName: "Data exchange integrity",
            pageNumber: 86,
          },
          {
            componentId: "FDP_UIT.2",
            componentName: "Source data exchange recovery",
            pageNumber: 86,
          },
          {
            componentId: "FDP_UIT.3",
            componentName: "Destination data exchange recovery",
            pageNumber: 86,
          },
        ],
      },
    ],
  },
  {
    sectionNumber: 12,
    classId: "FIA",
    className: "Identification and Authentication",
    classDescription:
      "Requirements for establishing and verifying the identity of users, including authentication mechanisms, user attributes, and session management.",
    families: [
      {
        familyId: "FIA_AFL",
        familyName: "Authentication Failures",
        familyBehaviour: "This family defines requirements for detecting and responding to authentication failures.",
        components: [
          {
            componentId: "FIA_AFL.1",
            componentName: "Authentication failure handling",
            pageNumber: 88,
          },
        ],
      },
      {
        familyId: "FIA_API",
        familyName: "Authentication Proof of Identity",
        familyBehaviour: "This family provides requirements for proving the identity of users during authentication.",
        components: [
          {
            componentId: "FIA_API.1",
            componentName: "Authentication proof of identity",
            pageNumber: 89,
          },
        ],
      },
      {
        familyId: "FIA_ATD",
        familyName: "User Attribute Definition",
        familyBehaviour: "This family defines the security attributes that are maintained for users.",
        components: [
          {
            componentId: "FIA_ATD.1",
            componentName: "User attribute definition",
            pageNumber: 90,
          },
        ],
      },
      {
        familyId: "FIA_SOS",
        familyName: "Specification of Secrets",
        familyBehaviour: "This family defines requirements for the quality and generation of authentication secrets.",
        components: [
          {
            componentId: "FIA_SOS.1",
            componentName: "Verification of secrets",
            pageNumber: 91,
          },
          {
            componentId: "FIA_SOS.2",
            componentName: "TSF Generation of secrets",
            pageNumber: 91,
          },
        ],
      },
      {
        familyId: "FIA_UAU",
        familyName: "User Authentication",
        familyBehaviour:
          "This family defines when and how users must be authenticated before being allowed to perform actions.",
        components: [
          {
            componentId: "FIA_UAU.1",
            componentName: "Timing of authentication",
            pageNumber: 94,
          },
          {
            componentId: "FIA_UAU.2",
            componentName: "User authentication before any action",
            pageNumber: 94,
          },
          {
            componentId: "FIA_UAU.3",
            componentName: "Unforgeable authentication",
            pageNumber: 94,
          },
          {
            componentId: "FIA_UAU.4",
            componentName: "Single-use authentication mechanisms",
            pageNumber: 94,
          },
          {
            componentId: "FIA_UAU.5",
            componentName: "Multiple authentication mechanisms",
            pageNumber: 94,
          },
          {
            componentId: "FIA_UAU.6",
            componentName: "Re-authenticating",
            pageNumber: 95,
          },
          {
            componentId: "FIA_UAU.7",
            componentName: "Protected authentication feedback",
            pageNumber: 95,
          },
        ],
      },
      {
        familyId: "FIA_UID",
        familyName: "User Identification",
        familyBehaviour:
          "This family defines when and how users must be identified before being allowed to perform actions.",
        components: [
          {
            componentId: "FIA_UID.1",
            componentName: "Timing of identification",
            pageNumber: 96,
          },
          {
            componentId: "FIA_UID.2",
            componentName: "User identification before any action",
            pageNumber: 96,
          },
        ],
      },
      {
        familyId: "FIA_USB",
        familyName: "User-Subject Binding",
        familyBehaviour:
          "This family defines requirements for binding user security attributes to subjects acting on behalf of users.",
        components: [
          {
            componentId: "FIA_USB.1",
            componentName: "User-subject binding",
            pageNumber: 97,
          },
        ],
      },
    ],
  },
]
