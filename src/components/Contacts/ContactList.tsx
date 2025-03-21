
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Mail, Phone, Trash2, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import DataTable from "@/components/ui/DataTable";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import { useData } from "@/context/DataContext";

interface ContactListProps {
  limit?: number;
}

const ContactList = ({ limit }: ContactListProps) => {
  const { toast } = useToast();
  const { contacts, companies, addContact, updateContact, deleteContact } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  
  // Filter contacts based on search term
  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit || contacts.length);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleAddContact = () => {
    setIsAddFormOpen(true);
  };

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setIsEditFormOpen(true);
  };

  const handleViewDetails = (contact: any) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  const handleDeleteContact = (contact: any) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      toast({
        title: "Contact deleted",
        description: `${selectedContact.name} has been removed`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
    }
  };

  const saveContact = (contactData: any) => {
    if (contactData.id && contacts.some(contact => contact.id === contactData.id)) {
      // Update existing contact
      updateContact(contactData);
      toast({
        title: "Contact updated",
        description: `${contactData.name} has been updated`,
      });
    } else {
      // Add new contact
      addContact(contactData);
      toast({
        title: "Contact added",
        description: `${contactData.name} has been added`,
      });
    }
  };

  // Format companies for the form
  const companyOptions = companies.map(company => ({
    id: company.id,
    name: company.name
  }));

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {getInitials(info.getValue())}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{info.getValue()}</p>
            <p className="text-xs text-gray-500">{info.row.original.position}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      cell: (info: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-gray-500" />
            <span className="text-sm">{info.getValue()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-gray-500" />
            <span className="text-sm">{info.row.original.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Company",
      accessorKey: "company",
    },
    {
      header: "Last Contact",
      accessorKey: "lastContact",
      cell: (info: any) => (
        <span>
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "",
      id: "actions",
      cell: (info: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetails(info.row.original)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditContact(info.row.original)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleDeleteContact(info.row.original)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      {!limit && (
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0" onClick={handleAddContact}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      )}
      
      <div className={limit ? "p-0" : "p-0 pt-6"}>
        <DataTable
          columns={columns}
          data={filteredContacts}
          searchable={false}
        />
      </div>

      {/* Add Contact Form */}
      <ContactForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={saveContact}
        companies={companyOptions}
      />

      {/* Edit Contact Form */}
      {selectedContact && (
        <ContactForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedContact(null);
          }}
          onSave={saveContact}
          initialData={selectedContact}
          companies={companyOptions}
        />
      )}

      {/* Contact Details */}
      {selectedContact && (
        <ContactDetails
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedContact(null);
          }}
          contact={selectedContact}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedContact?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedContact(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContactList;
