
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Mail, Phone } from "lucide-react";
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
import DataTable from "@/components/ui/DataTable";

// Mock data for contacts
const mockContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    position: "CEO",
    lastContact: "2023-10-25",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@globex.com",
    phone: "+1 (555) 234-5678",
    company: "Globex Industries",
    position: "CTO",
    lastContact: "2023-10-20",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@stark.com",
    phone: "+1 (555) 345-6789",
    company: "Stark Enterprises",
    position: "Sales Director",
    lastContact: "2023-10-18",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@wayne.com",
    phone: "+1 (555) 456-7890",
    company: "Wayne Enterprises",
    position: "Marketing Manager",
    lastContact: "2023-10-15",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@umbrella.com",
    phone: "+1 (555) 567-8901",
    company: "Umbrella Corporation",
    position: "Product Manager",
    lastContact: "2023-10-12",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    email: "j.taylor@cyberdyne.com",
    phone: "+1 (555) 678-9012",
    company: "Cyberdyne Systems",
    position: "HR Director",
    lastContact: "2023-10-10",
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "r.martinez@oscorp.com",
    phone: "+1 (555) 789-0123",
    company: "Oscorp Industries",
    position: "CFO",
    lastContact: "2023-10-05",
  },
];

interface ContactListProps {
  limit?: number;
}

const ContactList = ({ limit }: ContactListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter contacts based on search term
  const filteredContacts = mockContacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit || mockContacts.length);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

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
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Card className="border-none shadow-sm">
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
          <Button className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      )}
      <CardContent className={limit ? "p-0" : "p-0 pt-6"}>
        <DataTable
          columns={columns}
          data={filteredContacts}
          searchable={false}
        />
      </CardContent>
    </Card>
  );
};

export default ContactList;
