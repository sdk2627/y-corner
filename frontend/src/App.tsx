import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';

interface Equipment {
  id: number;
  name: string;
  category: string;
  city: string;
  price: number;
  image: string;
}

const initialEquipment: Equipment[] = [
  { id: 1, name: "Basketball", category: "Ball Sports", city: "New York", price: 25, image: "https://picsum.photos/200" },
  { id: 2, name: "Tennis Racket", category: "Racket Sports", city: "Los Angeles", price: 100, image: "https://picsum.photos/200" },
  { id: 3, name: "Football", category: "Ball Sports", city: "Chicago", price: 30, image: "https://picsum.photos/200" },
  { id: 4, name: "Yoga Mat", category: "Fitness", city: "Miami", price: 20, image: "https://picsum.photos/200" },
  { id: 5, name: "Dumbbell Set", category: "Fitness", city: "New York", price: 150, image: "https://picsum.photos/200" },
  { id: 6, name: "Soccer Cleats", category: "Footwear", city: "Los Angeles", price: 80, image: "https://picsum.photos/200" },
];

export default function SportEquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(initialEquipment);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    minPrice: '',
    maxPrice: '',
  });

  const categories = Array.from(new Set(equipment.map(item => item.category)));
  const cities = Array.from(new Set(equipment.map(item => item.city)));

  useEffect(() => {
    const filtered = equipment.filter(item => {
      const categoryMatch = filters.category === '' || item.category === filters.category;
      const cityMatch = filters.city === '' || item.city === filters.city;
      const priceMatch = (filters.minPrice === '' || item.price >= Number(filters.minPrice)) &&
                         (filters.maxPrice === '' || item.price <= Number(filters.maxPrice));
      return categoryMatch && cityMatch && priceMatch;
    });
    setFilteredEquipment(filtered);
  }, [filters, equipment]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <div className="columns">
        <aside className="column is-one-quarter">
          <div className="box">
            <h2 className="title is-4">Filters</h2>
            <div className="field">
              <label className="label" htmlFor="category">Category:</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select id="category" name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="city">City:</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select id="city" name="city" value={filters.city} onChange={handleFilterChange}>
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="minPrice">Min Price:</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  min="0"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="maxPrice">Max Price:</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  min="0"
                />
              </div>
            </div>
          </div>
        </aside>
        <main className="column">
          <h1 className="title">Sport Equipment</h1>
          <div className="columns is-multiline">
            {filteredEquipment.map(item => (
              <div key={item.id} className="column is-one-third">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={item.image} alt={item.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-5">{item.name}</h3>
                    <p className="subtitle is-6">Category: {item.category}</p>
                    <p className="subtitle is-6">City: {item.city}</p>
                    <p className="subtitle is-6">Price: ${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}