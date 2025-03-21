
import { useState } from "react";
import { Building2, MoreHorizontal, Plus, Search } from "lucide-react";
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
import DataTable from "@/components/ui/DataTable";

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    employees: 250,
    status: "Active",
    revenue: "$1.2M",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    employees: 500,
    status: "Active",
    revenue: "$3.4M",
    location: "Chicago, USA",
  },
  {
    id: 3,
    name: "Stark Enterprises",
    industry: "Technology",
    employees: 1000,
    status: "Active",
    revenue: "$8.7M",
    location: "San Francisco, USA",
  },
  {
    id: 4,
    name: "Wayne Enterprises",
    industry: "Finance",
    employees: 750,
    status: "Inactive",
    revenue: "$5.3M",
    location: "Gotham City, USA",
  },
  {
    id: 5,
    name: "Umbrella Corporation",
    industry: "Healthcare",
    employees: 1200,
    status: "Active",
    revenue: "$12.1M",
    location: "Boston, USA",
  },
  {
    id: 6,
    name: "Cyberdyne Systems",
    industry: "Technology",
    employees: 300,
    status: "Inactive",
    revenue: "$2.5M",
    location: "Los Angeles, USA",
  },
  {
    id: 7,
    name: "Oscorp Industries",
    industry: "Research",
    employees: 450,
    status: "Active",
    revenue: "$4.8M",
    location: "New York, USA",
  },
];

interface CompanyListProps {
  limit?: number;
}

const CompanyList = ({ limit }: CompanyListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter companies based on search term
  const filteredCompanies = mockCompanies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit || mockCompanies.length);

  const columns = [
    {
      header: "Company",
      accessorKey: "name",
      cell: (info: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{info.getValue()}</p>
            <p className="text-xs text-gray-500">{info.row.original.location}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Industry",
      accessorKey: "industry",
    },
    {
      header: "Employees",
      accessorKey: "employees",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <Badge variant={info.getValue() === "Active" ? "default" : "secondary"}>
          {info.getValue()}
        </Badge>
      ),
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
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
              placeholder="Search companies..."
              className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      )}
      <CardContent className={limit ? "p-0" : "p-0 pt-6"}>
        <DataTable
          columns={columns}
          data={filteredCompanies}
          searchable={false}
        />
      </CardContent>
    </Card>
  );
};

export default CompanyList;
