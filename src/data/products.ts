
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for every occasion',
    image: '/lovable-uploads/10b76dac-4d78-496a-8549-7a7208b335ab.png',
    featuredImage: '/lovable-uploads/10b76dac-4d78-496a-8549-7a7208b335ab.png',
    subcategories: [
      { id: '101', name: 'Office Wear', slug: 'office-wear', categoryId: '1', image: '/assets/subcategories/office-wear.jpg' },
      { id: '102', name: 'Casual', slug: 'casual', categoryId: '1', image: '/assets/subcategories/casual.jpg' },
      { id: '103', name: 'Party Wear', slug: 'party-wear', categoryId: '1', image: '/assets/subcategories/party-wear.jpg' },
    ]
  },
  {
    id: '2',
    name: 'Tops',
    slug: 'tops',
    description: 'Stylish tops for your wardrobe',
    image: '/assets/categories/tops.jpg',
    subcategories: [
      { id: '201', name: 'Blouses', slug: 'blouses', categoryId: '2', image: '/assets/subcategories/blouses.jpg' },
      { id: '202', name: 'T-shirts', slug: 't-shirts', categoryId: '2', image: '/assets/subcategories/t-shirts.jpg' },
      { id: '203', name: 'Shirts', slug: 'shirts', categoryId: '2', image: '/assets/subcategories/shirts.jpg' },
    ]
  },
  {
    id: '3',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Comfortable and stylish bottoms',
    image: '/assets/categories/bottoms.jpg',
    subcategories: [
      { id: '301', name: 'Pants', slug: 'pants', categoryId: '3', image: '/assets/subcategories/pants.jpg' },
      { id: '302', name: 'Skirts', slug: 'skirts', categoryId: '3', image: '/assets/subcategories/skirts.jpg' },
      { id: '303', name: 'Jeans', slug: 'jeans', categoryId: '3', image: '/assets/subcategories/jeans.jpg' },
    ]
  },
  {
    id: '4',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Jackets, coats, and more',
    image: '/assets/categories/outerwear.jpg',
    subcategories: [
      { id: '401', name: 'Jackets', slug: 'jackets', categoryId: '4', image: '/assets/subcategories/jackets.jpg' },
      { id: '402', name: 'Coats', slug: 'coats', categoryId: '4', image: '/assets/subcategories/coats.jpg' },
      { id: '403', name: 'Blazers', slug: 'blazers', categoryId: '4', image: '/assets/subcategories/blazers.jpg' },
    ]
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Office Dress',
    price: 89.99,
    originalPrice: 119.99,
    description: 'A timeless office dress that combines comfort with elegance. Perfect for professional settings with its modest design and premium fabric.',
    images: ['/lovable-uploads/10b76dac-4d78-496a-8549-7a7208b335ab.png', '/assets/products/dress-1-2.jpg', '/assets/products/dress-1-3.jpg'],
    category: 'Dresses',
    subcategory: 'Office Wear',
    tags: ['office', 'elegant', 'professional'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy Blue', value: '#1a365d' },
      { name: 'Black', value: '#000000' },
      { name: 'Gray', value: '#718096' },
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        productId: '1',
        userId: 'u1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'This dress is perfect for my office meetings. Very comfortable and looks professional.',
        date: '2023-10-15',
      },
      {
        id: 'r2',
        productId: '1',
        userId: 'u2',
        userName: 'Jennifer K.',
        rating: 4,
        comment: 'Good quality fabric and fits well. I got many compliments.',
        date: '2023-10-12',
      },
    ],
    stock: 25,
    sku: 'EOD-1001',
    createdAt: '2023-09-01',
  },
  {
    id: '2',
    name: 'Modern Shift Dress',
    price: 75.99,
    originalPrice: 95.99,
    description: 'A modern shift dress with clean lines and a comfortable fit. Versatile enough for both office and casual events.',
    images: ['/assets/products/dress-2-1.jpg', '/assets/products/dress-2-2.jpg', '/assets/products/dress-2-3.jpg'],
    category: 'Dresses',
    subcategory: 'Office Wear',
    tags: ['office', 'modern', 'versatile'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Burgundy', value: '#800020' },
      { name: 'Forest Green', value: '#228B22' },
      { name: 'Charcoal', value: '#36454F' },
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.6,
    reviews: [
      {
        id: 'r3',
        productId: '2',
        userId: 'u3',
        userName: 'Emily R.',
        rating: 5,
        comment: 'Super comfortable and stylish. The burgundy color is gorgeous.',
        date: '2023-10-10',
      },
    ],
    stock: 18,
    sku: 'MSD-1002',
    createdAt: '2023-09-05',
  },
  {
    id: '3',
    name: 'Casual Maxi Dress',
    price: 65.99,
    originalPrice: 79.99,
    description: 'A flowy maxi dress perfect for casual outings or weekend brunches. Made from breathable fabric for all-day comfort.',
    images: ['/assets/products/dress-3-1.jpg', '/assets/products/dress-3-2.jpg', '/assets/products/dress-3-3.jpg'],
    category: 'Dresses',
    subcategory: 'Casual',
    tags: ['casual', 'comfortable', 'weekend'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Teal', value: '#008080' },
      { name: 'Dusty Rose', value: '#DCAE96' },
      { name: 'Light Blue', value: '#ADD8E6' },
    ],
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.5,
    reviews: [
      {
        id: 'r4',
        productId: '3',
        userId: 'u4',
        userName: 'Rebecca T.',
        rating: 4,
        comment: 'Very comfortable for weekend wear. The material is light and airy.',
        date: '2023-10-08',
      },
    ],
    stock: 22,
    sku: 'CMD-1003',
    createdAt: '2023-09-10',
  },
  {
    id: '4',
    name: 'Tailored Pencil Dress',
    price: 99.99,
    originalPrice: 129.99,
    description: 'A classic pencil dress with modern tailoring for a flattering fit. Perfect for important meetings and formal work events.',
    images: ['/assets/products/dress-4-1.jpg', '/assets/products/dress-4-2.jpg', '/assets/products/dress-4-3.jpg'],
    category: 'Dresses',
    subcategory: 'Office Wear',
    tags: ['formal', 'professional', 'office'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
      { name: 'Dark Gray', value: '#A9A9A9' },
    ],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviews: [
      {
        id: 'r5',
        productId: '4',
        userId: 'u5',
        userName: 'Michelle P.',
        rating: 5,
        comment: 'Absolutely perfect for important client meetings. Very well tailored.',
        date: '2023-10-05',
      },
      {
        id: 'r6',
        productId: '4',
        userId: 'u6',
        userName: 'Lisa J.',
        rating: 5,
        comment: 'The fit is amazing and the quality is excellent. Worth every penny.',
        date: '2023-10-02',
      },
    ],
    stock: 15,
    sku: 'TPD-1004',
    createdAt: '2023-09-15',
  },
  {
    id: '5',
    name: 'Evening Cocktail Dress',
    price: 120.99,
    originalPrice: 159.99,
    description: 'An elegant cocktail dress perfect for evening events and parties. Features a flattering silhouette and premium materials.',
    images: ['/assets/products/dress-5-1.jpg', '/assets/products/dress-5-2.jpg', '/assets/products/dress-5-3.jpg'],
    category: 'Dresses',
    subcategory: 'Party Wear',
    tags: ['party', 'evening', 'elegant'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Royal Blue', value: '#4169E1' },
      { name: 'Emerald', value: '#50C878' },
      { name: 'Burgundy', value: '#800020' },
    ],
    featured: true,
    bestseller: false,
    newArrival: false,
    rating: 4.7,
    reviews: [
      {
        id: 'r7',
        productId: '5',
        userId: 'u7',
        userName: 'Alexandra M.',
        rating: 5,
        comment: 'Wore this to a company party and received so many compliments!',
        date: '2023-09-28',
      },
    ],
    stock: 12,
    sku: 'ECD-1005',
    createdAt: '2023-09-20',
  },
  {
    id: '6',
    name: 'Summer Office Blouse',
    price: 45.99,
    originalPrice: 59.99,
    description: 'A lightweight, breathable blouse perfect for summer office days. Features a modern cut and comfortable fit.',
    images: ['/assets/products/top-1-1.jpg', '/assets/products/top-1-2.jpg', '/assets/products/top-1-3.jpg'],
    category: 'Tops',
    subcategory: 'Blouses',
    tags: ['summer', 'office', 'lightweight'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Light Blue', value: '#ADD8E6' },
      { name: 'Light Pink', value: '#FFB6C1' },
    ],
    featured: false,
    bestseller: true,
    newArrival: true,
    rating: 4.5,
    reviews: [
      {
        id: 'r8',
        productId: '6',
        userId: 'u8',
        userName: 'Catherine D.',
        rating: 4,
        comment: 'Very comfortable for hot summer days at the office. Nice fabric.',
        date: '2023-09-25',
      },
    ],
    stock: 30,
    sku: 'SOB-2001',
    createdAt: '2023-09-25',
  },
  {
    id: '7',
    name: 'Classic Tailored Pants',
    price: 69.99,
    originalPrice: 89.99,
    description: 'Classic tailored pants that are a must-have in every professional woman\'s wardrobe. Offers a perfect fit and all-day comfort.',
    images: ['/assets/products/bottom-1-1.jpg', '/assets/products/bottom-1-2.jpg', '/assets/products/bottom-1-3.jpg'],
    category: 'Bottoms',
    subcategory: 'Pants',
    tags: ['classic', 'tailored', 'office'],
    sizes: ['0', '2', '4', '6', '8', '10', '12'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
      { name: 'Gray', value: '#808080' },
    ],
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviews: [
      {
        id: 'r9',
        productId: '7',
        userId: 'u9',
        userName: 'Natalie S.',
        rating: 5,
        comment: 'These pants fit perfectly and look very professional. Will buy in more colors!',
        date: '2023-09-22',
      },
    ],
    stock: 25,
    sku: 'CTP-3001',
    createdAt: '2023-09-30',
  },
  {
    id: '8',
    name: 'Professional Blazer',
    price: 110.99,
    originalPrice: 139.99,
    description: 'A sophisticated blazer that adds polish to any outfit. Perfect for making a professional impression at work or meetings.',
    images: ['/assets/products/outerwear-1-1.jpg', '/assets/products/outerwear-1-2.jpg', '/assets/products/outerwear-1-3.jpg'],
    category: 'Outerwear',
    subcategory: 'Blazers',
    tags: ['professional', 'formal', 'office'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
      { name: 'Burgundy', value: '#800020' },
    ],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
    reviews: [
      {
        id: 'r10',
        productId: '8',
        userId: 'u10',
        userName: 'Olivia R.',
        rating: 5,
        comment: 'This blazer elevates all my outfits. The fit is perfect and looks very high quality.',
        date: '2023-09-18',
      },
    ],
    stock: 18,
    sku: 'PB-4001',
    createdAt: '2023-10-05',
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.newArrival);
};

export const getProductsByCategory = (categoryName: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
