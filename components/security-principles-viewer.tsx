"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Shield, Lock, User } from "lucide-react"
import { securityPrinciples } from "@/lib/security-principles-data"

export function SecurityPrinciplesViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  const filteredPrinciples = useMemo(() => {
    return securityPrinciples.filter((principle) => {
      if (selectedClass && principle.classId !== selectedClass) return false
      if (!searchQuery) return true

      const query = searchQuery.toLowerCase()
      return (
        principle.className.toLowerCase().includes(query) ||
        principle.classDescription.toLowerCase().includes(query) ||
        principle.families.some(
          (family) =>
            family.familyName.toLowerCase().includes(query) ||
            family.familyId.toLowerCase().includes(query) ||
            family.components.some(
              (comp) =>
                comp.componentId.toLowerCase().includes(query) || comp.componentName.toLowerCase().includes(query),
            ),
        )
      )
    })
  }, [searchQuery, selectedClass])

  const classIcons = {
    FDP: Shield,
    FIA: User,
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-balance">Common Criteria Security Principles</h1>
        </div>
        <p className="text-muted-foreground text-lg">CC:2022 Security Functional Requirements Reference</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by class, family, or component..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedClass === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedClass(null)}
          >
            All Classes
          </Badge>
          {securityPrinciples.map((principle) => (
            <Badge
              key={principle.classId}
              variant={selectedClass === principle.classId ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedClass(principle.classId)}
            >
              {principle.classId}: {principle.className}
            </Badge>
          ))}
        </div>
      </div>

      {filteredPrinciples.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No principles found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPrinciples.map((principle) => {
            const Icon = classIcons[principle.classId as keyof typeof classIcons] || Shield
            return (
              <div key={principle.classId} className="border rounded-lg p-6 bg-card shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      Class {principle.classId}: {principle.className}
                    </h2>
                    <p className="text-muted-foreground">{principle.classDescription}</p>
                  </div>
                </div>

                <Accordion type="multiple" className="w-full">
                  {principle.families.map((family) => (
                    <AccordionItem key={family.familyId} value={family.familyId}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2 text-left">
                          <Badge variant="secondary">{family.familyId}</Badge>
                          <span className="font-semibold">{family.familyName}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 pt-2 space-y-3">
                          <p className="text-sm text-muted-foreground mb-4">{family.familyBehaviour}</p>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Components:</h4>
                            <div className="grid gap-2">
                              {family.components.map((component) => (
                                <div
                                  key={component.componentId}
                                  className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <Badge variant="outline" className="mt-0.5 font-mono text-xs">
                                    {component.componentId}
                                  </Badge>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{component.componentName}</p>
                                    {component.pageNumber && (
                                      <p className="text-xs text-muted-foreground mt-1">Page {component.pageNumber}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
