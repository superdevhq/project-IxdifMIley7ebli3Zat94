
import { Mail, Phone, Building2, Briefcase, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
}

const ContactDetails = ({ isOpen, onClose, contact }: ContactDetailsProps) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
          <DialogTitle className="text-xl flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            {contact.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Email</h4>
                  <p className="break-all">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Phone</h4>
                  <p>{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Last Contact</h4>
                  <p>{new Date(contact.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Company</h4>
                  <p>{contact.company}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Position</h4>
                  <p>{contact.position}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm">Added as a new contact</p>
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

export default ContactDetails;
