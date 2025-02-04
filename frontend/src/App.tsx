import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - in a real app, this would come from an API
const sportsEquipment = [
  {
    id: 1,
    name: "Professional Basketball",
    category: "Basketball",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=500",
    description: "Official size and weight basketball with superior grip"
  },
  {
    id: 2,
    name: "Tennis Racket Pro",
    category: "Tennis",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be2?auto=format&fit=crop&q=80&w=500",
    description: "Professional grade tennis racket with carbon fiber frame"
  },
  {
    id: 3,
    name: "Soccer Ball Elite",
    category: "Soccer",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=500",
    description: "Match quality soccer ball with enhanced durability"
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    category: "Yoga",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=500",
    description: "Extra thick eco-friendly yoga mat with alignment lines"
  }
];

const categories = ["All", "Basketball", "Tennis", "Soccer", "Yoga"];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const filteredEquipment = sportsEquipment
    .filter(item => 
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sports Equipment</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="w-full sm:w-[150px]"
            onClick={() => setSortBy(sortBy === "name" ? "price" : "name")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by {sortBy === "name" ? "Price" : "Name"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{item.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">${item.price}</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;