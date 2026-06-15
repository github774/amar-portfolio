"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, X } from "lucide-react"

import { cn } from "@/lib/utils"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc?: string
  thumbnailAlt?: string
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  open,
  onOpenChange,
}: HeroVideoProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  
  const isVideoOpen = open !== undefined ? open : internalOpen
  const setIsVideoOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen

  const selectedAnimation = animationVariants[animationStyle]

  return (
    <div className={cn("relative", className)}>
      {thumbnailSrc && (
        <div
          className="relative cursor-pointer group"
          onClick={() => setIsVideoOpen(true)}
        >
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={1920}
            height={1080}
            className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
          />
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
            <div className="bg-white/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
              <div
                className={`flex items-center justify-center bg-gradient-to-b from-white/30 to-white shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100`}
              >
                <Play
                  className="size-8 text-black fill-black group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                  style={{
                    filter:
                      "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsVideoOpen(false)}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video mx-auto z-10"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-14 right-0 text-white text-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-full p-2.5 cursor-pointer shadow-lg transition-colors"
              >
                <X className="size-5" />
              </button>
              <div className="size-full border-2 border-zinc-800 bg-black rounded-2xl overflow-hidden isolate z-[1] relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <iframe
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
