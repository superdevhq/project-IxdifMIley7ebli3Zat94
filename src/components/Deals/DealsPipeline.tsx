
import { useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data for deals
const mockDeals = [
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
const stages = [
  { id: "discovery", name: "Discovery", color: "bg-gray-100" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100" },
  { id: "proposal", name: "Proposal", color: "bg-indigo-100" },
  { id: "negotiation", name: "Negotiation", color: "bg-purple-100" },
  { id: "closedWon", name: "Closed Won", color: "bg-green-100" },
  { id: "closedLost", name: "Closed Lost", color: "bg-red-100" },
];

const DealsPipeline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter deals based on search term
  const filteredDeals = mockDeals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group deals by stage
  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage.name] = filteredDeals.filter(
      deal => deal.stage.toLowerCase() === stage.name.toLowerCase()
    );
    return acc;
  }, {} as Record<string, typeof mockDeals>);

  // Calculate total value by stage
  const totalValueByStage = Object.entries(dealsByStage).reduce((acc, [stage, deals]) => {
    acc[stage] = deals.reduce((sum, deal) => {
      return sum + parseInt(deal.value.replace(/[^0-9]/g, ""));
    }, 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search deals..."
            className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col h-full">
            <div className={`p-3 rounded-t-md ${stage.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{stage.name}</h3>
                <Badge variant="outline" className="bg-white">
                  {dealsByStage[stage.name]?.length || 0}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                ${(totalValueByStage[stage.name] || 0).toLocaleString()}
              </p>
            </div>
            <div className="flex-1 bg-gray-50 p-2 rounded-b-md min-h-[400px]">
              {dealsByStage[stage.name]?.map((deal) => (
                <Card key={deal.id} className="mb-2 border-none shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{deal.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{deal.company}</p>
                        <p className="text-sm font-medium mt-2">{deal.value}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{deal.probability}%</span>
                        <span className="text-xs text-gray-500">
                          {new Date(deal.expectedCloseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsPipeline;
