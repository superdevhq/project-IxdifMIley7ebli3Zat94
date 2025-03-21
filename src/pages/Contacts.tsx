
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactList from "@/components/Contacts/ContactList";

const Contacts = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
