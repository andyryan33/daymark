'use client';

import { motion } from "framer-motion";

export default function PreviewGrid() {
    // 4 rows of 7 days (28 days)
    const sampleMoods = [
        "bg-[#facc15]", "bg-[#4ade80]", "bg-[#e5e5e5]", "bg-[#4ade80]", "bg-[#facc15]", "bg-[#4ade80]", "bg-[#4ade80]",
        "bg-[#94a3b8]", "bg-[#e5e5e5]", "bg-[#facc15]", "bg-[#4ade80]", "bg-[#1f2937]", "bg-[#4ade80]", "bg-[#4ade80]",
        "bg-[#facc15]", "bg-[#e5e5e5]", "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#94a3b8]", "bg-[#facc15]", "bg-[#1f2937]",
        "bg-[#4ade80]", "bg-[#e5e5e5]", "bg-[#4ade80]", "bg-[#facc15]", "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#4ade80]"
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.5, y: 10 },
        show: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-7 gap-1.5 sm:gap-2 md:gap-3 p-6 bg-white rounded-3xl shadow-2xl shadow-neutral-200/40 border border-neutral-100"
        >
            {sampleMoods.map((color, i) => (
                <motion.div 
                    key={i} 
                    variants={item}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`aspect-square rounded-md ${color} shadow-sm`}
                />
            ))}
        </motion.div>
    );
}