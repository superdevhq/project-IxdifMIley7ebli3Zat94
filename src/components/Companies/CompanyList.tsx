
import { useState } from "react";
import { Building2, MoreHorizontal, Plus, Search, Trash2, Edit, Eye } from "lucide-react";
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
import DataTable from "@/components/ui/DataTable";
import CompanyForm from "./CompanyForm";
import CompanyDetails from "./CompanyDetails";
import { useData } from "@/context/DataContext";

interface CompanyListProps {
  limit?: number;
}

const CompanyList = ({ limit }: CompanyListProps) => {
  const { toast } = useToast();
  const { companies, addCompany, updateCompany, deleteCompany } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  
  // Filter companies based on search term
  const filteredCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit || companies.length);

  const handleAddCompany = () => {
    setIsAddFormOpen(true);
  };

  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    setIsEditFormOpen(true);
  };

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company);
    setIsDetailsOpen(true);
  };

  const handleDeleteCompany = (company: any) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.id);
      toast({
        title: "Company deleted",
        description: `${selectedCompany.name} has been removed`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedCompany(null);
    }
  };

  const saveCompany = (companyData: any) => {
    if (companyData.id && companies.some(company => company.id === companyData.id)) {
      // Update existing company
      updateCompany(companyData);
      toast({
        title: "Company updated",
        description: `${companyData.name} has been updated`,
      });
    } else {
      // Add new company
      addCompany(companyData);
      toast({
        title: "Company added",
        description: `${companyData.name} has been added`,
      });
    }
  };

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
            <DropdownMenuItem onClick={() => handleEditCompany(info.row.original)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleDeleteCompany(info.row.original)}
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
              placeholder="Search companies..."
              className="pl-8 w-full sm:w-[300px] bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0" onClick={handleAddCompany}>
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      )}
      
      <div className={limit ? "p-0" : "p-0 pt-6"}>
        <DataTable
          columns={columns}
          data={filteredCompanies}
          searchable={false}
        />
      </div>

      {/* Add Company Form */}
      <CompanyForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={saveCompany}
      />

      {/* Edit Company Form */}
      {selectedCompany && (
        <CompanyForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedCompany(null);
          }}
          onSave={saveCompany}
          initialData={selectedCompany}
        />
      )}

      {/* Company Details */}
      {selectedCompany && (
        <CompanyDetails
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedCompany(null);
          }}
          company={selectedCompany}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedCompany?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedCompany(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CompanyList;
