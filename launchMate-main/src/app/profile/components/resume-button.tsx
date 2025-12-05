
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateResumeAction, generatePortfolioAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, FileText, Globe } from "lucide-react";
import jsPDF from "jspdf";
import { marked } from "marked";

type AssetType = 'resume' | 'portfolio';

export default function ResumeButton({ profileData, type }: { profileData: string; type: AssetType }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);

    if (type === 'resume') {
        const result = await generateResumeAction({ profileData });
        if (result.error || !result.resume) {
          toast({
            title: "Generation Failed",
            description: result.error || "Could not generate resume.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        try {
            const doc = new jsPDF();
            const html = await marked.parse(result.resume);
    
            // Basic styling for the PDF
            const pdfContent = `
              <html>
                <head>
                  <style>
                    body { font-family: 'Helvetica', 'sans-serif'; font-size: 12px; line-height: 1.6; }
                    h1, h2, h3 { font-family: 'Times', 'serif'; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 15px;}
                    h1 { font-size: 24px; }
                    h2 { font-size: 18px; }
                    h3 { font-size: 16px; }
                    a { color: #007bff; text-decoration: none; }
                    ul { padding-left: 20px; }
                    li { margin-bottom: 5px; }
                  </style>
                </head>
                <body>${html}</body>
              </html>
            `;
    
            doc.html(pdfContent, {
              callback: function (doc) {
                doc.save("resume.pdf");
                toast({
                  title: "Success!",
                  description: "Your resume (resume.pdf) has been downloaded.",
                });
              },
              x: 10,
              y: 10,
              width: 190,
              windowWidth: 800,
            });
    
          } catch (e) {
            console.error("Failed to generate PDF", e);
            toast({
              title: "PDF Generation Failed",
              description: "Could not create the PDF file. Please try again.",
              variant: "destructive",
            });
          }

    } else if (type === 'portfolio') {
        const result = await generatePortfolioAction({ profileData });
        if (result.error || !result.portfolio) {
          toast({
            title: "Generation Failed",
            description: result.error || "Could not generate portfolio.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const blob = new Blob([result.portfolio], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "portfolio.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
            title: "Success!",
            description: "Your portfolio website (portfolio.html) has been downloaded.",
        });
    }

    setIsLoading(false);
  };

  const Icon = type === 'resume' ? FileText : Globe;
  const label = type === 'resume' ? 'Generate PDF Resume' : 'Generate Portfolio Site';

  return (
    <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {isLoading ? `Generating ${type}...` : label}
    </Button>
  );
}
