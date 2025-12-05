"use client";

import { useState, lazy, Suspense } from 'react';
import { students, Student } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Code, Loader2 } from 'lucide-react';

// Lazy load the Google Maps components
const APIProvider = lazy(() => import('@vis.gl/react-google-maps').then(module => ({ default: module.APIProvider })));
const Map = lazy(() => import('@vis.gl/react-google-maps').then(module => ({ default: module.Map })));
const AdvancedMarker = lazy(() => import('@vis.gl/react-google-maps').then(module => ({ default: module.AdvancedMarker })));
const Pin = lazy(() => import('@vis.gl/react-google-maps').then(module => ({ default: module.Pin })));
const InfoWindow = lazy(() => import('@vis.gl/react-google-maps').then(module => ({ default: module.InfoWindow })));

export default function MapPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Configuration Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Please provide a Google Maps API key in your environment variables to view the map.
            </p>
            <p className="mt-4">
              Create a <code className="bg-muted px-1 py-0.5 rounded-sm">.env.local</code> file and add the following:
            </p>
            <pre className="mt-2 bg-muted p-4 rounded-lg text-sm">
              <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-10rem)] w-full rounded-xl overflow-hidden border relative">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading map...</span>
          </div>
        </div>
      }>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{ lat: 20, lng: 0 }}
            defaultZoom={2}
            mapId="NEXUS_LAUNCHPAD_MAP"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={() => setSelectedStudent(null)}
          >
            {students.map((student) => (
              <AdvancedMarker
                key={student.id}
                position={student.location}
                onClick={() => setSelectedStudent(student)}
              >
                <Pin
                  background={'hsl(var(--primary))'}
                  borderColor={'hsl(var(--primary))'}
                  glyphColor={'hsl(var(--primary-foreground))'}
                >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                       {student.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />}
                    </div>
                </Pin>
              </AdvancedMarker>
            ))}

            {selectedStudent && (
              <InfoWindow
                position={selectedStudent.location}
                onCloseClick={() => setSelectedStudent(null)}
                pixelOffset={[0,-40]}
              >
                <div className="w-64 p-1">
                  <div className="flex items-center gap-3">
                     <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedStudent.avatarUrl} alt={selectedStudent.name} />
                        <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <h3 className="font-bold">{selectedStudent.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedStudent.college}</p>
                      </div>
                  </div>
                  <div className="my-3">
                    {selectedStudent.skills.slice(0,3).map(skill => (
                        <Badge key={skill} variant="secondary" className="mr-1 mb-1">{skill}</Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full">
                      View Profile
                  </Button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </Suspense>
    </div>
  );
}
