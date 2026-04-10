export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description?: string;
  features?: string[];
  category?: string;
  stock?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Order {
  _id: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  customer: { name: string; phone: string; address: string };
  createdAt?: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  message: string;
  product?: string;
  createdAt?: string;
}

export interface Catalog {
  _id: string;
  title: string;
  pdfUrl: string;
  coverImage?: string;
  createdAt?: string;
}