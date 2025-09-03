import { Trophy, Users, Mountain, Heart, Camera, BookOpen } from "lucide-react"

export const BeyondTechSection = () => {
    return (
        <section id="beyond-tech" className="py-24 px-4 md:px-24 relative">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Beyond <span className="text-primary">Tech</span>
                </h2>
                
                <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                    When I'm not coding, you'll find me exploring the world, building communities, and pursuing passions that shape who I am.
                </p>

                {/* Interests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Volleyball Captain */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <Trophy className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Volleyball Captain</h3>
                        <p className="text-muted-foreground text-sm">
                            Leading teams both on and off the court. Building camaraderie and strategic thinking through sports.
                        </p>
                    </div>

                    {/* Women in Tech */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                            <Users className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Women in Tech</h3>
                        <p className="text-muted-foreground text-sm">
                            Empowering the next generation of female technologists through mentorship and community building.
                        </p>
                    </div>

                    {/* Nature Enthusiast */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <Mountain className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Nature Enthusiast</h3>
                        <p className="text-muted-foreground text-sm">
                            Finding inspiration in the outdoors. Hiking, photography, and connecting with nature's beauty.
                        </p>
                    </div>

                    {/* Photography */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                            <Camera className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Photography</h3>
                        <p className="text-muted-foreground text-sm">
                            Capturing moments and perspectives through the lens. Documenting life's beautiful moments.
                        </p>
                    </div>

                    {/* Reading */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Reading</h3>
                        <p className="text-muted-foreground text-sm">
                            Exploring new worlds through literature. From tech books to fiction, always learning and growing.
                        </p>
                    </div>

                    {/* Community Service */}
                    <div className="group relative overflow-hidden rounded-xl gradient-border p-6 card-hover">
                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                            <Heart className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Community Service</h3>
                        <p className="text-muted-foreground text-sm">
                            Giving back to the community through volunteer work and social impact initiatives.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
