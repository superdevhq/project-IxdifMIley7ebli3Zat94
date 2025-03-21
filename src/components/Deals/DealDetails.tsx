
import { Building2, Calendar, DollarSign, BarChart3, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DealDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  deal: any;
}

const DealDetails = ({ isOpen, onClose, deal }: DealDetailsProps) => {
  // Get badge color based on stage
  const getBadgeColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "discovery":
        return "bg-gray-100 text-gray-800";
      case "qualified":
        return "bg-blue-100 text-blue-800";
      case "proposal":
        return "bg-indigo-100 text-indigo-800";
      case "negotiation":
        return "bg-purple-100 text-purple-800";
      case "closed won":
        return "bg-green-100 text-green-800";
      case "closed lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle dialog close properly
  const handleDialogClose = () => {
    // Ensure we call the parent's onClose
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{deal.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            <Badge className={getBadgeColor(deal.stage)}>
              {deal.stage}
            </Badge>
            <span className="text-sm text-gray-500">
              {deal.probability}% probability
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Company</h4>
                  <p>{deal.company}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Value</h4>
                  <p className="font-semibold">{deal.value}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Expected Close Date</h4>
                  <p>{new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Probability</h4>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1">{deal.probability}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Deal Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                {["Discovery", "Qualified", "Proposal", "Negotiation", "Closed Won"].map((stageName, index) => {
                  const isActive = deal.stage === stageName || 
                    (deal.stage === "Closed Lost" && index === 0);
                  const isPassed = 
                    (stageName === "Discovery" && ["Qualified", "Proposal", "Negotiation", "Closed Won"].includes(deal.stage)) ||
                    (stageName === "Qualified" && ["Proposal", "Negotiation", "Closed Won"].includes(deal.stage)) ||
                    (stageName === "Proposal" && ["Negotiation", "Closed Won"].includes(deal.stage)) ||
                    (stageName === "Negotiation" && ["Closed Won"].includes(deal.stage));
                  
                  return (
                    <div key={stageName} className="flex items-center flex-1">
                      <div className={`w-4 h-4 rounded-full ${
                        isActive ? "bg-blue-600" : 
                        isPassed ? "bg-green-500" : 
                        "bg-gray-300"
                      }`}></div>
                      {index < 4 && (
                        <div className={`h-1 flex-1 ${
                          isPassed ? "bg-green-500" : "bg-gray-300"
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Discovery</span>
                <span>Qualified</span>
                <span>Proposal</span>
                <span>Negotiation</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm">Deal moved to {deal.stage}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetails;
