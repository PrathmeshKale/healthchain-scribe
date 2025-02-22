
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  sender: string;
  role: 'doctor' | 'nurse' | 'staff';
  content: string;
  timestamp: string;
  read: boolean;
}

const PatientMessages = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock messages data - in a real app, this would come from your backend
  const messages: Message[] = [
    {
      id: "1",
      sender: "Dr. Sarah Smith",
      role: "doctor",
      content: "Your recent blood test results look good. Keep up with the current medication.",
      timestamp: "2024-03-01T10:30:00",
      read: true
    },
    {
      id: "2",
      sender: "Nurse Johnson",
      role: "nurse",
      content: "Just a reminder about your upcoming vaccination appointment next week.",
      timestamp: "2024-02-28T14:15:00",
      read: false
    },
    {
      id: "3",
      sender: "Dr. Michael Brown",
      role: "doctor",
      content: "Please remember to keep track of your blood pressure readings daily.",
      timestamp: "2024-02-27T09:45:00",
      read: true
    }
  ];

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your reply has been sent successfully.",
    });
    
    setReplyText("");
  };

  const getRoleColor = (role: Message['role']) => {
    switch (role) {
      case 'doctor':
        return 'text-blue-600';
      case 'nurse':
        return 'text-green-600';
      case 'staff':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground mt-2">
              Communicate with your healthcare providers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedMessage?.id === message.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {message.sender}
                          {!message.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </CardTitle>
                        <p className={`text-sm ${getRoleColor(message.role)}`}>
                          {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {message.content}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedMessage.sender}</CardTitle>
                      <p className={`text-sm ${getRoleColor(selectedMessage.role)}`}>
                        {selectedMessage.role.charAt(0).toUpperCase() + selectedMessage.role.slice(1)}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <p>{selectedMessage.content}</p>
                    <div className="flex gap-2 items-end">
                      <Input
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSendReply}>
                        <Send className="h-4 w-4" />
                        <span className="ml-2">Send</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div className="space-y-4">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Select a message</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientMessages;
