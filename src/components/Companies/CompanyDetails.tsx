
import { Building2, MapPin, Users, Briefcase, DollarSign, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CompanyDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  company: any;
}

const CompanyDetails = ({ isOpen, onClose, company }: CompanyDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-600" />
            </div>
            {company.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Location</h4>
                  <p>{company.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Industry</h4>
                  <p>{company.industry}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Employees</h4>
                  <p>{company.employees.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Annual Revenue</h4>
                  <p>{company.revenue}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Status</h4>
                  <Badge variant={company.status === "Active" ? "default" : "secondary"}>
                    {company.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm">Added as a new company</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetails;
