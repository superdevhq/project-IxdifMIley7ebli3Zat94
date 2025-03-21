
import { useState } from "react";
import Navbar from "@/components/Dashboard/Navbar";
import Stats from "@/components/Dashboard/Stats";
import CompanyList from "@/components/Companies/CompanyList";
import DealsPipeline from "@/components/Deals/DealsPipeline";
import ContactList from "@/components/Contacts/ContactList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/DataContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { companies, contacts, deals } = useData();

  // Calculate stats
  const totalRevenue = deals
    .filter(deal => deal.stage === "Closed Won")
    .reduce((sum, deal) => sum + parseInt(deal.value.replace(/[^0-9]/g, "")), 0);
  
  const activeDeals = deals.filter(deal => 
    !["Closed Won", "Closed Lost"].includes(deal.stage)
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: "dollar",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Companies",
      value: companies.length.toString(),
      change: "+8.2%",
      icon: "building",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Contacts",
      value: contacts.length.toString(),
      change: "+24.3%",
      icon: "users",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Deals",
      value: activeDeals.toString(),
      change: "+4.6%",
      icon: "chart",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "companies" && "Companies"}
              {activeTab === "deals" && "Deals Pipeline"}
              {activeTab === "contacts" && "Contacts"}
            </h1>
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <Stats stats={stats} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700">Recent Companies</h2>
                <CompanyList limit={5} />
              </div>
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700">Recent Contacts</h2>
                <ContactList limit={5} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="companies">
            <CompanyList />
          </TabsContent>

          <TabsContent value="deals">
            <DealsPipeline />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
