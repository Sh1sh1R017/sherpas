import { CheckCircle2, MessageSquare, Mail, Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  type: "discover" | "email_generated" | "email_opened" | "reply" | "meeting";
  title: string;
  timestamp: string;
  company?: string;
}

const getIcon = (type: Activity["type"]) => {
  switch (type) {
    case "discover":
      return <Search className="h-4 w-4 text-blue-500" />;
    case "email_generated":
      return <Mail className="h-4 w-4 text-purple-500" />;
    case "email_opened":
      return <Mail className="h-4 w-4 text-accent" />;
    case "reply":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case "meeting":
      return <Calendar className="h-4 w-4 text-yellow-500" />;
    default:
      return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />;
  }
};

export function AICopilotFeed({ activities }: { activities: Activity[] }) {
  return (
    <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </div>
          <CardTitle className="text-sm font-medium">Live Copilot Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative p-4">
          {/* Vertical line connecting events */}
          <div className="absolute left-7 top-6 bottom-6 w-px bg-border/50" />
          
          <div className="space-y-6 relative">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex flex-col flex-1 pb-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {activity.company && (
                        <span className="text-xs text-primary/80 font-medium">
                          {activity.company}
                        </span>
                      )}
                      {activity.company && <span className="text-muted-foreground text-xs">•</span>}
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-8">
                No recent AI activity.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
