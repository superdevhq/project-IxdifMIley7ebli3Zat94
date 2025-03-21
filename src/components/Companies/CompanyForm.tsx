
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: any) => void;
  initialData?: any;
}

const industries = [
  "Technology",
  "Manufacturing",
  "Finance",
  "Healthcare",
  "Retail",
  "Education",
  "Research",
  "Consulting",
  "Energy",
  "Transportation",
];

const CompanyForm = ({ isOpen, onClose, onSave, initialData }: CompanyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    industry: initialData?.industry || "",
    employees: initialData?.employees || "",
    status: initialData?.status || "Active",
    revenue: initialData?.revenue || "",
    location: initialData?.location || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.industry || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Format revenue if it doesn't start with $
    if (formData.revenue && !formData.revenue.startsWith("$")) {
      formData.revenue = `$${formData.revenue}`;
    }

    // Simulate API call
    setTimeout(() => {
      const newCompany = {
        id: initialData?.id || Date.now(),
        ...formData,
        employees: Number(formData.employees) || 0,
      };
      
      onSave(newCompany);
      
      toast({
        title: "Success",
        description: `Company ${initialData ? "updated" : "created"} successfully`,
      });
      
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Company</DialogTitle>
          <DialogDescription>
            Fill in the details for the company. Required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleSelectChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Employees</Label>
                <Input
                  id="employees"
                  name="employees"
                  type="number"
                  value={formData.employees}
                  onChange={handleChange}
                  placeholder="Number of employees"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue</Label>
              <Input
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="e.g. $1.2M"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Company"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;
