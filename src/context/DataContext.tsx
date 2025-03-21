
import { createContext, useContext, useState, ReactNode } from "react";

// Mock data for companies
const initialCompanies = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    employees: 250,
    status: "Active",
    revenue: "$1.2M",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    employees: 500,
    status: "Active",
    revenue: "$3.4M",
    location: "Chicago, USA",
  },
  {
    id: 3,
    name: "Stark Enterprises",
    industry: "Technology",
    employees: 1000,
    status: "Active",
    revenue: "$8.7M",
    location: "San Francisco, USA",
  },
  {
    id: 4,
    name: "Wayne Enterprises",
    industry: "Finance",
    employees: 750,
    status: "Inactive",
    revenue: "$5.3M",
    location: "Gotham City, USA",
  },
  {
    id: 5,
    name: "Umbrella Corporation",
    industry: "Healthcare",
    employees: 1200,
    status: "Active",
    revenue: "$12.1M",
    location: "Boston, USA",
  },
  {
    id: 6,
    name: "Cyberdyne Systems",
    industry: "Technology",
    employees: 300,
    status: "Inactive",
    revenue: "$2.5M",
    location: "Los Angeles, USA",
  },
  {
    id: 7,
    name: "Oscorp Industries",
    industry: "Research",
    employees: 450,
    status: "Active",
    revenue: "$4.8M",
    location: "New York, USA",
  },
];

// Mock data for contacts
const initialContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    position: "CEO",
    lastContact: "2023-10-25",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@globex.com",
    phone: "+1 (555) 234-5678",
    company: "Globex Industries",
    position: "CTO",
    lastContact: "2023-10-20",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@stark.com",
    phone: "+1 (555) 345-6789",
    company: "Stark Enterprises",
    position: "Sales Director",
    lastContact: "2023-10-18",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@wayne.com",
    phone: "+1 (555) 456-7890",
    company: "Wayne Enterprises",
    position: "Marketing Manager",
    lastContact: "2023-10-15",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@umbrella.com",
    phone: "+1 (555) 567-8901",
    company: "Umbrella Corporation",
    position: "Product Manager",
    lastContact: "2023-10-12",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    email: "j.taylor@cyberdyne.com",
    phone: "+1 (555) 678-9012",
    company: "Cyberdyne Systems",
    position: "HR Director",
    lastContact: "2023-10-10",
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "r.martinez@oscorp.com",
    phone: "+1 (555) 789-0123",
    company: "Oscorp Industries",
    position: "CFO",
    lastContact: "2023-10-05",
  },
];

// Mock data for deals
const initialDeals = [
  {
    id: 1,
    title: "Enterprise Software License",
    company: "Acme Corporation",
    value: "$75,000",
    stage: "Qualified",
    probability: 20,
    expectedCloseDate: "2023-12-15",
  },
  {
    id: 2,
    title: "Cloud Migration Project",
    company: "Globex Industries",
    value: "$120,000",
    stage: "Proposal",
    probability: 50,
    expectedCloseDate: "2023-11-30",
  },
  {
    id: 3,
    title: "Security System Upgrade",
    company: "Wayne Enterprises",
    value: "$95,000",
    stage: "Negotiation",
    probability: 75,
    expectedCloseDate: "2023-11-15",
  },
  {
    id: 4,
    title: "Data Analytics Platform",
    company: "Stark Enterprises",
    value: "$150,000",
    stage: "Closed Won",
    probability: 100,
    expectedCloseDate: "2023-10-30",
  },
  {
    id: 5,
    title: "Mobile App Development",
    company: "Oscorp Industries",
    value: "$85,000",
    stage: "Discovery",
    probability: 10,
    expectedCloseDate: "2024-01-15",
  },
  {
    id: 6,
    title: "Network Infrastructure",
    company: "Umbrella Corporation",
    value: "$200,000",
    stage: "Proposal",
    probability: 40,
    expectedCloseDate: "2023-12-10",
  },
  {
    id: 7,
    title: "AI Research Partnership",
    company: "Cyberdyne Systems",
    value: "$300,000",
    stage: "Closed Lost",
    probability: 0,
    expectedCloseDate: "2023-10-15",
  },
];

// Define pipeline stages
const pipelineStages = [
  { id: "discovery", name: "Discovery", color: "bg-gray-100" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100" },
  { id: "proposal", name: "Proposal", color: "bg-indigo-100" },
  { id: "negotiation", name: "Negotiation", color: "bg-purple-100" },
  { id: "closedWon", name: "Closed Won", color: "bg-green-100" },
  { id: "closedLost", name: "Closed Lost", color: "bg-red-100" },
];

interface DataContextType {
  companies: any[];
  contacts: any[];
  deals: any[];
  stages: any[];
  addCompany: (company: any) => void;
  updateCompany: (company: any) => void;
  deleteCompany: (id: number) => void;
  addContact: (contact: any) => void;
  updateContact: (contact: any) => void;
  deleteContact: (id: number) => void;
  addDeal: (deal: any) => void;
  updateDeal: (deal: any) => void;
  deleteDeal: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [contacts, setContacts] = useState(initialContacts);
  const [deals, setDeals] = useState(initialDeals);

  const addCompany = (company: any) => {
    const newCompany = {
      ...company,
      id: Date.now(),
    };
    setCompanies([...companies, newCompany]);
  };

  const updateCompany = (company: any) => {
    setCompanies(companies.map(c => c.id === company.id ? company : c));
  };

  const deleteCompany = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const addContact = (contact: any) => {
    const newContact = {
      ...contact,
      id: Date.now(),
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (contact: any) => {
    setContacts(contacts.map(c => c.id === contact.id ? contact : c));
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const addDeal = (deal: any) => {
    const newDeal = {
      ...deal,
      id: Date.now(),
    };
    setDeals([...deals, newDeal]);
  };

  const updateDeal = (deal: any) => {
    setDeals(deals.map(d => d.id === deal.id ? deal : d));
  };

  const deleteDeal = (id: number) => {
    setDeals(deals.filter(d => d.id !== id));
  };

  return (
    <DataContext.Provider value={{
      companies,
      contacts,
      deals,
      stages: pipelineStages,
      addCompany,
      updateCompany,
      deleteCompany,
      addContact,
      updateContact,
      deleteContact,
      addDeal,
      updateDeal,
      deleteDeal,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
