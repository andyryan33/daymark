'use client';

export default function PreviewGrid() {
    // Fake data representing a mix of moods
    const sampleMoods = [
        "bg-[#facc15]", "bg-[#4ade80]", "bg-[#a1a1aa]", "bg-[#4ade80]", 
        "bg-[#facc15]", "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#475569]",
        "bg-[#a1a1aa]", "bg-[#facc15]", "bg-[#4ade80]", "bg-[#1f2937]",
        "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#facc15]", "bg-[#a1a1aa]",
        "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#475569]", "bg-[#facc15]",
        "bg-[#1f2937]", "bg-[#4ade80]", "bg-[#a1a1aa]", "bg-[#4ade80]",
        "bg-[#facc15]", "bg-[#4ade80]", "bg-[#4ade80]", "bg-[#4ade80]"
    ];

    return (
        <div className="grid grid-cols-7 gap-1.5 md:gap-2 p-4 bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {sampleMoods.map((color, i) => (
                <div 
                    key={i} 
                    className={`aspect-square rounded-[3px] md:rounded-[4px] ${color} opacity-80`}
                    style={{ animationDelay: `${i * 20}ms` }}
                />
            ))}
        </div>
    );
}