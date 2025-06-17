
"use client";

import { useState, useEffect, FormEvent } from 'react';
import type { ProductItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit3, LogIn, LogOut } from 'lucide-react';

const PRODUCTS_KEY = 'siteProducts';
const ADMIN_AUTH_KEY = 'isAdminAuthenticated_v2'; // Changed key to avoid conflicts if old one exists

// Sample initial products for demonstration if localStorage is empty
const initialProductsForAdminDemo: ProductItem[] = [
  { 
    id: 'sample-granite-1', 
    title: 'Rosy Pink Granite', 
    description: 'Beautiful rose-colored granite, perfect for elegant countertops and flooring.', 
    imageSrc: 'https://placehold.co/600x400.png', 
    imageAlt: 'Rosy Pink Granite',
    aiHint: 'rosy granite', 
    category: 'Granite', 
    isTopSelling: true, 
    specifications: { color: 'Rose Pink', finish: 'Polished', origin: 'India', thickness: '20mm' },
    dateAdded: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  { 
    id: 'sample-marble-1', 
    title: 'Italian Carrara Marble', 
    description: 'Classic white Italian marble with distinctive grey veining, ideal for luxurious interiors.', 
    imageSrc: 'https://placehold.co/600x400.png', 
    imageAlt: 'Italian Carrara Marble',
    aiHint: 'carrara marble', 
    category: 'Marble', 
    isTopSelling: false, 
    specifications: { color: 'White with Grey Veins', finish: 'Honed', origin: 'Italy', thickness: '18mm' },
    dateAdded: new Date(Date.now() - 86400000).toISOString()
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form state for a new/editing product
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [additionalImages, setAdditionalImages] = useState<Array<{src: string; alt: string}>>([]);
  const [aiHint, setAiHint] = useState('');
  const [category, setCategory] = useState('');
  const [isTopSelling, setIsTopSelling] = useState(false);
  const [specColor, setSpecColor] = useState('');
  const [specFinish, setSpecFinish] = useState('');
  const [specOrigin, setSpecOrigin] = useState('');
  const [specThickness, setSpecThickness] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    // Check auth status
    const authStatus = localStorage.getItem(ADMIN_AUTH_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Auth check is quick
  }, []);
  
  useEffect(() => {
    if (!isAuthenticated) return; // Only load products if authenticated

    setIsLoading(true); // Set loading true for product loading
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Only load sample products if authenticated and no products exist
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProductsForAdminDemo));
        setProducts(initialProductsForAdminDemo);
        toast({ title: "Sample Products Loaded", description: "A few sample products have been added for demonstration." });
      }
    } catch (error) {
      console.error("Failed to load products from localStorage", error);
      toast({ title: "Error", description: "Could not load products.", variant: "destructive" });
    }
    setIsLoading(false);
  }, [toast, isAuthenticated]);


  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError('');
    if (username === 'harsh' && password === 'harsh@123') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      setAuthError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setProducts([]); // Clear products on logout
    setIsFormVisible(false);
    setEditingProduct(null);
    resetForm();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };

  const saveProductsToLocalStorage = (updatedProducts: ProductItem[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageSrc('');
    setImageAlt('');
    setAdditionalImages([]);
    setAiHint('');
    setCategory('');
    setSpecColor('');
    setSpecFinish('');
    setSpecOrigin('');
    setSpecThickness('');
    setIsTopSelling(false);
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  const handleEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setImageSrc(product.imageSrc);
    setImageAlt(product.imageAlt);
    setAdditionalImages(product.additionalImages || []);
    setAiHint(product.aiHint);
    setCategory(product.category);
    setIsTopSelling(product.isTopSelling || false);
    setSpecColor(product.specifications?.color || '');
    setSpecFinish(product.specifications?.finish || '');
    setSpecOrigin(product.specifications?.origin || '');
    setSpecThickness(product.specifications?.thickness || '');
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !description || !category) {
      toast({ title: "Missing Fields", description: "Title, description, and category are required.", variant: "destructive" });
      return;
    }

    const finalImageSrc = imageSrc || `https://placehold.co/600x400.png`;
    const finalImageAlt = imageAlt || title;
    const finalAiHint = aiHint || category.toLowerCase().replace(/\s+/g, ' ').substring(0,30) || 'stone product';

    const productData: Omit<ProductItem, 'id' | 'dateAdded'> = {
      title,
      description,
      imageSrc: finalImageSrc,
      imageAlt: finalImageAlt,
      additionalImages,
      aiHint: finalAiHint,
      category,
      isTopSelling,
      specifications: {
        color: specColor,
        finish: specFinish,
        origin: specOrigin,
        thickness: specThickness,
      }
    };

    if (editingProduct) {
      const updatedProduct: ProductItem = { 
        ...editingProduct, 
        ...productData,
      };
      const updatedProducts = products.map(p => (p.id === editingProduct.id ? updatedProduct : p));
      saveProductsToLocalStorage(updatedProducts);
      toast({ title: "Product Updated", description: `"${title}" has been updated.` });
    } else {
      const newProduct: ProductItem = {
        id: Date.now().toString(), 
        ...productData,
        dateAdded: new Date().toISOString(),
      };
      saveProductsToLocalStorage([newProduct, ...products]);
      toast({ title: "Product Added", description: `"${title}" has been added.` });
    }
    resetForm();
  };

  const handleDelete = (productId: string, productTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the product "${productTitle}"?`)) {
      const updatedProducts = products.filter(product => product.id !== productId);
      saveProductsToLocalStorage(updatedProducts);
      toast({ title: "Product Deleted", description: `"${productTitle}" has been deleted.` });
    }
  };

  if (isLoading && !isAuthenticated) { // Show loading only if not authenticated yet
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                  className="mt-1 bg-card focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="mt-1 bg-card focus:ring-primary focus:border-primary"
                />
              </div>
              {authError && <p className="text-sm text-destructive text-center">{authError}</p>}
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-headline font-bold">Manage Products</h1>
        <div className="flex gap-2">
          <Button onClick={() => { setEditingProduct(null); setIsFormVisible(!isFormVisible); if(isFormVisible) resetForm(); }}>
            {isFormVisible ? (editingProduct ? 'Cancel Edit' : 'Cancel Add') : 'Add New Product'}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {isFormVisible && (
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <Label htmlFor="category">Category (e.g., Marble, Granite)</Label>
                  <Input id="category" value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 bg-card focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="imageSrc">Main Image URL or Upload</Label>
                  <div className="flex gap-2">
                    <Input id="imageSrc" type="url" value={imageSrc} onChange={e => setImageSrc(e.target.value)} placeholder="Enter image URL" className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                    <div className="relative">
                      <Input 
                        id="imageUpload" 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Compress image before storing
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                const img = new Image();
                                img.onload = () => {
                                  const canvas = document.createElement('canvas');
                                  const ctx = canvas.getContext('2d');
                                  
                                  // Calculate new dimensions (max width 800px for thumbnails)
                                  const maxWidth = 800;
                                  const ratio = maxWidth / img.width;
                                  const width = maxWidth;
                                  const height = img.height * ratio;
                                  
                                  canvas.width = width;
                                  canvas.height = height;
                                  
                                  // Draw and compress
                                  ctx?.drawImage(img, 0, 0, width, height);
                                  const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                                  setImageSrc(compressedDataUrl);
                                };
                                img.src = event.target.result.toString();
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button type="button" variant="outline" className="h-10 whitespace-nowrap">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  {imageSrc && (
                    <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border border-border">
                      <img src={imageSrc} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="imageAlt">Main Image Alt Text</Label>
                  <Input id="imageAlt" value={imageAlt} onChange={e => setImageAlt(e.target.value)} placeholder="Defaults to title" className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                </div>
              </div>
              
              {/* Additional Images Section */}
              <div className="space-y-4 mt-6 border-t pt-6">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">Additional Images</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setAdditionalImages([...additionalImages, {src: '', alt: ''}])}
                  >
                    Add Image
                  </Button>
                </div>
                
                {additionalImages.length > 0 ? (
                  <div className="space-y-4">
                    {additionalImages.map((img, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-secondary/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Image {index + 1}</h4>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive hover:text-destructive/80 h-8 px-2"
                            onClick={() => {
                              const newImages = [...additionalImages];
                              newImages.splice(index, 1);
                              setAdditionalImages(newImages);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`additionalImageSrc-${index}`}>Image URL or Upload</Label>
                            <div className="flex gap-2">
                              <Input 
                                id={`additionalImageSrc-${index}`} 
                                type="url" 
                                value={img.src} 
                                onChange={e => {
                                  const newImages = [...additionalImages];
                                  newImages[index].src = e.target.value;
                                  setAdditionalImages(newImages);
                                }} 
                                placeholder="Enter image URL" 
                                className="mt-1 bg-card focus:ring-primary focus:border-primary" 
                              />
                              <div className="relative">
                                <Input 
                                  id={`additionalImageUpload-${index}`} 
                                  type="file" 
                                  accept="image/*" 
                                  className="absolute inset-0 opacity-0 cursor-pointer" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      // Compress image before storing
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        if (event.target?.result) {
                                          const img = new Image();
                                          img.onload = () => {
                                            const canvas = document.createElement('canvas');
                                            const ctx = canvas.getContext('2d');
                                            
                                            // Calculate new dimensions (max width 800px for thumbnails)
                                            const maxWidth = 800;
                                            const ratio = maxWidth / img.width;
                                            const width = maxWidth;
                                            const height = img.height * ratio;
                                            
                                            canvas.width = width;
                                            canvas.height = height;
                                            
                                            // Draw and compress
                                            ctx?.drawImage(img, 0, 0, width, height);
                                            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                                            
                                            const newImages = [...additionalImages];
                                            newImages[index].src = compressedDataUrl;
                                            setAdditionalImages(newImages);
                                          };
                                          img.src = event.target.result.toString();
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <Button type="button" variant="outline" className="h-10 whitespace-nowrap">
                                  Upload
                                </Button>
                              </div>
                            </div>
                            {img.src && (
                              <div className="mt-2 relative w-full h-24 rounded-md overflow-hidden border border-border">
                                <img src={img.src} alt="Preview" className="object-cover w-full h-full" />
                              </div>
                            )}
                          </div>
                          <div>
                            <Label htmlFor={`additionalImageAlt-${index}`}>Alt Text</Label>
                            <Input 
                              id={`additionalImageAlt-${index}`} 
                              value={img.alt} 
                              onChange={e => {
                                const newImages = [...additionalImages];
                                newImages[index].alt = e.target.value;
                                setAdditionalImages(newImages);
                              }} 
                              placeholder="Describe this image" 
                              className="mt-1 bg-card focus:ring-primary focus:border-primary" 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed rounded-lg bg-secondary/5">
                    <p className="text-muted-foreground">No additional images added</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={() => setAdditionalImages([...additionalImages, {src: '', alt: ''}])}
                    >
                      Add First Image
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="aiHint">AI Hint for Image (1-2 keywords)</Label>
                <Input id="aiHint" value={aiHint} onChange={e => setAiHint(e.target.value)} placeholder="Defaults from category/title" className="mt-1 bg-card focus:ring-primary focus:border-primary" />
              </div>
              
              <Card className="p-4 bg-secondary/30">
                <CardTitle className="text-lg mb-3">Specifications</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specColor">Color</Label>
                    <Input id="specColor" value={specColor} onChange={e => setSpecColor(e.target.value)} className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <Label htmlFor="specFinish">Finish</Label>
                    <Input id="specFinish" value={specFinish} onChange={e => setSpecFinish(e.target.value)} className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <Label htmlFor="specOrigin">Origin</Label>
                    <Input id="specOrigin" value={specOrigin} onChange={e => setSpecOrigin(e.target.value)} className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <Label htmlFor="specThickness">Thickness</Label>
                    <Input id="specThickness" value={specThickness} onChange={e => setSpecThickness(e.target.value)} className="mt-1 bg-card focus:ring-primary focus:border-primary" />
                  </div>
                </div>
              </Card>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="isTopSelling" checked={isTopSelling} onCheckedChange={(checked) => setIsTopSelling(checked as boolean)} />
                <Label htmlFor="isTopSelling" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mark as Top Selling
                </Label>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
                {editingProduct && <Button variant="outline" onClick={resetForm}>Cancel Edit</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {isLoading && isAuthenticated && (
         <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">Loading products...</p>
         </div>
      )}

      {!isLoading && isAuthenticated && (
        <>
          <h2 className="text-2xl font-headline font-semibold mb-6">Current Products ({products.length})</h2>
          {products.length > 0 ? (
            <div className="space-y-6">
              {products.map(product => (
                <Card key={product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex-grow mb-4 sm:mb-0">
                    <CardTitle className="text-lg mb-1">{product.title} {product.isTopSelling && <span className="text-xs text-accent font-medium">(Top Selling)</span>}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.description.substring(0, 120)}{product.description.length > 120 ? '...' : ''} <br/>
                      <span className="text-xs text-muted-foreground">Category: {product.category} | Added: {new Date(product.dateAdded).toLocaleDateString()}</span>
                    </CardDescription>
                     {product.imageSrc && <img src={product.imageSrc} alt={product.imageAlt} data-ai-hint={product.aiHint} className="mt-2 rounded w-32 h-20 object-cover"/>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)} aria-label="Edit product">
                      <Edit3 className="h-4 w-4 mr-2 sm:mr-0" /> <span className="sm:hidden">Edit</span>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id, product.title)} aria-label="Delete product">
                      <Trash2 className="h-4 w-4 mr-2 sm:mr-0" /> <span className="sm:hidden">Delete</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products yet. Click "Add New Product" to create one.</p>
          )}
        </>
      )}
    </div>
  );
}
