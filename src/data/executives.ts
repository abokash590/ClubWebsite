export interface Executive {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
    facebook?: string;
    codeforces?: string;
  };
}

/* ============================================================
   MEC Computer Club — Executive Committee (Term 2025–26)
   Source: MEC-CC/25-26/01 (13-10-2025) &
           MEC-CC/25-26/03 (09-04-2026)
   ============================================================ */

export const executives: Executive[] = [

  /* ── Core Officers (MEC-CC/25-26/01) ── */
  {
    id: "exec-president",
    name: "Faisal Ahmed",
    role: "President",
    image: "",
  },
  {
    id: "exec-vice-president",
    name: "Abdullah Bin Ziad",
    role: "Vice President",
    image: "",
  },
  {
    id: "exec-general-secretary",
    name: "Hossain Bin Sayeed",
    role: "General Secretary",
    image: "",
  },
  {
    id: "exec-joint-secretary",
    name: "Md Shazid Al Hasan",
    role: "Joint Secretary",
    image: "",
  },
  {
    id: "exec-organizing-secretary",
    name: "Estiak Ahammed",
    role: "Organizing Secretary",
    image: "",
  },
  {
    id: "exec-creative-media",
    name: "Tawhid Ahmmmed",
    role: "Creative & Media Executive",
    image: "",
  },
  {
    id: "exec-event-coordinator",
    name: "Dween Mohammad",
    role: "Event Co-Ordinator",
    image: "",
  },
  {
    id: "exec-finance-secretary",
    name: "Md. Nasir Ahmed",
    role: "Finance Secretary",
    image: "",
  },
  {
    id: "exec-resource-logistics",
    name: "Abdullah Zubayer Talukder",
    role: "Resource & Logistics Manager",
    image: "",
  },
  {
    id: "exec-public-relations",
    name: "MD Robiullah",
    role: "Public Relations Executive",
    image: "",
  },
  {
    id: "exec-web-admin",
    name: "Asadullah Islam Joy",
    role: "Web Administrator",
    image: "",
  },

  /* ── Assigned Responsibilities (MEC-CC/25-26/03) ── */
  {
    id: "exec-hardware-systems",
    name: "Abdullah Al Shafi",
    role: "Hardware & Systems Coordinator",
    image: "",
  },
  {
    id: "exec-it-infrastructure",
    name: "Sadid Abrar",
    role: "IT & Infrastructure Lead",
    image: "",
  },
  {
    id: "exec-cybersec",
    name: "Khokamoni",
    role: "Cyber Security Coordinator",
    image: "",
  },
  {
    id: "exec-operations",
    name: "Abir Hossain",
    role: "Operations Coordinator",
    image: "",
  },

  /* ── Executive Members (MEC-CC/25-26/01) ── */
  {
    id: "exec-member-fahim",
    name: "Md. Fahim Hossain Abir",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-akram",
    name: "Akram Hossen",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-shahriyar",
    name: "Md Shahriyar Ahammed Joy",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-maisha",
    name: "Maisha Mubashshira",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-sayeem",
    name: "Sayeem Shahriar Sami",
    role: "Executive Member",
    image: "",
  },

  /* ── Executive Members (MEC-CC/25-26/03) ── */
  {
    id: "exec-member-fida",
    name: "Fida Zaman",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-tamim",
    name: "Md. Tamim Khan",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-johana",
    name: "Johana Hossain",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-muaz",
    name: "Abdullah Al Muaz",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-rajdeep",
    name: "Rajdeep Mondal Rudra",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-sadia",
    name: "Sadia Islam",
    role: "Executive Member",
    image: "",
  },
  {
    id: "exec-member-joyanta",
    name: "Joyanta Kumar Roy",
    role: "Executive Member",
    image: "",
  },
];
