
import { useState } from "react";
import Navbar from "@/components/Dashboard/Navbar";
import Stats from "@/components/Dashboard/Stats";
import CompanyList from "@/components/Companies/CompanyList";
import DealsPipeline from "@/components/Deals/DealsPipeline";
import ContactList from "@/components/Contacts/ContactList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
            <Stats />
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
