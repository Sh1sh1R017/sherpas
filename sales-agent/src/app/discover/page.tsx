"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dynamically import MapComponent to disable SSR since Leaflet uses the window object
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false, loading: () => <div className="h-[500px] w-full animate-pulse bg-muted rounded-xl flex items-center justify-center">Loading Map...</div> });

export default function DiscoverPage() {
  // Default to New York
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [radius, setRadius] = useState(5000); // 5km
  const [keyword, setKeyword] = useState("Restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const router = useRouter();

  const POPULAR_INDUSTRIES = ['Restaurants', 'Plumbing', 'Real Estate', 'Digital Marketing', 'Dentists', 'Lawyers', 'Accountants', 'Gyms', 'Cafes', 'Salons'];
  const filteredIndustries = POPULAR_INDUSTRIES.filter(i => i.toLowerCase().includes(keyword.toLowerCase()));

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: center.lat, lng: center.lng, radius, keyword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to discover businesses");
      
      setResults(data.places || []);
      
      // Small delay then redirect to leads table
      if (data.places?.length > 0) {
        setTimeout(() => {
          router.push('/leads');
        }, 1500);
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Discover Leads</h2>
          <p className="text-muted-foreground">Click on the map to set a search origin, adjust the radius, and find leads instantly.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative z-0">
            <MapComponent center={center} radius={radius} onCenterChange={setCenter} results={results} />
          </div>

          <div className="space-y-6 flex flex-col justify-start relative z-10">
            <Card>
              <CardHeader>
                <CardTitle>Search Criteria</CardTitle>
                <CardDescription>Drag the map or click to set origin.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex flex-col gap-6">
                  
                  <div className="space-y-2">
                    <Label htmlFor="radius">Search Radius: {(radius / 1000).toFixed(1)} km</Label>
                    <input 
                      type="range" 
                      id="radius" 
                      min="500" 
                      max="50000" 
                      step="500" 
                      value={radius} 
                      onChange={(e) => setRadius(parseInt(e.target.value))} 
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="keyword">Industry / Keyword</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="keyword" 
                        placeholder="e.g. Restaurants" 
                        className="pl-9" 
                        value={keyword}
                        onChange={(e) => {
                          setKeyword(e.target.value);
                          setShowKeywordSuggestions(true);
                        }}
                        onFocus={() => setShowKeywordSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 200)}
                        required
                      />
                      {showKeywordSuggestions && filteredIndustries.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-[100] mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
                          {filteredIndustries.map((industry) => (
                            <div
                              key={industry}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                              onMouseDown={() => {
                                setKeyword(industry);
                                setShowKeywordSuggestions(false);
                              }}
                            >
                              {industry}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning Map...
                      </>
                    ) : (
                      "Discover Leads"
                    )}
                  </Button>
                </form>
                {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
              </CardContent>
            </Card>
          </div>
        </div>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Discovered Businesses ({results.length})</CardTitle>
              <CardDescription>These businesses have been saved to your database.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((biz) => (
                    <TableRow key={biz.id}>
                      <TableCell className="font-medium">{biz.name}</TableCell>
                      <TableCell><Badge variant="outline">{biz.businessCategory || 'N/A'}</Badge></TableCell>
                      <TableCell>
                        {biz.website ? (
                          <a href={biz.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            Link
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {biz.googleRating ? `${biz.googleRating} (${biz.reviewCount})` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
