
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Trash2, Edit, Eye } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DealForm from "./DealForm";
import DealDetails from "./DealDetails";

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

// Mock companies for the form
const mockCompanies = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "Globex Industries" },
  { id: 3, name: "Stark Enterprises" },
  { id: 4, name: "Wayne Enterprises" },
  { id: 5, name: "Umbrella Corporation" },
  { id: 6, name: "Cyberdyne Systems" },
  { id: 7, name: "Oscorp Industries" },
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
  const { toast } = useToast();
  const [deals, setDeals] = useState(initialDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [draggedDeal, setDraggedDeal] = useState<any>(null);
  
  // Filter deals based on search term
  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group deals by stage
  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage.name] = filteredDeals.filter(
      deal => deal.stage.toLowerCase() === stage.name.toLowerCase()
    );
    return acc;
  }, {} as Record<string, typeof initialDeals>);

  // Calculate total value by stage
  const totalValueByStage = Object.entries(dealsByStage).reduce((acc, [stage, deals]) => {
    acc[stage] = deals.reduce((sum, deal) => {
      return sum + parseInt(deal.value.replace(/[^0-9]/g, ""));
    }, 0);
    return acc;
  }, {} as Record<string, number>);

  const handleAddDeal = () => {
    setIsAddFormOpen(true);
  };

  const handleEditDeal = (deal: any) => {
    setSelectedDeal(deal);
    setIsEditFormOpen(true);
  };

  const handleViewDetails = (deal: any) => {
    setSelectedDeal(deal);
    setIsDetailsOpen(true);
  };

  const handleDeleteDeal = (deal: any) => {
    setSelectedDeal(deal);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDeal) {
      setDeals(deals.filter(deal => deal.id !== selectedDeal.id));
      toast({
        title: "Deal deleted",
        description: `${selectedDeal.title} has been removed`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedDeal(null);
    }
  };

  const saveDeal = (dealData: any) => {
    if (dealData.id && deals.some(deal => deal.id === dealData.id)) {
      // Update existing deal
      setDeals(deals.map(deal => 
        deal.id === dealData.id ? dealData : deal
      ));
    } else {
      // Add new deal
      setDeals([...deals, dealData]);
    }
  };

  // Drag and drop functionality
  const handleDragStart = (deal: any) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageName: string) => {
    e.preventDefault();
    
    if (draggedDeal) {
      // Update the deal's stage
      const updatedDeals = deals.map(deal => {
        if (deal.id === draggedDeal.id) {
          // Update probability based on new stage
          let probability = deal.probability;
          
          if (stageName === "Discovery") probability = 10;
          else if (stageName === "Qualified") probability = 20;
          else if (stageName === "Proposal") probability = 50;
          else if (stageName === "Negotiation") probability = 75;
          else if (stageName === "Closed Won") probability = 100;
          else if (stageName === "Closed Lost") probability = 0;
          
          return { ...deal, stage: stageName, probability };
        }
        return deal;
      });
      
      setDeals(updatedDeals);
      
      toast({
        title: "Deal moved",
        description: `${draggedDeal.title} moved to ${stageName}`,
      });
      
      setDraggedDeal(null);
    }
  };

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
        <Button className="shrink-0" onClick={handleAddDeal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div 
            key={stage.id} 
            className="flex flex-col h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.name)}
          >
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
                <Card 
                  key={deal.id} 
                  className="mb-2 border-none shadow-sm cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(deal)}
                >
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
                          <DropdownMenuItem onClick={() => handleViewDetails(deal)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteDeal(deal)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
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

      {/* Add Deal Form */}
      <DealForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={saveDeal}
        companies={mockCompanies}
        stages={stages}
      />

      {/* Edit Deal Form */}
      {selectedDeal && (
        <DealForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedDeal(null);
          }}
          onSave={saveDeal}
          initialData={selectedDeal}
          companies={mockCompanies}
          stages={stages}
        />
      )}

      {/* Deal Details */}
      {selectedDeal && (
        <DealDetails
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedDeal(null);
          }}
          deal={selectedDeal}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedDeal?.title}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedDeal(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DealsPipeline;
