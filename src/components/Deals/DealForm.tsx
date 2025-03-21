
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

interface DealFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: any) => void;
  initialData?: any;
  companies: any[];
  stages: any[];
}

const DealForm = ({ isOpen, onClose, onSave, initialData, companies, stages }: DealFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    value: initialData?.value || "",
    stage: initialData?.stage || stages[0]?.name || "Discovery",
    probability: initialData?.probability || 10,
    expectedCloseDate: initialData?.expectedCloseDate 
      ? new Date(initialData.expectedCloseDate).toISOString().split('T')[0] 
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, probability: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.title || !formData.company || !formData.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Format value if it doesn't start with $
    if (formData.value && !formData.value.startsWith("$")) {
      formData.value = `$${formData.value}`;
    }

    // Set probability based on stage if not manually set
    if (formData.stage === "Discovery" && formData.probability === 10) {
      formData.probability = 10;
    } else if (formData.stage === "Qualified" && formData.probability === 10) {
      formData.probability = 20;
    } else if (formData.stage === "Proposal" && formData.probability === 10) {
      formData.probability = 50;
    } else if (formData.stage === "Negotiation" && formData.probability === 10) {
      formData.probability = 75;
    } else if (formData.stage === "Closed Won") {
      formData.probability = 100;
    } else if (formData.stage === "Closed Lost") {
      formData.probability = 0;
    }

    // Simulate API call
    setTimeout(() => {
      const newDeal = {
        id: initialData?.id || Date.now(),
        ...formData,
      };
      
      onSave(newDeal);
      
      toast({
        title: "Success",
        description: `Deal ${initialData ? "updated" : "created"} successfully`,
      });
      
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Deal</DialogTitle>
          <DialogDescription>
            Fill in the details for the deal. Required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter deal title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Select
                value={formData.company}
                onValueChange={(value) => handleSelectChange("company", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value *</Label>
                <Input
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="e.g. $10,000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => handleSelectChange("stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.name}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="probability">Probability: {formData.probability}%</Label>
              </div>
              <Slider
                id="probability"
                defaultValue={[formData.probability]}
                max={100}
                step={5}
                onValueChange={handleSliderChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
              <Input
                id="expectedCloseDate"
                name="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DealForm;
