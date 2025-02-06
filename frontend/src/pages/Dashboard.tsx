import { Search, Filter, ArrowUpDown, ShoppingCart } from 'lucide-react';
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
import Sidebar from '@/components/ui/sidebar/Sidebar';
import { Badge } from "@/components/ui/badge";

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

function Dashboard() {
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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold">Sports Equipment</h1>
              <p className="text-muted-foreground">Browse our collection of premium sports gear</p>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredEquipment.length} items
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((item) => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <p className="text-2xl font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;