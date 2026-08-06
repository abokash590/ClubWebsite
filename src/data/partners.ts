export interface Partner {
  name: string;
  type: string;
  desc: string;
  logoPlaceholder: string;
}

export const partners: Partner[] = [
  { 
    name: "TechCorp Inc.", 
    type: "Title Sponsor", 
    desc: "Supported our flagship hackathon and provided cloud credits.",
    logoPlaceholder: "TC"
  },
  { 
    name: "DevAcademy", 
    type: "Learning Partner", 
    desc: "Provides premium courses for our competitive programming panel.",
    logoPlaceholder: "DA"
  },
  { 
    name: "Local Software Solutions", 
    type: "Event Sponsor", 
    desc: "Sponsored prizes for the intra-university programming contest.",
    logoPlaceholder: "LSS"
  },
  {
    name: "Innovate BD",
    type: "Platinum Partner",
    desc: "Provides mentorship and recruitment drives for fresh graduates.",
    logoPlaceholder: "IBD"
  },
  {
    name: "CloudForge",
    type: "Technology Partner",
    desc: "Official hosting and cloud infrastructure provider.",
    logoPlaceholder: "CF"
  }
];
