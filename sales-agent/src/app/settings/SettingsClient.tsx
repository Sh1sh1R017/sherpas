"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

export function SettingsClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: 'success', text: "Settings saved successfully!" });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Resend Config */}
      <Card>
        <CardHeader>
          <CardTitle>Email API (Resend)</CardTitle>
          <CardDescription>Configure your own Resend API key to send emails directly from your verified domain.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resendKey">Resend API Key</Label>
            <Input 
              id="resendKey" 
              name="resendKey" 
              type="password" 
              placeholder="re_..." 
              value={formData.resendKey} 
              onChange={handleChange} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
          {message && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
