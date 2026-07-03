import { Button, Text } from ".."
export default function SeachHeader() {
    return (
        <>
            <section className="mb-20 bg-background mx-5 rounded-lg border" style={{ background: "var(--gradient-trending)" }}>
                <div className="max-w-7xl mx-auto p-5 lg:px-8">
                    <input type="search" placeholder="enter keywords" className="mb-2 border p-2 rounded-md bg-card w-full" />
                    <div className="grid grid-cols-3 gap-20">
                        <div>
                            <Text
                                as="p"
                                variant="label"
                                className="uppercase text-[8px] tracking-[3px] text-muted mt-1 font-bold mb-2">
                                Category
                            </Text>
                            <div className="flex flex-wrap gap-2"><Button variant="outline">All</Button>
                                <Button variant="ghost">Birds & Animals</Button>
                                <Button variant="ghost">Animations & Cartoons</Button>
                                <Button variant="ghost">Educational</Button>
                                <Button variant="ghost">Storytelling</Button>
                            </div>
                        </div>
                        <div className="">
                            <Text
                                as="p"
                                variant="label"
                                className="uppercase text-[8px] tracking-[3px] text-muted mt-1 font-bold mb-2"
                            >
                                Duration
                            </Text>
                            <div className="flex flex-wrap gap-2"><Button variant="outline">All</Button>
                                <Button variant="ghost">Short</Button>
                                <Button variant="ghost">Medium</Button>
                                <Button variant="ghost">Long</Button>       
                            </div>
                        </div>
                         <div className="">
                            <Text
                                as="p"
                                variant="label"
                                className="uppercase text-[8px] tracking-[3px] text-muted mt-1 font-bold mb-2"
                            >
                                Published
                            </Text>
                            <div className="flex flex-wrap gap-2"><Button variant="outline">All</Button>
                                <Button variant="ghost">Today</Button>
                                <Button variant="ghost">Week</Button>
                                <Button variant="ghost">Month</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}