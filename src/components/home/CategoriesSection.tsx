import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-yellow-100 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our curated collections designed for modern professional women
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="relative overflow-hidden rounded-lg shadow-md hover-scale group h-72"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src={category.image || 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white text-center">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm mt-2 text-gray-200">{category.description}</p>
                <span className="inline-block mt-3 text-sm font-medium border-b border-white transition-colors group-hover:border-brand-400 group-hover:text-brand-200">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
