"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { WorkflowCard } from "./workflow-card"
import type { N8NWorkflow } from "@/lib/types"

interface WorkflowCarouselProps {
    title: string;
    workflows: N8NWorkflow[];
}

export function WorkflowCarousel({ title, workflows }: WorkflowCarouselProps) {
  return (
    <section className="w-full">
        <h2 className="text-2xl md:text-3xl font-headline font-semibold text-white mb-4 px-4 md:px-0">{title}</h2>
        <Carousel
            opts={{
                align: "start",
                loop: false,
                dragFree: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {workflows.map((workflow) => (
                    <CarouselItem key={workflow.id} className="basis-auto pl-4">
                        <WorkflowCard workflow={workflow} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    </section>
  )
}
